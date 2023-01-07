import React, { useId } from 'react'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'

export interface IRadioButtonProps {
  className?: string
  label: string
  onChecked: () => void
  checked: boolean
  name: string
  disabled?: boolean
}

const useStyles = makeStyles({
  radio: {
    opacity: 0,
    position: 'absolute',

    '&:focus-visible + label': {
      outline: `2px solid ${Colors.primaryRed}`,
      outlineOffset: 4,
    },

    '& + label': {
      display: 'block',
      position: 'relative',
      paddingLeft: 'var(--left-pad)',
      WebkitUserSelect: 'none',
      userSelect: 'none',
      cursor: 'pointer',

      '--left-pad': 'calc(1em + 16px)',
      '--radio-size': '1.35em',
      '--radio-border-size': '2px',
      '--radio-y-offset': '0.05em',

      '&::before, &::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        borderRadius: '50%',
        overflow: 'hidden',

        top: 'calc(50% - var(--radio-y-offset))',
        transform: 'translateY(-50%)',

        width: 'var(--size)',
        height: 'var(--size)',

        cursor: 'pointer',
      },

      '&::before': {
        '--size': 'var(--radio-size)',
        left: 0,
        background: 'white',
        border: 'var(--radio-border-size) solid black',
      },

      '&::after': {
        '--bg': 'white',
        '--x-pad': 'calc(var(--radio-border-size) + 4px)',
        '--size': 'calc(var(--radio-size) - (2 * var(--x-pad)))',
        left: 'var(--x-pad)',
        background: 'var(--bg)',
      },
    },

    '&:checked + label::after': {
      '--bg': 'black',
    },
  },
})

export default function RadioButton({ name, className, label, checked, onChecked, disabled = false }: IRadioButtonProps) {
  const classes = useStyles()

  const id = useId()

  return (
    <div className={className}>
      <input
        type="radio"
        name={name}
        className={classes.radio}
        id={id}
        onChange={() => {
          onChecked()
        }}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
