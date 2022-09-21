import React, { useCallback, useState } from 'react'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import { getGeolocationPermissionStatus, useUserLocation } from '@hooks/useUserLocation'
import useForceRender from '@hooks/useForceRerender'
import { useErrorBoundary } from 'react-use-error-boundary'

import { MapContainer, ScaleControl, useMap, useMapEvent } from 'react-leaflet'
import { Fab, makeStyles, Zoom } from '@material-ui/core'

import clsx from 'clsx'
import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import 'leaflet/dist/leaflet.css'
import './StreetworksMap.less'

import { GeolocationMarker } from './GeolocationMarker'
import { PromoterSettingsDialog } from './PromoterSettingsDialog'
import { BaseMapSetup } from './BaseMapSetup'
import { StreetworksMarkers } from './StreetworksMarkers'
import ButtonLink from '@components/Links/ButtonLink'
import Section from '@components/Design/Section'
import { MapStatusMessages } from './MapStatusMessages'

export interface IStreetworksSitePoint {
  locationId: number
  lat: number
  lng: number
  name: string
  desc: string
}

export interface IStreetworksMapProps {
  sites: React.ReactNode
}

export default function StreetworksMap() {
  useFixLeafletAssets()

  const [error] = useErrorBoundary()

  if (error) {
    console.error(error)

    return (
      <Section darker>
        <p className="text-speak-up">Uh oh! We ran into an error while trying to display the streetworks map.</p>
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
      center={[51.505, -0.09]}
      zoom={13}
      attributionControl={false}
    >
      <GeolocationMarker />
      <CustomControlButtons />

      <BaseMapSetup />
      <ScaleControl imperial metric />

      <StreetworksMarkers />

      <MapStatusMessages />
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

  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)

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
        <Zoom in={!map.isFullscreen}>
          <Fab
            className={clsx(classes.customButton)}
            aria-label="Map settings"
            onClick={() => {
              setSettingsDialogOpen(true)
            }}
            data-located={isMapLocationCentred}
          >
            <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
              />
            </svg>
          </Fab>
        </Zoom>

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

            map.flyTo(location, 14)
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

      <PromoterSettingsDialog open={settingsDialogOpen} onClose={() => setSettingsDialogOpen(false)} />
    </>
  )
}
