import React from 'react'
import { TileLayer } from 'react-leaflet'
import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'
import EELogo from '@assets/icons/brands/ee.inline.svg'

import './EEProvider.css'

export default class EECoverageMapProvider extends CoverageProvider<true> {
  providerName: string = 'EE'
  defaultLayerIndex: number = this.getLayers().findIndex(layer => layer.label === '4G (all bands)')
  supportsSites: boolean = false
  readonly supportsVersionHistory = true
  readonly maxZoom = 14

  readonly providerIcon = (<EELogo />)

  protected allVersions = {
    '2023-05-12': '12 May 2023',
    '2023-07-25': '25 July 2023',
    '2023-09-30': '30 September 2023',
    '2023-11-28': '28 November 2023',
    '2024-01-09': '9 January 2024',
    '2024-01-16': '16 January 2024',
    '2024-01-23': '23 January 2024',
    '2024-01-31': '31 January 2024',
    '2024-02-06': '6 February 2024',
    '2024-02-13': '13 February 2024',
    '2024-02-20': '20 February 2024',
    '2024-03-24': '24 March 2024',
    '2024-04-26': '26 April 2024',
    '2024-07-11': '11 July 2024',
    '2024-07-23': '23 July 2024',
    '2024-09-25': '25 September 2024',
    '2024-12-16': '16 December 2024',
    '2025-03-12': '12 March 2025',
  }
  protected _version: string = '2025-03-12'

  _getLayers(version: string): ICoverageLayer[] {
    return [
      {
        label: '2G',
        url: this.makeLayerUri('2g'),
      },
      ...(version < '2024-04-26'
        ? [
            {
              label: '3G',
              url: this.makeLayerUri('3g'),
            },
          ]
        : []),
      {
        label: '4G (non-VoLTE)',
        url: this.makeLayerUri('4g'),
      },
      {
        label: '4G (800 MHz only)',
        hidden: true,
        url: this.makeLayerUri('4g_800'),
      },
      {
        label: '4G (1800 MHz only)',
        hidden: true,
        url: this.makeLayerUri('4g_1800'),
      },
      {
        label: '4G (2600 MHz only)',
        hidden: true,
        layers: (
          <>
            {/* Add twice to improve opaqueness */}
            <TileLayer
              key={this.makeLayerUri('4g_2600')}
              url={this.makeLayerUri('4g_2600')}
              attribution={this.attributionTemplate('4G (2600 MHz only)')}
              maxNativeZoom={this.maxZoom}
            />
            <TileLayer
              key={this.makeLayerUri('4g_2600') + '2'}
              opacity={0.5}
              url={this.makeLayerUri('4g_2600')}
              attribution={this.attributionTemplate('4G (2600 MHz only)')}
              maxNativeZoom={this.maxZoom}
            />
          </>
        ),
      },
      {
        label: '4G (all bands)',
        url: this.makeLayerUri('4g_volte'),
      },
      {
        label: '4G CA only (legacy)',
        hidden: true,
        url: this.makeLayerUri('4g_18_26_ca'),
      },
      {
        label: '5G (n78 + LTE)',
        hidden: true,
        url: this.makeLayerUri('5g_high'),
      },
      {
        label: '5G (n78 only)',
        hidden: true,
        layers: (
          <TileLayer
            key={this.makeLayerUri('5g_3400')}
            opacity={0.6}
            url={this.makeLayerUri('5g_3400')}
            attribution={this.attributionTemplate('5G (n78 only)')}
            className="ee_5g_3400"
            maxNativeZoom={this.maxZoom}
          />
        ),
      },
      ...(version >= '2023-11-28'
        ? ([
            {
              label: '5G (n1 only)',
              hidden: true,
              layers: (
                <TileLayer
                  key={this.makeLayerUri('5g_2100')}
                  opacity={0.6}
                  url={this.makeLayerUri('5g_2100')}
                  attribution={this.attributionTemplate('5G (2100 MHz only)')}
                  className="ee_5g_2100"
                  maxNativeZoom={this.maxZoom}
                />
              ),
            },
          ] as ICoverageLayer[])
        : []),
      {
        label: '5G (all)',
        url: this.makeLayerUri('5g'),
      },
      ...(version >= '2024-03-24'
        ? [
            {
              label: '2G (new)',
              url: this.makeLayerUri('2g_new'),
            },
            ...(version < '2024-04-26'
              ? [
                  {
                    label: '3G (new)',
                    url: this.makeLayerUri('3g_new'),
                  },
                ]
              : []),
            {
              label: '4G (new)',
              url: this.makeLayerUri('4g_new'),
            },
            {
              label: '5G (new)',
              url: this.makeLayerUri('5g_new'),
            },
          ]
        : []),
    ]
  }

  private makeLayerUri(layerName: string): string {
    return `https://234-30.coveragetiles.com/${this._version}/${layerName}/{z}/{x}/{y}.png`
  }

  _getLayerKeys(version: string): ICoverageLayerKey[] {
    return [
      {
        key: [...this.layerKey('2g')],
      },
      ...(version < '2024-04-26'
        ? [
            {
              key: [...this.layerKey('3g')],
            },
          ]
        : []),
      {
        key: [...this.layerKey('4g')],
      },
      {
        key: [...this.layerKey('4g')],
      },
      {
        key: [...this.layerKey('4g')],
      },
      {
        key: [...this.layerKey('4g')],
      },
      {
        key: [...this.layerKey('4g')],
      },
      {
        key: [...this.layerKey('lteca')],
      },
      {
        key: [...this.layerKey('4g'), ...this.layerKey('5g')],
      },
      {
        key: [...this.layerKey('5g_modified')],
      },
      ...(version >= '2023-11-28'
        ? [
            {
              key: [...this.layerKey('5g_modified')],
            },
          ]
        : []),
      {
        key: [...this.layerKey('4g'), ...this.layerKey('5g')],
      },
      ...(version >= '2024-03-24'
        ? [
            {
              key: [...this.layerKey('new')],
            },
            ...(version < '2024-04-26'
              ? [
                  {
                    key: [...this.layerKey('new')],
                  },
                ]
              : []),
            {
              key: [...this.layerKey('new')],
            },
            {
              key: [...this.layerKey('new')],
            },
          ]
        : []),
    ]
  }

  private layerKey(type: '2g' | '3g' | '4g' | '5g' | 'lteca' | '5g_modified' | 'new') {
    switch (type) {
      case '2g':
        return [
          { color: '#009c9c', label: '2G outdoors and indoors' },
          { color: '#66c4c4', label: '2G outdoors' },
        ]

      case '3g':
        return [
          { color: '#009c9c', label: '3G outdoors and indoors' },
          { color: '#66c4c4', label: '3G outdoors' },
        ]

      case '4g':
      default:
        return [
          { color: '#009c9c', label: '4G outdoors and indoors' },
          { color: '#66c4c4', label: '4G outdoors' },
        ]

      case '5g':
        return [
          { color: '#ffe600', label: '5G outdoors and indoors' },
          { color: '#fef7ba', label: '5G outdoors' },
        ]

      case '5g_modified':
        return [
          { color: '#cc69ac', label: '5G outdoors and indoors' },
          { color: '#ccb0c3', label: '5G outdoors' },
        ]

      case 'lteca':
        return [{ color: '#f3666b', label: 'LTE CA available' }]

      case 'new':
        return [
          { color: '#009ba5', label: 'Outdoors and indoors' },
          { color: '#01232a', label: 'Outdoors' },
        ]
    }
  }

  getPageMessages(): string[] {
    return []
  }
}
