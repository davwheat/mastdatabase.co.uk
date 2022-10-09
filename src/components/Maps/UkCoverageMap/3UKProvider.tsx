import React from 'react'

import FunctionalTileLayer from '@leaflet/FunctionalTileLayer'
import CoverageProvider, { ICoverageLayer } from './CoverageProvider'

export default class ThreeUkCoverageMapProvider extends CoverageProvider {
  providerName: string = 'Three UK'
  defaultLayerId: number = 0
  supportsSites: boolean = false

  private makeFunctionalTileUrl(
    [x1, x2, i1, i2]: [number, number, number, number],
    layerName: string,
    minZoom: undefined | number,
    tileZoomLevel: number,
    maxZoom?: number,
  ) {
    return (
      <FunctionalTileLayer
        key={`${layerName}_${tileZoomLevel}`}
        maxNativeZoom={tileZoomLevel}
        maxZoom={maxZoom}
        minZoom={minZoom}
        opacity={0.5}
        // tileSize={256}
        tileFunction={view => {
          let { column: x, row: y } = view.tile

          const i = (1 << tileZoomLevel) - y - 1

          const path: string = x >= x1 && x <= x2 && i >= i1 && i <= i2 ? `${layerName}/${tileZoomLevel}/${x}/${i}.png` : 'transparentTile.gif'

          return 'https://www.three.co.uk/static/images/functional_apps/coverage/' + path
        }}
        // zIndex={100}
      />
    )
  }

  getLayers(): ICoverageLayer[] {
    return [
      {
        label: '3G',
        layers: (
          <>
            {this.makeFunctionalTileUrl([7765, 8335, 10810, 11718], 'Fast', 14, 14)}
            {this.makeFunctionalTileUrl([1940, 2083, 2702, 2929], 'Fast', 12, 12, 13)}
            {this.makeFunctionalTileUrl([242, 260, 337, 366], 'Fast', undefined, 9, 11)}
          </>
        ),
      },
    ]
  }
}
