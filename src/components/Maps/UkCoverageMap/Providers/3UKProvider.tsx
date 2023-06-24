import React from 'react'
import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'

import ThreeLogo from '@assets/icons/brands/three.inline.svg'

export default class ThreeUkCoverageMapProvider extends CoverageProvider<true> {
  providerName: string = 'Three UK'
  defaultLayerId: number = this.getLayers().findIndex(layer => layer.label === '4G VoLTE')
  supportsSites: boolean = false
  readonly supportsVersionHistory = true
  readonly maxZoom = 14

  readonly providerIcon = (<ThreeLogo />)

  protected readonly allVersions = {
    '2022-11-15': '15 Nov 2022',
    '2023-01-26': '26 Jan 2023',
    '2023-03-24': '24 Mar 2023',
    '2023-05-12': '12 May 2023',
  }

  protected version: string = '2023-05-12'

  protected getTileUrl(layer: string, version: string = this.version): string {
    return `https://234-20.coveragetiles.com/${version}/${layer}/{z}/{x}/{y}.png`
  }

  protected getTileLayerEntry(label: string, layer: string): ICoverageLayer {
    return {
      label,
      url: this.getTileUrl(layer),
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
