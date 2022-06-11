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
    nrarfcns: [152690],
    details: ['LTE or NR, no DSS'],
  },
  {
    owner: 'Telekom',
    freqStart: DLStart + 10,
    freqEnd: DLStart + 20,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 10,
      freqEnd: ULStart + 20,
    },
    nrarfcns: [154570],
  },
  {
    owner: 'Vodafone',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 30,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 30,
    },
    earfcns: [9460],
    nrarfcns: [156510],
    details: ['LTE/NR DSS'],
  },
]

export default Band28
