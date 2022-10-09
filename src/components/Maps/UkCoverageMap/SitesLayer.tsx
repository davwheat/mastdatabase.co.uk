import useForceRender from '@hooks/useForceRerender'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet'

import type { default as CoverageProvider, ISiteItem } from './CoverageProvider'

interface ISitesLayerProps {
  provider: CoverageProvider
}

export default function SitesLayer({ provider }: ISitesLayerProps) {
  const markerData = useRef<Record<string, ISiteItem>>({})
  const loadSitesTimeoutKey = useRef<number | null>(null)
  const map = useMap()
  const render = useForceRender()

  const loadMarkers = useCallback(() => {
    if (loadSitesTimeoutKey.current) window.clearTimeout(loadSitesTimeoutKey.current)

    loadSitesTimeoutKey.current = window.setTimeout(() => {
      loadSitesTimeoutKey.current = null

      const pos = map.getCenter()

      provider.getSites(pos.lat, pos.lng, map.getBounds()).then(sites => {
        sites.forEach(s => {
          markerData.current[s.id] = s
        })

        render()
      })
    }, 1000)
  }, [provider, map])

  useEffect(() => loadMarkers(), [loadMarkers])

  useMapEvent('move', loadMarkers)

  return (
    <>
      {Object.values(markerData.current).map(site => (
        <Marker key={site.id} position={[site.lat, site.long]}>
          <Popup>
            <strong>Site ID:</strong> {site.id}
          </Popup>
        </Marker>
      ))}
    </>
  )
}
