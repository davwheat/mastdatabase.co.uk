const __IS_DEV__ = process.env.NODE_ENV !== 'production'

const Colors = require('./src/data/colors.json')

// These plugins will only be used in production builds
const prodPlugins = !__IS_DEV__
  ? [
      {
        resolve: 'gatsby-plugin-remove-console',
        options: {
          exclude: ['error', 'warn'],
        },
      },
      `gatsby-plugin-sitemap`,
      // Fixed hot reload in dev
      `gatsby-plugin-preact`,
      {
        resolve: '@sentry/gatsby',
      },
    ]
  : []

module.exports = {
  flags: {
    // FAST_DEV: true,
  },
  siteMetadata: {
    title: `Mast Database`,
    description: `A collection of mobile networking tools and resources for the UK.`,
    author: `@davwheat`,
    siteUrl: `https://mastdatabase.co.uk`,
  },
  plugins: [
    ...prodPlugins,

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
    `gatsby-plugin-csp`,
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
    `gatsby-plugin-webpack-size`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-webpack-bundle-analyser-v2`,
    `gatsby-plugin-perf-budgets`,
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
  ],
}
