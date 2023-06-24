import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    startFreq: 2300,
    endFreq: 2310,
    type: 'generic',
    sourceInfo: {
      type: 'url',
      url: 'https://static.ofcom.org.uk/static/spectrum/map.html',
    },
  },
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    startFreq: 2310,
    endFreq: 2340,
    type: 'tdd',
    details: ['Spectrum earmarked for use within the Emergency Services Network.'],
    sourceInfo: {
      type: 'url',
      url: 'https://static.ofcom.org.uk/static/spectrum/map.html',
    },
  },
  {
    owner: 'ESN',
    ownerLongName: 'Emergency Services Network',
    startFreq: 2340,
    endFreq: 2350,
    type: 'tdd',
    details: [
      'Spectrum used for Emergency Services Network Air-to-Ground coverage.',
      'B40 5 MHz LTE carrier centred on 2345 MHz currently deployed.',
      'Vehicle-mounted gateway small cells are being considered for use within this spectrum.',
    ],
    earfcns: [39100],
    sourceInfo: {
      type: 'url',
      url: 'https://static.ofcom.org.uk/static/spectrum/map.html',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 2350,
    endFreq: 2390,
    type: 'tdd',
    details: 'Split into two 20 MHz carriers.',
    earfcns: [39250, 39448],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0021/114267/SA-2.3-GHz-LICENCE-Telefonica-1151571.pdf',
    },
  },
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    startFreq: 2390,
    endFreq: 2400,
    type: 'generic',
    details: ['Vehicle-mounted gateway small cells for Emergency Services Network are being considered for use within this spectrum.'],
    sourceInfo: {
      type: 'url',
      url: 'https://static.ofcom.org.uk/static/spectrum/map.html',
    },
  },
]

export default data
