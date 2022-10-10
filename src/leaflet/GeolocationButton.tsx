import React, { useCallback } from 'react'

import { getGeolocationPermissionStatus, useUserLocation } from '@hooks/useUserLocation'
import useForceRender from '@hooks/useForceRerender'

import { Fab, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { useMap, useMapEvent } from 'react-leaflet'
import MapCustomButton from './MapCustomButton'

const useStyles = makeStyles({
  geolocationButton: {
    '&[data-located=true]': {
      background: '#4285f4',
      color: '#fff',
    },
  },
})

export interface IGeolocationButtonProps {
  className?: string
}

export default function GeolocationButton({ className }: IGeolocationButtonProps) {
  const classes = useStyles()

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

  return (
    <MapCustomButton
      color={isMapLocationCentred ? 'primary' : 'default'}
      className={clsx(className, classes.geolocationButton)}
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
    </MapCustomButton>
  )
}
