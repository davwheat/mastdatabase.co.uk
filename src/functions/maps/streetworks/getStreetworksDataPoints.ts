import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

export type GetStreetworksDataPointsErrors = 'too many points' | 'fetch error'

export interface StreetworksDataPoint {
  end_date: string
  end_date_tz: string
  geojson_wgs84: string
  geom_type: number
  gsymbol_id: number
  impact: number
  is_covid19: 1 | 0
  is_emergency: 1 | 0
  latitude: number
  lha_id: number
  longitude: number
  org_name_disp: string
  organisation_id: number
  originator_ref: string
  permit_ref: string
  phase_id: number
  promoter: string
  promoter_org_ref: number
  promoter_organisation_id: number
  promoter_works_ref: string
  publisher_organisation_id: number
  publisher_orgref: number
  se_id: number
  source: string
  start_date: string
  start_date_tz: string
  swa_org_ref: number
  swtype: string
  tm_cat: string
  tooltip: string
  u_se_id: string
  works_desc: string
  works_state: number
}

/**
 * @param boundingBoxString
 * @param durationDays Number of days ahead to fetch works for.
 * @returns An array of data point objects, if the request was successful.
 */
export default async function getStreetworksDataPoints(
  boundingBoxString: string,
  durationDays: number = 180,
): Promise<StreetworksDataPoint[] | GetStreetworksDataPointsErrors> {
  const ab = new AbortController()

  const url = new URL(`https://portal-gb.one.network/prd-portal-one-network/data/`)
  const params = url.searchParams

  const today = dayjs().subtract(12, 'hours').format('DD/MM/YYYY HH:mm')
  const end = dayjs().add(durationDays, 'days').format('DD/MM/YYYY HH:mm')

  params.append('get', 'Points')
  params.append('b', boundingBoxString)
  params.append('filterstartdate', today)
  params.append('filterenddate', end)
  params.append('filterimpact', '1,2,3,4')
  params.append('organisation_id', '1')
  params.append('t', 'cw')
  params.append('extended_func_id', '14')
  params.append('mapzoom', '16')
  params.append('mode', 'v7')
  params.append('lang', 'en-GB')
  params.append('_', new Date().getTime().toString())

  let response: Response
  try {
    response = await fetch(url.toString(), { signal: ab.signal })
  } catch {
    return 'fetch error'
  }

  const json = await response.json()

  if (json.datapointslimit) {
    // Too many points in the bounding box -- ask to zoom in
    return 'too many points'
  }

  const columns: string[] = json.query.columnlist.split(',')
  const data = json.query.data
  const count = json.query.recordcount

  const dataPoints: StreetworksDataPoint[] = []

  for (let i = 0; i < count; i++) {
    const point = {} as StreetworksDataPoint

    columns.forEach(col => {
      point[col] = data[col][i]
    })

    dataPoints.push(point)
  }

  return dataPoints
}
