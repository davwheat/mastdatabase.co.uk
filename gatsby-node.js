/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

/**
 * Customise webpack config.
 */
exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
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
        ],
      },
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
      },
    },
  })
}

exports.createPages = async inp => {
  // await createBlogArticles(inp)
  // await createBlogListing(inp)
}

// -- NOT USED --
// Kept from copy-paste from davwheat.dev

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
    const { frontmatter, id } = page

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
      component: path.resolve(`./src/templates/blog-article/BlogPageTemplate.tsx`),

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
        allMdx(sort: { fields: [frontmatter___created_at], order: DESC }, filter: { frontmatter: { archived: { ne: true } } }) {
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
