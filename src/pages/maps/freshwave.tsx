import React, { useEffect, useState } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import FreshwaveMap from '@components/Maps/FreshwaveMap'

import Colors from '@data/colors.json'

import { makeStyles, NoSsr } from '@material-ui/core'
import { Marker, Popup } from 'react-leaflet'

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

export default function FreshwaveMapPage({ location }: PageProps) {
  const classes = useStyles()

  const [sites, setSites] = useState<null | React.ReactNode>(null)

  useEffect(() => {
    // Already loaded
    if (sites !== null) return

    async function loadData() {
      const data = (await import('@data/maps/freshwaveSites.json')).default

      const mapped = (data as [number, number, number, string, number, string, string][]).map(
        ([locationId, lat, lng, name, _, desc1, desc2]) => {
          const desc = (desc1 + ' ' + desc2).trim()
          return (
            <Marker key={locationId} position={[lat, lng]}>
              <Popup>
                <dl>
                  <dt>Location ID</dt>
                  <dd>{locationId}</dd>
                  <dt>Name</dt>
                  <dd>{name}</dd>
                  {desc !== '' && (
                    <>
                      <dt>Description</dt>
                      <dd>{desc}</dd>
                    </>
                  )}
                </dl>
              </Popup>
            </Marker>
          )
        },
      )

      setSites(mapped)
    }

    loadData()
  })

  return (
    <Layout location={location} title="Freshwave sites map" description="See all Freshwave-registered sites across the UK and Europe.">
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
          of these locations have no mobile networking equipment present at all as no operator has chosen to rent access through
          Freshwave&nbsp;yet.
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
