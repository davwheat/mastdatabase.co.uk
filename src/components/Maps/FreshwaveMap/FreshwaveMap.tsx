import React, { useEffect } from 'react'

import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import MarkerClusterGroup from '@components/MarkerClusterGroup'

import 'leaflet/dist/leaflet.css'

import 'leaflet.fullscreen2'
import 'leaflet.fullscreen2/leaflet.fullscreen2.css'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'

export interface IFreshwaveSitePoint {
  locationId: number
  lat: number
  lng: number
  name: string
  desc: string
}

export interface IFreshwaveMapProps {
  sites: React.ReactNode
}

export default function FreshwaveMap({ sites }: IFreshwaveMapProps) {
  useFixLeafletAssets()

  return (
    <MapContainer
      style={{
        height: '60vh',
      }}
      center={[51.692, 5.155]}
      zoom={5}
      minZoom={3}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={(zoom: number): number => {
          if (zoom < 14) return 50
          if (zoom < 10) return 70
          return 90
        }}
      >
        {sites}
      </MarkerClusterGroup>

      <MapComponents />
    </MapContainer>
  )
}

function MapComponents() {
  const L = window.L as typeof import('leaflet')

  const map = useMap()

  useEffect(() => {
    if (!map.fullScreenControl) {
      L.fullScreen({
        position: 'topleft',
        title: 'Enter fullscreen mode',
        titleCancel: 'Exit fullscreen mode',
        forceSeparateButton: true,
      }).addTo(map)
    }
  })

  return null
}
