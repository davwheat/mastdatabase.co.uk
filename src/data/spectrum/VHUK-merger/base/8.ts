import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 925.1,
    endFreq: 930.1,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 880.1,
      endFreq: 885.1,
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
  },
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 935.1,
    endFreq: 947.5,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 890.1,
      endFreq: 902.5,
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 947.5,
    endFreq: 959.9,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 902.5,
      endFreq: 914.9,
    },
  },
]

export default data
