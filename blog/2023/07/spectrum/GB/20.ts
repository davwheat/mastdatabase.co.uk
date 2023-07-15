import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'Three',
    startFreq: 791,
    endFreq: 796,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 832,
      endFreq: 837,
    },
    earfcns: [6175],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0035/83897/SA-800-LICENCE-H3G-0943535.pdf',
    },
  },
  {
    owner: 'EE',
    startFreq: 796,
    endFreq: 801,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 837,
      endFreq: 842,
    },
    earfcns: [6225],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0021/249132/SA-800-2.6-LICENCE-EE-0943533-09-11-22.pdf',
    },
  },
  {
    owner: 'Vodafone',
    ownerLongName: 'Vodafone UK',
    startFreq: 801,
    endFreq: 811,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 842,
      endFreq: 852,
    },
    earfcns: [6300],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0026/83546/SA-800-2.6-LICENCE-Vodafone-0943538.pdf',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 811,
    endFreq: 821,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 852,
      endFreq: 862,
    },
    earfcns: [6400],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0028/83872/SA-800-LICENCE-Telefonica-UK-0943537.pdf',
    },
  },
]

export default data
