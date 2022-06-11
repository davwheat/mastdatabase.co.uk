import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 738

const Band67: ISpectrumAllocation[] = [
  {
    owner: 'TDC',
    freqStart: DLStart,
    freqEnd: DLStart + 20,
    type: 'sdl',
    details: ['Supplemental downlink spectrum deployed to meet coverage requirements to retain spectrum'],
  },
]

export default Band67
