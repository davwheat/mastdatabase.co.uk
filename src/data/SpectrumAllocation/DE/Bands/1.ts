import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 2110
const ULStart = 1920

const Band1: ISpectrumAllocation[] = [
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
    earfcns: [100],
  },
  {
    owner: 'O2',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 40,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 40,
    },
    earfcns: [300],
  },
  {
    owner: 'Telekom',
    freqStart: DLStart + 40,
    freqEnd: DLStart + 60,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 40,
      freqEnd: ULStart + 60,
    },
    earfcns: [500],
    nrarfcns: [431070],
    details: ['LTE/NR DSS'],
  },
]

export default Band1
