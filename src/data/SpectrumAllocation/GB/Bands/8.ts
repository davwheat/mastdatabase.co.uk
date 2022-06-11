import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 925.1
const ULStart = 880.1

const Band8: ISpectrumAllocation[] = [
  {
    owner: 'Vodafone',
    freqStart: DLStart,
    freqEnd: DLStart + 5,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart,
      freqEnd: ULStart + 5,
    },
    arfcns: 'uncommon',
    uarfcns: [2938],
  },
  {
    owner: 'O2',
    freqStart: DLStart + 5,
    freqEnd: DLStart + 10,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 5,
      freqEnd: ULStart + 10,
    },
    arfcns: 'uncommon',
    uarfcns: [2963],
    details: ['Standard 3G 900 MHz band'],
  },
  {
    owner: 'VF',
    freqStart: DLStart + 10,
    freqEnd: DLStart + 12.4,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 10,
      freqEnd: ULStart + 12.4,
    },
    arfcns: 'ARFCNs 1-12',
    details: ['Standard 2G 900 MHz band', 'Some 4G deployments overlap into this spectrum, such as EARFCN 3610'],
  },
  {
    owner: 'Vodafone',
    freqStart: DLStart + 12.4,
    freqEnd: DLStart + 22.4,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 12.4,
      freqEnd: ULStart + 22.4,
    },
    uarfcns: [3012],
    earfcns: [3610, 3620, 3623, 3624, 3625],
    nrarfcns: [188450],
    details: [
      '3G is being refarmed into 4G, with 3G moving to the lower 5 MHz block',
      'Many different 4G EARFCNs to cover the same spectrum',
      "Also now being used for Vodafone's private 5G SA network",
    ],
  },
  {
    owner: 'O2',
    freqStart: DLStart + 22.4,
    freqEnd: DLStart + 32.4,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 22.4,
      freqEnd: ULStart + 32.4,
    },
    uarfcns: [3050],
    earfcns: [3725],
    details: ['3G is being refarmed into 4G, with 3G moving to the lower 5 MHz block', 'Many different 4G EARFCNs to cover the same spectrum'],
  },
  {
    owner: 'O2',
    freqStart: DLStart + 32.4,
    freqEnd: DLStart + 34.8,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart + 32.4,
      freqEnd: ULStart + 34.8,
    },
    arfcns: 'ARFCNs 113-124',
    details: ['Standard 2G 900 MHz band'],
  },
]

export default Band8
