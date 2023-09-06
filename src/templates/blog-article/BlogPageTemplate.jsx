import React from 'react'

import { graphql } from 'gatsby'

import { MDXProvider } from '@mdx-js/react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

import { BlogHero } from '@components/BlogComponents/BlogHero'
import Section from '@components/Design/Section'
import Breadcrumbs from '@components/Design/Breadcrumbs'

import Layout from '@components/Layout'
import Link from '@components/Links/Link'
import { MdxHeadingInterop } from '@components/BlogComponents/Typography/MdxHeadingInterop'
import { TableOfContents } from '@components/BlogComponents/TableOfContents'
import { BlogErrorBoundary } from '@components/BlogComponents/BlogErrorBoundary'
import { FactBox, MathBlock } from '@blog/index'
import truncateString from '@functions/truncate'

import TeX from '@matejmazur/react-katex'

import 'katex/dist/katex.min.css'
import '@styles/blog.less'

const MdxShortcodes = {
  a: Link,
  h1: MdxHeadingInterop('h1'),
  h2: MdxHeadingInterop('h2'),
  h3: MdxHeadingInterop('h3'),
  h4: MdxHeadingInterop('h4'),
  h5: MdxHeadingInterop('h5'),
  h6: MdxHeadingInterop('h6'),
  img: props => <img draggable="false" {...props} loading="lazy" />,
  TableOfContents,
  div: props => {
    if (props.className?.includes?.('math-display')) {
      return <MathBlock {...props} />
    }

    return <div {...props} />
  },
  span: props => {
    if (props.className?.includes?.('math-inline')) {
      const { children, ...others } = props
      return <TeX math={children} {...others} />
    }

    return <span {...props} />
  },
}

const useStyles = makeStyles({
  footerPara: {
    marginBottom: 32,
  },
  bottomNav: {
    marginTop: -16,
    marginBottom: 24,
  },
})

// Define props
/**
 * @typedef {object} BlogPageTemplatePageContext
 * @property {string} id
 * @property {number} page
 */

/**
 * @typedef {object} BlogPageTemplateProps
 * @extends {import('gatsby').PageProps}
 *
 * @property {BlogPageTemplatePageContext} pageContext
 * @property {Queries.BlogPageTemplateQuery} data
 * @property {React.ReactNode} children
 */

/**
 * @param {BlogPageTemplateProps} props
 * @returns
 */
export default function BlogPageTemplate({ pageContext, location, data, children }) {
  if (data.errors) {
    console.error(data.errors)
    throw new Error('Error loading blog article data in template.')
  }

  const context = data.mdx
  const classes = useStyles()

  // ||= not supported with acorn?
  context.frontmatter.updated_at = context.frontmatter.updated_at || context.frontmatter.created_at
  context.frontmatter.archived = context.frontmatter.archived || false

  return (
    <Layout location={location} title={context.frontmatter.title} description={context.frontmatter.description || context.excerpt}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: context.frontmatter.title,
              // image: 'https://benborgers.com/assets/json-ld.png',
              publisher: {
                '@type': 'Organization',
                name: 'David Wheatley',
                url: 'https://davwheat.dev',
                // logo: {
                //   '@type': 'ImageObject',
                //   url: 'https://benborgers.com/assets/index.png',
                //   width: '1200',
                //   height: '630',
                // },
              },
              url: `https://davwheat.dev/${context.frontmatter.path}`,
              datePublished: context.frontmatter.created_at_iso,
              dateCreated: context.frontmatter.created_at_iso,
              dateModified: context.frontmatter.updated_at_iso ?? context.frontmatter.created_at_iso,
              description: context.frontmatter.description,
              author: {
                '@type': 'Person',
                name: 'David Wheatley',
                url: 'https://davwheat.dev',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://davwheat.dev/blog/${pageContext.page}`,
              },
            },
            null,
            2,
          ),
        }}
      />

      <article id="blog-article">
        <BlogErrorBoundary>
          <BlogHero pageContext={context} />

          <Breadcrumbs
            data={[
              { t: 'Home', url: '/' },
              { t: 'Blog articles', url: `/blog/${pageContext.page}` },
              { t: truncateString(context.frontmatter.title, 35), url: location.pathname },
            ]}
          />

          <Section id="blog-article-content">
            <BlogErrorBoundary>
              {context.frontmatter.archived && (
                <FactBox title="Archived">
                  This article has been archived. Information contained within it may be out-of-date or wholly incorrect. This article has been
                  retained purely for historical and archival purposes only.
                </FactBox>
              )}

              <MDXProvider components={MdxShortcodes}>{children}</MDXProvider>
            </BlogErrorBoundary>
          </Section>

          <hr />

          <Section component="footer">
            <p className={clsx('text-speak text-center', classes.footerPara)}>
              Noticed something not quite right with this blog article? Give me a poke at{' '}
              <Link href={`mailto:blog@mastdatabase.co.uk?subject=${encodeURIComponent(context.frontmatter.title)}`}>
                blog@mastdatabase.co.uk
              </Link>{' '}
              or <Link href="https://t.me/davwheat">t.me/davwheat</Link> and let me know.
            </p>
          </Section>

          <nav className={classes.bottomNav}>
            <Link href={`/blog/${pageContext.page}`}>Back to article list</Link>
          </nav>
        </BlogErrorBoundary>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query BlogPageTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        path
        redirect_from
        created_at(formatString: "LLL", locale: "en-GB")
        updated_at(formatString: "LLL", locale: "en-GB")
        created_at_iso: created_at
        updated_at_iso: updated_at
        archived
      }

      id
      tableOfContents(maxDepth: 3)
      excerpt

      fields {
        timeToRead {
          minutes
          words
        }
      }
    }
  }
`
