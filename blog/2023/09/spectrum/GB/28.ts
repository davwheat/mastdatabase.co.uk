import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 758,
    endFreq: 768,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 703,
      endFreq: 713,
    },
    earfcns: [9260],
    nrarfcns: [152210, 152690],
    details: ['Limited LTE use, primarily in central London and in Northern Ireland', 'Mainly being used for new suburban 5G NR deployments'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0028/221959/SA-700-LICENCE-Telefonica-1248094.pdf',
    },
  },
  {
    owner: 'Three',
    startFreq: 768,
    endFreq: 778,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 713,
      endFreq: 723,
    },
    earfcns: [9360],
    nrarfcns: [154570],
    details: ['Limited n28 DSS deployment'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0031/221899/SA-700-LICENCE-H3G-1248067-18-05-21.pdf',
    },
  },
  {
    owner: 'EE',
    startFreq: 778,
    endFreq: 788,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 723,
      endFreq: 733,
    },
    nrarfcns: [156510],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0025/221965/SA-700-LICENCE-EE-1248065.pdf',
    },
  },
]

export default data
