import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 1805.1,
    endFreq: 1810.9,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 1710.1,
      endFreq: 1715.9,
    },
  },
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 1810.9,
    endFreq: 1831.7,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 1715.9,
      endFreq: 1736.7,
    },
  },
  {
    owner: 'EE',
    startFreq: 1831.7,
    endFreq: 1876.7,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 1736.7,
      endFreq: 1781.7,
    },
  },
  {
    owner: 'SAL',
    ownerLongName: 'Shared Access Licence',
    startFreq: 1876.7,
    endFreq: 1880,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      startFreq: 1781.7,
      endFreq: 1785,
    },
  },
]

export default data
