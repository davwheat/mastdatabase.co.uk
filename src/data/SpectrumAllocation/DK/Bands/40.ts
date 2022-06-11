import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const Start = 2300

const Band40: ISpectrumAllocation[] = [
  {
    owner: 'TDC',
    freqStart: Start,
    freqEnd: Start + 0.2,
    type: 'tdd',
    details: 'Unused spectrum',
  },
  {
    owner: 'TDC',
    freqStart: Start + 0.2,
    freqEnd: Start + 59.8,
    type: 'tdd',
    details: ['Three 20 MHz B40 carriers running as contiguous (collapsed guard bands)'],
    earfcns: [38752, 38950, 39148],
  },
  {
    owner: 'TDC',
    freqStart: Start + 59.8,
    freqEnd: Start + 100,
    type: 'tdd',
    details: 'Unused spectrum gained in 2021',
  },
]

export default Band40
