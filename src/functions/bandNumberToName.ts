import bandNumberToFrequency from './bandNumberToFrequency'

const bandNames = {
  B1: 'IMT',
  B2: 'PCS',
  B3: 'DCS',
  B4: 'AWS-1',
  B5: 'Cellular',
  B7: 'IMT-E',
  B8: 'GSM',
  B11: 'Lower PDC (Japan)',
  B12: 'Lower SMH',
  B13: 'Upper SMH',
  B14: 'Upper SMH',
  B17: 'Lower SMH',
  B18: 'Lower 800 (Japan)',
  B19: 'Upper 800 (Japan)',
  B20: 'EU Digital Dividend',
  B21: 'Upper PDC (Japan)',
  B24: 'Upper L-Band (USA)',
  B25: 'Extended PCS',
  B26: 'Extended Cellular',
  B28: 'APT',
  B29: 'Lower SMH SDL',
  B30: 'WCS',
  B31: 'NMT',
  B32: 'L-Band SDL (EU)',
  B34: 'IMT',
  B37: 'PCS',
  B38: 'IMT-E',
  B39: 'DCS-IMT Gap',
  B40: 'S-Band',
  B41: 'BRS (USA)',
  B42: 'CBRS (EU and Japan)',
  B43: 'C-Band',
  B46: 'LAA (U-NII-1 to 4)',
  B47: 'LAA (U-NII-4)',
  B48: 'CBRS (USA)',
  B50: 'L-band (EU)',
  B51: 'L-band Extension (EU)',
  B53: 'S-Band',
  B65: 'Extended IMT',
  B66: 'Extended AWS (AWS-1 to 3)',
  B67: '700 MHz EU SDL',
  B69: 'IMT-E SDL',
  B70: 'Supplementary AWS (AWS-2 to 4)',
  B71: 'USA Digital Dividend',
  B72: 'EU PMR 450',
  B73: 'APT PMR 450',
  B74: 'Lower L-Band (USA)',
  B75: 'L-Band SDL (EU)',
  B76: 'L-Band SDL Extension (EU)',
  B85: 'Extended Lower SMH',
  B87: 'APT PMR 410',
  B88: 'EU PMR 410',
  B103: 'Upper SMH',
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
