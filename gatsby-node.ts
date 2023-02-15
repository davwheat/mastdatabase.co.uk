import path from 'path'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import readingTime from 'reading-time'

const BlogArticlesPerPage = 2

/**
 * Customise webpack config.
 */
export const onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
  if (stage === 'develop' || stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [new CaseSensitivePathsPlugin()],
    })
  }

  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: [/node_modules\/leaflet/, /node_modules\\leaflet/],
            use: loaders.null(),
          },
          {
            test: [/node_modules\/esri-leaflet/, /node_modules\\esri-leaflet/],
            use: loaders.null(),
          },
        ],
      },
    })
  }

  const SentryPlugin = require('@sentry/webpack-plugin')

  if (process.env.NODE_ENV !== 'development' && process.env.SENTRY_AUTH_TOKEN) {
    actions.setWebpackConfig({
      plugins: [
        new SentryPlugin({
          include: 'public',
          ignore: ['app-*', 'polyfill-*', 'framework-*', 'webpack-runtime-*'],
        }),
      ],
    })
  }

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /.jsonc$/,
          use: [
            {
              loader: `jsonc-loader`,
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@data': path.resolve(__dirname, 'src/data'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@functions': path.resolve(__dirname, 'src/functions'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@leaflet': path.resolve(__dirname, 'src/leaflet'),
        '@atoms': path.resolve(__dirname, 'src/atoms'),
        '@blog': path.resolve(__dirname, 'src/components/BlogComponents/MdxComponents'),
      },
    },
  })
}

export const createPages = async inp => {
  await createBlogArticles(inp)
  await createBlogListing(inp)
}

export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body),
    })
  }
}

/**
 * Create blog article pages.
 */
async function createBlogArticles({ actions, graphql, reporter }) {
  const { createRedirect } = actions

  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            redirect_from
            path
          }

          internal {
            contentFilePath
          }

          id
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic('failed to create posts ', result.errors)
  }
  const pages = result.data.allMdx.nodes

  pages.forEach((page, i) => {
    const { frontmatter, id, internal } = page

    // Create all redirects that are defined in frontmatter
    if (frontmatter.redirect_from) {
      if (Array.isArray(frontmatter.redirect_from)) {
        frontmatter.redirect_from.forEach(redirect => {
          createRedirect({
            fromPath: `/blog/${redirect}`,
            toPath: `/blog/${frontmatter.path}`,
            redirectInBrowser: true,
            isPermanent: true,
          })
        })
      } else {
        throw new Error('`redirect_from` in MDX frontmatter must either be an array of paths, or not defined')
      }
    }

    actions.createPage({
      path: `/blog/${frontmatter.path}`,
      component: path.resolve(`./src/templates/blog-article/BlogPageTemplate.tsx`) + `?__contentFilePath=${internal.contentFilePath}`,

      context: { id, page: Math.ceil((i + 1) / BlogArticlesPerPage) },
    })
  })
}

/**
 * Create blog listings.
 */
async function createBlogListing({ actions, graphql, reporter }) {
  const { createPage, createRedirect } = actions
  const result = await graphql(
    `
      {
        allMdx(sort: { frontmatter: { created_at: DESC } }, filter: { frontmatter: { archived: { ne: true } } }) {
          nodes {
            id
          }
        }
      }
    `,
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMdx.nodes
  const numPages = Math.ceil(posts.length / BlogArticlesPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog-article/BlogArticlesList.tsx'),
      context: {
        limit: BlogArticlesPerPage,
        skip: i * BlogArticlesPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  createRedirect({
    fromPath: `/blog/1`,
    toPath: `/blog`,
    redirectInBrowser: true,
    isPermanent: true,
  })
}
