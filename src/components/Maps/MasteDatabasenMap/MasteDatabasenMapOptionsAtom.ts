import { atom } from 'recoil'

export const MasteDatabasenMapOptionsAtom = atom<{
  operatorId: string | null
  technologyId: string | null
  predict3DkEnb: boolean
}>({
  key: 'mastedatabasenMapOptions',
  default: {
    operatorId: null,
    technologyId: null,

    predict3DkEnb: false,
  },
})
