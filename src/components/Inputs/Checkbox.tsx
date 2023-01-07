import React, { useId } from 'react'

import { makeStyles } from '@material-ui/core'

import clsx from 'clsx'

import generateTransitions from '../../functions/generateTransitions'
import Colors from '@data/colors.json'

interface Props {
  label: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  /**
   * If provided, the `checked` state will be managed by the parent component.
   */
  checked?: boolean
  disabled?: boolean
  className?: string
}

const useStyles = makeStyles({
  root: {
    '--size': '24px',
    '--border-size': '2px',
    position: 'relative',
  },
  checkbox: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',

    cursor: 'pointer',
    zIndex: 2,
    opacity: 0,
    height: 'var(--size)',
    width: 'var(--size)',
    marginRight: 8,

    '&:checked + $label::after': {
      opacity: 1,
    },

    '&:focus-visible + $label::before': {
      outline: `2px solid ${Colors.primaryRed}`,
    },

    '&[disabled]': {
      '&, & + $label': {
        cursor: 'not-allowed',
      },
    },
  },
  label: {
    '--left-pad': 'calc(1em + 16px)',

    display: 'block',
    position: 'relative',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    cursor: 'pointer',
    verticalAlign: 'middle',
    paddingLeft: 'var(--left-pad)',

    '&::before, &::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '&::before': {
      border: `var(--border-size) solid currentColor`,
      height: 'var(--size)',
      width: 'var(--size)',
      background: '#fff',
      left: 0,
    },
    '&::after': {
      '--tick-thickness': '4px',
      '--pad': '4px',
      '--tick-size': 'calc((var(--size) - var(--border-size) - var(--tick-thickness) - var(--pad)))',
      '--x-pad': 'calc((var(--tick-size) * 2 / 5) / 2)',

      left: 'calc(var(--size) / 2)',
      top: '50%',

      transform: 'translate(-50%, calc(-50% - var(--size) * 0.07)) rotate(45deg)',
      transformOrigin: 'center',
      width: 'calc(var(--tick-size) * 3 / 5)',
      height: 'var(--tick-size)',
      borderRight: `var(--tick-thickness) solid currentColor`,
      borderBottom: `var(--tick-thickness) solid currentColor`,
      opacity: 0,
      ...generateTransitions('opacity', 'short'),
    },
  },
})

function Checkbox({ label, onChange, checked, disabled, className }: Props) {
  const id = useId()
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)}>
      <input
        disabled={disabled}
        className={classes.checkbox}
        id={id}
        checked={typeof checked !== 'undefined' ? checked : undefined}
        onChange={onChange}
        type="checkbox"
      />
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default React.memo(Checkbox)
