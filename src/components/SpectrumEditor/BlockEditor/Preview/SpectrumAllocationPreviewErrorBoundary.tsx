import React from 'react'

import MinorAlert from '@components/Design/MinorAlert'
import ButtonLink from '@components/Links/ButtonLink'

export interface ISpectrumAllocationPreviewErrorBoundaryProps {
  [key: string]: any
}

export default class SpectrumAllocationPreviewErrorBoundary extends React.Component<
  ISpectrumAllocationPreviewErrorBoundaryProps,
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    this.setState({ error })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <MinorAlert color="primaryRed" heading="Error">
            Failed to load preview of spectrum block: <br />
            <code className="code">{this.state.error?.message}</code>
          </MinorAlert>

          <ButtonLink
            onClick={() => {
              this.state = { hasError: false }
            }}
          >
            Try again
          </ButtonLink>
        </>
      )
    }

    return this.props.children
  }
}
