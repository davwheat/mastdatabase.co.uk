import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

import Colors from '@data/colors.json'

const useStyles = makeStyles({
  root: {
    padding: '0.2em 0.25em',
    borderRadius: 8,
    display: 'inline-block',
    fontSize: '0.75em',
    lineHeight: 1,
    backgroundColor: Colors.neutralGrey,
  },
})

interface IBetaTagProps {
  className?: string
}

export default function BetaTag({ className }: IBetaTagProps) {
  const classes = useStyles()

  return <div className={clsx(classes.root, className)}>Beta</div>
}
