import React from 'react'

import FunctionalTileLayer from '@leaflet/FunctionalTileLayer'
import CoverageProvider, { ICoverageLayer } from './CoverageProvider'

export default class ThreeUkCoverageMapProvider extends CoverageProvider {
  providerName: string = 'Three UK'
  defaultLayerId: number = 2
  supportsSites: boolean = false

  private readonly bounds: Record<number, [number, number, number, number]> = {
    14: [7765, 8335, 10810, 11718],
    12: [1940, 2083, 2702, 2929],
    9: [242, 259, 337, 366],
  }

  private readonly zoomLevels: Record<number, [number, number, number]> = {
    14: [12, 14, Infinity],
    12: [9, 12, 11.999],
    9: [7, 9, 8.999],
  }

  private makeFunctionalTileUrl(nativeZoom: number, layerName: string) {
    const [minZoom, tileZoomLevel, maxZoom] = this.zoomLevels[nativeZoom]
    const [x1, x2, i1, i2] = this.bounds[nativeZoom]

    return (
      <FunctionalTileLayer
        key={`${layerName}_${tileZoomLevel}`}
        maxNativeZoom={tileZoomLevel}
        minNativeZoom={tileZoomLevel}
        maxZoom={maxZoom}
        minZoom={minZoom}
        opacity={0.5}
        tileSize={256}
        tileFunction={view => {
          let { column: x, row: y } = view.tile

          const i = (1 << tileZoomLevel) - y - 1

          if (x >= x1 && x <= x2 && i >= i1 && i <= i2) {
            // const qs = new URLSearchParams({
            //   layer: layerName,
            //   zoom: tileZoomLevel.toString(),
            //   x: x.toString(),
            //   i: i.toString(),
            // })

            // return `https://proxies.mastdatabase.co.uk/uk/three/coverage-map/tiles?${qs.toString()}`

            return `https://www.three.co.uk/static/images/functional_apps/coverage/${layerName}/${tileZoomLevel}/${x}/${i}.png`
          } else {
            // blank image
            return `data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==`
          }
        }}
      />
    )
  }

  getLayers(): ICoverageLayer[] {
    return [
      {
        label: '3G',
        layers: (
          <>
            {this.makeFunctionalTileUrl(14, 'Fast')}
            {this.makeFunctionalTileUrl(12, 'Fast')}
            {this.makeFunctionalTileUrl(9, 'Fast')}
          </>
        ),
      },
      {
        label: '4G',
        layers: (
          <>
            {this.makeFunctionalTileUrl(14, 'LTE')}
            {this.makeFunctionalTileUrl(12, 'LTE')}
            {this.makeFunctionalTileUrl(9, 'LTE')}
          </>
        ),
      },
      {
        label: '4G (incl. 800 MHz)',
        layers: (
          <>
            {this.makeFunctionalTileUrl(14, '800')}
            {this.makeFunctionalTileUrl(12, '800')}
            {this.makeFunctionalTileUrl(9, '800')}
          </>
        ),
      },
      {
        label: '5G',
        layers: (
          <>
            {this.makeFunctionalTileUrl(14, 'FiveG')}
            {this.makeFunctionalTileUrl(12, 'FiveG')}
            {this.makeFunctionalTileUrl(9, 'FiveG')}
          </>
        ),
      },
    ]
  }
}
