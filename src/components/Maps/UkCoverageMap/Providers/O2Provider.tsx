import React from 'react'
import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'
import O2Logo from '@assets/icons/brands/o2.inline.svg'

export default class O2CoverageMapProvider extends CoverageProvider<true> {
  protected _version = 'v193'

  providerName: string = 'O2 UK'
  defaultLayerIndex: number = this._getLayers(this.version).findIndex(layer => layer.label === '4G LTE')
  supportsSites: boolean = false
  maxZoom: number = 14
  readonly supportsVersionHistory = true

  readonly providerIcon = (<O2Logo />)

  protected allVersions: Record<string, string> = {
    v184: '25 Nov 2022',
    v185: '25 Jan 2023',
    v186: '23 Mar 2023',
    v187: '10 July 2023',
    v188: '1 August 2023',
    v189: '30 August 2023',
    v190: '14 November 2023',
    v192: '6 February 2024',
    v193: '3 June 2024',
  }

  protected _getLayers(version: string): ICoverageLayer[] {
    return [
      {
        label: '2G',
        url: `https://234-10.coveragetiles.com/${this._version}/2g/{z}/{x}/{y}.png`,
      },
      {
        label: '3G 2100 MHz',
        url: `https://234-10.coveragetiles.com/${this._version}/3g_2100/{z}/{x}/{y}.png`,
      },
      {
        label: '3G',
        url: `https://234-10.coveragetiles.com/${this._version}/3g_all/{z}/{x}/{y}.png`,
      },
      {
        label: '4G LTE',
        url: `https://234-10.coveragetiles.com/${this._version}/4g/{z}/{x}/{y}.png`,
      },
      ...(version === 'v184'
        ? [
            {
              label: '5G (n78 only)',
              url: `https://234-10.coveragetiles.com/v184/5g/{z}/{x}/{y}.png`,
            },
          ]
        : []),
      {
        label: '5G (all)',
        url: `https://234-10.coveragetiles.com/${this._version}/5g/{z}/{x}/{y}.png`,
      },
      {
        label: 'LTE-M',
        url: `https://234-10.coveragetiles.com/${this._version}/lte-m/{z}/{x}/{y}.png`,
      },
    ]
  }

  protected _getLayerKeys(version: string): ICoverageLayerKey[] {
    return [
      {
        key: [
          { color: '#0099d8', label: 'Good outdoors and indoors' },
          { color: '#faa94a', label: 'Good outdoors' },
          { color: '#0000', label: 'No coverage' },
        ],
      },
      {
        key: [
          { color: '#0099d8', label: 'Good outdoors and indoors' },
          { color: '#faa94a', label: 'Good outdoors' },
          { color: '#0000', label: 'No coverage' },
        ],
      },
      {
        key: [
          { color: '#0099d8', label: 'Good outdoors and indoors' },
          { color: '#faa94a', label: 'Good outdoors' },
          { color: '#0000', label: 'No coverage' },
        ],
      },
      {
        key: [
          { color: '#0099d8', label: 'Good outdoors and indoors' },
          { color: '#faa94a', label: 'Good outdoors' },
          { color: '#0000', label: 'No coverage' },
        ],
      },
      ...(version === 'v184'
        ? [
            {
              key: [
                { color: '#faa94a', label: 'Good outdoors' },
                { color: '#0000', label: 'No coverage' },
              ],
            },
          ]
        : []),
      {
        key: [
          { color: '#faa94a', label: 'Good outdoors' },
          { color: '#0000', label: 'No coverage' },
        ],
      },
      {
        key: [
          { color: '#0099d8', label: 'Good outdoors and indoors' },
          { color: '#faa94a', label: 'Good outdoors' },
          { color: '#0000', label: 'No coverage' },
        ],
      },
    ]
  }

  getPageMessages(): string[] {
    return ['A 5G n78 only layer is available on version October 2022 only.']
  }
}
