import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 791
const ULStart = 832

const Band20: ISpectrumAllocation[] = [
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
    earfcns: [6200],
  },
  {
    owner: 'TDC',
    freqStart: DLStart + 10,
    freqEnd: DLStart + 30,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 10,
      freqEnd: ULStart + 30,
    },
    earfcns: [6350],
  },
]

export default Band20
