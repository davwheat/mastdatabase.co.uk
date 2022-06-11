import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const Start = 3300

const Band78: ISpectrumAllocation[] = [
  {
    owner: 'TDC',
    freqStart: Start + 110,
    freqEnd: Start + 240,
    type: 'tdd',
    nrarfcns: [630048],
  },
  {
    owner: '3 DK',
    freqStart: Start + 240,
    freqEnd: Start + 360,
    type: 'tdd',
    nrarfcns: [636768],
  },
  {
    owner: 'TT',
    freqStart: Start + 360,
    freqEnd: Start + 500,
    type: 'tdd',
    nrarfcns: [647328],
  },
]

export default Band78
