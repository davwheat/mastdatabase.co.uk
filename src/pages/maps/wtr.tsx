import React, { useCallback, useRef } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import PostcodeSearch from '@components/Maps/PostcodeSearch'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import { ErrorBoundaryContext } from 'react-use-error-boundary'

import type { PageProps } from 'gatsby'
import type { Map as MapLibreMap } from 'maplibre-gl'
import WtrMap from '@components/Maps/UkWtrMap/UkWtrMap'

const useStyles = makeStyles({
  mapSection: {
    marginTop: '0 !important',
  },
})

export default function WtrMapPage({ location }: PageProps) {
  const classes = useStyles()
  const mapRef = useRef<MapLibreMap | null>(null)

  const handleLocation = useCallback((lat: number, lng: number) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 15 })
  }, [])

  return (
    <Layout location={location} title="UK wtr map" description="Visualise radio licences across the United Kingdom.">
      <ErrorBoundaryContext>
        <Hero firstElement size="large" color={Colors.primaryRed}>
          <h1 className="text-shout">UK WTR map</h1>
          <p role="doc-subtitle" className="text-loud">
            See radio licences and P2P links in the UK.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'Maps', url: '/maps' },
            { t: 'UK WTR map', url: '/maps/wtr' },
          ]}
        />

        <Section>
          <h2 className="text-loud">What is the Wireless Telegraphy Register?</h2>
          <p className="text-speak">
            The Wireless Telegraphy Register (WTR) is a public register maintained by Ofcom of all UK radio licences. It covers everything from
            mobile base stations and microwave links to satellite uplinks and amateur radio stations.
          </p>
          <p className="text-speak">
            Our map renders the full dataset; over 100,000 licence points and thousands of point-to-point fixed links.
          </p>
          <p className="text-speak" style={{ marginBottom: 24 }}>
            Zoom in past level 9 to see licence pins. Click any pin for full licence details. P2P microwave links are shown as orange lines. Use
            the filter button to narrow down by frequency.
          </p>
        </Section>

        <PostcodeSearch onLocation={handleLocation} />

        <Section width="full" className={classes.mapSection}>
          <WtrMap ref={mapRef} />
        </Section>
      </ErrorBoundaryContext>
    </Layout>
  )
}
