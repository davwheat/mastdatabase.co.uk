import { useReducer } from 'react'

export default function useForceRender() {
  const [, forceRender] = useReducer(x => !x, true)

  return forceRender
}
