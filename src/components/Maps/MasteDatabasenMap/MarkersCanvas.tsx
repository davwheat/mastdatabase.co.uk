import React from 'react'

import { useMap } from 'react-leaflet'

import './leaflet-markers-canvas'

const MarkersCanvas = React.forwardRef((props, ref) => {
  const L = window.L as typeof import('leaflet')
  const map = useMap()

  const markersCanvas = React.useRef<any>(new (L as any).MarkersCanvas())

  markersCanvas.current.addTo(map)

  React.useImperativeHandle(ref, () => markersCanvas.current)

  return null
})

export default MarkersCanvas
