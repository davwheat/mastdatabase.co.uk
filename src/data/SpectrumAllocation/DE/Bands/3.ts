import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 1805
const ULStart = 1710

const Band3: ISpectrumAllocation[] = [
  {
    owner: 'Telekom',
    freqStart: DLStart,
    freqEnd: DLStart + 30,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart,
      freqEnd: ULStart + 30,
    },
    earfcns: [1300, 1444],
  },
  {
    owner: 'O2',
    freqStart: DLStart + 30,
    freqEnd: DLStart + 50,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 30,
      freqEnd: ULStart + 50,
    },
    earfcns: [1600],
  },
  {
    owner: 'Vodafone',
    freqStart: DLStart + 50,
    freqEnd: DLStart + 70,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 50,
      freqEnd: ULStart + 70,
    },
    earfcns: [1801],
  },
  {
    owner: 'Vodafone',
    freqStart: DLStart + 70,
    freqEnd: DLStart + 75,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 70,
      freqEnd: ULStart + 75,
    },
  },
]

export default Band3
