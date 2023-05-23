import React from 'react'
import Link from '@components/Links/Link'
import { Heading } from '@components/BlogComponents/Typography/Heading'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import type { IMdxPageContext } from '@templates/blog-article/BlogPageTemplate'

interface ITableOfContentsProps {
  data: { mdx: IMdxPageContext }
}

export type TableOfContentsItem = {
  url: string
  title: string
  items?: TableOfContentsItem[]
}

export type TableOfContents = TableOfContentsItem[]

const useTocStyles = makeStyles({
  tocRoot: {
    marginLeft: 8,
    marginBottom: 16,
    borderLeft: `4px solid var(--orange)`,
    padding: '20px 16px',
    paddingTop: 0,
  },
  tocHeading: {
    marginLeft: -8 + -16,
    marginTop: 0,
  },
  tocList: {
    listStyle: 'none',
    margin: '0 !important',
    padding: 0,

    '& &': {
      paddingLeft: 16,
    },
  },
  tocListOutermost: {},
})

/**
 * Renders a table of contents using data from Gatsby's TOC GraphQL entry.
 */
export function TableOfContents({
  data: {
    mdx: { tableOfContents },
  },
}: ITableOfContentsProps) {
  const classes = useTocStyles()

  if (!tableOfContents) {
    throw new Error(
      'No `tableOfContents` value was passed to the TableOfContents component. If being used in MDX files, ensure your usage matches: `<TableOfContents {...props} />`.',
    )
  }

  const tocData = tableOfContents.items

  // No headings
  if (!tocData) return null

  return (
    <nav className={classes.tocRoot}>
      <Heading variant="h2" id="table-of-contents" className={classes.tocHeading}>
        Contents
      </Heading>

      <ul className={clsx(classes.tocList, classes.tocListOutermost)}>
        {tocData.map(items => (
          <TableOfContentsItem key={items.url} data={items} />
        ))}
      </ul>
    </nav>
  )
}

interface ITableOfContentsItemProps {
  data: TableOfContentsItem
}

function TableOfContentsItem({ data }: ITableOfContentsItemProps) {
  const classes = useTocStyles()

  return (
    <li>
      <Link href={data.url}>{data.title}</Link>
      {data.items && (
        <ul className={classes.tocList}>
          {data.items.map(item => (
            <TableOfContentsItem key={item.url} data={item} />
          ))}
        </ul>
      )}
    </li>
  )
}
