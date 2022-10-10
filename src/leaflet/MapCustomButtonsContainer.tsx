import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'

interface IMapCustomButtonsContainerProps {
  children?: React.ReactNode
  className?: string
}

const useStyles = makeStyles({
  customButtonsContainer: {
    position: 'absolute',
    zIndex: 10e2,
    bottom: 32,
    right: 12,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16,
  },
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

export default function MapCustomButtonsContainer({ children, className }: IMapCustomButtonsContainerProps) {
  const classes = useStyles()

  return <div className={clsx(classes.customButtonsContainer, className)}>{children}</div>
}
