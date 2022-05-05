export default function fixLeafletAssets() {
  // @ts-expect-error
  delete L.Icon.Default.prototype._getIconUrl

  // @ts-expect-error
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
  })
}
