import { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

export function mapBandAndData(number: number | string | number[] | string[], data: ISpectrumAllocation[]) {
  return { band: number, data }
}
