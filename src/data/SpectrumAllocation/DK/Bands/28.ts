import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 758
const ULStart = 703

const Band28: ISpectrumAllocation[] = [
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
    earfcns: [9260],
  },
  {
    owner: 'TT',
    freqStart: DLStart + 10,
    freqEnd: DLStart + 15,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 10,
      freqEnd: ULStart + 15,
    },
    earfcns: [9335],
  },
  {
    owner: 'TDC',
    freqStart: DLStart + 15,
    freqEnd: DLStart + 30,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 15,
      freqEnd: ULStart + 30,
    },
    nrarfcns: [155050],
    details: ['Used for nationwide 5G NR deployment.'],
  },
]

export default Band28
