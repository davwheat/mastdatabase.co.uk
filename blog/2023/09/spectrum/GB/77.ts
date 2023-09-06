import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

const data: SpectrumBlock[] = [
  {
    owner: 'Private',
    startFreq: 3800,
    endFreq: 3925,
    type: 'tdd',
    earfcns: [],
    nrarfcns: [],
    details: [
      "Available for licensing by private operators through Ofcom's Shared Access License programme.",
      'Used by Telet Research for private and multi-operator neutral host deployments.',
    ],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/shared-access',
    },
  },
  {
    owner: 'Three',
    ownerLongName: 'Three (license inherited from UK Broadband)',
    startFreq: 3925,
    endFreq: 4009,
    type: 'tdd',
    details: ['Spectrum is not yet used for commerical n77 5G NR.', 'Issued for compliance with IR 2015.1 and IR 2015.2.'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0018/249120/SA-3.9-GHz-LICENCE-UK-Broadband-1295901-01-11-22.pdf',
    },
  },
  {
    owner: 'Private',
    startFreq: 4009,
    endFreq: 4200,
    type: 'tdd',
    earfcns: [],
    nrarfcns: [],
    details: [
      "Available for licensing by private operators through Ofcom's Shared Access License programme.",
      'Used by Telet Research for private and multi-operator neutral host deployments.',
    ],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/shared-access',
    },
  },
]

export default data
