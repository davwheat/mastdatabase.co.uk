import React from 'react'
import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'

import dayjs from 'dayjs'
import { TileLayer } from 'react-leaflet'

export default class ThreeUkCoverageMapProvider extends CoverageProvider<true> {
  providerName: string = 'Three UK'
  defaultLayerId: number = 2
  supportsSites: boolean = false
  readonly supportsVersionHistory = true

  protected readonly allVersions = { '2022-11-15': '15 Nov 2022', '2023-01-26': '26 Jan 2023' }

  protected version: string = '2023-01-26'

  private readonly zoomLevels: Record<number, [number, number]> = {
    14: [12, Infinity],
    12: [9, 11.999],
    9: [7, 8.999],
  }

  protected getTileUrl(layer: string, version: string = this.version): string {
    return `https://234-20.coveragetiles.com/${version}/${layer}/{z}/{x}/{y}.png`
  }

  protected getTileLayerEntry(label: string, layer: string): ICoverageLayer {
    return {
      label,
      layers: (
        <>
          {Object.entries(this.zoomLevels).map(([nativeZoom, [minZoom, maxZoom]]) => (
            <TileLayer
              className="coverage-tiles"
              minNativeZoom={parseInt(nativeZoom)}
              maxNativeZoom={parseInt(nativeZoom)}
              minZoom={minZoom}
              maxZoom={maxZoom}
              key={this.getTileUrl(layer) + `__${nativeZoom}-${minZoom}-${maxZoom}`}
              opacity={0.5}
              url={this.getTileUrl(layer)}
              attribution={this.attributionTemplate(label)}
            />
          ))}
        </>
      ),
    }
  }

  getLayerKeys(): ICoverageLayerKey[] {
    return [
      {
        key: [
          { color: '#dc350e', label: 'Good outdoors and indoors' },
          { color: '#db350e96', label: 'Good outdoors' },
        ],
      },
      {
        key: [
          { color: '#dc350e', label: 'Good outdoors and indoors' },
          { color: '#db350e96', label: 'Good outdoors' },
        ],
      },
      {
        key: [
          { color: '#dc350e', label: 'Good outdoors and indoors' },
          { color: '#db350e96', label: 'Good outdoors' },
        ],
      },
      {
        key: [
          { color: '#dc350e', label: 'Good outdoors and indoors' },
          { color: '#db350e96', label: 'Good outdoors' },
        ],
      },
    ]
  }

  getPageMessages(): string[] {
    return []
  }

  getLayers(): ICoverageLayer[] {
    return [
      this.getTileLayerEntry('3G', '3g'),
      this.getTileLayerEntry('4G', '4g'),
      this.getTileLayerEntry('4G VoLTE', '4g_volte'),
      this.getTileLayerEntry('5G', '5g'),
    ]
  }
}
