import dayjs from 'dayjs'
import { atom } from 'recoil'
import { persistentAtom } from 'recoil-persistence/react'

export interface IStreetworksMapPersistentSettingsState {
  /**
   * Render the map with SVG path elements for higher performance.
   */
  useBetaHighPerfMode: boolean
}

export interface IStreetworksMapSettingsState {
  streetworksStartDate: number
  streetworksEndDate: number
}

export const StreetworksMapPersistentSettingsAtom = persistentAtom<IStreetworksMapPersistentSettingsState>({
  key: 'streetworksMapPersistentSettings',
  default: {
    useBetaHighPerfMode: false,
  },
})

export const StreetworksMapSettingsAtom = atom<IStreetworksMapSettingsState>({
  key: 'streetworksMapSettings',
  default: {
    streetworksStartDate: dayjs().startOf('day').valueOf(),
    streetworksEndDate: dayjs().add(180, 'day').endOf('day').valueOf(),
  },
})
