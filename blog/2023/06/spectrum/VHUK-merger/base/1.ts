import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 2110.3,
    endFreq: 2124.9,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 1920.3,
      endFreq: 1934.9,
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 2124.9,
    endFreq: 2134.9,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 1934.9,
      endFreq: 1944.9,
    },
  },
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 2134.9,
    endFreq: 2149.7,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 1944.9,
      endFreq: 1959.7,
    },
  },
  {
    owner: 'EE',
    startFreq: 2149.7,
    endFreq: 2169.7,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 1959.7,
      endFreq: 1979.7,
    },
  },
]

export default data
