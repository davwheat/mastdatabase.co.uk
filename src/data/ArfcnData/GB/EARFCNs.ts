import type { ArfcnDataItem, SimpleArfcnDataItem } from '..'

function mapListToBand(band: number, list: SimpleArfcnDataItem[]): ArfcnDataItem[] {
  const newList = list as ArfcnDataItem[]

  return newList.map(x => {
    x.band = band
    return x
  })
}

const B1: SimpleArfcnDataItem[] = [
  {
    arfcn: 99,
    bandwidth: 10,
    operator: 'Three',
    description: 'Standard B1 deployment',
  },
  {
    arfcn: 199,
    bandwidth: 10,
    operator: 'O2',
    description: 'Refarmed 3G',
  },
  {
    arfcn: 299,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'Partial 3G refarm (UARFCNs 10712 and 10687)',
  },
  {
    arfcn: 323,
    bandwidth: 15,
    operator: 'Vodafone',
    description: 'Full 3G refarm',
  },
  {
    arfcn: 347,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'Partial 3G refarm (UARFCNs 10736 and 10712)',
  },
  {
    arfcn: 522,
    bandwidth: 15,
    operator: 'EE',
    description: 'Standard B1 deployment',
  },
]

const B3: SimpleArfcnDataItem[] = [
  {
    arfcn: 1815,
    bandwidth: 20,
    operator: 'EE',
    description: 'Standard B3 deployment - widened version of EARFCN 1788',
  },
  {
    arfcn: 1808,
    bandwidth: 10,
    operator: 'EE',
    description: 'Small cell standard B3 deployment',
  },
  {
    arfcn: 1788,
    bandwidth: 15,
    operator: 'EE',
    description: 'Standard B3 deployment - widened version of EARFCN 1761',
  },
  {
    arfcn: 1761,
    bandwidth: 10,
    operator: 'EE',
    description: 'Standard B3 deployment - replaced EARFCN 1811',
  },
  {
    arfcn: 1617,
    bandwidth: 20,
    operator: 'EE',
    description: 'Standard B3 deployment - used as part of typical 35 MHz B3 deployment',
  },
  {
    arfcn: 1392,
    bandwidth: 15,
    operator: 'Three',
    description: 'Standard B3 deployment - base coverage layer',
  },
  {
    arfcn: 1288,
    bandwidth: 5,
    operator: 'Vodafone',
    description: 'Standard B3 deployment',
  },
  {
    arfcn: 1228,
    bandwidth: 5,
    operator: 'O2',
    description: 'Small cell or DAS standard B3 deployment',
  },
  {
    arfcn: 1226,
    bandwidth: 5,
    operator: 'O2',
    description: 'Macrocell standard B3 deployment',
  },
]

const B7: SimpleArfcnDataItem[] = [
  {
    arfcn: 3350,
    bandwidth: 20,
    operator: 'EE',
    description: 'Standard B7 deployment',
  },
  {
    arfcn: 3179,
    bandwidth: 15,
    operator: 'EE',
    description: 'Standard B7 deployment',
  },
  {
    arfcn: 3029,
    bandwidth: 15,
    operator: 'EE',
    description: 'Standard B7 deployment',
  },
  {
    arfcn: 3026,
    bandwidth: 15,
    operator: 'EE',
    description: 'Small cell standard B7 deployment',
  },
  {
    arfcn: 3152,
    bandwidth: 20,
    operator: 'EE',
    description: 'Standard B7 deployment - widened version of EARFCN 3179',
  },
  {
    arfcn: 2850,
    bandwidth: 20,
    operator: 'Vodafone',
    description: 'Standard B7 deployment',
  },
]

const B8: SimpleArfcnDataItem[] = [
  {
    arfcn: 3610,
    bandwidth: 10,
    operator: 'Vodafone',
    description: '[Deprecated] B8 deployment on London Underground',
  },
  {
    arfcn: 3620,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'Uncommon B8 deployment',
  },
  {
    arfcn: 3623,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'Standard B8 deployment',
  },
  {
    arfcn: 3624,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'Standard B8 deployment',
  },
  {
    arfcn: 3625,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'Standard B8 deployment',
  },
  {
    arfcn: 3700,
    bandwidth: 5,
    operator: 'O2',
    description: 'Standard B8 deployment - 5 MHz 3G refarm',
  },
  {
    arfcn: 3725,
    bandwidth: 10,
    operator: 'O2',
    description: 'Standard B8 deployment - 10 MHz 3G refarm',
  },
]

const B20: SimpleArfcnDataItem[] = [
  {
    arfcn: 6400,
    bandwidth: 10,
    operator: 'O2',
    description: 'Standard B20 deployment',
  },
  {
    arfcn: 6300,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'Standard B20 deployment',
  },
  {
    arfcn: 6225,
    bandwidth: 5,
    operator: 'Three',
    description: 'Standard B20 deployment',
  },
  {
    arfcn: 6175,
    bandwidth: 5,
    operator: 'EE',
    description: 'Standard B20 deployment',
  },
]

const B28: SimpleArfcnDataItem[] = [
  {
    arfcn: 9260,
    bandwidth: 10,
    operator: 'O2',
    description: 'Standard B28 deployment',
  },
  {
    arfcn: 9360,
    bandwidth: 10,
    operator: 'Three',
    description: 'Standard B28 deployment',
  },
]

const B32: SimpleArfcnDataItem[] = [
  {
    arfcn: 10195,
    bandwidth: 20,
    operator: 'Three',
    description: 'Rare 10 MHz B32 deployment - downlink only (SDL)',
  },
  {
    arfcn: 10220,
    bandwidth: 20,
    operator: 'Three',
    description: 'Standard B32 deployment - downlink only (SDL)',
  },
  {
    arfcn: 10020,
    bandwidth: 20,
    operator: 'Vodafone',
    description: 'Standard B32 deployment - downlink only (SDL)',
  },
]

const B38: SimpleArfcnDataItem[] = [
  {
    arfcn: 38125,
    bandwidth: 15,
    operator: 'O2',
    description: 'Standard B38 deployment',
  },
  {
    arfcn: 38100,
    bandwidth: 20,
    operator: 'O2',
    description: 'Standard B38 deployment - widened 20 MHz spectrum',
  },
  {
    arfcn: 37900,
    bandwidth: 20,
    operator: 'Vodafone',
    description: 'Standard B38 deployment',
  },
]

const B40: SimpleArfcnDataItem[] = [
  {
    arfcn: 39250,
    bandwidth: 20,
    operator: 'O2',
    description: 'Standard B40 deployment - primary carrier (B40C1)',
  },
  {
    arfcn: 39448,
    bandwidth: 20,
    operator: 'O2',
    description: 'Standard B40 deployment - secondary carrier (B40C2)',
  },
]

const B42: SimpleArfcnDataItem[] = [
  {
    arfcn: 42490,
    bandwidth: 20,
    operator: 'Three (UK Broadband)',
    description: 'Fixed wireless broadband - carrier 1 - spectrum mainly refarmed for Three n78 5G',
  },
  {
    arfcn: 43490,
    bandwidth: 20,
    operator: 'Three (UK Broadband)',
    description: 'Fixed wireless broadband - carrier 2 - spectrum mainly refarmed for Three n78 5G',
  },
]

const B43: SimpleArfcnDataItem[] = [
  {
    arfcn: 43740,
    bandwidth: 20,
    operator: 'Three (UK Broadband)',
    description: 'Fixed wireless broadband - carrier 3 - spectrum mainly refarmed for Three n78 5G',
  },
  {
    arfcn: 43940,
    bandwidth: 20,
    operator: 'Three (UK Broadband)',
    description: 'Fixed wireless broadband - carrier 4 - spectrum mainly refarmed for Three n78 5G',
  },
  {
    arfcn: 44140,
    bandwidth: 20,
    operator: 'Three (UK Broadband)',
    description: 'Fixed wireless broadband - carrier 5 - spectrum mainly refarmed for Three n78 5G',
  },
  {
    arfcn: 44340,
    bandwidth: 20,
    operator: 'Three (UK Broadband)',
    description: 'Fixed wireless broadband - carrier 6 - spectrum mainly refarmed for Three n78 5G',
  },
]

const EARFCNs: ArfcnDataItem[] = [
  ...mapListToBand(1, B1),
  ...mapListToBand(3, B3),
  ...mapListToBand(7, B7),
  ...mapListToBand(8, B8),
  ...mapListToBand(20, B20),
  ...mapListToBand(28, B28),
  ...mapListToBand(32, B32),
  ...mapListToBand(38, B38),
  ...mapListToBand(40, B40),
  ...mapListToBand(42, B42),
  ...mapListToBand(43, B43),
]

export default EARFCNs
