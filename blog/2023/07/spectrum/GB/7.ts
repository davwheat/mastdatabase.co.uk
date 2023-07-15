import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'Vodafone',
    ownerLongName: 'Vodafone UK',
    startFreq: 2620,
    endFreq: 2640,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 2500,
      endFreq: 2520,
    },
    earfcns: [2850],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0026/83546/SA-800-2.6-LICENCE-Vodafone-0943538.pdf',
    },
  },
  {
    owner: 'EE',
    startFreq: 2640,
    endFreq: 2655,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 2520,
      endFreq: 2535,
    },
    earfcns: [3029, 3026],
    nrarfcns: [529490],
    details: [
      "Tertiary B7 carrier, accessed via BT's ownership of EE",
      '3026 used for EE B7 on small cells.',
      'In use for initial EE n7 deployment at 15 MHz, to increase to 30 MHz then 50 MHz in the future.',
    ],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0020/249131/SA-2.6-GHz-LICENCE-EE-1191194-09-11-22.pdf',
    },
  },
  {
    owner: 'EE',
    startFreq: 2655,
    endFreq: 2670,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 2535,
      endFreq: 2550,
    },
    earfcns: [3179],
    details: 'Secondary B7 carrier',
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0021/249132/SA-800-2.6-LICENCE-EE-0943533-09-11-22.pdf',
    },
  },
  {
    owner: 'EE',
    startFreq: 2670,
    endFreq: 2690,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 2550,
      endFreq: 2570,
    },
    earfcns: [3350],
    details: 'Primary B7 carrier',
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0021/249132/SA-800-2.6-LICENCE-EE-0943533-09-11-22.pdf',
    },
  },
]

export default data
