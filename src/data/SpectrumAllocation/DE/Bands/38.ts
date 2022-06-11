import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const Start = 2570

const Band38: ISpectrumAllocation[] = [
  {
    owner: 'O2',
    freqStart: Start,
    freqEnd: Start + 10,
    type: 'tdd',
    details: ['Unused'],
  },
  {
    owner: 'Vodafone',
    freqStart: Start + 10,
    freqEnd: Start + 35,
    type: 'tdd',
    earfcns: [37975],
    details: ['Used for FWA, not actively deployed anymore.'],
  },
  {
    owner: 'Telekom',
    freqStart: Start + 35,
    freqEnd: Start + 40,
    type: 'tdd',
    details: ['Unused, bought to prevent Vodafone from having full 30 MHz for 38C.'],
  },
  {
    owner: 'O2',
    freqStart: Start + 40,
    freqEnd: Start + 50,
    type: 'tdd',
    details: ['Unused'],
  },
]

export default Band38
