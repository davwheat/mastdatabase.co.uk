import React, { useCallback } from 'react'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import { useUserLocation } from '@hooks/useUserLocation'
import useForceRender from '@hooks/useForceRerender'
import { useErrorBoundary } from 'react-use-error-boundary'

import { MapContainer, ScaleControl, useMap, useMapEvent } from 'react-leaflet'

import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import 'leaflet/dist/leaflet.css'
import './UkSitesMap.less'

import { GeolocationMarker } from '@leaflet/GeolocationMarker'
import GeolocationButton from '@leaflet/GeolocationButton'

import { BaseMapSetup } from './BaseMapSetup'
import { SitesMarkers } from './SitesMarkers'
import ButtonLink from '@components/Links/ButtonLink'
import Section from '@components/Design/Section'
import { MapStatusMessages } from './MapStatusMessages'
import MapCustomButtonsContainer from '@leaflet/MapCustomButtonsContainer'

export interface ISiteDataPoint {
  id: number
  uarn: string
  'property identifier': string | null
  'business name': string | null
  number: string | null
  street: string | null
  town: string | null
  county: string | null
  postcode: string | null
  'rateable value': string | null
  'current from date': string | null
  'current to date': string | null
  lat: string | null
  lng: string | null
}

export default function UkSitesMap() {
  useFixLeafletAssets()

  const [error] = useErrorBoundary()

  if (error) {
    console.error(error)

    return (
      <Section darker>
        <p className="text-speak-up">Uh oh! We ran into an error while trying to display the sites map.</p>
        <p className="text-speak">
          We hope this was a one-time issue, and that <ButtonLink onClick={() => window.location.reload()}>reloading the page</ButtonLink> should
          fix this.
        </p>
      </Section>
    )
  }

  return (
    <MapContainer
      style={
        {
          '--map-height': '70vh',
          height: 'var(--map-height)',
        } as any
      }
      center={[51.505, -0.09]}
      zoom={13}
      attributionControl={false}
    >
      <GeolocationMarker />
      <CustomControlButtons />

      <BaseMapSetup />
      <ScaleControl imperial metric />

      <SitesMarkers />

      <MapStatusMessages />
    </MapContainer>
  )
}

function CustomControlButtons() {
  const L = window.L as typeof import('leaflet')

  const forceRerender = useForceRender()
  const map = useMap()
  const geolocation = useUserLocation()

  const location: [number, number] | null = geolocation ? [geolocation.latitude, geolocation.longitude] : null
  const isMapLocationCentred = location ? map.getCenter().equals(location, 0.00001) : false

  useMapEvent(
    'move',
    useCallback(() => {
      if (!location) return

      const nowCentred = map.getCenter().equals(location, 0.00001)

      if (nowCentred !== isMapLocationCentred) forceRerender()
    }, [location?.[0], location?.[1], map, forceRerender, isMapLocationCentred]),
  )

  useMapEvent('enterFullscreen', forceRerender)
  useMapEvent('exitFullscreen', forceRerender)

  return (
    <>
      <MapCustomButtonsContainer>
        <GeolocationButton />
      </MapCustomButtonsContainer>
    </>
  )
}
