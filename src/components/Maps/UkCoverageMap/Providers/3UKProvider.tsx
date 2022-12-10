import React from 'react'
import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'

import dayjs from 'dayjs'
import { TileLayer } from 'react-leaflet'

export default class ThreeUkCoverageMapProvider extends CoverageProvider {
  providerName: string = 'Three UK'
  defaultLayerId: number = 2
  supportsSites: boolean = false

  protected readonly version: string = '2022-11-15'

  private readonly zoomLevels: Record<number, [number, number]> = {
    14: [12, Infinity],
    12: [9, 11.999],
    9: [7, 8.999],
  }

  protected getTileUrl(layer: string): string {
    return `https://234-20.coveragetiles.com/${this.version}/${layer}/{z}/{x}/{y}.png`
  }

  protected getTileLayerEntry(label: string, layer: string): ICoverageLayer {
    return {
      label,
      layers: (
        <>
          {Object.entries(this.zoomLevels).map(([nativeZoom, [minZoom, maxZoom]]) => (
            <TileLayer
              minNativeZoom={parseInt(nativeZoom)}
              maxNativeZoom={parseInt(nativeZoom)}
              minZoom={minZoom}
              maxZoom={maxZoom}
              key={this.getTileUrl(layer)}
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
    return [`Coverage tiles last updated ${dayjs(this.version).format('D MMMM YYYY')}.`]
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
