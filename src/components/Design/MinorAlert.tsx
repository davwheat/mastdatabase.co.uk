import React from 'react'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

export interface IMinorAlertProps {
  heading?: React.ReactNode
  children: React.ReactNode
  color: keyof typeof Colors
}

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    padding: '12px 16px',
    borderTop: `4px solid var(--color)`,

    '& p:last-child': {
      marginBottom: 0,
    },
  },
  heading: {
    marginBottom: 8,
  },
})

export default function MinorAlert({ heading, children, color }: IMinorAlertProps) {
  const classes = useStyles()

  return (
    <div className={classes.root} style={{ '--color': Colors[color] } as any}>
      {heading && <h3 className={clsx(classes.heading, 'text-speak-up')}>{heading}</h3>}

      {children}
    </div>
  )
}
