import type { ArfcnDataItem, SimpleArfcnDataItem, DKNetworkOperator } from '..'

function mapListToBand(band: number, list: SimpleArfcnDataItem<DKNetworkOperator>[]): ArfcnDataItem<DKNetworkOperator>[] {
  const newList = list as ArfcnDataItem<DKNetworkOperator>[]

  return newList.map(x => {
    x.band = band
    return x
  })
}

const B1: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 50,
    bandwidth: 10,
    operator: '3 DK',
    description: 'Standard B1 deployment',
  },
  {
    arfcn: 300,
    bandwidth: 20,
    operator: 'TDC',
    description: 'Standard B1 deployment',
  },
  {
    arfcn: 500,
    bandwidth: 20,
    operator: 'Telia-Telenor',
    description: 'Standard B1 deployment',
  },
]

const B3: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 1300,
    bandwidth: 20,
    operator: 'TDC',
    description: 'Standard B3 deployment',
  },
  {
    arfcn: 1500,
    bandwidth: 20,
    operator: '3 DK',
    description: 'Standard B3C1 deployment',
  },
  {
    arfcn: 1644,
    bandwidth: 10,
    operator: '3 DK',
    description: 'Standard B3C2 deployment',
  },
  {
    arfcn: 1850,
    bandwidth: 20,
    operator: 'Telia-Telenor',
    description: 'Standard B3 deployment',
  },
]

const B7: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 2850,
    bandwidth: 20,
    operator: 'TDC',
    description: 'Standard B7 deployment',
  },
  {
    arfcn: 3000,
    bandwidth: 10,
    operator: '3 DK',
    description: 'Standard B7 deployment',
  },
  {
    arfcn: 3150,
    bandwidth: 20,
    operator: 'Telia-Telenor',
    description: 'Standard B7C1 deployment',
  },
  {
    arfcn: 3348,
    bandwidth: 20,
    operator: 'Telia-Telenor',
    description: 'Standard B7C2 deployment',
  },
]

const B8: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 3500,
    bandwidth: 10,
    operator: 'Telia-Telenor',
    description: 'Standard B8 deployment',
  },
  {
    arfcn: 3700,
    bandwidth: 10,
    operator: '3 DK',
    description: 'Standard B8 deployment',
  },
]

const B20: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 6350,
    bandwidth: 20,
    operator: 'TDC',
    description: 'Standard B20 deployment',
  },
  {
    arfcn: 6200,
    bandwidth: 10,
    operator: 'Telia-Telenor',
    description: 'Standard B20 deployment',
  },
]

const B28: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 9335,
    bandwidth: 5,
    operator: 'Telia-Telenor',
    description: 'Standard B28 deployment',
  },
  {
    arfcn: 9260,
    bandwidth: 10,
    operator: '3 DK',
    description: 'Standard B28 deployment',
  },
]

const B38: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 37900,
    bandwidth: 20,
    operator: '3 DK',
    description: 'Standard B38 deployment',
  },
]

const B40: SimpleArfcnDataItem<DKNetworkOperator>[] = [
  {
    arfcn: 38752,
    bandwidth: 20,
    operator: 'TDC',
    description: 'Standard B40C1 deployment',
  },
  {
    arfcn: 38950,
    bandwidth: 20,
    operator: 'TDC',
    description: 'Standard B40C2 deployment',
  },
  {
    arfcn: 39148,
    bandwidth: 20,
    operator: 'TDC',
    description: 'Standard B40C3 deployment',
  },
]

const EARFCNs: ArfcnDataItem<DKNetworkOperator>[] = [
  ...mapListToBand(1, B1),
  ...mapListToBand(3, B3),
  ...mapListToBand(7, B7),
  ...mapListToBand(8, B8),
  ...mapListToBand(20, B20),
  ...mapListToBand(28, B28),
  ...mapListToBand(38, B38),
  ...mapListToBand(40, B40),
]

export default EARFCNs
