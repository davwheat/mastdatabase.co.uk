import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const Start = 24_250

const Band257_258: ISpectrumAllocation[] = [
  {
    owner: 'Private',
    freqStart: Start,
    freqEnd: Start + 400,
    type: 'tdd',
  },
  {
    owner: 'TDC',
    freqStart: Start + 400,
    freqEnd: Start + 1650,
    type: 'tdd',
  },
  {
    owner: 'TT',
    freqStart: Start + 1650,
    freqEnd: Start + 2250,
    type: 'tdd',
  },
  {
    owner: '3 DK',
    freqStart: Start + 2250,
    freqEnd: Start + 3250,
    type: 'tdd',
  },
]

export default Band257_258
