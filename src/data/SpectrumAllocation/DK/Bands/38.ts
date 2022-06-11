import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const Start = 2570

const Band38: ISpectrumAllocation[] = [
  {
    owner: '3 DK',
    freqStart: Start,
    freqEnd: Start + 25,
    type: 'tdd',
    earfcns: [37900],
    details: ['New TDD capacity layer deployed in high-traffic Copenhagen areas'],
  },
  {
    owner: 'TT',
    freqStart: Start + 25,
    freqEnd: Start + 50,
    type: 'tdd',
    details: ['Unused'],
  },
]

export default Band38
