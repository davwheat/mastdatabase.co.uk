import React, { useRef } from 'react'

import { nanoid } from 'nanoid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'

import Colors from '@data/colors.json'

interface ISelectDropdownProps {
  label: string
  options: {
    label: string
    value: string
  }[]
  value: string
  onChange: (value: string) => void
  className?: string
  selectClassName?: string
  /**
   * Optional helper text which appears under the textbox. Correctly linked via `aria-describedby`.
   */
  helpText?: React.ReactNode
}

const useStyles = makeStyles({
  root: {
    display: 'block',
  },
  label: {
    display: 'block',
    marginBottom: 8,
  },
  selectWrapper: {
    position: 'relative',

    '&::after': {
      content: '""',
      display: 'block',

      '--size': 16 * Math.sin(Math.PI / 4) + 'px',

      position: 'absolute',
      width: 'var(--size)',
      height: 'var(--size)',
      right: 16,
      top: 'calc(50% - 8px)',
      border: '2px solid black',
      borderTop: '0',
      borderLeft: '0',

      transform: 'rotate(45deg)',
      transformOrigin: 'center',
    },
  },
  select: {
    // A reset of styles, including removing the default dropdown arrow
    appearance: 'none',
    // Additional resets for further consistency
    backgroundColor: 'white',
    margin: 0,
    width: '100%',
    font: 'inherit',
    cursor: 'pointer',
    padding: '6px 12px',
    border: '2px solid black',
    borderRadius: 0,
    paddingRight: 48,

    '&:focus-visible': {
      borderColor: Colors.primaryRed,
      outline: 'none',
    },
  },
  helpText: {
    marginTop: 4,
    marginBottom: 0,
  },
})

export default function SelectDropdown({ label, value, options, onChange, className, selectClassName, helpText }: ISelectDropdownProps) {
  const {
    current: { selectId, helpTextId },
  } = useRef({ selectId: nanoid(), helpTextId: nanoid() })
  const classes = useStyles()

  return (
    <label htmlFor={selectId} className={clsx(classes.root, className)}>
      <span className={clsx('text-speak-up', classes.label)}>{label}</span>

      <div className={clsx('select-wrapper', classes.selectWrapper)}>
        <select
          id={selectId}
          className={clsx(classes.select, selectClassName)}
          value={value}
          onChange={e => {
            onChange(e.currentTarget.value)
          }}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {helpText && (
        <p id={helpTextId} className={clsx('text-whisper', classes.helpText)}>
          {helpText}
        </p>
      )}
    </label>
  )
}
