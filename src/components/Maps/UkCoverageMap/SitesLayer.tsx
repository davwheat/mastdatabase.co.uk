import React, { useCallback, useEffect, useState } from 'react'
import { Marker, useMap, useMapEvent } from 'react-leaflet'

import type { default as CoverageProvider, ISiteItem } from './CoverageProvider'

interface ISitesLayerProps {
  provider: CoverageProvider
}

export default function SitesLayer({ provider }: ISitesLayerProps) {
  const [markerData, setMarkerData] = useState<ISiteItem[]>([])
  const map = useMap()

  const loadMarkers = useCallback(() => {
    const pos = map.getCenter()

    provider.getSites(pos.lat, pos.lng, map.getBounds()).then(setMarkerData)
  }, [provider, map])

  useEffect(() => loadMarkers(), [loadMarkers])

  useMapEvent('move', loadMarkers)

  return (
    <>
      {markerData.map(site => (
        <Marker key={site.id} position={[site.lat, site.long]} />
      ))}
    </>
  )
}
