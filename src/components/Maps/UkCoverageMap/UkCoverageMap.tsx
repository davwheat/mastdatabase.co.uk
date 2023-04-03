import React, { useEffect } from 'react'

import { AttributionControl, MapContainer, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import SitesLayer from './SitesLayer'
import { GeolocationMarker } from '@leaflet/GeolocationMarker'
import GeolocationButton from '@leaflet/GeolocationButton'
import MapCustomButtonsContainer from '@leaflet/MapCustomButtonsContainer'
import { NoSsr } from '@material-ui/core'

import type CoverageProvider from './Providers/CoverageProvider'
import type { Map } from 'leaflet'

export interface IUkCoverageMapProps {
  provider: CoverageProvider<boolean>
  selectedLayerId: number
  showAttribution?: boolean
  showFullscreenButton?: boolean
  showGeolocation?: boolean
  showZoomControl?: boolean
  children?: React.ReactNode
}

export default React.forwardRef<Map, IUkCoverageMapProps>(function UkCoverageMap(
  {
    provider,
    selectedLayerId,
    showAttribution = true,
    showFullscreenButton = true,
    showGeolocation = true,
    showZoomControl = true,
    children,
  }: IUkCoverageMapProps,
  ref: React.Ref<Map>,
) {
  useFixLeafletAssets()

  const layer = provider.getLayers()?.[selectedLayerId]

  return (
    <MapContainer
      style={{
        height: '70vh',
      }}
      center={[50.82, -0.136]}
      zoom={13}
      minZoom={1}
      attributionControl={false}
      zoomControl={showZoomControl}
      ref={ref}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={showAttribution ? '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' : undefined}
        zIndex={0}
        maxNativeZoom={19}
      />

      <NoSsr>
        {layer && 'url' in layer && (
          <TileLayer
            className="coverage-tiles"
            key={layer.url}
            opacity={0.5}
            url={layer.url}
            attribution={provider.attributionTemplate(layer.label)}
            maxNativeZoom={provider.maxZoom}
          />
        )}

        {layer && 'layers' in layer && <React.Fragment key={selectedLayerId}>{layer.layers}</React.Fragment>}

        {provider.supportsSites && <SitesLayer provider={provider} />}
      </NoSsr>

      <MapComponents showFullscreenButton={showFullscreenButton} />

      {showAttribution && <AttributionControl position="bottomright" prefix={undefined} />}

      {showGeolocation && <GeolocationMarker />}

      <MapCustomButtonsContainer>{showGeolocation && <GeolocationButton />}</MapCustomButtonsContainer>

      {children}
    </MapContainer>
  )
})

function MapComponents({ showFullscreenButton = true }: { showFullscreenButton?: boolean }) {
  const L = window.L as typeof import('leaflet')

  const map = useMap()

  useEffect(() => {
    if (!map.fullScreenControl && showFullscreenButton) {
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
