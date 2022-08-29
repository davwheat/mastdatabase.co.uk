import { atom } from 'recoil'

export const MasteDatabasenFilterAtom = atom<{
  operatorId: string | null
  technologyId: string | null
}>({
  key: 'mastedatabasenFilter',
  default: {
    operatorId: null,
    technologyId: null,
  },
})
