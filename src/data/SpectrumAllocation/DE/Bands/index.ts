import { mapBandAndData } from '@data/SpectrumAllocation'

import Band1 from './1'
import Band3 from './3'
import Band7 from './7'
import Band8 from './8'
import Band20 from './20'
import Band28 from './28'
import Band32 from './32'
import Band38 from './38'
import Band78 from './78'

const AllBands = [
  mapBandAndData('B1', Band1),
  mapBandAndData('B3', Band3),
  mapBandAndData('B7', Band7),
  mapBandAndData('B8', Band8),
  mapBandAndData('B20', Band20),
  mapBandAndData('B28', Band28),
  mapBandAndData('B32', Band32),
  mapBandAndData('B38', Band38),
  mapBandAndData('n78', Band78),
]

export { AllBands }
