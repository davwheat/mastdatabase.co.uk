import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

export type GetStreetworksDataPointsErrors = 'too many points' | 'fetch error' | 'aborted' | 'upstream error'

export interface StreetworksDataPoint {
  promoter: string
  promoter_org_ref: number
  active_works: boolean
  works_state: number
  start_date: string
  end_date: string
  works_desc: string
  geojson_wgs84: string
  /**
   * Unknown.
   */
  mapsymbol: string
  /**
   * one.network ID for this streetworks data point.
   */
  id: number
  /**
   * Distance in metres to the centre of the bounding box.
   */
  distance: number
}

/**
 * @returns An array of data point objects, if the request was successful.
 */
export default async function getStreetworksDataPoints(
  boundingBox: L.LatLngBounds,
  aborter: AbortController,
): Promise<StreetworksDataPoint[] | GetStreetworksDataPointsErrors> {
  const L = window.L as typeof import('leaflet')

  // Thanks for the BIDB.uk creator for letting me use their API! :)
  const url = new URL(`https://proxies.mastdatabase.co.uk/uk/streetworks/one.network`)
  const params = url.searchParams

  const centralLatLon = boundingBox.getCenter()

  params.append('lat', centralLatLon.lat.toString())
  params.append('lon', centralLatLon.lng.toString())

  let response: Response
  try {
    response = await fetch(url.toString(), { signal: aborter.signal })
  } catch (e) {
    if (aborter.signal.aborted) return 'aborted'

    return 'fetch error'
  }

  if (!response.ok) {
    return 'upstream error'
  }

  try {
    const json = await response.json()

    if (!Array.isArray(json)) {
      return 'upstream error'
    }

    return json
  } catch (e) {
    return 'upstream error'
  }
}
