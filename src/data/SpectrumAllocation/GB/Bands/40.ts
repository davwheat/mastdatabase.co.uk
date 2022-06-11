import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const Band40: ISpectrumAllocation[] = [
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    freqStart: 2300,
    freqEnd: 2350,
    type: 'unknown',
  },
  {
    owner: 'O2',
    freqStart: 2350,
    freqEnd: 2390,
    type: 'tdd',
    details: 'Split into two 20 MHz carriers.',
    earfcns: [39250, 39448],
  },
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    freqStart: 2390,
    freqEnd: 2400,
    type: 'unknown',
  },
]

export default Band40
