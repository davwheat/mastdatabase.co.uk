import React from 'react'

import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'
import VodafoneLogo from '@assets/icons/brands/vodafone.inline.svg'

export default class VodafoneCoverageMapProvider extends CoverageProvider<true> {
  providerName: string = 'Vodafone'
  defaultLayerId: number = this.getLayers().findIndex(layer => layer.label === '4G')
  supportsSites: boolean = false
  readonly supportsVersionHistory = true
  readonly maxZoom = 14

  readonly providerIcon = (<VodafoneLogo />)

  protected allVersions = {
    '2023-06-28': '28 June 2023',
  }
  protected version = '2023-06-28'

  getLayerKeys(): ICoverageLayerKey[] {
    const genericKey = [
      { color: '#e60000', label: 'Good outdoors and indoors' },
      { color: '#f57676', label: 'Good outdoors' },
      { color: '#f3afaf', label: 'Limited coverage' },
    ]

    return [
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: [{ color: '', label: 'Random colours for each area surrounding an impacted site' }],
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
    ]
  }

  getPageMessages(): string[] {
    return []
  }

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
        label: '4G',
        url: this.makeLayerUri('4g'),
      },
      {
        label: '5G',
        url: this.makeLayerUri('5g'),
      },
      {
        label: '2G (planned)',
        url: this.makeLayerUri('2g_planned'),
      },
      {
        label: '3G (planned)',
        url: this.makeLayerUri('3g_planned'),
      },
      {
        label: '4G (planned)',
        url: this.makeLayerUri('4g_planned'),
      },
      {
        label: '5G (planned)',
        url: this.makeLayerUri('5g_planned'),
      },
      {
        label: 'Impact footprint',
        url: this.makeLayerUri('impact_footprint'),
      },
      {
        label: 'IoT outdoor',
        url: this.makeLayerUri('iot_outdoor'),
      },
      {
        label: 'IoT indoor',
        url: this.makeLayerUri('iot_indoor'),
      },
      {
        label: 'IoT outdoor (planned)',
        url: this.makeLayerUri('iot_outdoor_planned'),
      },
      {
        label: 'IoT indoor (planned)',
        url: this.makeLayerUri('iot_indoor_planned'),
      },
    ]
  }

  private makeLayerUri(layerName: string): string {
    return `https://234-15.coveragetiles.com/${this.version}/${layerName}/{z}/{x}/{y}.png`
  }
}
