import type { ArfcnDataItem, SimpleArfcnDataItem, DENetworkOperator } from '..'

function mapListToBand(band: number, list: SimpleArfcnDataItem<DENetworkOperator>[]): ArfcnDataItem<DENetworkOperator>[] {
  const newList = list as ArfcnDataItem<DENetworkOperator>[]

  return newList.map(x => {
    x.band = band
    return x
  })
}

const B1: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 100,
    bandwidth: 20,
    operator: 'Vodafone DE',
    description: 'Standard B1 deployment',
  },
  {
    arfcn: 300,
    bandwidth: [10, 15, 20],
    operator: 'O2 DE',
    description: 'Standard B1 deployment',
  },
  {
    arfcn: 500,
    bandwidth: 20,
    operator: 'Telekom',
    description: 'Standard B1 deployment',
  },
]

const B3: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 1300,
    bandwidth: 20,
    operator: 'Telekom',
    description: 'Standard B3C1 deployment',
  },
  {
    arfcn: 1444,
    bandwidth: 10,
    operator: 'Telekom',
    description: 'Standard B3C2 deployment',
  },
  {
    arfcn: 1600,
    bandwidth: [5, 10, 15, 20],
    operator: 'O2 DE',
    description: 'Standard B3 deployment',
  },
  {
    arfcn: 1801,
    bandwidth: 20,
    operator: 'Vodafone DE',
    description: 'Standard B3 deployment',
  },
]

const B7: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 2850,
    bandwidth: 20,
    operator: 'Vodafone DE',
    description: 'Standard B7 deployment',
  },
  {
    arfcn: 3050,
    bandwidth: 20,
    operator: 'Telekom',
    description: 'Standard B7 deployment',
  },
  {
    arfcn: 3350,
    bandwidth: 20,
    operator: 'O2 DE',
    description: 'Standard B7 deployment',
  },
]

const B8: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 3500,
    bandwidth: [5, 6.5],
    operator: 'O2 DE',
    description: 'Standard B8 deployment. Old sites sometimes 6.5 MHz, signalled as 10 MHz (missing RBs)',
  },
  {
    arfcn: 3600,
    bandwidth: 5,
    operator: 'Vodafone DE',
    description: 'Standard B8 deployment',
  },
  {
    arfcn: 3749,
    bandwidth: 5,
    operator: 'Telekom',
    description: 'Standard B8 deployment',
  },
]

const B20: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 6200,
    bandwidth: 10,
    operator: 'O2 DE',
    description: 'Standard B20 deployment',
  },
  {
    arfcn: 6300,
    bandwidth: 10,
    operator: 'Vodafone DE',
    description: 'Standard B20 deployment',
  },
  {
    arfcn: 6400,
    bandwidth: 10,
    operator: 'Telekom',
    description: 'Standard B20 deployment',
  },
]

const B28: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 9260,
    bandwidth: 10,
    operator: 'O2 DE',
    description: 'B28 - mostly refarmed to N28',
  },
  {
    arfcn: 9460,
    bandwidth: 10,
    operator: 'Vodafone DE',
    description: 'Standard B28/n28 DSS deployment',
  },
]

const B32: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 10020,
    bandwidth: 20,
    operator: 'Telekom',
    description: 'Standard B32 SDL deployment',
  },
  {
    arfcn: 10220,
    bandwidth: 20,
    operator: 'Vodafone DE',
    description: 'Standard B32 SDL deployment',
  },
]

const B38: SimpleArfcnDataItem<DENetworkOperator>[] = [
  {
    arfcn: 37975,
    bandwidth: 20,
    operator: 'Vodafone DE',
    description: 'Standard B38 deployment',
  },
]

const EARFCNs: ArfcnDataItem<DENetworkOperator>[] = [
  ...mapListToBand(1, B1),
  ...mapListToBand(3, B3),
  ...mapListToBand(7, B7),
  ...mapListToBand(8, B8),
  ...mapListToBand(20, B20),
  ...mapListToBand(28, B28),
  ...mapListToBand(32, B32),
  ...mapListToBand(38, B38),
]

export default EARFCNs
