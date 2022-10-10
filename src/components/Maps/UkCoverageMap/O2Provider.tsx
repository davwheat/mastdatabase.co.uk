import CoverageProvider, { ICoverageLayer, ISiteItem } from './CoverageProvider'

export default class O2CoverageMapProvider extends CoverageProvider {
  providerName: string = 'O2 UK'
  defaultLayerId: number = 3
  supportsSites: boolean = false

  private fetchSitesAborter: AbortController | null = null

  getLayers(): ICoverageLayer[] {
    return [
      {
        label: '2G',
        url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_voice/{z}/{x}/{y}.png',
        // minZoom: 1,
        // maxZoom: 18,
      },
      {
        label: '3G 2100 MHz',
        url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_data/{z}/{x}/{y}.png',
        // minZoom: 11,
        // maxZoom: 18,
      },
      {
        label: '3G',
        url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_datacombined/{z}/{x}/{y}.png',
        // minZoom: 11,
        // maxZoom: 18,
      },
      {
        label: '4G LTE',
        url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_lte/{z}/{x}/{y}.png',
        // minZoom: 1,
        // maxZoom: 18,
      },
      {
        label: '4G VoLTE',
        url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_volte/{z}/{x}/{y}.png',
        // minZoom: 11,
        // maxZoom: 18,
      },
      {
        label: '5G',
        url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_5g/{z}/{x}/{y}.png',
        // minZoom: 13,
        // maxZoom: 18,
      },
      {
        label: 'LTE-M',
        url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_ltem/{z}/{x}/{y}.png',
        // minZoom: 1,
        // maxZoom: 18,
      },
      // {
      //   label: '2G (Sky)',
      //   url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_sky_2g/{z}/{x}/{y}.png',
      //   minZoom: 1,
      //   maxZoom: 18,
      // },
      // {
      //   label: '3G (Sky)',
      //   url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_sky_3g/{z}/{x}/{y}.png',
      //   minZoom: 11,
      //   maxZoom: 18,
      // },
      // {
      //   label: '4G LTE (Sky)',
      //   url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_sky_4g/{z}/{x}/{y}.png',
      //   minZoom: 11,
      //   maxZoom: 18,
      // },
      // {
      //   label: '4G VoLTE (Sky)',
      //   url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_sky_volte/{z}/{x}/{y}.png',
      //   minZoom: 11,
      //   maxZoom: 18,
      // },
      // {
      //   label: '5G (Sky)',
      //   url: 'https://68aa7b45-tiles.spatialbuzz.net/tiles/o2_uk-v184/styles/o2_uk_v184_sky_5g/{z}/{x}/{y}.png',
      //   minZoom: 13,
      //   maxZoom: 18,
      // },
    ]
  }

  async getSites(centreLat: number, centreLon: number, bbox: L.LatLngBounds): Promise<ISiteItem[]> {
    if (this.fetchSitesAborter) this.fetchSitesAborter.abort()

    this.fetchSitesAborter ||= new AbortController()
    const ab = this.fetchSitesAborter

    const response = await fetch(`https://proxies.mastdatabase.co.uk/uk/o2/coverage-map/sites?lon=${centreLon}&lat=${centreLat}`, {
      signal: ab.signal,
    })

    this.fetchSitesAborter = null

    const wrappedResponse: { info: string[]; ok: boolean; data: SpatialBuzzResponse.RootObject } = await response.json()

    const { lon } = wrappedResponse.data.search_point.point

    if (lon < -180 || lon > 180) {
      return []
    }

    return wrappedResponse.data.records.map(r => ({
      id: r.id,
      lat: r.point.lat,
      long: r.point.lon,
    }))
  }
}

declare module SpatialBuzzResponse {
  export interface RasterValue {
    layer: number
    raw: number
    cat: number
  }

  export interface Geojson {
    type: string
    coordinates: number[]
  }

  export interface Point {
    lon: number
    lat: number
  }

  export interface PointGrid {
    x: number
    y: number
    srs?: number
  }

  export interface SearchPoint {
    geojson: Geojson
    point: Point
    point_grid: PointGrid
  }

  export interface Distance {
    miles: number
    km: number
  }

  export interface Record {
    counter: number
    id: string
    point: Point
    point_grid: PointGrid
    distance: Distance
  }

  export interface RootObject {
    customer: string
    raster_values: RasterValue[]
    total: number
    avg_distance: number
    grid_srs: number
    search_point: SearchPoint
    search_results: any[]
    records: Record[]
  }
}
