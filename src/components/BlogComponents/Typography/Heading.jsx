import React from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  common: {
    lineHeight: 1.15,
    marginTop: '0.75em',
    fontWeight: 600,

    '& .heading-link': {
      position: 'absolute',
      left: -24,
      top: '0',
      display: 'flex',
      alignItems: 'center',
      height: '1em',
      paddingTop: '0.15em',
      opacity: 0,

      '&:focus': {
        opacity: 1,
      },
    },

    '&:hover, &:focus-within': {
      '& .heading-link': {
        opacity: 1,
      },
    },
  },
  h1: {
    fontSize: '2.2rem',
  },
  h2: {
    fontSize: '1.8rem',
  },
  h3: {
    fontSize: '1.5rem',
  },
  h4: {
    fontSize: '1.35rem',
  },
})

export function Heading({ variant, className, children, lookAlikeVariant, noAnchorButton = false, ...otherProps }) {
  const classes = useStyles()

  return React.createElement(variant, {
    className: clsx(classes.common, classes[lookAlikeVariant || variant], className),
    children: [children],
    ...otherProps,
  })
}
