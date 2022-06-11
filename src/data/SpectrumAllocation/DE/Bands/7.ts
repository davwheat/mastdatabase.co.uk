import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 2620
const ULStart = 2500

const Band7: ISpectrumAllocation[] = [
  {
    owner: 'Vodafone',
    freqStart: DLStart,
    freqEnd: DLStart + 20,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart,
      freqEnd: ULStart + 20,
    },
    earfcns: [2850],
  },
  {
    owner: 'Telekom',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 40,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 40,
    },
    earfcns: [3050],
  },
  {
    owner: '1&1',
    freqStart: DLStart + 40,
    freqEnd: DLStart + 50,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 40,
      freqEnd: ULStart + 50,
    },
    earfcns: [3200],
  },
  {
    owner: 'O2',
    freqStart: DLStart + 50,
    freqEnd: DLStart + 70,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 60,
      freqEnd: ULStart + 50,
    },
    earfcns: [3350],
  },
]

export default Band7
