import { StatusMessages } from '@components/Maps/UkSitesMap/MapStatusMessages'
import { atom } from 'recoil'

export const UkSitesMapStatusMessagesAtom = atom<StatusMessages>({
  key: 'ukSitesMapStatusMessages',
  default: {
    loading: false,
    fetchFail: false,
    upstreamError: false,
  },
})
