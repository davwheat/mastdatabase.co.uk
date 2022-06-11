import { ISpectrumAllocation, OwnerColorMap } from '@components/MobileNetworking/SpectrumMap'

const Start = 3300

const Band78: ISpectrumAllocation[] = [
  {
    owner: 'MoD',
    ownerLongName: 'Ministry of Defence',
    freqStart: Start + 100,
    freqEnd: Start + 110,
    type: 'unknown',
  },
  {
    owner: 'VF',
    freqStart: Start + 110,
    freqEnd: Start + 160,
    type: 'tdd',
    nrarfcns: [627648, 627932, 628032, 628320, 628588, 629332],
  },
  {
    owner: '3',
    ownerLongName: 'Three',
    colorOverride: OwnerColorMap.Three,
    freqStart: Start + 160,
    freqEnd: Start + 200,
    type: 'tdd',
    nrarfcns: [631392, 632666],
    details: [
      'Second half inherited from UK Broadband aquisition',
      "This 40 MHz now being used for NR CA trials alongside Three's 100 MHz spectrum",
    ],
  },
  {
    owner: 'O2',
    freqStart: Start + 200,
    freqEnd: Start + 240,
    type: 'tdd',
    nrarfcns: [633696, 634366, 634656, 634666],
  },
  {
    owner: 'EE',
    freqStart: Start + 240,
    freqEnd: Start + 280,
    type: 'tdd',
    nrarfcns: [636334, 636344, 636384, 636960],
  },
  {
    owner: 'Three',
    ownerLongName: 'Three (license inherited from UK Broadband)',
    colorOverride: OwnerColorMap.Three,
    freqStart: Start + 280,
    freqEnd: Start + 380,
    type: 'tdd',
    nrarfcns: [640548, 641376],
  },
  {
    owner: 'EE',
    freqStart: Start + 380,
    freqEnd: Start + 420,
    type: 'tdd',
    nrarfcns: [646656],
  },
  {
    owner: 'VF',
    freqStart: Start + 420,
    freqEnd: Start + 460,
    type: 'unused',
    details: ['Unused pending spectrum swap'],
  },
  {
    owner: 'O2',
    freqStart: Start + 460,
    freqEnd: Start + 500,
    type: 'unused',
    details: ['Unused pending spectrum swap'],
  },
]

export default Band78
