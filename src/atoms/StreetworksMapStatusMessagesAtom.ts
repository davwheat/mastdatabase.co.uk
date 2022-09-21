import { StatusMessages } from '@components/Maps/StreetworksMap/MapStatusMessages'
import { atom } from 'recoil'

export const StreetworksMapStatusMessagesAtom = atom<StatusMessages>({
  key: 'streetworksMapStatusMessages',
  default: {
    loading: false,
    fetchFail: false,
    upstreamError: false,
    tooManyPoints: false,
    settingsError: false,
  },
})
