import { earfcnCalcData } from './arfcnToFreq'

export function freqToArfcn(rat: 'lte' | 'nr' | 'umts' | 'gsm', frequency: number, type: 'dl' | 'ul'): number | null {
  if (rat === 'lte') {
    const [assumedBand, assumedData] =
      Object.entries(earfcnCalcData).find(([bandNum, data]) => {
        if (data[`${type}FreqLow`] >= frequency && data[`${type}FreqHigh`] <= frequency) {
          return true
        }
      }) ?? []

    if (!assumedBand || !assumedData) {
      return null
    }

    const assumedFreqLo = assumedData[`${type}FreqLow`]
    const assumedArfcnLo = assumedData[`${type}ArfcnOffset`]

    const freqDiff = frequency - assumedFreqLo
    const arfcnAdd = freqDiff / 0.1

    return assumedArfcnLo + arfcnAdd
  }
}
