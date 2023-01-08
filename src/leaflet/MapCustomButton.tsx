import React from 'react'
import clsx from 'clsx'

import { Fab, makeStyles, Zoom } from '@material-ui/core'

const useStyles = makeStyles({
  customButton: {
    height: 52,
    width: 52,

    '& svg': {
      display: 'block',
      margin: 'auto',
    },

    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})

interface IMapCustomButtonProps extends Record<string, unknown> {
  showWhen?: (() => boolean) | boolean
  className?: string
  children: React.ReactNode
  'aria-label': string
  onClick(): void
}

export default function MapCustomButton({ showWhen, className, children, 'aria-label': ariaLabel, onClick, ...props }: IMapCustomButtonProps) {
  const classes = useStyles()

  const show = typeof showWhen === 'function' ? showWhen() : showWhen ?? true

  return (
    <Zoom in={show}>
      <Fab onClick={() => onClick()} className={clsx(classes.customButton, className)} aria-label={ariaLabel} {...props}>
        {children}
      </Fab>
    </Zoom>
  )
}
