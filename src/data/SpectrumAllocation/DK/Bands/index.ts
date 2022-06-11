import { mapBandAndData } from '@data/SpectrumAllocation'

import Band1 from './1'
import Band3 from './3'
import Band7 from './7'
import Band8 from './8'
import Band20 from './20'
import Band28 from './28'
import Band31 from './31'
import Band32_75_76 from './32_75_76'
import Band38 from './38'
import Band40 from './40'
import Band67 from './67'
import Band78 from './78'
import Band257_258 from './257_258'

const AllBands = [
  mapBandAndData('B1', Band1),
  mapBandAndData('B3', Band3),
  mapBandAndData('B7', Band7),
  mapBandAndData('B8', Band8),
  mapBandAndData('B20', Band20),
  mapBandAndData('B28', Band28),
  mapBandAndData('B31', Band31),
  mapBandAndData(['B32', 'B75', 'B76'], Band32_75_76),
  mapBandAndData('B38', Band38),
  mapBandAndData('B40', Band40),
  mapBandAndData('B67', Band67),
  mapBandAndData('n78', Band78),
  mapBandAndData(['n257', 'n258'], Band257_258),
]

export { AllBands }
