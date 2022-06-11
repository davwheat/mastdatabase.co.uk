import type { ArfcnDataItem, DENetworkOperator, SimpleArfcnDataItem } from '..'

function mapListToBand(band: number, list: SimpleArfcnDataItem<DENetworkOperator>[]): ArfcnDataItem<DENetworkOperator>[] {
  const newList = list as ArfcnDataItem<DENetworkOperator>[]

  return newList.map(x => {
    x.band = band
    return x
  })
}

const n1: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 431070,
    bandwidth: 10,
    operator: 'Telekom',
    description: '10 MHz DSS n1 deployment',
  },
]

// const n3: SimpleArfcnDataItem<DKNetworkOperator>[] = [
//   {
//     arfcn: 371570,
//     bandwidth: 5,
//     operator: 'Telia-Telenor',
//     description: '5 MHz shared n3 deployment',
//   },
// ]

// const n28: SimpleArfcnDataItem<DKNetworkOperator>[] = [
//   {
//     arfcn: 155050,
//     bandwidth: 15,
//     operator: 'TDC',
//     description: '15 MHz n28 deployment. Base nationwide 5G NR layer.',
//   },
// ]

const n78: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 628800,
    bandwidth: 90,
    operator: 'Vodafone DE',
    description: 'n78 deployment',
  },
  {
    arfcn: 629952,
    bandwidth: 90,
    operator: 'Vodafone DE',
    description: 'n78 deployment',
  },
  {
    arfcn: 631968,
    bandwidth: 90,
    operator: 'Vodafone DE',
    description: 'n78 deployment',
  },
  {
    arfcn: 633312,
    bandwidth: 50,
    operator: '1&1',
    description: 'n78 deployment',
  },
  {
    arfcn: 638304,
    bandwidth: 70,
    operator: 'O2 DE',
    description: 'n78 deployment',
  },
  {
    arfcn: 641760,
    bandwidth: 90,
    operator: 'Telekom',
    description: 'n78 deployment',
  },
]

const NRARFCNs: ArfcnDataItem<DENetworkOperator>[] = [
  ...mapListToBand(1, n1),
  ...mapListToBand(78, n78),
  // ...mapListToBand(3, n3),
  // ...mapListToBand(28, n28),
]

export default NRARFCNs
