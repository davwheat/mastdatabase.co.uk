// WTR licence data

type WtrFilters = {
  product: string
  frequency: string
  frequencyBand: string
  antennaType: string
  licensee: string
  colourBy: 'licensee' | 'product'
}

type FilterOptions = {
  products: string[]
  frequencyBands: number[]
  antennaTypes: string[]
  licensees: string[]
}

type WtrMeta = {
  dataVersion: string
  lastUpdated: string
  recordCount: number
  linkCount: number
}

export type { WtrFilters, FilterOptions, WtrMeta }
