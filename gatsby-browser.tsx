/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import './src/styles/main.less'

import React from 'react'
import { RecoilRoot } from 'recoil'
import { MuiThemeProvider } from '@material-ui/core'

import theme from './src/theme'

export const onClientEntry = () => {
  if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render')
    whyDidYouRender(React, {
      trackAllPureComponents: true,
    })
  }
}

export function wrapRootElement({ element }) {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <MuiThemeProvider theme={theme}>{element}</MuiThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  )
}
