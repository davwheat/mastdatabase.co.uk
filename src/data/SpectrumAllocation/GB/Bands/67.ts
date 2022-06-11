import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 738

const Band67: ISpectrumAllocation[] = [
  {
    owner: 'EE',
    freqStart: DLStart,
    freqEnd: DLStart + 20,
    type: 'unused',
    details: ['Unused supplemental downlink spectrum'],
  },
]

export default Band67
