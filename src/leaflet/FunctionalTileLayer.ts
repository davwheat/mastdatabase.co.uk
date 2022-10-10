import React, { useEffect } from 'react'

import { useMap } from 'react-leaflet'

interface IViewData {
  bbox: L.BoundsExpression
  width: number
  height: number
  zoom: number
  tile: {
    row: number
    column: number
  }
  subdomain: string
}

interface IFunctionalTileLayerProps extends L.TileLayerOptions {
  tileFunction: (view: IViewData) => string
  getAttribution?: () => string | null
}

const FunctionalTileLayer = React.forwardRef<L.TileLayer, IFunctionalTileLayerProps>(({ tileFunction, getAttribution, ...props }, ref) => {
  const L = window.L as typeof import('leaflet')
  const map = useMap()

  const layer = L.TileLayer.extend({
    initialize: function (options) {
      L.TileLayer.prototype.initialize.call(this, null, options)
    },

    getTileUrl(tilePoint: L.Coords) {
      const map = this._map
      const crs = map.options.crs
      const tileSize = this.options.tileSize
      const zoom = tilePoint.z
      const nwPoint = tilePoint.multiplyBy(tileSize)
      const sePoint = nwPoint.add(new L.Point(tileSize, tileSize))
      const nw = crs.project(map.unproject(nwPoint, zoom))
      const se = crs.project(map.unproject(sePoint, zoom))
      const bbox = [nw.x, se.y, se.x, nw.y].join(',')

      // Setup object to send to tile function.
      const view = {
        bbox: bbox,
        width: tileSize,
        height: tileSize,
        zoom: zoom,
        tile: {
          row: this.options.tms ? this._tileNumBounds.max.y - tilePoint.y : tilePoint.y,
          column: tilePoint.x,
        },
        subdomain: this._getSubdomain(tilePoint),
      }

      return tileFunction(view)
    },

    getAttribution,

    // _loadTile: function (tile, tilePoint) {
    //   tile._layer = this
    //   tile.onload = this._tileOnLoad
    //   tile.onerror = this._tileOnError

    //   this._adjustTilePoint(tilePoint)
    //   var tileUrl = this.getTileUrl(tilePoint)

    //   if (typeof tileUrl === 'string') {
    //     tile.src = tileUrl
    //     this.fire('tileloadstart', {
    //       tile: tile,
    //       url: tile.src,
    //     })
    //   } else if (typeof tileUrl.then === 'function') {
    //     // Assume we are dealing with a promise.
    //     var self = this
    //     tileUrl.then(function (tileUrl) {
    //       tile.src = tileUrl
    //       self.fire('tileloadstart', {
    //         tile: tile,
    //         url: tile.src,
    //       })
    //     })
    //   }
    // },
  })

  const functionalTileLayer = React.useRef<any>(new layer(props))

  React.useImperativeHandle(ref, () => functionalTileLayer.current)

  useEffect(() => {
    functionalTileLayer.current.addTo(map)

    return function removeLayer() {
      functionalTileLayer.current.removeFrom(map)
    }
  }, [map, functionalTileLayer.current])

  return null
})

export default FunctionalTileLayer
