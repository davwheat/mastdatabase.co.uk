import type { LeafletEventHandlerFn, MarkerClusterGroupOptions } from 'leaflet'
import { useMap } from 'react-leaflet'
import { createPathComponent } from '@react-leaflet/core'

const MarkerClusterGroup = createPathComponent(({ children: _c, ...props }: MarkerClusterGroupOptions & { children: React.ReactNode }, ctx) => {
  const map = useMap()

  const clusterProps = {}
  const clusterEvents = {}

  // Splitting props and events to different objects
  Object.entries(props).forEach(([propName, prop]) =>
    propName.startsWith('on') ? (clusterEvents[propName] = prop) : (clusterProps[propName] = prop),
  )

  // TS workaround
  const L = window.L as typeof import('leaflet')

  const cluster = L.markerClusterGroup(clusterProps)

  // Initializing event listeners
  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`
    cluster.on(clusterEvent, callback as LeafletEventHandlerFn)
  })

  return {
    instance: cluster,
    context: { ...ctx, layerContainer: cluster },
  }
})

export default MarkerClusterGroup
