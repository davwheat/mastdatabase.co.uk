import React from 'react'

import MarkerClusterGroup from '@components/MarkerClusterGroup'
import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

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
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup>{sites}</MarkerClusterGroup>
    </MapContainer>
  )
}
