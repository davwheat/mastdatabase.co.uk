import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 791,
    endFreq: 796,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 832,
      endFreq: 837,
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
  },
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 801,
    endFreq: 811,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 842,
      endFreq: 852,
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
  },
]

export default data
