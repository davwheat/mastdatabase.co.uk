import useForceRender from '@hooks/useForceRerender'
import React, { useCallback, useEffect, useRef } from 'react'
import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet'

import type { default as CoverageProvider, ISiteItem } from './Providers/CoverageProvider'

interface ISitesLayerProps {
  provider: CoverageProvider<boolean>
}

const ZOOM_CUTOFF = 9

export default function SitesLayer({ provider }: ISitesLayerProps) {
  const markerData = useRef<Record<string, ISiteItem>>({})
  const loadSitesTimeoutKey = useRef<number | null>(null)
  const map = useMap()
  const render = useForceRender()

  const loadMarkers = useCallback(() => {
    if (loadSitesTimeoutKey.current) window.clearTimeout(loadSitesTimeoutKey.current)

    loadSitesTimeoutKey.current = window.setTimeout(() => {
      loadSitesTimeoutKey.current = null

      if (map.getZoom() <= ZOOM_CUTOFF) return

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
      {map.getZoom() > ZOOM_CUTOFF &&
        Object.values(markerData.current).map(site => (
          <Marker key={site.id} position={[site.lat, site.long]}>
            <Popup>
              <p className="text-whisper">
                <strong>Site ID:</strong> {site.id}
              </p>
            </Popup>
          </Marker>
        ))}
    </>
  )
}
