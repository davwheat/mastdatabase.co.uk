import { useEffect, useState } from 'react'

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
}

/**
 * Checks the status of the geolocation permission asynchronously.
 *
 * Returns the permission status: `'denied'`, `'granted'`, or `'prompt'`.
 *
 * Includes a fallback for browsers which do not support the Web Permissions API.
 */
export async function getGeolocationPermissionStatus(): Promise<'denied' | 'granted' | 'prompt'> {
  if ('permissions' in navigator) {
    return (await navigator.permissions.query({ name: 'geolocation' })).state
  }

  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      // successfully got location
      () => resolve('granted'),
      error => {
        // permission denied
        if (error.code == error.PERMISSION_DENIED) resolve('denied')

        // some other error, but not one which is related to a denied permission
        resolve('granted')
      },
      {
        maximumAge: Infinity,
        timeout: 0,
      },
    )
  })
}

/**
 * Returns the user's geolocation, if available.
 *
 * Automatically updates as the user moves around using the Geolocation API's `watchPosition` feature.
 */
export function useUserLocation(options?: PositionOptions): GeolocationCoordinates | null {
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates | null>(null)

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      position => {
        const { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed } = position.coords
        const newPos = { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed }

        // Prevent unneeded re-renders
        if (JSON.stringify(geolocation) === JSON.stringify(newPos)) return

        setGeolocation(() => {
          return position ? { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed } : null
        })
      },
      () => {},
      options ?? defaultOptions,
    )

    return () => {
      navigator.geolocation.clearWatch(id)
    }
  }, [geolocation, options])

  return geolocation
}
