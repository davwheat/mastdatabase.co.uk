import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import SpectrumEditor from '@components/SpectrumEditor'

import Colors from '@data/colors.json'
import Breakpoints from '@data/breakpoints'

import { makeStyles } from '@material-ui/core'
import { PageProps } from 'gatsby'
import Link from '@components/Links/Link'
import BetaTag from '@components/BetaTag'
import clsx from 'clsx'
import BetaWarning from '@components/BetaWarning'

const useStyles = makeStyles({
  heading: { display: 'flex', alignItems: 'center' },

  betaTag: { marginRight: 16 },

  betaWarning: { marginBottom: 24 },

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
    <Layout location={location} title="Spectrum editor" description="Interactive GUI editor and previewer for mobile spectrum data.">
      <Hero firstElement size="huge" color={Colors.primaryRed}>
        <h1 className={clsx(classes.heading, 'text-shout')}>
          <BetaTag className={classes.betaTag} /> Spectrum editor
        </h1>
        <p role="doc-subtitle" className="text-loud">
          Interactive GUI editor for mobile spectrum data.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Spectrum editor', url: '/spectrum-editor' },
        ]}
      />

      <Section>
        <BetaWarning className={classes.betaWarning} />

        <h2 className="text-loud">Introduction</h2>

        <p className="text-speak">
          The spectrum editor is a web-based tool for editing and visualising mobile spectrum, designed for use with my{' '}
          <code className="code">mobile-spectrum-data</code> package, used for displaying spectrum for countries and regions on this website.
        </p>
        <p className="text-speak">
          <strong>Your changes are automatically saved to your browser.</strong> You can safely navigate away and return later. If you clear your
          browsing data or use a feature like private browsing, you will lose all of your edits.
        </p>
        <p className="text-speak">
          You can paste an existing spectrum JSON file into the editor, load a file from your system, or start from scratch. You can then edit
          the spectrum data, and view the results with visualisations, and save the resulting JSON to your system for contribution.
        </p>
      </Section>

      <Section>
        <h2 className="text-loud">Contributing</h2>

        <p className="text-speak">
          This spectrum editor GUI can be used to easily contribute to the <code className="code">mobile-spectrum-data</code> package. For more
          information about this, please see the <Link href="/spectrum-editor/contributing">dedicated contributing page</Link>.
        </p>
      </Section>

      <SpectrumEditor />
    </Layout>
  )
}
