import React, { useId } from 'react'

import { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Colors from '@data/colors.json'

interface IProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'onInput'> {
  /**
   * Class for the outer-most element of the component (`<label>`).
   */
  className?: string
  /**
   * The default value used to populate the input field.
   */
  value?: string
  /**
   * A textual label to display on-screen.
   */
  label: string
  /**
   * An optional label to override the standard label, read only to screenreaders.
   */
  screenReaderLabel?: string
  /**
   * Callback triggered when text is inputted to the text input.
   */
  onInput: (val: string) => void
  /**
   * Optional input placeholder.
   */
  placeholder?: string
  /**
   * Optional helper text which appears under the textbox. Correctly linked via `aria-describedby`.
   */
  helpText?: React.ReactNode
  disabled?: boolean
}

const useStyles = makeStyles({
  inputLabel: {
    '& > span': {
      display: 'block',
    },
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
    position: 'relative',
    background: 'white',

    border: '2px solid black',

    '&:focus-within': {
      borderColor: Colors.primaryRed,
    },
  },
  startAppendix: {
    paddingLeft: 8,
  },
  endAppendix: {
    paddingRight: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  input: {
    padding: '6px 8px',
    border: 'none',
    font: 'inherit',
    width: '100%',
    resize: 'vertical',

    '&:focus': {
      outline: 'none',
    },
  },
  helpText: {
    marginTop: 4,
    marginBottom: 0,
  },
})

export default function TextArea({
  label,
  screenReaderLabel,
  onInput,
  className,
  value = '',
  placeholder,
  helpText,
  disabled = false,
  ...attrs
}: IProps) {
  const classes = useStyles()

  const id = useId()
  const helpTextId = useId()

  return (
    <label htmlFor={id} className={clsx(classes.inputLabel, className)} aria-label={screenReaderLabel}>
      <span className="text-speak-up">{label}</span>

      <div className={classes.inputWrapper}>
        <textarea
          id={id}
          disabled={disabled}
          className={classes.input}
          onInput={e => {
            const v = (e.target as HTMLTextAreaElement).value
            onInput(v)
          }}
          value={value}
          placeholder={placeholder}
          aria-describedby={helpText ? helpTextId : undefined}
          {...attrs}
        />
      </div>

      {helpText && (
        <p id={helpTextId} className={clsx('text-whisper', classes.helpText)}>
          {helpText}
        </p>
      )}
    </label>
  )
}
