export type GBNetworkOperator = 'O2' | 'Vodafone' | 'EE' | 'Three' | 'Three (UK Broadband)'
export type DKNetworkOperator = 'TDC' | '3 DK' | 'Telia-Telenor'
export type DENetworkOperator = 'Vodafone DE' | 'O2 DE' | 'Telekom' | '1&1'

export interface ArfcnDataItem<CountryOperators extends string> {
  band: number
  arfcn: number
  operator: CountryOperators
  description: string
  /**
   * Bandwidth in MHz
   */
  bandwidth?: number | number[]
}

export interface SimpleArfcnDataItem<Country extends string = string> extends Omit<ArfcnDataItem<Country>, 'band'> {}
