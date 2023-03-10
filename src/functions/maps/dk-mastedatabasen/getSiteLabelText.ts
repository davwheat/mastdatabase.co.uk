import type { ISite } from '@components/Maps/MasteDatabasenMap/JsonApi/Models'
import { predictThreeDkEnb } from './predictThreeDkEnb'

const OperatorNameToAbbr: Record<string, string> = {
  'TDC Mobil A/S': 'TDC',
  'Telia - Telenor (TT Netværket)': 'Telia-Telenor',
  'Hi3G Denmark ApS': '3 DK',
}

export const RatShorthand: Record<string, string> = {
  GSM: 'G',
  UMTS: 'U',
  LTE: 'L',
  NR: 'NR',
}

export function getSiteLabelText(sites: ISite[], showEnb: boolean = false): string {
  const labelSegments: string[] = []

  // #region Operator shortname
  labelSegments.push(OperatorNameToAbbr[sites[0].Operator()?.operatorName ?? ''] ?? sites[0].Operator()?.operatorName ?? 'UNKNOWN')
  // #endregion

  // #region Station name(s)
  if (showEnb && ['Hi3G', '3 DK'].some(str => sites[0].Operator()?.operatorName.includes(str))) {
    const enb = predictThreeDkEnb(sites[0].stationName)

    labelSegments.push(enb ? `eNB ${predictThreeDkEnb(sites[0].stationName)}` : 'Unknown eNB')
  } else {
    const names = Array.from(new Set(sites.map(s => s.stationName)))
    labelSegments.push(names.length > 1 ? `${names[0]}, (+${names.length - 1} more)` : names[0])
  }
  // #endregion

  // #region Frequency list
  const ratFreqList: Record<'GSM' | 'UMTS' | 'LTE' | 'NR' | 'Other', number[]> = {
    GSM: [],
    UMTS: [],
    LTE: [],
    NR: [],
    Other: [],
  }

  sites.forEach(s => {
    const rat: string | null = s.Technology()?.technologyName ?? ''
    const freq: number | null = s.FrequencyBand()?.frequencyBand ?? -1

    if (!freq || freq === -1) return null

    if (rat && ['GSM', 'UMTS', 'LTE', 'NR'].includes(rat)) {
      ratFreqList[rat as keyof typeof ratFreqList].push(freq)
    } else {
      ratFreqList.Other.push(freq)
    }
  })

  const allFreqs = Array.from(new Set(Object.values(ratFreqList).flat()))
  allFreqs.sort((a, b) => a - b)

  const ratFreqs = allFreqs.map(freq => {
    let str = ''

    Object.entries(ratFreqList).forEach(([rat, freqs]) => {
      if (rat === 'Other') return

      if (freqs.includes(freq)) {
        str += RatShorthand[rat] + '/'
      }
    })

    if (str.length === 0) {
      // Skip freq rewrite for non-mobile networking sites
      str += freq.toString()
    } else {
      // 800 -> 08, 2100 -> 21, 260000 -> 2600, etc
      str = str.slice(0, -1)
      str += freq.toString().slice(0, -2).padStart(2, '0')
    }

    return str
  })

  if (ratFreqs.length > 0) labelSegments.push(ratFreqs.join(', '))

  // #endregion

  return labelSegments.join('\n')
}
