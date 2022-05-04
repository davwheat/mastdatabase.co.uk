import React, { useEffect, useState } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'

import Colors from '@data/colors.json'

import { makeStyles, NoSsr } from '@material-ui/core'

import FreshwaveMap, { IFreshwaveSitePoint } from '@components/Maps/FreshwaveMap'

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

export default function StreetworksMapPage({ location }) {
  const classes = useStyles()

  const [sites, setSites] = useState<null | IFreshwaveSitePoint[]>(null)

  return (
    <Layout
      location={location}
      title="UK telecoms streetworks map"
      description="See active and future telecoms streetworks across the United Kingdom."
    >
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
          View a map of active and future (approx. next 3 months) streetworks relating to telecoms in the UK, including mobile networking, fibre
          deployments, and&nbsp;more.
        </p>
        <p className="text-speak-up">This page is a work-in-progress.</p>
      </Section>

      {/* <Section width="full" className={classes.mapSection}>
        <NoSsr>
          <FreshwaveMap sites={sites} />
        </NoSsr>
      </Section> */}
    </Layout>
  )
}
