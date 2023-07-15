import React, { useEffect, useState } from 'react'

import BlogArticleCarouselItem from './BlogArticleCarouselItem'
import Link from '@components/Links/Link'
import Button from '@components/Inputs/Button'
import BackChevron from 'mdi-react/ChevronLeftIcon'
import ForwardChevron from 'mdi-react/ChevronRightIcon'

import type { Query } from './FeaturedBlogArticles'
import { makeStyles } from '@material-ui/core'

type ArticleData = Query['allMdx']['nodes'][number]

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: 24,
    alignItems: 'center',
  },
  list: {
    margin: 0,
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100%)',
    overflow: 'hidden',
    alignItems: 'center',

    '& > li': {
      transform: 'translateX(calc(var(--shown-item) * -100%))',
      transition: 'transform 0.4s ease-in-out',
      '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
  },
})

export default function BlogArticleCarousel({ articles }: { articles: readonly ArticleData[] }) {
  const classes = useStyles()
  const [shownIndex, setShownIndex] = useState(0)

  if (articles.length === 0) {
    throw new Error('No articles provided to BlogArticleCarousel')
  }

  useEffect(() => {
    if (shownIndex < 0 || shownIndex >= articles.length) {
      setShownIndex(0)
    }
  })

  const next = () => {
    shownIndex < articles.length - 1 ? setShownIndex(shownIndex + 1) : setShownIndex(0)
  }

  const prev = () => {
    shownIndex > 0 ? setShownIndex(shownIndex - 1) : setShownIndex(articles.length - 1)
  }

  return (
    <div className={classes.root}>
      <Button onClick={prev} aria-label="See previous">
        <BackChevron />
      </Button>
      <ul className={classes.list} style={{ '--shown-item': shownIndex } as any}>
        {articles.map((article, i) => (
          <BlogArticleCarouselItem article={article} shown={shownIndex === i} />
        ))}
      </ul>
      <Button onClick={next} aria-label="See next">
        <ForwardChevron />
      </Button>
    </div>
  )
}
