import React from 'react'

const HTML: React.FC<Props> = props => {
  return (
    <html lang="en-GB" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* <!-- Cloudflare Web Analytics --> */}
        <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "1a8172f0982a46e2ac9ee6e70e6cecf5"}' />

        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

interface Props {
  htmlAttributes: Record<string, unknown>
  headComponents: React.ReactNode
  bodyAttributes: Record<string, unknown>
  preBodyComponents: React.ReactNode
  body: string
  postBodyComponents: React.ReactNode
}

export default HTML
