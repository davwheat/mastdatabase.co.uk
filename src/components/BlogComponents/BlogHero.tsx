import { makeStyles } from '@material-ui/styles'
import React from 'react'
import type { IMdxPageContextWithoutBody } from '@templates/blog-article/BlogPageTemplate'
import Hero from '@components/Design/Hero'

interface IDocsPageInfoProps {
  pageContext: IMdxPageContextWithoutBody
}

const useStyles = makeStyles({
  root: {
    marginTop: 16,
    color: '#ccc',
    fontSize: 16,

    '& > span:not(:last-child)::after': {
      content: '"•"',
      margin: '0 4px',
      display: 'inline-block',
      fontSize: 36,
      lineHeight: '16px',
      verticalAlign: 'middle',
    },
  },
})

/**
 * Shows some article metadata.
 */
export function BlogHero({ pageContext }: IDocsPageInfoProps) {
  const classes = useStyles()

  if (!pageContext) {
    throw new Error(
      'No `pageContext` was passed to the BlogHero component. If being used in MDX files, ensure your usage matches: `<BlogHero {...props} />`.',
    )
  }

  const minsToRead = Math.round(pageContext.fields.timeToRead.minutes) || 1

  return (
    <Hero firstElement>
      <h1 className="text-shout">{pageContext.frontmatter.title}</h1>
      <p role="doc-subtitle" className="text-speak">
        {pageContext.frontmatter.description}
      </p>

      <aside className={classes.root}>
        <span>
          ~{minsToRead} min{minsToRead !== 1 && 's'} to read
        </span>
        <span>Published {pageContext.frontmatter.created_at}</span>
      </aside>
    </Hero>
  )
}
