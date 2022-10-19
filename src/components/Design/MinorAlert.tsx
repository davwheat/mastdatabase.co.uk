import React from 'react'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

export interface IMinorAlertProps {
  className?: string
  heading?: React.ReactNode
  children: React.ReactNode
  color: keyof typeof Colors['pale']
  coloredBackground?: boolean
}

const useStyles = makeStyles({
  root: {
    '--bg-color': 'white',
    backgroundColor: 'var(--bg-color)',
    padding: '12px 16px',
    borderTop: `6px solid var(--color)`,

    '& p:last-child': {
      marginBottom: 0,
    },
  },
  heading: {
    marginBottom: 6,
  },
})

export default function MinorAlert({ className, heading, children, color, coloredBackground = false }: IMinorAlertProps) {
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.root, className)}
      style={{ '--color': Colors[color], ...(!coloredBackground ? {} : { '--bg-color': Colors.pale[color] }) } as any}
    >
      {heading && <h3 className={clsx(classes.heading, 'text-speak-up')}>{heading}</h3>}

      {children}
    </div>
  )
}
