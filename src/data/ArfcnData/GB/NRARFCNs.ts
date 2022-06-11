import type { ArfcnDataItem, SimpleArfcnDataItem } from '..'

function mapListToBand(band: number, list: SimpleArfcnDataItem[]): ArfcnDataItem[] {
  const newList = list as ArfcnDataItem[]

  return newList.map(x => {
    x.band = band
    return x
  })
}

const n1: SimpleArfcnDataItem[] = [
  {
    arfcn: 431810,
    bandwidth: 15,
    operator: 'EE',
    description: 'NR + LTE DSS - trial deployment',
  },
  {
    arfcn: 432530,
    bandwidth: 15,
    operator: 'EE',
    description: 'NR only trial (may also be used for DSS) - trial deployment',
  },
  {
    arfcn: 433250,
    bandwidth: 15,
    operator: 'EE',
    description: 'NR + LTE DSS - trial deployment',
  },
  {
    arfcn: 425980,
    bandwidth: 10,
    operator: 'O2',
    description: 'E/// - NR + LTE DSS - limited trial deployment',
  },
  {
    arfcn: 428190,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'Huawei - NR + LTE DSS - limited trial deployment',
  },
  {
    arfcn: 427470,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'E/// - NR + LTE DSS - limited trial deployment',
  },
]

const n3: SimpleArfcnDataItem[] = [
  {
    arfcn: 374190,
    bandwidth: 10,
    operator: 'EE',
    description: 'non-DSS n3 trial',
  },
  {
    arfcn: 374210,
    bandwidth: 10,
    operator: 'EE',
    description: 'non-DSS n3 trial',
  },
  {
    arfcn: 374280,
    bandwidth: 10,
    operator: 'EE',
    description: 'non-DSS n3 trial',
  },
]

const n7: SimpleArfcnDataItem[] = [
  {
    arfcn: 529490,
    bandwidth: 15,
    operator: 'EE',
    description: 'n7 NR only trial deployment',
  },
]

const n8: SimpleArfcnDataItem[] = [
  {
    arfcn: 188450,
    bandwidth: 10,
    operator: 'Vodafone',
    description: 'n8 NR SA trial deployment - not accessible to personal customers',
  },
]

const n28: SimpleArfcnDataItem[] = [
  {
    arfcn: 156510,
    bandwidth: 10,
    operator: 'EE',
    description: 'Standard n28 deployment',
  },
  {
    arfcn: 152210,
    bandwidth: 10,
    operator: 'O2',
    description: 'E/// - standard n28 deployment',
  },
  {
    arfcn: 152690,
    bandwidth: 10,
    operator: 'O2',
    description: 'Nokia - standard n28 deployment',
  },
]

const n78: SimpleArfcnDataItem[] = [
  {
    arfcn: 628032,
    bandwidth: 20,
    operator: 'Vodafone',
    description: 'All vendors - 20 MHz n78 deployment',
  },
  {
    arfcn: 629332,
    bandwidth: 40,
    operator: 'Vodafone',
    description: 'Huawei @ 40 MHz or E/// @ 50 MHz -  n78 deployment (in 50 MHz allocation)',
  },
  {
    arfcn: 628588,
    bandwidth: 40,
    operator: 'Vodafone',
    description: 'Huawei - 40 MHz n78 deployment (in 50 MHz allocation)',
  },
  {
    arfcn: 628320,
    bandwidth: 40,
    operator: 'Vodafone',
    description: 'E/// - 40 MHz n78 deployment (in 50 MHz allocation)',
  },
  {
    arfcn: 627648,
    bandwidth: 50,
    operator: 'Vodafone',
    description: 'E/// - 50 MHz n78 deployment',
  },
  {
    arfcn: 627932,
    bandwidth: 50,
    operator: 'Vodafone',
    description: 'Huawei - 50 MHz n78 deployment',
  },
  {
    arfcn: 631392,
    bandwidth: 40,
    operator: 'Three',
    description: 'E/// NR CA n78 deployment - limited trial areas',
  },
  {
    arfcn: 632666,
    bandwidth: 20,
    operator: 'Three',
    description: 'Huawei NR CA n78 deployment - limited trial areas',
  },
  {
    arfcn: 633696,
    bandwidth: 40,
    operator: 'O2',
    description: 'Huawei or E/// - Standard n78 deployment - primary carrier (n78C1)',
  },
  {
    arfcn: 634656,
    bandwidth: 40,
    operator: 'O2',
    description: 'Nokia - Standard n78 deployment - primary carrier (n78C1)',
  },
  {
    arfcn: 634666,
    bandwidth: 40,
    operator: 'O2',
    description: 'E/// - Standard n78 deployment - primary carrier (n78C1)',
  },
  {
    arfcn: 634366,
    bandwidth: 20,
    operator: 'O2',
    description: 'E/// - 20 MHz n78 deployment - primary carrier (n78C1)',
  },
  {
    arfcn: 636334,
    bandwidth: 40,
    operator: 'EE',
    description: 'Huawei - Standard n78 deployment - primary carrier (n78C1)',
  },
  {
    arfcn: 636344,
    bandwidth: 40,
    operator: 'EE',
    description: 'Nokia - Standard n78 deployment - primary carrier (n78C1)',
  },
  {
    arfcn: 636384,
    bandwidth: 40,
    operator: 'EE',
    description: 'E/// - Standard n78 deployment - primary carrier (n78C1)',
  },
  {
    arfcn: 636960,
    bandwidth: 40,
    operator: 'EE',
    description: 'Nokia - Standard (rarer) n78 deployment - primary carrier (n78C1)',
  },
  {
    arfcn: 646656,
    bandwidth: 40,
    operator: 'EE',
    description: 'E/// - Standard n78 deployment - secondary carrier (n78C2)',
  },
  {
    arfcn: 640548,
    bandwidth: 100,
    operator: 'Three',
    description: 'Standard n78 deployment - vast majority of cells within 100 MHz block (even if only 40-90 MHz bandwidth)',
  },
  {
    arfcn: 641376,
    bandwidth: 100,
    operator: 'Three',
    description: 'New E/// 100 MHz n78 deployment',
  },
]

const NRARFCNs: ArfcnDataItem[] = [
  ...mapListToBand(1, n1),
  ...mapListToBand(3, n3),
  ...mapListToBand(7, n7),
  ...mapListToBand(8, n8),
  ...mapListToBand(28, n28),
  ...mapListToBand(78, n78),
]

export default NRARFCNs
