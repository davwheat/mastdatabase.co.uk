import type { ISite } from '@components/Maps/MasteDatabasenMap/JsonApi/Models'
import dayjs from 'dayjs'

import { predictThreeDkEnb } from './predictThreeDkEnb'

export function getSitePopUpHtml(sites: ISite[]) {
  const popupTextSegments: string[] = []

  popupTextSegments.push(`
  <dt>Operator</dt>
  <dd>${sites[0].Operator()?.operatorName ?? 'Unknown'}</dd>
  `)

  popupTextSegments.push(`
  <dt>Address</dt>
  <dd>${[(sites[0].streetName ?? '') + ' ' + (sites[0].houseNumber ?? ''), sites[0].town, sites[0].postNumber]
    .map(s => s?.trim())
    .filter(t => !!t)
    .join(', ')}</dd>
  `)

  if (sites[0].Operator()?.id === '5') {
    popupTextSegments.push(`
    <dt>Predicted eNB ID</dt>
    <dd>${predictThreeDkEnb(sites[0].stationName)}</dd>
    `)
  }

  popupTextSegments.push(`
  <dt>Station name(s)</dt>
  <dd>${Array.from(new Set(sites.map(s => s.stationName))).join(', ')}</dd>
  `)

  const sitesDate = sites.map(s => (s.startDate ? new Date(s.startDate).getTime() : 0))

  // We add two hours because the dates from Mastedatabasen are always 22:00 or 23:00 to match DK time
  // Either with or without DST

  popupTextSegments.push(`
  <dt>Site last modified</dt>
  <dd>${dayjs(Math.max(...sitesDate))
    .add(2, 'hours')
    .format('D MMM YYYY')}</dd>
  `)

  popupTextSegments.push(`
  <dt>Site first recorded</dt>
  <dd>${dayjs(Math.min(...sitesDate))
    .add(2, 'hours')
    .format('D MMM YYYY')}</dd>
  `)

  {
    let str: string[] = []

    const freqRatList: Record<number, string[]> = {}
    sites.forEach(s => {
      const f = s.FrequencyBand()
      const t = s.Technology()

      if (!f || !t || !['NR', 'LTE', 'UMTS', 'GSM'].includes(t.technologyName)) return

      freqRatList[f.frequencyBand] ||= []
      freqRatList[f.frequencyBand].push(t.technologyName)
    })

    const freqs = Object.keys(freqRatList).map(f => parseInt(f))
    freqs.sort((a, b) => a - b)

    freqs.forEach(f => {
      const rats = freqRatList[f]

      if (rats.includes('GSM')) str.push(`GSM${f}`)
      if (rats.includes('UMTS')) str.push(`UMTS${f}`)
      if (rats.includes('LTE')) str.push(`LTE${f}`)
      if (rats.includes('NR')) str.push(`NR${f}`)
    })

    popupTextSegments.push(`
    <dt>${str.length === 1 ? 'Frequency' : 'Frequencies'}</dt>
    <dd>${str.join(', ') || 'Unknown'}</dd>
    `)
  }

  return `<dl>${popupTextSegments.join('')}</dl>`
}
