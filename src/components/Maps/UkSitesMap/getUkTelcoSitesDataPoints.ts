import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

import type { ISiteDataPoint } from './UkSitesMap'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

export type GetUkTelcoSitesDataPointsErrors = 'fetch error' | 'aborted' | 'upstream error'

/**
 * @returns An array of data point objects, if the request was successful.
 */
export default async function getUkTelcoSitesDataPoints(
  boundingBox: L.LatLngBounds,
  aborter: AbortController,
): Promise<{ license: string; data: ISiteDataPoint[] } | GetUkTelcoSitesDataPointsErrors> {
  const L = window.L as typeof import('leaflet')

  // Thanks for the BIDB.uk creator for letting me use their API! :)
  const url = new URL(`https://uk-telecoms-sites.mastdatabase.co.uk/sites`)
  const params = url.searchParams

  params.append('ne_lat', boundingBox.getNorthEast().lat.toString())
  params.append('ne_lng', boundingBox.getNorthEast().lng.toString())
  params.append('sw_lat', boundingBox.getSouthWest().lat.toString())
  params.append('sw_lng', boundingBox.getSouthWest().lng.toString())

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

    if (!Array.isArray(json.data)) {
      return 'upstream error'
    }

    return json
  } catch (e) {
    return 'upstream error'
  }
}
