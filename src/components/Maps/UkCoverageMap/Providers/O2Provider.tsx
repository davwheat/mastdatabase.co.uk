import React from 'react'
import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'
import O2Logo from '@assets/icons/brands/o2.inline.svg'

export default class O2CoverageMapProvider extends CoverageProvider<true> {
  providerName: string = 'O2 UK'
  defaultLayerId: number = this.getLayers().findIndex(layer => layer.label === '4G LTE')
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
  }
  protected version = 'v190'

  getLayers(): ICoverageLayer[] {
    return [
      {
        label: '2G',
        url: `https://234-10.coveragetiles.com/${this.version}/2g/{z}/{x}/{y}.png`,
      },
      {
        label: '3G 2100 MHz',
        url: `https://234-10.coveragetiles.com/${this.version}/3g_2100/{z}/{x}/{y}.png`,
      },
      {
        label: '3G',
        url: `https://234-10.coveragetiles.com/${this.version}/3g_all/{z}/{x}/{y}.png`,
      },
      {
        label: '4G LTE',
        url: `https://234-10.coveragetiles.com/${this.version}/4g/{z}/{x}/{y}.png`,
      },
      {
        label: '5G (n78 only - Oct 2022)',
        url: `https://234-10.coveragetiles.com/v184/5g/{z}/{x}/{y}.png`,
      },
      {
        label: '5G (all)',
        url: `https://234-10.coveragetiles.com/${this.version}/5g/{z}/{x}/{y}.png`,
      },
      {
        label: 'LTE-M',
        url: `https://234-10.coveragetiles.com/${this.version}/lte-m/{z}/{x}/{y}.png`,
      },
    ]
  }

  getLayerKeys(): ICoverageLayerKey[] {
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
      {
        key: [
          { color: '#faa94a', label: 'Good outdoors' },
          { color: '#0000', label: 'No coverage' },
        ],
      },
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
    return []
  }

  // async getSites(centreLat: number, centreLon: number, bbox: L.LatLngBounds): Promise<ISiteItem[]> {
  //   if (this.fetchSitesAborter) this.fetchSitesAborter.abort()

  //   this.fetchSitesAborter ||= new AbortController()
  //   const ab = this.fetchSitesAborter

  //   const response = await fetch(`https://proxies.mastdatabase.co.uk/uk/o2/coverage-map/sites?lon=${centreLon}&lat=${centreLat}`, {
  //     signal: ab.signal,
  //   })

  //   this.fetchSitesAborter = null

  //   const wrappedResponse: { info: string[]; ok: boolean; data: SpatialBuzzResponse.RootObject } = await response.json()

  //   const { lon } = wrappedResponse.data.search_point.point

  //   if (lon < -180 || lon > 180) {
  //     return []
  //   }

  //   return wrappedResponse.data.records.map(r => ({
  //     id: r.id,
  //     lat: r.point.lat,
  //     long: r.point.lon,
  //   }))
  // }
}

// declare module SpatialBuzzResponse {
//   export interface RasterValue {
//     layer: number
//     raw: number
//     cat: number
//   }

//   export interface Geojson {
//     type: string
//     coordinates: number[]
//   }

//   export interface Point {
//     lon: number
//     lat: number
//   }

//   export interface PointGrid {
//     x: number
//     y: number
//     srs?: number
//   }

//   export interface SearchPoint {
//     geojson: Geojson
//     point: Point
//     point_grid: PointGrid
//   }

//   export interface Distance {
//     miles: number
//     km: number
//   }

//   export interface Record {
//     counter: number
//     id: string
//     point: Point
//     point_grid: PointGrid
//     distance: Distance
//   }

//   export interface RootObject {
//     customer: string
//     raster_values: RasterValue[]
//     total: number
//     avg_distance: number
//     grid_srs: number
//     search_point: SearchPoint
//     search_results: any[]
//     records: Record[]
//   }
// }
