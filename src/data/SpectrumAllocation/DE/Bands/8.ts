import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 925
const ULStart = 880

const Band8: ISpectrumAllocation[] = [
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
    earfcns: [3500],
    details: ['Used for 5 MHz LTE and GSM.'],
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
    earfcns: [3600],
    details: ['Used for 5 MHz LTE and GSM.'],
  },
  {
    owner: 'Telekom',
    freqStart: DLStart + 20,
    freqEnd: DLStart + 35,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 20,
      freqEnd: ULStart + 35,
    },
    earfcns: [3749],
    details: ['Used for 5 MHz LTE and 10 MHz GSM.'],
  },
]

export default Band8
