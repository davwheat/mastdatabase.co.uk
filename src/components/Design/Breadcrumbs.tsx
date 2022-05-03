import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core'

import Section from '@components/Design/Section'
import Link from '@components/Links/Link'
import ButtonLink from '@components/Links/ButtonLink'

export interface IBreadcrumb {
  /**
   * URL for the page
   */
  url: string
  /**
   * Textual label
   */
  t: string
}

export interface IBreadcrumbsProps {
  data: IBreadcrumb[]
}

const useStyles = makeStyles({
  listRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
  },

  separator: {
    margin: '0 8px',
    WebkitUserSelect: 'none',
    userSelect: 'none',
  },
})

export default function Breadcrumbs({ data }: IBreadcrumbsProps) {
  const classes = useStyles()
  const breadcrumbsToDisplay: (IBreadcrumb | null)[] = []

  const [breadcrumbsExpanded, setBreadcrumbsExpanded] = useState(false)

  // Limit breadcrumbs to 3 items
  if (breadcrumbsExpanded || data.length <= 3) breadcrumbsToDisplay.push(...data)
  else {
    breadcrumbsToDisplay.push(data[0])
    breadcrumbsToDisplay.push(null)
    breadcrumbsToDisplay.push(data[data.length - 2], data[data.length - 1])
  }

  return (
    <Section width="wider" darker usePadding>
      <nav aria-label="Breadcrumbs">
        <ol className={classes.listRoot}>
          {breadcrumbsToDisplay.map((crumb, index) => {
            const separator = index < breadcrumbsToDisplay.length - 1 && (
              <span className={classes.separator} aria-hidden="true">
                /
              </span>
            )

            if (crumb === null) {
              return (
                <li key="__ellipses__">
                  <ButtonLink aria-label="Expand breadcrumbs" data-tooltip onClick={() => setBreadcrumbsExpanded(true)}>
                    ...
                  </ButtonLink>
                  {separator}
                </li>
              )
            }

            return (
              <li key={crumb.url}>
                <Link href={crumb.url} aria-current={index === breadcrumbsToDisplay.length - 1 ? 'page' : undefined}>
                  {crumb.t}
                </Link>
                {separator}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* JSON-LD breadcrumb data for crawlers */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i,
            item: {
              '@id': 'https://davwheat.dev' + crumb.url,
              name: crumb.t,
            },
          })),
        })}
      </script>
    </Section>
  )
}
