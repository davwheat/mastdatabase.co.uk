import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'Vodafone',
    ownerLongName: 'Vodafone UK',
    startFreq: 1452,
    endFreq: 1472,
    type: 'sdl',
    earfcns: [10020],
    details: ['Supplemental downlink (must be aggregated with another carrier)'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0018/85005/SA-1452-1472-LICENCE-Vodafone-1053632.pdf',
    },
  },
  {
    owner: 'Three',
    startFreq: 1472,
    endFreq: 1492,
    type: 'sdl',
    earfcns: [10195, 10220],
    details: ['Supplemental downlink (must be aggregated with another carrier)'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0028/84826/SA-1472-1492-LICENCE-H3G-1053624-18-05-18.pdf',
    },
  },
]

export default data
