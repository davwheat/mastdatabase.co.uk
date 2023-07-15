import React from 'react'

import BlogArticleCarousel from './BlogArticleCarousel'

import { graphql, useStaticQuery } from 'gatsby'
import { makeStyles } from '@material-ui/core'

export interface FeaturedBlogArticleProps {
  title: string
  description: string
  path: string
  createdAt: Date
}

export type Query = Queries.FeaturedBlogArticlesQuery

const useStyles = makeStyles({
  root: {
    paddingLeft: 24,
    paddingRight: 24,
  },
})

export default function FeaturedBlogArticles() {
  const {
    allMdx: { nodes: featuredBlogArticles },
  } = useStaticQuery<Query>(graphql`
    query FeaturedBlogArticles {
      allMdx(sort: { frontmatter: { created_at: DESC } }, limit: 3, filter: { frontmatter: { archived: { ne: true } } }) {
        nodes {
          id
          frontmatter {
            path
            title
            description
            created_at(formatString: "LL", locale: "en-GB")
          }
        }
      }
    }
  `)

  const classes = useStyles()

  return (
    <section className={classes.root}>
      <h2 className="text-loud">Latest from the blog</h2>

      <BlogArticleCarousel articles={featuredBlogArticles} />
    </section>
  )
}
