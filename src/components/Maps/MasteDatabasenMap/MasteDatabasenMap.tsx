import React, { useCallback, useState } from 'react'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import { getGeolocationPermissionStatus, useUserLocation } from '@hooks/useUserLocation'
import useForceRender from '@hooks/useForceRerender'
import { useErrorBoundary } from 'react-use-error-boundary'

import { MapContainer, ScaleControl, useMap, useMapEvent } from 'react-leaflet'
import { Fab, makeStyles, Zoom } from '@material-ui/core'
import { RecoilRoot } from 'recoil'

import clsx from 'clsx'
import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import 'leaflet/dist/leaflet.css'
import './MasteDatabasenMap.less'

import { GeolocationMarker } from './GeolocationMarker'
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
          '--map-height': '60vh',
          height: 'var(--map-height)',
        } as any
      }
      center={[56.2411002, 10.5452023]}
      zoom={7}
      attributionControl={false}
      preferCanvas
    >
      <GeolocationMarker />
      <CustomControlButtons />

      <BaseMapSetup />
      <ScaleControl imperial metric />

      <SiteMarkers />
    </MapContainer>
  )
}

const useStyles = makeStyles({
  customButtonsContainer: {
    position: 'absolute',
    zIndex: 10e2,
    bottom: 32,
    right: 12,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16,
  },
  customButton: {
    height: 52,
    width: 52,

    '& svg': {
      display: 'block',
      margin: 'auto',
    },

    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  geolocationButton: {
    '&[data-located=true]': {
      background: '#4285f4',
      color: '#fff',
    },
  },
})

function CustomControlButtons() {
  const L = window.L as typeof import('leaflet')

  const forceRerender = useForceRender()
  const classes = useStyles()
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
      <div className={classes.customButtonsContainer}>
        <Fab
          color={isMapLocationCentred ? 'primary' : 'default'}
          className={clsx(classes.customButton, classes.geolocationButton)}
          aria-label="Pan map to current location"
          onClick={useCallback(async () => {
            if (!location) {
              if ((await getGeolocationPermissionStatus()) === 'denied') {
                alert(`You have denied access to your location. Please enable it in your browser settings.`)
              }

              return
            }

            map.flyTo(location, 17)
          }, [location, getGeolocationPermissionStatus])}
          data-located={isMapLocationCentred}
        >
          <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z"
            />
          </svg>
        </Fab>
      </div>
    </>
  )
}
