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
  },
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 768,
    endFreq: 778,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 713,
      endFreq: 723,
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
  },
]

export default data
