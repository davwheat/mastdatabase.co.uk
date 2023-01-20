import React, { useEffect } from 'react'

import { AttributionControl, TileLayer, useMap } from 'react-leaflet'

export function BaseMapSetup() {
  const L = window.L as typeof import('leaflet')

  const map = useMap()

  // Attribute to one.network
  useEffect(() => {
    map.attributionControl?.addAttribution(
      `Data © Valuation Office Agency (https://www.tax.service.gov.uk/business-rates-find/terms-and-conditions). Positional data and map tiles © OpenStreetMap contributors (https://www.openstreetmap.org/copyright).`,
    )
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
