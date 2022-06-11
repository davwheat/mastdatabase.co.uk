import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const Start = 3300

const Band78: ISpectrumAllocation[] = [
  {
    owner: 'Vodafone',
    freqStart: Start,
    freqEnd: Start + 90,
    type: 'tdd',
    nrarfcns: [628800, 629952, 631968],
  },
  {
    owner: '1&1',
    freqStart: Start + 90,
    freqEnd: Start + 140,
    type: 'tdd',
    nrarfcns: [633312],
  },
  {
    owner: 'O2',
    freqStart: Start + 140,
    freqEnd: Start + 210,
    type: 'tdd',
    nrarfcns: [638304],
  },
  {
    owner: 'Telekom',
    freqStart: Start + 210,
    freqEnd: Start + 300,
    type: 'tdd',
    nrarfcns: [641760],
  },
  {
    owner: 'Regional licenses',
    freqStart: Start + 300,
    freqEnd: Start + 400,
    type: 'tdd',
  },
]

export default Band78
