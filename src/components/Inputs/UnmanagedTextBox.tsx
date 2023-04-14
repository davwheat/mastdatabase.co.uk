import React, { useState } from 'react'
import TextBox, { ITextBoxProps } from './TextBox'

export interface IUnmanagedTextBoxProps extends Omit<ITextBoxProps, 'value' | 'helpText'> {
  defaultValue?: string
  helpText?: (currentValue: string) => React.ReactNode
}

export default function UnmanagedTextBox({ defaultValue = '', onInput, helpText, ...props }: IUnmanagedTextBoxProps) {
  const [val, setVal] = useState<string>(defaultValue)

  const helpTextVal = helpText ? helpText(val) : undefined

  return (
    <TextBox
      {...props}
      helpText={helpTextVal}
      value={val}
      onInput={newVal => {
        onInput(newVal)
        setVal(newVal)
      }}
    />
  )
}
