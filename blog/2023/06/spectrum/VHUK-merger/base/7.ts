import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 2620,
    endFreq: 2640,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 2500,
      endFreq: 2520,
    },
  },
  {
    owner: 'EE',
    startFreq: 2640,
    endFreq: 2690,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 2520,
      endFreq: 2570,
    },
  },
]

export default data
