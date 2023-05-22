import React from 'react'

import { Heading } from './Typography/Heading'

interface IBlogErrorBoundaryProps {
  children: React.ReactNode
}

export class BlogErrorBoundary extends React.Component<IBlogErrorBoundaryProps, { hasError: boolean }> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error)
    console.error(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <article role="alert">
          <Heading variant="h2">Oof.</Heading>
          <p>
            Something went wrong while loading this blog article. If this happens again, please email{' '}
            <a href="mailto:hi@davwheat.dev">hi@davwheat.dev</a> with the URL of this page.
          </p>
        </article>
      )
    }

    return this.props.children
  }
}
