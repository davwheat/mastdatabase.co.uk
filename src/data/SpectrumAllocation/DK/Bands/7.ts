import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 2620
const ULStart = 2500

const Band7: ISpectrumAllocation[] = [
  {
    owner: 'TDC',
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
    owner: '3 DK',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 30,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 30,
    },
    earfcns: [3000],
  },
  {
    owner: 'TT',
    ownerLongName: 'TT (Telia)',
    freqStart: DLStart + 30,
    freqEnd: DLStart + 50,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 30,
      freqEnd: ULStart + 50,
    },
    earfcns: [3150],
    details: ['Telia-Telenor B7C1'],
  },
  {
    owner: 'TT',
    ownerLongName: 'TT (Telenor)',
    freqStart: DLStart + 50,
    freqEnd: DLStart + 70,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 50,
      freqEnd: ULStart + 70,
    },
    earfcns: [3348],
    details: ['Telia-Telenor B7C2'],
  },
]

export default Band7
