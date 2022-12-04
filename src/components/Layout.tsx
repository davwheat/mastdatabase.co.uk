import React from 'react'

import Header from './PageComponents/Header'
import Footer from './PageComponents/Footer'
import SEO from './SEO'

import { makeStyles } from '@material-ui/styles'

import type { LocationContext } from '@gatsbyjs/reach-router'

const useStyles = makeStyles({
  mainContent: {
    maxWidth: 768,
    margin: 'auto',
    paddingLeft: 24,
    paddingRight: 24,
    flex: '1',
    width: '100%',
  },
})

interface Props {
  title: string
  description?: string
  location: LocationContext
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children, title, description, location }) => {
  const classes = useStyles()

  return (
    <>
      <SEO title={title} description={description} />

      <Header />
      <main className={classes.mainContent}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
