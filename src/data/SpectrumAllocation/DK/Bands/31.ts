import type { ISpectrumAllocation } from '@components/MobileNetworking/SpectrumMap'

const DLStart = 453
const ULStart = 463

const Band31: ISpectrumAllocation[] = [
  {
    owner: 'Cibicom',
    freqStart: DLStart,
    freqEnd: DLStart + 4.5,
    type: 'fddDown',
    pairedWith: {
      type: 'fddUp',
      freqStart: ULStart,
      freqEnd: ULStart + 4.5,
    },
    details: ['Used for IoT communications'],
  },
]

export default Band31
