import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 1452

const Band32: ISpectrumAllocation[] = [
  {
    owner: 'Vodafone',
    freqStart: DLStart,
    freqEnd: DLStart + 20,
    type: 'sdl',
    earfcns: [10020],
    details: ['Supplemental downlink (must be aggregated with another carrier)'],
  },
  {
    owner: 'Three',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 40,
    type: 'sdl',
    earfcns: [10195, 10220],
    details: ['Supplemental downlink (must be aggregated with another carrier)'],
  },
]

export default Band32
