import React, { useEffect } from 'react'

import { AttributionControl, MapContainer, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'

import type CoverageProvider from './CoverageProvider'
import SitesLayer from './SitesLayer'

export interface IUkCoverageMapProps {
  provider: CoverageProvider
  selectedLayerId: number
}

export default function UkCoverageMap({ provider, selectedLayerId }: IUkCoverageMapProps) {
  useFixLeafletAssets()

  const layer = provider.getLayers()?.[selectedLayerId]

  console.log(layer)

  return (
    <MapContainer
      style={{
        height: '60vh',
      }}
      center={[51.692, 5.155]}
      zoom={5}
      minZoom={1}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        zIndex={0}
      />

      {layer && 'url' in layer && (
        <TileLayer key={layer.url} opacity={0.5} url={layer.url} attribution={provider.attributionTemplate(layer.label)} />
      )}

      {layer && 'layers' in layer && layer.layers}

      {provider.supportsSites && <SitesLayer provider={provider} />}

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
