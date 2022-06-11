import { earfcnCalcData } from './arfcnToFreq'

export function arfcnToBand(rat: 'lte' | 'nr' | 'umts' | 'gsm', arfcn: number, type: 'dl' | 'ul'): number | null {
  if (rat === 'lte') {
    const [band] =
      Object.entries(earfcnCalcData).find(([_, v]) => {
        if (!(`${type}FreqLow` in v)) return false

        const bw = v[`${type}FreqHigh`] - v[`${type}FreqLow`]

        return arfcn >= v[`${type}ArfcnOffset`] && arfcn < v[`${type}ArfcnOffset`] + 10 * bw
      }) ?? []

    if (!band) return null

    return parseInt(band)
  }
}
