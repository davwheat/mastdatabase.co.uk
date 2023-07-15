import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    startFreq: 3400,
    endFreq: 3410,
    type: 'generic',
  },
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 3410,
    endFreq: 3540,
    type: 'tdd',
  },
  {
    owner: 'EE',
    startFreq: 3540,
    endFreq: 3580,
    type: 'tdd',
  },
  {
    owner: 'VHUK',
    ownerLongName: 'Vodafone Hutchison UK',
    startFreq: 3580,
    endFreq: 3680,
    type: 'tdd',
  },
  {
    owner: 'EE',
    startFreq: 3680,
    endFreq: 3720,
    type: 'tdd',
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 3720,
    endFreq: 3800,
    type: 'tdd',
  },
]

export default data
