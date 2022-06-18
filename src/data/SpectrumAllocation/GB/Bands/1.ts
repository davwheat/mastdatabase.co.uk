import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const Band1: ISpectrumAllocation[] = [
  {
    owner: 'Three',
    freqStart: 2110.3,
    freqEnd: 2114.9,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: 1920.3,
      freqEnd: 1924.9,
    },
    uarfcns: [10564],
  },
  {
    owner: 'Three',
    freqStart: 2114.9,
    freqEnd: 2124.9,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: 1924.9,
      freqEnd: 1934.9,
    },
    earfcns: [99, 98],
    uarfcns: [10588],
    details: [
      'UARFCN 10588 is being refarmed for B1 LTE.',
      'EARFCN 98 is used in areas where low-band priorities have been adjusted'
    ],
  },
  {
    owner: 'O2',
    freqStart: 2124.9,
    freqEnd: 2134.9,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: 1934.9,
      freqEnd: 1944.9,
    },
    earfcns: [199],
    uarfcns: [10637, 10661],
    nrarfcns: [425980],
    details: ['B1 3G UMTS is being removed in favour of B1 LTE. 5G NR operating as DSS n1.'],
  },
  {
    owner: 'Vodafone',
    freqStart: 2134.9,
    freqEnd: 2149.7,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: 1944.9,
      freqEnd: 1959.7,
    },
    uarfcns: [10687, 10712, 10736],
    earfcns: [323],
    nrarfcns: [427470, 428190],
    details: ['5G NR operating as DSS n1.', 'For 3G: -687 means max 10 MHz B1 LTE; -712 means max 5 MHz; -736 means no LTE B1.'],
  },
  {
    owner: 'EE',
    freqStart: 2149.7,
    freqEnd: 2154.7,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: 1959.7,
      freqEnd: 1964.7,
    },
    uarfcns: [10761],
  },
  {
    owner: 'EE',
    freqStart: 2154.7,
    freqEnd: 2169.7,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: 1964.7,
      freqEnd: 1979.7,
    },
    earfcns: [599],
    nrarfcns: [431810, 433250, 432530],
    details: [
      '5G NR operating primarily as DSS n1, with some deployments as pure NR.',
      'Was used for B1 3G UMTS, but this has been refarmed to B1 LTE.',
    ],
  },
]

export default Band1
