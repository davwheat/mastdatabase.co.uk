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
    owner: 'VF',
    ownerLongName: 'Vodafone UK',
    startFreq: 3410,
    endFreq: 3460,
    type: 'tdd',
    nrarfcns: [627648, 627932, 628032, 628320, 628588, 629332],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0016/114271/SA-3.4-GHz-LICENCE-Vodafone-1151573-16-11-22.pdf',
    },
  },
  {
    owner: 'Three',
    startFreq: 3460,
    endFreq: 3500,
    type: 'tdd',
    nrarfcns: [631392, 632666],
    details: ['Second half inherited from UK Broadband aquisition', "This 40 MHz now being used for NR CA alongside Three's 100 MHz spectrum"],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/mobile-wireless-broadband/below-5ghz',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 3500,
    endFreq: 3540,
    type: 'tdd',
    nrarfcns: [633696, 634080, 634366, 634656, 634666],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0015/114270/SA-3.4-GHz-LICENCE-Telefonica-1257246.pdf',
    },
  },
  {
    owner: 'EE',
    startFreq: 3540,
    endFreq: 3580,
    type: 'tdd',
    nrarfcns: [636334, 636344, 636384, 636960, 637334],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0022/114268/SA-3.4-GHz-LICENCE-EE-1151563.pdf',
    },
  },
  {
    owner: 'Three',
    ownerLongName: 'Three (license inherited from UK Broadband)',
    startFreq: 3580,
    endFreq: 3680,
    type: 'tdd',
    nrarfcns: [640548, 641376],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/mobile-wireless-broadband/below-5ghz#table62973',
    },
  },
  {
    owner: 'EE',
    startFreq: 3680,
    endFreq: 3720,
    type: 'tdd',
    nrarfcns: [646272, 646656],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0026/221966/SA-3.6-GHz-LICENCE-EE-1248066.pdf',
    },
  },
  {
    owner: 'VF',
    ownerLongName: 'Vodafone UK',
    startFreq: 3720,
    endFreq: 3760,
    type: 'tdd',
    details: ['Unused pending spectrum swap'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0022/221755/SA-3.6-GHz-LICENCE-Vodafone-1257250.pdf',
    },
  },
  {
    owner: 'O2',
    ownerLongName: 'O2 UK',
    startFreq: 3760,
    endFreq: 3800,
    type: 'tdd',
    details: ['Unused pending spectrum swap'],
    sourceInfo: {
      type: 'url',
      url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0020/221960/SA-3.6-GHz-LICENCE-Telefonica-1248095.pdf',
    },
  },
]

export default data
