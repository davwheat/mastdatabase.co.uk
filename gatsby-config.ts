import type { GatsbyConfig } from 'gatsby'

const __IS_DEV__ = process.env.NODE_ENV !== 'production'

import Colors from './src/data/colors.json'

const graphql = String.raw

const nonCiPlugins: any[] = !(process.env.CI || process.env.CF_PAGES)
  ? [`gatsby-plugin-webpack-bundle-analyser-v2`, `gatsby-plugin-webpack-size`, `gatsby-plugin-perf-budgets`]
  : []

// These plugins will only be used in production builds
const prodPlugins: any[] = !__IS_DEV__
  ? [
      {
        resolve: 'gatsby-plugin-remove-console',
        options: {
          exclude: ['error', 'warn'],
        },
      },
    ]
  : []

const config: GatsbyConfig = {
  flags: {
    // FAST_DEV: true,
    DEV_SSR: true,
  },
  siteMetadata: {
    title: `Mast Database`,
    description: `A collection of mobile networking tools and resources for the UK.`,
    author: `David Wheatley`,
    siteUrl: `https://mastdatabase.co.uk`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    ...prodPlugins,
    `gatsby-plugin-cloudflare-pages`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        resolveSiteUrl: () => 'https://mastdatabase.co.uk',
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://mastdatabase.co.uk`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-react-head`,
    {
      resolve: '@slixites/gatsby-plugin-google-fonts',
      options: {
        fonts: [`jost\:400,400i,500,700,700i`],
        display: 'fallback',
        preconnect: true,
        attributes: {
          rel: 'stylesheet preload prefetch',
          as: 'style',
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mast Database`,
        short_name: `Mast DB`,
        start_url: `/`,
        background_color: Colors.primaryRed,
        theme_color: Colors.primaryBlue,
        display: `minimal-ui`,
        icon: `src/images/thinking_emoji.png`,
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-plugin-less`,
    `gatsby-source-local-git`,

    // Blog plugins
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        mdxOptions: {
          remarkPlugins: [require(`remark-math`), [require(`remark-twemoji`), { isReact: true }], require('remark-gfm')],
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `heading-link`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 575,
              wrapperStyle: () => 'max-height: 80vh; overflow: hidden;',
              backgroundColor: 'transparent',
              linkImagesToOriginal: true,
              quality: 80,
              withWebp: true,
              withAvif: true,
            },
          },
          `gatsby-remark-static-images`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(n => {
                const url = new URL(n.frontmatter.path, site.siteMetadata.siteUrl + '/blog/').href

                return {
                  title: n.frontmatter.title,
                  description: n.frontmatter.description ?? n.excerpt,
                  author: n.frontmatter.author ?? 'David Wheatley',
                  date: n.frontmatter.created_at,
                  guid: url,
                  url: url,
                }
              })
            },
            query: graphql`
              query {
                allMdx(sort: { frontmatter: { created_at: DESC } }, filter: { frontmatter: { archived: { ne: true } } }) {
                  nodes {
                    frontmatter {
                      title
                      description
                      path
                      author
                      created_at
                    }
                    id
                    excerpt
                  }
                }
              }
            `,
            managingEditor: 'blog@mastdatabase.co.uk (David Wheatley)',
            copyright: `${new Date().getFullYear()} David Wheatley`,
            language: 'en',
            output: '/blog/rss.xml',
            title: 'Mastdatabase.co.uk blog feed',
            description: 'Various mobile networking related blog articles and market analyses from mastdatabase.co.uk.',
            site_url: 'https://mastdatabase.co.uk',
            feed_url: 'https://mastdatabase.co.uk/blog/rss.xml',
            ttl: 60,
          },
        ],
      },
    },
    {
      resolve: '@sentry/gatsby',
    },
    ...nonCiPlugins,
  ],
}

export default config
