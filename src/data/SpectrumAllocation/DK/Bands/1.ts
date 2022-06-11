import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 2110
const ULStart = 1920

const Band1: ISpectrumAllocation[] = [
  {
    owner: '3 DK',
    freqStart: DLStart,
    freqEnd: DLStart + 10,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart,
      freqEnd: ULStart + 10,
    },
    earfcns: [50],
    nrarfcns: [423411],
    details: ['LTE B1/NR n1 DSS 10 MHz deployment'],
  },
  {
    owner: '3 DK',
    freqStart: DLStart + 10,
    freqEnd: DLStart + 20,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 10,
      freqEnd: ULStart + 20,
    },
    uarfcns: [10562, 10587, 10612, 10637],
  },
  {
    owner: 'TDC',
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
    owner: 'TT',
    freqStart: DLStart + 40,
    freqEnd: DLStart + 60,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 40,
      freqEnd: ULStart + 60,
    },
    earfcns: [500],
  },
]

export default Band1
