import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 1452

const Band32: ISpectrumAllocation[] = [
  {
    owner: 'Telekom',
    freqStart: DLStart,
    freqEnd: DLStart + 20,
    type: 'sdl',
    details: ['L-Band B32'],

    earfcns: [10020],
  },
  {
    owner: 'Vodafone',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 40,
    type: 'sdl',
    details: ['L-Band B32'],
    earfcns: [10220],
  },
]

export default Band32
