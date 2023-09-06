import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'VF',
    ownerLongName: 'Vodafone UK',
    startFreq: 2570,
    endFreq: 2575,
    type: 'tdd',
    details: ['Unused TDD spectrum'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0026/83546/SA-800-2.6-LICENCE-Vodafone-0943538.pdf',
    },
  },
  {
    owner: 'Vodafone',
    ownerLongName: 'Vodafone UK',
    startFreq: 2575,
    endFreq: 2595,
    type: 'tdd',
    earfcns: [37900],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0026/83546/SA-800-2.6-LICENCE-Vodafone-0943538.pdf',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 2595,
    endFreq: 2615,
    type: 'tdd',
    earfcns: [38100, 38125],
    details: [
      '38100 uses full 20 MHz spectrum and is used for very new B38 small cells in London',
      '38125 is 15 MHz, skipping the first 5 MHz of this block, primarily used for initial deployments in Northern Ireland',
    ],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0019/206920/SA-2.6-LICENCE-Telefonica-1238565.pdf',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 2615,
    endFreq: 2620,
    type: 'tdd',
    details: ['Unused TDD spectrum'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0019/206920/SA-2.6-LICENCE-Telefonica-1238565.pdf',
    },
  },
]

export default data
