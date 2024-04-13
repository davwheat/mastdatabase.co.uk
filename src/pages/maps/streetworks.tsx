import React, { useState } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import StreetworksMap from '@components/Maps/StreetworksMap/StreetworksMap'
import PostcodeSearch from '@components/Maps/PostcodeSearch'
import LoadingSpinner from '@components/LoadingSpinner'
// import { StreetworksMapSettings } from '@components/Maps/StreetworksMap/StreetworksMapSettings'

import Colors from '@data/colors.json'

import { makeStyles, NoSsr } from '@material-ui/core'
import { ErrorBoundaryContext } from 'react-use-error-boundary'

import type { PageProps } from 'gatsby'
import type { Map } from 'leaflet'
import TextBox from '@components/Inputs/TextBox'

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

export default function StreetworksMapPage({ location }: PageProps) {
  const classes = useStyles()
  const [map, setMap] = useState<Map | null>(null)

  return (
    <Layout
      location={location}
      title="UK telecoms streetworks map"
      description="See active and future telecoms streetworks across the United Kingdom."
    >
      <ErrorBoundaryContext>
        <Hero firstElement size="large" color={Colors.primaryRed}>
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
          <h2 className="text-loud">What are streetworks?</h2>
          <p className="text-speak">
            Streetworks are the name for any form of construction works taking place on or near a carriageway or footway. When these works take
            place, companies must apply to the local authority responsible for the road for permission to conduct their works.
          </p>
          <p className="text-speak">
            Obtaining this permission ensures that correct traffic management systems are in place, such as temporary traffic lights, lane
            closures or diversions, as well as ensuring that multiple planned works don't interfere with each other, or potential large-scale
            events.
          </p>

          <h2 className="text-loud">Our map</h2>
          <p className="text-speak">
            We've put together a wonderful map that will show you all telecommunication-related works taking place across Great Britain. Our data
            comes from the same place as BIDB.uk (the Better Internet Dashboard), so you know you can trust it.
          </p>
          <p className="text-speak">
            On our site, most companies (known as streetworks promoters) have their own custom code (up to 4 letters), as well as an appropriate
            brand colour to match. If you spot one we haven't got, let us know on Twitter.
          </p>
          <p className="text-speak">
            You can tap a map bubble to show detailed information about the works. Where possible, we try to provide descriptions of the work
            being done, but not all local authorities release this data to the public, unfortunately. You can also filter which promoters to show
            on the map from the settings dialog with the cog in the bottom-right of the&nbsp;map.
          </p>
        </Section>

        <PostcodeSearch map={map} />

        <Section width="full" className={classes.mapSection}>
          <StreetworksMap ref={m => setMap(m)} />
        </Section>
      </ErrorBoundaryContext>
    </Layout>
  )
}
