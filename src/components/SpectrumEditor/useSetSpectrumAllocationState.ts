import { SpectrumEditorAtom } from '@atoms'
import { SpectrumData } from 'mobile-spectrum-data/@types'
import { useSetRecoilState } from 'recoil'
import { parseStringAsSpectrumData } from './parseStringAsSpectrumData'
import jsonStableStringify from 'json-stable-stringify-without-jsonify'

export function useSetSpectrumAllocationState(dataIndex: number) {
  const setSpectrumEditorState = useSetRecoilState(SpectrumEditorAtom)

  return (allocation: SpectrumData | ((allocation: SpectrumData) => SpectrumData)) => {
    setSpectrumEditorState(state => {
      const newState = { ...state }

      const originalEditorState = parseStringAsSpectrumData(newState.rawInput)

      if (!originalEditorState) throw Error('Invalid existing state -- bailing out for update')

      originalEditorState[dataIndex] = typeof allocation === 'function' ? allocation(originalEditorState[dataIndex]) : allocation

      newState.rawInput = jsonStableStringify(originalEditorState, { space: 2 })

      return newState
    })
  }
}
