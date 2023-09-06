import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import UkSitesMap from '@components/Maps/UkSitesMap/UkSitesMap'

import Colors from '@data/colors.json'

import { makeStyles, NoSsr } from '@material-ui/core'
import { ErrorBoundaryContext } from 'react-use-error-boundary'

import type { PageProps } from 'gatsby'

const useStyles = makeStyles({
  mapSection: {
    marginTop: '0 !important',

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

export default function UkTelcoSitesMapPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout location={location} title="UK telecom sites map" description="View an incomplete map of telecoms sites across the UK.">
      <ErrorBoundaryContext>
        <Hero firstElement size="large" color={Colors.primaryRed}>
          <h1 className="text-shout">UK telecom sites map</h1>
          <p role="doc-subtitle" className="text-loud">
            View an incomplete map of telecoms sites across the UK compiled from government data.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'United Kingdom', url: '/gb' },
            { t: 'Telecom sites map', url: '/gb/sites' },
          ]}
        />

        <Section>
          <h2 className="text-loud">Data accuracy disclaimer</h2>
          <p className="text-speak">
            This data is compiled from publicly available Government datasets under license. Information may not be up-to-date, and sites shown
            may not actually be transmitting. For example, many old Orange PCS sites are listed in the datasets, but are decommissioned in
            real&nbsp;life.
          </p>
          <p className="text-speak">
            A variety of factors mean that the real locations of sites shown on this map may be different to the locations in real life. Best
            efforts have been made to be as accurate as possible. Some sites will only be accurate to the street rather than a full address. For
            more info, click on a data point to view its full&nbsp;details.
          </p>
        </Section>

        <Section width="full" className={classes.mapSection}>
          <NoSsr>
            <UkSitesMap />
          </NoSsr>
        </Section>
      </ErrorBoundaryContext>
    </Layout>
  )
}
