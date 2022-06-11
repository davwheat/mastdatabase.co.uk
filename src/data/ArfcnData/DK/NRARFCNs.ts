import type { ArfcnDataItem, DKNetworkOperator, SimpleArfcnDataItem } from '..'

function mapListToBand(band: number, list: SimpleArfcnDataItem<DKNetworkOperator>[]): ArfcnDataItem<DKNetworkOperator>[] {
  const newList = list as ArfcnDataItem<DKNetworkOperator>[]

  return newList.map(x => {
    x.band = band
    return x
  })
}

const n1: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 423411,
    bandwidth: 10,
    operator: '3 DK',
    description: 'E/// 10 MHz DSS n1 deployment',
  },
]

const n3: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 371570,
    bandwidth: 5,
    operator: 'Telia-Telenor',
    description: '5 MHz shared n3 deployment',
  },
]

const n28: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 155050,
    bandwidth: 15,
    operator: 'TDC',
    description: '15 MHz n28 deployment. Base nationwide 5G NR layer.',
  },
]

const n78: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 630048,
    bandwidth: 100,
    operator: 'TDC',
    description: 'E/// 100 MHz n78 deployment',
  },
  {
    arfcn: 636768,
    bandwidth: 100,
    operator: '3 DK',
    description: 'E/// 100 MHz standard n78 deployment',
  },
  {
    arfcn: 647328,
    bandwidth: 100,
    operator: 'Telia-Telenor',
    description: '100 MHz shared n78 deployment',
  },
]

const NRARFCNs: ArfcnDataItem<DKNetworkOperator>[] = [
  ...mapListToBand(1, n1),
  ...mapListToBand(3, n3),
  ...mapListToBand(28, n28),
  ...mapListToBand(78, n78),
]

export default NRARFCNs
