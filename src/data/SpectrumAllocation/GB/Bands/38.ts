import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const Start = 2570

const Band38: ISpectrumAllocation[] = [
  {
    owner: 'VF',
    freqStart: Start,
    freqEnd: Start + 5,
    type: 'unused',
    details: ['Unused TDD spectrum'],
  },
  {
    owner: 'Vodafone',
    freqStart: Start + 5,
    freqEnd: Start + 25,
    type: 'tdd',
    earfcns: [37900],
  },
  {
    owner: 'O2',
    freqStart: Start + 25,
    freqEnd: Start + 45,
    type: 'tdd',
    earfcns: [38100, 38125],
    details: [
      '38100 uses full 20 MHz spectrum and is used for very new B38 small cells in London',
      '38125 is 15 MHz, skipping the first 5 MHz of this block, primarily used for initial deployments in Northern Ireland',
    ],
  },
  {
    owner: 'O2',
    freqStart: Start + 45,
    freqEnd: Start + 50,
    type: 'unused',
    details: ['Unused TDD spectrum'],
  },
]

export default Band38
