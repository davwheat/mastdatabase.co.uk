import { atom } from 'recoil'

export const MasteDatabasenMapOptionsAtom = atom<{
  operatorId: string | null
  technologyId: string | null
  frequencyBand: string | null
  showEnbOnLabel: boolean
}>({
  key: 'mastedatabasenMapOptions',
  default: {
    operatorId: null,
    technologyId: null,
    frequencyBand: null,

    showEnbOnLabel: false,
  },
})
