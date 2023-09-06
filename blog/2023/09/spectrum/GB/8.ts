import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'Vodafone',
    ownerLongName: 'Vodafone UK',
    startFreq: 925.1,
    endFreq: 930.1,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 880.1,
      endFreq: 885.1,
    },
    arfcns: 'uncommon - ARFCNs 975, 976, ...',
    uarfcns: [2938],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0025/83572/Cellular-LICENCE-Vodafone-0249664.pdf',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 930.1,
    endFreq: 935.1,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 885.1,
      endFreq: 890.1,
    },
    arfcns: 'uncommon',
    uarfcns: [2963],
    details: ['Standard 3G 900 MHz band'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0021/84045/Cellular-LICENCE-Telefonica-UK-0249663.pdf',
    },
  },
  {
    owner: 'VF',
    ownerLongName: 'Vodafone UK',
    startFreq: 935.1,
    endFreq: 937.5,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 890.1,
      endFreq: 892.5,
    },
    arfcns: 'ARFCNs 1-12',
    details: ['Standard 2G 900 MHz band', 'Some 4G deployments overlap into this spectrum, such as EARFCN 3610'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0025/83572/Cellular-LICENCE-Vodafone-0249664.pdf',
    },
  },
  {
    owner: 'Vodafone',
    ownerLongName: 'Vodafone UK',
    startFreq: 937.5,
    endFreq: 947.5,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 892.5,
      endFreq: 902.5,
    },
    arfcns: 'uncommon - ARFCNs around 60',
    uarfcns: [3012],
    earfcns: [3610, 3620, 3623, 3624, 3625],
    nrarfcns: [188450],
    details: [
      '2G/3G is being refarmed into 4G, with 3G moving to the lower 5 MHz block and 2G to the 2.4 MHz block',
      'Many different 4G EARFCNs to cover the same spectrum',
      "Also now being used for Vodafone's private 5G SA network",
    ],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0025/83572/Cellular-LICENCE-Vodafone-0249664.pdf',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 947.5,
    endFreq: 957.5,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 902.5,
      endFreq: 912.5,
    },
    uarfcns: [3050],
    earfcns: [3725],
    details: ['3G is being refarmed into 4G, with 3G moving to the lower 5 MHz block', 'Many different 4G EARFCNs to cover the same spectrum'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0021/84045/Cellular-LICENCE-Telefonica-UK-0249663.pdf',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 957.5,
    endFreq: 959.9,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 912.5,
      endFreq: 914.9,
    },
    arfcns: 'ARFCNs 113-124',
    details: ['Standard 2G 900 MHz band'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0021/84045/Cellular-LICENCE-Telefonica-UK-0249663.pdf',
    },
  },
]

export default data
