import React from 'react'

import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'
import VodafoneLogo from '@assets/icons/brands/vodafone.inline.svg'
import { TileLayer } from 'react-leaflet'

export default class VodafoneCoverageMapProvider extends CoverageProvider<true> {
  providerName: string = 'Vodafone'
  defaultLayerIndex: number = this._getLayers(this.version).findIndex(layer => layer.label === '4G')
  supportsSites: boolean = false
  readonly supportsVersionHistory = true
  readonly maxZoom = 14

  readonly providerIcon = (<VodafoneLogo />)

  protected allVersions = {
    '2023-07-04': '4 July 2023',
    '2023-07-26': '26 July 2023',
    '2023-07-31': '31 July 2023',
    '2023-08-31': '31 August 2023',
    '2023-09-29': '29 September 2023',
    '2023-11-28': '28 November 2023',
    '2024-01-09': '9 January 2024',
    '2024-01-16': '16 January 2024',
    '2024-01-23': '23 January 2024',
    '2024-01-29': '29 January 2024',
    '2024-02-05': '5 February 2024',
    '2024-02-20': '20 February 2024',
    '2024-02-26': '26 February 2024',
    '2024-03-04': '4 March 2024',
    '2024-03-24': '24 March 2024',
    '2024-03-27': '27 March 2024',
    '2024-03-28': '28 March 2024',
    '2024-04-05': '5 April 2024',
    '2024-04-12': '12 April 2024',
    '2024-04-26': '26 April 2024',
    '2024-06-10': '10 June 2024',
    '2024-07-11': '11 July 2024',
    '2024-09-18': '18 September 2024',
    '2024-12-06': '6 December 2024',
    '2025-02-10': '10 February 2025',
  }
  protected _version: string = '2025-02-10'

  protected _getLayerKeys(version: string): ICoverageLayerKey[] {
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
      ...(version < '2024-04-26'
        ? [
            {
              key: genericKey,
            },
            {
              key: genericKey,
            },
          ]
        : []),
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

      ...(version <= '2024-01-09'
        ? [
            {
              key: [{ color: '', label: 'Random colours for each area surrounding an impacted site' }],
            },
          ]
        : []),

      ...(version <= '2023-07-31'
        ? [
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
        : []),
      ...(version >= '2024-02-05'
        ? [
            {
              key: genericKey,
            },
            {
              key: genericKey,
            },
          ]
        : []),
      ...(version >= '2024-09-18'
        ? [
            {
              key: [{ color: '', label: 'Random colours for each area surrounding an impacted site' }],
            },
          ]
        : []),
    ]
  }

  getPageMessages(): string[] {
    const messages: string[] = []

    if (this.version === '2024-01-09') {
      messages.push('The impact footprint layer on this version is mangled, but still correct where visible.')
    }

    if (this.version === '2024-01-23') {
      messages.push(
        "The planned 5G layer on this version is buggy and often shows 4G coverage instead due to an error on Vodafone's coverage map server.",
      )
    }

    return messages
  }

  protected _getLayers(version: string): ICoverageLayer[] {
    return [
      {
        label: '2G',
        url: this.makeLayerUri('2g'),
      },
      {
        label: '2G (planned)',
        url: this.makeLayerUri('2g_planned'),
      },
      ...(version < '2024-04-26'
        ? [
            {
              label: '3G',
              url: this.makeLayerUri('3g'),
            },
            {
              label: '3G (planned)',
              url: this.makeLayerUri('3g_planned'),
            },
          ]
        : []),
      {
        label: '4G',
        url: this.makeLayerUri('4g'),
      },
      {
        label: '4G (planned)',
        url: this.makeLayerUri('4g_planned'),
      },
      {
        label: '5G',
        url: this.makeLayerUri('5g'),
      },
      version === '2024-01-23'
        ? {
            label: '5G (planned)',
            // Issue with map server during this download
            layers: (
              <TileLayer
                maxNativeZoom={12}
                key={this.makeLayerUri('5g_planned')}
                opacity={0.5}
                url={this.makeLayerUri('5g_planned')}
                attribution={this.attributionTemplate('5G (planned)')}
              />
            ),
          }
        : {
            label: '5G (planned)',
            url: this.makeLayerUri('5g_planned'),
          },
      ...(version >= '2024-02-05'
        ? [
            {
              label: '5G Ultra (SA)',
              url: this.makeLayerUri('5g_sa'),
            },
            {
              label: '5G Ultra (SA) (planned)',
              url: this.makeLayerUri('5g_sa_planned'),
            },
          ]
        : []),
      ...(version <= '2024-01-09' || version >= '2024-09-18'
        ? [
            {
              label: 'Impact footprint',
              url: this.makeLayerUri('impact_footprint'),
              hidden: true,
            } as ICoverageLayer,
          ]
        : []),
      ...(version <= '2023-07-31'
        ? [
            {
              label: 'IoT outdoor',
              url: this.makeLayerUri('iot_outdoor'),
            },
            {
              label: 'IoT outdoor (planned)',
              url: this.makeLayerUri('iot_outdoor_planned'),
            },
            {
              label: 'IoT indoor',
              url: this.makeLayerUri('iot_indoor'),
            },
            {
              label: 'IoT indoor (planned)',
              url: this.makeLayerUri('iot_indoor_planned'),
            },
          ]
        : []),
    ]
  }

  private makeLayerUri(layerName: string): string {
    return `https://234-15.coveragetiles.com/${this._version}/${layerName}/{z}/{x}/{y}.png`
  }
}
