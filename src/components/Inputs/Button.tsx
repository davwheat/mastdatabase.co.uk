import React from 'react'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import LoadingSpinner from '@components/LoadingSpinner'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    appearance: 'none',
    // background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: 'inherit',
    fontSize: '1em',
    fontWeight: 700,
    margin: 'unset',
    // padding: 0,

    padding: '16px 24px',
    background: 'black',
    color: 'white',

    display: 'flex',
    alignItems: 'center',

    '&:focus-visible': {
      outline: `4px solid ${Colors.primaryRed}`,
    },

    '&:active': {
      background: Colors.primaryRed,
    },

    '&[disabled]': {
      background: Colors.neutralGrey,
      color: 'black',
      cursor: 'not-allowed',
    },
  },
})

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
}

export default function Button({ className, children, loading = false, disabled, ...props }: IButtonProps) {
  const classes = useStyles()

  return (
    <button disabled={disabled || loading} className={clsx(classes.root, className)} {...props}>
      {loading && (
        <>
          <LoadingSpinner size={24} style={{ marginRight: 12 }} />{' '}
        </>
      )}

      {children}
    </button>
  )
}