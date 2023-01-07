import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import React, { useId } from 'react'
import RadioButton from './RadioButton'

export interface IRadioButtonGroupOption<T> {
  label: string
  value: T
}

export interface IRadioButtonGroupProps<T extends number | string> {
  className?: string
  groupLabel: string
  options: IRadioButtonGroupOption<T>[]
  onChange: (value: T) => void
  value: T
  disabled?: boolean
}

const useStyles = makeStyles({
  fieldset: {
    padding: '16px 24px',
    background: '#fff',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '& legend': {
      // Prevent browser rendering it as a fieldset legend
      float: 'left',
      marginBottom: 12,
      fontWeight: 'bold',
    },
  },
  clearfix: {
    '&::after': {
      display: 'block',
      content: '""',
      clear: 'both',
    },
  },
  radioGrid: {
    display: 'grid',
    gap: 12,
  },
})

export default function RadioButtonGroup<T extends string | number>({
  className,
  groupLabel,
  options,
  onChange,
  value,
  disabled = false,
}: IRadioButtonGroupProps<T>) {
  const classes = useStyles()

  const groupName = useId()

  return (
    <fieldset className={clsx(classes.fieldset, className)}>
      <legend>{groupLabel}</legend>
      <span className={classes.clearfix} />

      <div className={classes.radioGrid}>
        {options.map(option => (
          <RadioButton
            disabled={disabled}
            name={groupName}
            key={option.value}
            label={option.label}
            checked={option.value === value}
            onChecked={() => {
              onChange(option.value)
            }}
          />
        ))}
      </div>
    </fieldset>
  )
}
