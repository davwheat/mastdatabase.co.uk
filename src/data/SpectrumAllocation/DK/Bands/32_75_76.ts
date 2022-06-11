import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 1427

const Band32_75_76: ISpectrumAllocation[] = [
  {
    owner: 'TDC',
    freqStart: DLStart,
    freqEnd: DLStart + 5,
    type: 'sdl',
    details: ['Extended L-Band SDL - Band 76'],
  },
  {
    owner: 'TDC',
    freqStart: DLStart + 5,
    freqEnd: DLStart + 25,
    type: 'sdl',
    details: ['Extended L-Band SDL - Band 75'],
  },
  {
    owner: 'TDC',
    freqStart: DLStart + 25,
    freqEnd: DLStart + 45,
    type: 'sdl',
    details: ['L-Band B32'],
  },
  {
    owner: 'TT',
    freqStart: DLStart + 45,
    freqEnd: DLStart + 69,
    type: 'sdl',
    details: ['L-Band B32'],
  },
  {
    owner: 'TT',
    freqStart: DLStart + 69,
    freqEnd: DLStart + 90,
    type: 'sdl',
    details: ['Extended L-Band SDL - Band 75'],
  },
]

export default Band32_75_76
