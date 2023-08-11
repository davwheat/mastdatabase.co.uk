import React from 'react'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import { useErrorBoundary } from 'react-use-error-boundary'

import { MapContainer, ScaleControl } from 'react-leaflet'

import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import 'leaflet/dist/leaflet.css'
import './MasteDatabasenMap.less'

import { GeolocationMarker } from '@leaflet/GeolocationMarker'
import GeolocationButton from '@leaflet/GeolocationButton'

import { BaseMapSetup } from './BaseMapSetup'
import { SiteMarkers } from './SiteMarkers'
import ButtonLink from '@components/Links/ButtonLink'
import Section from '@components/Design/Section'

export interface IStreetworksSitePoint {
  locationId: number
  lat: number
  lng: number
  name: string
  desc: string
}

export default function MasteDatabasenMap() {
  useFixLeafletAssets()

  const [error] = useErrorBoundary()

  if (error) {
    return (
      <Section darker>
        <p className="text-speak-up">Uh oh! We ran into an error while trying to display the Maste Databasen map.</p>
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
      center={[56.2411002, 10.5452023]}
      zoom={7}
      attributionControl={false}
      preferCanvas
    >
      <GeolocationMarker />
      <GeolocationButton />

      <BaseMapSetup />
      <ScaleControl imperial metric />

      <SiteMarkers />
    </MapContainer>
  )
}
