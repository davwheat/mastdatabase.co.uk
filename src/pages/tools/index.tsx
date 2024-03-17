import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import CardLink from '@components/Links/CardLink'

import Colors from '@data/colors.json'
import Breakpoints from '@data/breakpoints'

import { makeStyles } from '@material-ui/core'

import { type PageProps } from 'gatsby'

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

export default function IndexPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout location={location} title="Networking tools">
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Networking tools</h1>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Tools', url: '/tools' },
        ]}
      />

      <Section>
        <h2 className="text-loud">Calculators</h2>
        <p>Handy calculators for various parameters or other networking related values.</p>

        <div className={classes.linkList}>
          <CardLink
            title="LTE total Tx power"
            description="Calculate total radio transmit power, or use transmit power to calculate a multitude of other values."
            url="/tools/lte-total-tx-power-calculator"
          />
          <CardLink
            title="NR NCI to gNB/sector ID"
            description="Convert an NR cell identity to a gNB ID and sector ID, or vice versa."
            url="/tools/nr-nci-to-gnb-sector-id"
          />
        </div>
      </Section>
    </Layout>
  )
}
