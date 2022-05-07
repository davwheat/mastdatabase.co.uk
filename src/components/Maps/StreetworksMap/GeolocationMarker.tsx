import React from 'react'

import { Marker } from 'react-leaflet'
import { useUserLocation } from '@hooks/useUserLocation'

import type { LatLngExpression } from 'leaflet'

export function GeolocationMarker() {
  const L = window.L as typeof import('leaflet')

  const geolocation = useUserLocation()
  if (!geolocation) return null

  const location: LatLngExpression = [geolocation.latitude, geolocation.longitude]

  return (
    <Marker
      position={location}
      icon={L.icon({
        iconUrl: require('@assets/icons/geolocation.svg').default,
        iconSize: [18, 18],
      })}
    />
  )
}
