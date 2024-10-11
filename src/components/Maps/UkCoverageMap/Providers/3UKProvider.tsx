import React from 'react'
import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'

import ThreeLogo from '@assets/icons/brands/three.inline.svg'

export default class ThreeUkCoverageMapProvider extends CoverageProvider<true> {
  providerName: string = 'Three UK'
  defaultLayerIndex: number = this.getLayers().findIndex(layer => layer.label === '4G VoLTE')
  supportsSites: boolean = false

  readonly supportsVersionHistory = true
  readonly maxZoom = 14

  readonly providerIcon = (<ThreeLogo />)

  protected readonly allVersions = {
    '2022-11-15': '15 Nov 2022',
    '2023-01-26': '26 Jan 2023',
    '2023-03-24': '24 Mar 2023',
    '2023-05-12': '12 May 2023',
    '2023-07-12': '12 July 2023',
    '2023-08-18': '18 August 2023',
    '2024-01-09': '9 January 2024',
    // '2024-02-08': '8 February 2024', // No changes on this map version... waste of bandwidth
    '2024-02-16': '16 February 2024',
    '2024-03-26': '26 March 2024',
    '2024-04-26': '26 April 2024',
    '2024-04-30': '30 April 2024',
    '2024-05-15': '15 May 2024',
    '2024-07-11': '11 July 2024',
    '2024-09-27': '27 September 2024',
    '2024-10-05': '5 October 2024',
  }

  protected _version: string = '2024-10-05'

  protected getTileUrl(layer: string, version: string = this._version): string {
    return `https://234-20.coveragetiles.com/${version}/${layer}/{z}/{x}/{y}.png`
  }

  protected getTileLayerEntry(label: string, layer: string): ICoverageLayer {
    return {
      label,
      url: this.getTileUrl(layer),
    }
  }

  protected _getLayerKeys(version: string): ICoverageLayerKey[] {
    return [
      {
        key: [
          { color: '#dc350e', label: 'Good outdoors and indoors' },
          { color: '#db350e96', label: 'Good outdoors' },
        ],
      },
      ...(version < '2024-01-01'
        ? [
            {
              key: [
                { color: '#dc350e', label: 'Good outdoors and indoors' },
                { color: '#db350e96', label: 'Good outdoors' },
              ],
            },
          ]
        : []),
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
    return ['Since 2024, Three have removed their 4G non-VoLTE coverage layer. This layer will only be accessible on map versions before 2024.']
  }

  protected _getLayers(version: string): ICoverageLayer[] {
    // No VoLTE layer since this version
    if (version >= '2024-01-09') {
      return [this.getTileLayerEntry('3G', '3g'), this.getTileLayerEntry('4G VoLTE', '4g'), this.getTileLayerEntry('5G', '5g')]
    }

    return [
      this.getTileLayerEntry('3G', '3g'),
      this.getTileLayerEntry('4G', '4g'),
      this.getTileLayerEntry('4G VoLTE', '4g_volte'),
      this.getTileLayerEntry('5G', '5g'),
    ]
  }
}
