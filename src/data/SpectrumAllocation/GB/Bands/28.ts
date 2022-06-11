import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 758
const ULStart = 703

const Band28: ISpectrumAllocation[] = [
  {
    owner: 'O2',
    freqStart: DLStart,
    freqEnd: DLStart + 10,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart,
      freqEnd: ULStart + 10,
    },
    earfcns: [9260],
    nrarfcns: [152210, 152690],
    details: ['Limited LTE use, primarily in central London', 'Mainly being used for new suburban 5G NR deployments'],
  },
  {
    owner: 'Three',
    freqStart: DLStart + 10,
    freqEnd: DLStart + 20,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 10,
      freqEnd: ULStart + 20,
    },
    earfcns: [9360],
  },
  {
    owner: 'EE',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 30,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 30,
    },
    nrarfcns: [156510],
  },
]

export default Band28
