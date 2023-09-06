import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    startFreq: 2300,
    endFreq: 2310,
    type: 'generic',
  },
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    startFreq: 2310,
    endFreq: 2340,
    type: 'tdd',
  },
  {
    owner: 'ESN',
    ownerLongName: 'Emergency Services Network',
    startFreq: 2340,
    endFreq: 2350,
    type: 'tdd',
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 2350,
    endFreq: 2390,
    type: 'tdd',
  },
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    startFreq: 2390,
    endFreq: 2400,
    type: 'generic',
  },
]

export default data
