import { useEffect, useState } from 'react'

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
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
  })

  return geolocation
}
