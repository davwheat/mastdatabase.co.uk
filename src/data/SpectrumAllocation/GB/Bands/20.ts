import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 791
const ULStart = 832

const Band20: ISpectrumAllocation[] = [
  {
    owner: 'Three',
    freqStart: DLStart,
    freqEnd: DLStart + 5,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart,
      freqEnd: ULStart + 5,
    },
    earfcns: [6175],
  },
  {
    owner: 'EE',
    freqStart: DLStart + 5,
    freqEnd: DLStart + 10,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 5,
      freqEnd: ULStart + 10,
    },
    earfcns: [6225],
  },
  {
    owner: 'Vodafone',
    freqStart: DLStart + 10,
    freqEnd: DLStart + 20,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 10,
      freqEnd: ULStart + 20,
    },
    earfcns: [6300],
  },
  {
    owner: 'O2',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 30,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 30,
    },
    earfcns: [6400],
  },
]

export default Band20
