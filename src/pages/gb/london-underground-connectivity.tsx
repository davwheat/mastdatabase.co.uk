import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'

import Colors from '@data/colors.json'

import { makeStyles, NoSsr } from '@material-ui/core'
import { ErrorBoundaryContext } from 'react-use-error-boundary'
import Link from '@components/Links/Link'
import TubeDasMap from '@components/Maps/TubeDasMap/TubeDasMap'

import type { PageProps } from 'gatsby'

const useStyles = makeStyles({
  mapSection: {
    '& .leaflet-popup-content': {
      '& dt': {
        fontWeight: 'bold',

        '&:not(:first-child)': {
          marginTop: 8,
        },
      },
    },
  },
})

export default function StreetworksMapPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout
      location={location}
      title="UK telecoms streetworks map"
      description="See active and future telecoms streetworks across the United Kingdom."
    >
      <ErrorBoundaryContext>
        <Hero firstElement size="huge" color={Colors.primaryRed}>
          <h1 className="text-shout">London Underground connectivity</h1>
          <p role="doc-subtitle" className="text-loud">
            Interactive map of mobile network deployments on the London Underground.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'Maps', url: '/maps' },
            { t: 'London Underground connectivity', url: '/maps/london-underground-connectivity' },
          ]}
        />

        <Section>
          <h2 className="text-loud">Mobile connectivity on the Tube</h2>
          <p className="text-speak">
            Mobile connectivity on the London Underground is provided by a combination of leaky feeders in tunnels and DAS units in stations. The
            programme is operated by{' '}
            <Link href="https://www.baicommunications.com/mediarelease/bai-communications-awarded-20-year-concession-to-deliver-high-speed-mobile-coverage-across-the-london-underground/">
              BAI Communications as part of a 20-year concession awarded by Transport for&nbsp;London
            </Link>
            .
          </p>
          <p className="text-speak">
            The programme entails full 4G connectivity throughout the London Underground by the end of 2024, as well as 5G connectivity at some
            select stations. As of now, the deployment is not yet complete, hence a map of deployments and other information is useful for those
            interested in tracking the rollout over&nbsp;time.
          </p>
        </Section>

        <Section width="full" className={classes.mapSection}>
          <NoSsr>
            <TubeDasMap />
          </NoSsr>
        </Section>
      </ErrorBoundaryContext>
    </Layout>
  )
}
