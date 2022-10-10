import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'

import Colors from '@data/colors.json'

import { makeStyles, NoSsr } from '@material-ui/core'

import StreetworksMap from '@components/Maps/StreetworksMap/StreetworksMap'

import type { PageProps } from 'gatsby'
import { ErrorBoundaryContext } from 'react-use-error-boundary'
import { StreetworksMapSettings } from '@components/Maps/StreetworksMap/StreetworksMapSettings'

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
          <h1 className="text-shout">UK telecoms streetworks map</h1>
          <p role="doc-subtitle" className="text-loud">
            See active and future telecoms streetworks in the UK.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'Maps', url: '/maps' },
            { t: 'UK streetworks map', url: '/maps/streetworks' },
          ]}
        />

        <Section>
          <h2 className="text-loud">About</h2>
          <p className="text-speak">
            View a map of current and future reghistered streetworks relating to telecoms infrastructure in the&nbsp;UK.
          </p>
          <p>
            You can customise the time range or pick a predefined range below. You can also filter whose works to show by opening the settings
            modal with the cog in the bottom-right of the&nbsp;map.
          </p>
        </Section>

        <StreetworksMapSettings />

        <Section width="full" className={classes.mapSection}>
          <NoSsr>
            <StreetworksMap />
          </NoSsr>
        </Section>
      </ErrorBoundaryContext>
    </Layout>
  )
}
