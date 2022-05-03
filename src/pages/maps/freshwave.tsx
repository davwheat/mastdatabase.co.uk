import React, { useEffect, useState } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'

import Colors from '@data/colors.json'

import { makeStyles, NoSsr } from '@material-ui/core'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

// @ts-expect-error
delete L.Icon.Default.prototype._getIconUrl

// @ts-expect-error
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
})

import type { LeafletEventHandlerFn, MarkerClusterGroupOptions } from 'leaflet'

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

interface IFreshwaveSitePoint {
  locationId: number
  lat: number
  lng: number
  name: string
  desc: string
}

export default function FreshwaveMap({ location }) {
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
          <MapContainer
            style={{
              height: '60vh',
            }}
            center={[51.692, 5.155]}
            zoom={5}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <MarkerClusterGroup>
              {sites
                ? sites.map(({ locationId, lat, lng, name, desc }) => {
                    return (
                      <Marker key={locationId} position={[lat, lng]}>
                        <Popup>
                          <dl>
                            <dt>Location ID</dt>
                            <dd>{locationId}</dd>
                            <dt>Name</dt>
                            <dd>{name}</dd>
                            {desc.trim() !== '' && (
                              <>
                                <dt>Description</dt>
                                <dd>{desc}</dd>
                              </>
                            )}
                          </dl>
                        </Popup>
                      </Marker>
                    )
                  })
                : undefined}
            </MarkerClusterGroup>
          </MapContainer>
        </NoSsr>
      </Section>
    </Layout>
  )
}

import { createPathComponent } from '@react-leaflet/core'

const MarkerClusterGroup = createPathComponent(({ children: _c, ...props }: MarkerClusterGroupOptions & { children: React.ReactNode }, ctx) => {
  const map = useMap()

  const clusterProps = {}
  const clusterEvents = {}

  // Splitting props and events to different objects
  Object.entries(props).forEach(([propName, prop]) =>
    propName.startsWith('on') ? (clusterEvents[propName] = prop) : (clusterProps[propName] = prop),
  )

  // TS workaround
  const L = window.L as typeof import('leaflet')

  const cluster = L.markerClusterGroup(clusterProps)

  // Initializing event listeners
  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`
    cluster.on(clusterEvent, callback as LeafletEventHandlerFn)
  })

  return {
    instance: cluster,
    context: { ...ctx, layerContainer: cluster },
  }
})
