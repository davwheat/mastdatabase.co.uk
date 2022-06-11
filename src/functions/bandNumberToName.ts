import bandNumberToFrequency from './bandNumberToFrequency'

const bandNames = {
  B1: 'IMT',
  B3: 'DCS',
  B7: 'IMT-E',
  B8: 'GSM',
  B20: 'EU Digital Dividend',
  B28: 'APT',
  B29: 'SDL',
  B31: 'NMT',
  B32: 'L-Band SDL',
  B38: 'IMT-E',
  B40: 'S-Band',
  B46: 'LAA',
  B67: 'EU SDL',
  n77: 'C-Band',
  n78: 'C-Band',
  n79: 'C-Band',
  n257: 'mmWave LMDS',
  n258: 'mmWave K-band',
}

export default function bandNumberToName(band: number | string): string {
  if (typeof band === 'string') Object.keys(bandNames).includes(band) || (band = parseInt(band.substring(1)))

  const freq = bandNumberToFrequency(band)

  if (freq === -1) return ''

  return bandNames[band] ? `${freq} MHz ${bandNames[band]}` : `${freq}`
}
