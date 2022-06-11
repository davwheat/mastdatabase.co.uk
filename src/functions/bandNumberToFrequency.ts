const bandFreqs = {
  B1: 2100,
  B3: 1800,
  B7: 2300,
  B8: 900,
  B20: 800,
  B28: 700,
  B29: 700,
  B31: 450,
  B32: 1500,
  B38: 2600,
  B40: 2600,
  B67: 700,
  n77: 3700,
  n78: 3500,
  n79: 4700,
}

export default function bandNumberToFrequency(band: number | string): number {
  if (typeof band === 'string') Object.keys(bandFreqs).includes(band) || (band = parseInt(band.substring(1)))

  return bandFreqs[band] ?? -1
}
