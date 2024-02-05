import React, { useEffect } from 'react'

import { AttributionControl, MapContainer, TileLayer, useMap } from 'react-leaflet'
import MarkerClusterGroup from '@components/MarkerClusterGroup'

import 'leaflet/dist/leaflet.css'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import { Map } from 'leaflet'

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

export default React.forwardRef(FreshwaveMap)

function FreshwaveMap({ sites }: IFreshwaveMapProps, ref: React.Ref<Map>) {
  useFixLeafletAssets()

  return (
    <MapContainer
      style={{
        height: '70vh',
      }}
      center={[51.692, 5.155]}
      zoom={5}
      minZoom={3}
      attributionControl={false}
      ref={ref}
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

      <AttributionControl position="bottomright" prefix={undefined} />
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
