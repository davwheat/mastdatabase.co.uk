import React from 'react'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles({
  linkButton: {
    appearance: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontFamily: 'inherit',
    fontSize: '1em',
    fontWeight: 700,
    display: 'inline',
    margin: 0,
    padding: 0,
  },
})

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

export default function ButtonLink({ children, className, onClick, ...props }: Props) {
  const classes = useStyles()

  return (
    <button onClick={onClick} className={clsx(classes.linkButton, className)} {...props}>
      {children}
    </button>
  )
}
