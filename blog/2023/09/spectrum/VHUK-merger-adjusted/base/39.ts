import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'ESN',
    ownerLongName: 'Emergency Services Network (EE)',
    startFreq: 1899.9,
    endFreq: 1909.9,
    type: 'tdd',
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 1909.9,
    endFreq: 1914.9,
    type: 'tdd',
  },
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 1914.9,
    endFreq: 1920.0,
    type: 'tdd',
    details: ['Only permitted for use with 3G technologies, as per UK IR 2019.'],
  },
]

export default data
