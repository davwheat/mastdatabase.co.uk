import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'

import Colors from '@data/colors.json'
import Breakpoints from '@data/breakpoints'

import { makeStyles } from '@material-ui/core'
import { PageProps } from 'gatsby'

const useStyles = makeStyles({
  linkList: {
    marginTop: 24,
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--columns), minmax(0, 1fr))',
    gap: 32,
    '--columns': 1,

    [Breakpoints.downTo.tablet]: {
      '--columns': 2,
    },

    '& img.emoji': {
      display: 'inline-block',
      height: '1em',
      width: 'auto',
      verticalAlign: '-0.1em',
    },
  },
})

export default function SpectrumEditorPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout location={location} title="Contributing spectrum data">
      <Hero firstElement size="huge" color={Colors.primaryRed}>
        <h1 className="text-shout">Contributing spectrum data</h1>
        <p role="doc-subtitle" className="text-loud">
          How to contribute spectrum data to this site.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Spectrum editor', url: '/spectrum-editor' },
          { t: 'Contributing', url: '/spectrum-editor/contributing' },
        ]}
      />

      <Section>
        <h2 className="text-louder">WIP</h2>

        <p className="text-speak">This page is not yet complete.</p>
      </Section>
    </Layout>
  )
}
