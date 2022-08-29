import { atom } from 'recoil'

export const MasteDatabasenMapOptionsAtom = atom<{
  operatorId: string | null
  technologyId: string | null
  showEnbOnLabel: boolean
}>({
  key: 'mastedatabasenMapOptions',
  default: {
    operatorId: null,
    technologyId: null,

    showEnbOnLabel: false,
  },
})
