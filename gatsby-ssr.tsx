/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import './src/styles/main.less'

import React from 'react'
import { RecoilRoot } from 'recoil'
import { MuiThemeProvider } from '@material-ui/core'

import theme from './src/theme'

export function wrapRootElement({ element }) {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <MuiThemeProvider theme={theme}>{element}</MuiThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  )
}
