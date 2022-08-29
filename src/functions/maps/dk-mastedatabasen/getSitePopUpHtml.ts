import type { ISite } from '@components/Maps/MasteDatabasenMap/JsonApi/Models'

import { RatShorthand } from './getSiteLabelText'

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

  popupTextSegments.push(`
  <dt>Station name(s)</dt>
  <dd>${Array.from(new Set(sites.map(s => s.stationName))).join(', ')}</dd>
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
