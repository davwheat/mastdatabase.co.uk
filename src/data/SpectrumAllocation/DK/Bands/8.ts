import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 925
const ULStart = 880

const Band8: ISpectrumAllocation[] = [
  {
    owner: 'TT',
    freqStart: DLStart,
    freqEnd: DLStart + 10,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart,
      freqEnd: ULStart + 10,
    },
    earfcns: [3500],
    uarfcns: [2940],
    arfcns: 'ARFCNs 1011-1023, 0',
    details: ['Primarily being used as LTE in some areas, such as southern Sjaeland.'],
  },
  {
    owner: 'TDC',
    freqStart: DLStart + 10,
    freqEnd: DLStart + 20,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 10,
      freqEnd: ULStart + 20,
    },
    arfcns: 'ARFCNs 2-7, 30-50',
    uarfcns: [2993, 2997],
  },
  {
    owner: '3 DK',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 35,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 35,
    },
    earfcns: [3700],
    uarfcns: [3087],
  },
]

export default Band8
