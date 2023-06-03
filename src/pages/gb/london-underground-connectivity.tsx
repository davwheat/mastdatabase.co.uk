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

export default function TubeConnectivityMap({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout
      location={location}
      title="London Underground mobile connectivity map"
      description="Interactive map of mobile network deployments on the London Underground."
    >
      <ErrorBoundaryContext>
        <Hero firstElement size="huge" color={Colors.primaryRed}>
          <h1 className="text-shout">London Underground mobile connectivity</h1>
          <p role="doc-subtitle" className="text-loud">
            Interactive map of mobile network deployments on the London Underground.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'United Kingdom', url: '/gb' },
            { t: 'London Underground connectivity', url: '/gb/london-underground-connectivity' },
          ]}
        />

        <Section>
          <h2 className="text-loud">Mobile connectivity on the Tube</h2>
          <p className="text-speak">
            Mobile connectivity on the London Underground is provided by a combination of leaky feeders in tunnels and DAS units in stations. The
            programme is operated by Boldyn Networks (previously known as BAI Communications) as part of a{' '}
            <Link href="https://www.baicommunications.com/mediarelease/bai-communications-awarded-20-year-concession-to-deliver-high-speed-mobile-coverage-across-the-london-underground/">
              20-year concession awarded by Transport for&nbsp;London
            </Link>
            .
          </p>
          <p className="text-speak">
            The programme entails full mobile connectivity throughout the London Underground by the end of 2024, including 5G connectivity at
            select stations. As of yet, the rollout is not complete, hence a map of deployments and other information is useful for those
            interested in tracking the rollout over&nbsp;time.
          </p>
        </Section>

        <Section>
          <h2 className="text-loud">Using the map</h2>

          <p className="text-speak">
            Sections of the network that have mobile connectivity within stations and tunnels are highlighted in green.
          </p>

          <p className="text-speak">
            If you'd prefer, you can hide all sections of the network that don't have connectivity, or show and hide particular lines.
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
