import React from 'react'

import clsx from 'clsx'

import Link from '@components/Links/Link'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    display: 'grid',
    width: 'max-content',
    gap: 4,

    '& > *': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
    },
  },
  noSelect: {
    userSelect: 'none',
  },
  box: {
    border: '2px solid #000',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&[data-selected]': {
      background: '#000',
      color: '#fff',
    },
  },
})

export default function PageNavigator({ currentPage, maxPage }) {
  const classes = useStyles()

  const pages = new Set<number>()

  pages.add(1)
  pages.add(maxPage)
  pages.add(currentPage)
  pages.add(currentPage + 1)
  pages.add(currentPage - 1)

  const pageArray: number[] = Array.from(pages).filter(p => p >= 1 && p <= maxPage)

  let lastP = 1

  const itemArr = []

  itemArr.push(
    currentPage !== 1 ? (
      <Link key="prev_a" className={classes.noSelect} aria-label="Previous page" href={`/blog/${currentPage - 1}`}>
        &lt;
      </Link>
    ) : (
      <span key="prev_t" className={classes.noSelect} aria-hidden>
        &lt;
      </span>
    ),
  )

  pageArray.forEach(p => {
    const showDots = p - lastP > 1
    lastP = p

    if (showDots) itemArr.push(<span>...</span>)

    const selected = p === currentPage

    if (selected) {
      itemArr.push(
        <span key={`${p}_sel`} aria-label={`Page ${p} (selected)`} className={clsx(classes.box, classes.noSelect)} data-selected>
          {p}
        </span>,
      )
    } else {
      itemArr.push(
        <Link key={`${p}_desel`} aria-label={`Page ${p}`} className={classes.box} href={`/blog/${p}`}>
          {p}
        </Link>,
      )
    }
  })

  itemArr.push(
    currentPage !== maxPage ? (
      <Link key="next_a" className={classes.noSelect} aria-label="Next page" href={`/blog/${currentPage + 1}`}>
        &gt;
      </Link>
    ) : (
      <span key="next_t" className={classes.noSelect} aria-hidden>
        &gt;
      </span>
    ),
  )

  return (
    <nav className={classes.root} style={{ gridTemplateColumns: `repeat(${itemArr.length}, 1fr)` }}>
      {itemArr}
    </nav>
  )
}
