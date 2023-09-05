import Band1 from './1'
import Band3 from './3'
import Band7 from './7'
import Band8 from './8'
import Band20 from './20'
import Band28 from './28'
import Band32 from './32'
import Band38 from './38'
import Band39 from './39'
import Band40 from './40'
import Band67 from './67'
import Band77 from './77'
import Band78 from './78'

import type { SpectrumData } from 'mobile-spectrum-data/@types'

const data: SpectrumData[] = [
  {
    names: ['B1', 'n1'],
    spectrumData: Band1,
  },
  {
    names: ['B3', 'n3'],
    spectrumData: Band3,
  },
  {
    names: ['B7', 'n7'],
    spectrumData: Band7,
  },
  {
    names: ['B8', 'n8'],
    spectrumData: Band8,
  },
  {
    names: ['B20'],
    spectrumData: Band20,
  },
  {
    names: ['B28', 'n28'],
    spectrumData: Band28,
  },
  {
    names: ['B32'],
    spectrumData: Band32,
  },
  {
    names: ['B38'],
    spectrumData: Band38,
  },
  {
    names: ['B39'],
    spectrumData: Band39,
  },
  {
    names: ['B40'],
    spectrumData: Band40,
  },
  {
    names: ['B67'],
    spectrumData: Band67,
  },
  {
    names: ['n77'],
    spectrumData: Band77,
  },
  {
    names: ['n78'],
    spectrumData: Band78,
  },
]

export default data

export const changesOnly: SpectrumData[] = [
  {
    names: ['B1', 'n1'],
    spectrumData: Band1,
  },
  {
    names: ['B3', 'n3'],
    spectrumData: Band3,
  },
  {
    names: ['B20'],
    spectrumData: Band20,
  },
  {
    names: ['B32'],
    spectrumData: Band32,
  },
  {
    names: ['B38'],
    spectrumData: Band38,
  },
  {
    names: ['n78'],
    spectrumData: Band78,
  },
]
