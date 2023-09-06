import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'ESN',
    ownerLongName: 'Emergency Services Network (EE)',
    startFreq: 1899.9,
    endFreq: 1909.9,
    type: 'tdd',
    details: [
      'Spectrum held by EE, utilised for Emergency Services Network gateway coverage with LTE-TDD.',
      'Was historically used by Orange PCS for a UMTS-TDD trial in cooperation with Vodafone and H3G in Bristol.',
    ],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0022/249133/SA-2100-LICENCE-EE-1268473-09-11-22.pdf',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 1909.9,
    endFreq: 1914.9,
    type: 'tdd',
    details: ['Only permitted for use with 3G technologies, as per UK IR 2019.'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0026/249137/SA-2100-LICENCE-Telefonica-UK-1268476-11-11-22.pdf',
    },
  },
  {
    owner: 'Three',
    startFreq: 1914.9,
    endFreq: 1920.0,
    type: 'tdd',
    details: ['Only permitted for use with 3G technologies, as per UK IR 2019.'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0023/249134/SA-2100-LICENCE-H3G-1268475-18-11-22.pdf',
    },
  },
]

export default data
