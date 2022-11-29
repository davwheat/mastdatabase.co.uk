import { SpectrumEditorAtom } from '@atoms'
import { SpectrumBlock } from 'mobile-spectrum-data/@types'
import { useSetRecoilState } from 'recoil'
import { parseStringAsSpectrumData } from './parseStringAsSpectrumData'
import jsonStableStringify from 'json-stable-stringify-without-jsonify'

export function useSetSpectrumBlockState(dataIndex: number, blockIndex: number) {
  const setSpectrumEditorState = useSetRecoilState(SpectrumEditorAtom)

  return (block: SpectrumBlock | null | ((block: SpectrumBlock) => SpectrumBlock | null)) => {
    setSpectrumEditorState(state => {
      debugger

      const newState = { ...state }

      const originalEditorState = parseStringAsSpectrumData(newState.rawInput)

      if (!originalEditorState) throw Error('Invalid existing state -- bailing out for update')

      const newData = typeof block === 'function' ? block(originalEditorState[dataIndex].spectrumData[blockIndex]) : block

      if (newData === null) {
        originalEditorState[dataIndex].spectrumData.splice(blockIndex, 1)
      } else {
        originalEditorState[dataIndex].spectrumData[blockIndex] = newData
      }

      newState.rawInput = jsonStableStringify(originalEditorState, { space: 2 })

      return newState
    })
  }
}
