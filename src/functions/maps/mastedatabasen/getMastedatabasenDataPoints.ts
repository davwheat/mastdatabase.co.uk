import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

export type GetMastedatabasenPointsErrors = 'too many points' | 'fetch error' | 'aborted'

export interface MastedatabasenDataPoint {}

/**
 * Service type
 */
enum TjenesteArtID {
  Others = 1,
  MobileNetworks = 2,
  TechnologyNeutral = 11,
}

/**
 * Technology ID
 */
enum TeknologiID {
  GSM = 39,
  UMTS = 7,
  LTE = 29,
  NR = 42,
}

/**
 * @param boundingBoxString
 * @param durationDays Number of days ahead to fetch works for.
 * @returns An array of data point objects, if the request was successful.
 */
export default async function getMastedatabasenDataPoints(
  boundingBoxString: string,
  aborter: AbortController,
  filterRat: TeknologiID[] = [TeknologiID.GSM, TeknologiID.UMTS, TeknologiID.LTE, TeknologiID.NR],
): Promise<MastedatabasenDataPoint[] | GetMastedatabasenPointsErrors> {
  const url = new URL(`https://mastedatabasen.dk/viskort/WMS2.ashx`)
  const params = url.searchParams

  params.append('SERVICE', 'WMS')
  params.append('VERSION', '1.3.0')
  params.append('REQUEST', 'GetFeatureInfo')
  params.append('FORMAT', 'image/png') // what?
  params.append('TRANSPARENT', 'true') // ehh?
  params.append('QUERY_LAYERS', 'mastedatabasen:MasteIBrug')
  params.append('LAYERS', 'mastedatabasen:MasteIBrug')
  params.append('cql_filter', `TjenesteArtID=${TjenesteArtID.MobileNetworks}`)
  params.append('INFO_FORMAT', 'application/json')
  params.append('FEATURE_COUNT', '100000')
  params.append('INFOIDX', '0')
  params.append('I', '50')
  params.append('J', '50')
  params.append('CRS', 'CRS:84')
  params.append('STYLES', '')
  params.append('WIDTH', '10001')
  params.append('HEIGHT', '10001')
  params.append('BBOX', boundingBoxString)

  let response: Response
  try {
    response = await fetch(url.toString(), { signal: aborter.signal })
  } catch (e) {
    if (aborter.signal.aborted) return 'aborted'

    return 'fetch error'
  }

  const json = await response.json()

  return json
}
