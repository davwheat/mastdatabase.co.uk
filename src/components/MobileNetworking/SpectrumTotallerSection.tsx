import React from 'react'

import Section from '@components/Design/Section'
import SpectrumTotaller, { SpectrumTotallerProps } from './SpectrumTotaller'

export interface SpectrumTotallerSectionProps extends SpectrumTotallerProps {
  children?: React.ReactNode
}

export default function SpectrumTotallerSection({ children, ...props }: SpectrumTotallerSectionProps) {
  return (
    <Section width="wider">
      <h2 className="text-louder">Total spectrum</h2>

      <p className="text-speak">This ignores any region-specific licenses that operators may have.</p>

      {children}

      <SpectrumTotaller {...props} />
    </Section>
  )
}
