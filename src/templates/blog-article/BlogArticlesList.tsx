import React from 'react'
import { graphql } from 'gatsby'

import { BlogCard } from '@components/BlogComponents/BlogCard'
import PageNavigator from '@components/BlogComponents/PageNavigator'
import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Section from '@components/Design/Section'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Link from '@components/Links/Link'
import RSSIcon from 'mdi-react/RssIcon'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/styles'
import Breakpoints from '@data/breakpoints'

import type { PageProps } from 'gatsby'

interface IBlogArticlesListProps extends PageProps {
  data: {
    allMdx: {
      nodes: {
        id: string
        frontmatter: {
          path: string
          title: string
          description: string
          created_at: string
        }
        excerpt: string
      }[]
    }
  }
  pageContext: {
    numPages: number
    currentPage: number
  }
}

const useStyles = makeStyles({
  list: {
    margin: 0,
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,

    [Breakpoints.between.desktopSmall.and.phone]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [Breakpoints.upTo.tablet]: {
      gridTemplateColumns: '1fr',
    },
  },
  searchLink: {
    textAlign: 'right',
    marginBottom: 32,
    marginTop: -12,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 4,
    verticalAlign: 'bottom',
  },
})

export default function BlogArticlesList({
  location,
  data: {
    allMdx: { nodes },
  },
  pageContext: { numPages, currentPage },
}: IBlogArticlesListProps) {
  const classes = useStyles()

  const Posts = nodes.map(node => (
    <BlogCard
      key={node.id}
      title={node.frontmatter.title}
      description={node.frontmatter.description || node.excerpt}
      date={node.frontmatter.created_at}
      slug={`/blog/${node.frontmatter.path}`}
    />
  ))

  return (
    <Layout location={location} title={`Blog | Page ${currentPage}`} description={`Page ${currentPage} of blog articles from David Wheatley.`}>
      <Hero firstElement color={Colors.primaryBlue}>
        <h1 className="text-shout">Blog articles</h1>
        <p role="doc-subtitle" className="text-loud">
          Page {currentPage} of {numPages}
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Blog articles', url: `/blog/${currentPage}` },
        ]}
      />

      <Section width="wider">
        <p className="text-speak" style={{ textAlign: 'right', marginBottom: 16 }}>
          Don't want to keep checking this page?{' '}
          <Link href="/blog/rss.xml" internal={false} style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'bottom' }}>
            <RSSIcon style={{ fontSize: '1em' }} /> Use our RSS feed
          </Link>
        </p>

        <ul className={classes.list}>{Posts}</ul>
      </Section>

      <Section>
        <PageNavigator currentPage={currentPage} maxPage={numPages} />
      </Section>
    </Layout>
  )
}

export function Head() {
  return (
    <>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Feed for mastdatabase.co.uk blog articles"
        href="https://mastdatabase.co.uk/blog/rss.xml"
      />
    </>
  )
}

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMdx(sort: { frontmatter: { created_at: DESC } }, filter: { frontmatter: { archived: { ne: true } } }, limit: $limit, skip: $skip) {
      nodes {
        frontmatter {
          title
          description
          path
          created_at(formatString: "LL", locale: "en-GB")
        }
        id
        excerpt
      }
    }
  }
`
