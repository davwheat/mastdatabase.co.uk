import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

import n78 from './78'

const data: SpectrumBlock[] = [
  // Base list from main n78 dataset
  ...n78.filter(({ startFreq }) => {
    // Exclude blocks where swap is occurring
    return ![3500, 3720, 3760].includes(startFreq)
  }),
  {
    owner: 'VF',
    ownerLongName: 'Vodafone UK',
    startFreq: 3500,
    endFreq: 3540,
    type: 'tdd',
    nrarfcns: [634080],
    details: ['Swapped spectrum with O2'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/mobile-wireless-broadband/below-5ghz',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 3720,
    endFreq: 3800,
    type: 'tdd',
    nrarfcns: [650592],
    details: [
      'New 80 MHz contiguous spectrum after spectrum swap with Vodafone',
      'For live deployment find, see: https://twitter.com/davwheat_/status/1545377169286860806',
    ],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/mobile-wireless-broadband/below-5ghz',
    },
  },
]

export default data
