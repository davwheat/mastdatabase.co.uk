import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 1805
const ULStart = 1710

const Band3: ISpectrumAllocation[] = [
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
    earfcns: [1300],
  },
  {
    owner: '3 DK',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 50,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 50,
    },
    earfcns: [1500, 1644],
  },
  {
    owner: 'TT',
    freqStart: DLStart + 50,
    freqEnd: DLStart + 55,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 50,
      freqEnd: ULStart + 55,
    },
    arfcns: 'ARFCNs 762 - 773',
  },
  {
    owner: 'TT',
    freqStart: DLStart + 55,
    freqEnd: DLStart + 75,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 55,
      freqEnd: ULStart + 75,
    },
    earfcns: [1850],
  },
]

export default Band3
