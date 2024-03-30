import CoverageProvider from '@components/Maps/UkCoverageMap/Providers/CoverageProvider'
import { atom } from 'recoil'

interface ISplitScreenCoverageMapSettings {
  layers: {
    provider: CoverageProvider<true | false>
    selectedLayer: string
    selectedVersion: string
  }[]
}

export const SplitScreenCoverageMapAtom = atom<ISplitScreenCoverageMapSettings>({
  key: 'splitScreenCoverageMapSettingsAtom',
  default: {
    layers: [],
  },
  dangerouslyAllowMutability: true,
})
