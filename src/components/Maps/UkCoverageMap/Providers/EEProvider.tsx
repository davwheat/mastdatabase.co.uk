import React from 'react'
import { TileLayer } from 'react-leaflet'
import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'
import EELogo from '@assets/icons/brands/ee.inline.svg'

export default class EECoverageMapProvider extends CoverageProvider<true> {
  providerName: string = 'EE'
  defaultLayerId: number = this.getLayers().findIndex(layer => layer.label === '4G (all bands)')
  supportsSites: boolean = false
  readonly supportsVersionHistory = true
  readonly maxZoom = 14

  readonly providerIcon = (<EELogo />)

  protected allVersions = {
    '2023-05-12': '12 May 2023',
    '2023-07-25': '25 July 2023',
  }
  protected version = '2023-07-25'

  getLayers(): ICoverageLayer[] {
    return [
      {
        label: '2G',
        url: this.makeLayerUri('2g'),
      },
      {
        label: '3G',
        url: this.makeLayerUri('3g'),
      },
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
            />
            <TileLayer
              key={this.makeLayerUri('4g_2600') + '2'}
              opacity={0.5}
              url={this.makeLayerUri('4g_2600')}
              attribution={this.attributionTemplate('4G (2600 MHz only)')}
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
        url: this.makeLayerUri('5g_3400'),
      },
      {
        label: '5G (n1 only) [DEAD]',
        hidden: true,
        url: this.makeLayerUri('5g_2100'),
      },
      {
        label: '5G (all)',
        url: this.makeLayerUri('5g'),
      },
    ]
  }

  private makeLayerUri(layerName: string): string {
    return `https://234-30.coveragetiles.com/${this.version}/${layerName}/{z}/{x}/{y}.png`
  }

  getLayerKeys(): ICoverageLayerKey[] {
    return [
      {
        key: [...this.layerKey('2g')],
      },
      {
        key: [...this.layerKey('3g')],
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
        key: [...this.layerKey('4g')],
      },
      {
        key: [...this.layerKey('lteca')],
      },
      {
        key: [...this.layerKey('4g'), ...this.layerKey('5g')],
      },
      {
        key: [...this.layerKey('5g')],
      },
      {
        key: [...this.layerKey('5g')],
      },
      {
        key: [...this.layerKey('4g'), ...this.layerKey('5g')],
      },
    ]
  }

  private layerKey(type: '2g' | '3g' | '4g' | '5g' | 'lteca') {
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

      case 'lteca':
        return [{ color: '#f3666b', label: 'LTE CA available' }]
    }
  }

  getPageMessages(): string[] {
    return []
  }
}
