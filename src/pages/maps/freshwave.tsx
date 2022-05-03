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

export default function FreshwaveMapPage({ location }) {
  const classes = useStyles()

  const [sites, setSites] = useState<null | IFreshwaveSitePoint[]>(null)

  useEffect(() => {
    // Already loaded
    if (sites !== null) return

    async function loadData() {
      const data = (await import('@data/maps/freshwaveSites.json')).default

      const mapped: IFreshwaveSitePoint[] = (data as [number, number, number, string, number, string, string][]).map(
        ([locationId, lat, lng, name, _, desc1, desc2]) => ({
          locationId,
          lat,
          lng,
          name,
          desc: desc1 + ' ' + desc2,
        }),
      )

      setSites(mapped)
    }

    loadData()
  })

  return (
    <Layout location={location} title="Freshwave sites map">
      <Hero firstElement size="huge" color={Colors.primaryRed}>
        <h1 className="text-shout">Freshwave sites map</h1>
        <p role="doc-subtitle" className="text-loud">
          See all registered site locations with Freshwave. This does not correspond to active sites, just possible&nbsp;locations.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Maps', url: '/maps' },
          { t: 'Freshwave sites map', url: '/maps/freshwave' },
        ]}
      />

      <Section>
        <h2 className="text-loud">About</h2>
        <p className="text-speak">
          This map details the locations of all Freshwave-registered sites where operators can choose to deploy sites. It's very likely that most
          of these locations have no mobile networking equipment present at all as no operator has chosen to rent access through Freshwave yet.
        </p>
      </Section>

      <Section width="full" className={classes.mapSection}>
        <NoSsr>
          <FreshwaveMap sites={sites} />
        </NoSsr>
      </Section>
    </Layout>
  )
}
