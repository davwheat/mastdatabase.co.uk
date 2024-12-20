import React, { useEffect } from 'react'

import { AttributionControl, TileLayer, useMap } from 'react-leaflet'

export function BaseMapSetup() {
  const L = window.L as typeof import('leaflet')

  const map = useMap()

  // Attribute to one.network
  useEffect(() => {
    map.attributionControl?.addAttribution(`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`)
    map.attributionControl?.addAttribution(`&copy; Data provided by <a href="https://bidb.uk/">bidb.uk</a>`)
  })

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

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
      <AttributionControl position="bottomright" prefix={undefined} />
    </>
  )
}
