import React from 'react'

import Link from '@components/Links/Link'
import ClockIcon from 'mdi-react/ClockOutlineIcon'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

import type { Query } from './FeaturedBlogArticles'

type ArticleData = Query['allMdx']['nodes'][number]

const useStyles = makeStyles({
  link: {
    display: 'block',
    textDecoration: 'none !important',
  },
  title: {},
  description: {
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  releaseDate: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: Colors.darkGrey,
  },
})

interface BlogArticleCarouselItemProps {
  article: ArticleData
  shown: boolean
}

export default function BlogArticleCarouselItem({ article, shown }: BlogArticleCarouselItemProps) {
  const classes = useStyles()

  const {
    id,
    frontmatter: { title, path, description, created_at: createdAt },
  } = article

  return (
    <li key={id} role="article" aria-hidden={shown ? 'false' : 'true'}>
      <Link href={`/blog/${path}`} className={classes.link} tabIndex={!shown ? -1 : undefined}>
        <h3 className={clsx('text-speak-up', classes.title)}>{title}</h3>
        <p className={clsx('text-speak', classes.description)}>{description}</p>

        <p className={clsx('text-whisper-up', classes.releaseDate)}>
          <ClockIcon size={'1em'} />{' '}
          <span>
            <time dateTime={createdAt}>{createdAt}</time>
          </span>
        </p>
      </Link>
    </li>
  )
}
