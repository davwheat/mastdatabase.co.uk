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
    owner: 'EE',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 35,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 35,
    },
    earfcns: [3029, 3026],
    nrarfcns: [529490],
    details: [
      "Tertiary B7 carrier, accessed via BT's ownership of EE",
      '3026 used for EE B7 on small cells.',
      'In use for initial EE n7 deployment at 15 MHz, to increase to 30 MHz then 50 MHz in the future.',
    ],
  },
  {
    owner: 'EE',
    freqStart: DLStart + 35,
    freqEnd: DLStart + 50,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 35,
      freqEnd: ULStart + 50,
    },
    earfcns: [3179],
    details: 'Secondary B7 carrier',
  },
  {
    owner: 'EE',
    freqStart: DLStart + 50,
    freqEnd: DLStart + 70,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 50,
      freqEnd: ULStart + 70,
    },
    earfcns: [3350],
    details: 'Primary B7 carrier',
  },
]

export default Band7
