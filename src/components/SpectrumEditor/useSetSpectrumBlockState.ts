import { SpectrumEditorAtom } from '@atoms'
import { SpectrumBlock } from 'mobile-spectrum-data/@types'
import { useSetRecoilState } from 'recoil'
import { parseStringAsSpectrumData } from './parseStringAsSpectrumData'
import jsonStableStringify from 'json-stable-stringify-without-jsonify'

export function useSetSpectrumBlockState(dataIndex: number, blockIndex: number) {
  const setSpectrumEditorState = useSetRecoilState(SpectrumEditorAtom)

  return (block: SpectrumBlock | ((block: SpectrumBlock) => SpectrumBlock)) => {
    setSpectrumEditorState(state => {
      const newState = { ...state }

      const originalEditorState = parseStringAsSpectrumData(newState.rawInput)

      if (!originalEditorState) throw Error('Invalid existing state -- bailing out for update')

      originalEditorState[dataIndex].spectrumData[blockIndex] =
        typeof block === 'function' ? block(originalEditorState[dataIndex].spectrumData[blockIndex]) : block

      newState.rawInput = jsonStableStringify(originalEditorState, { space: 2 })

      return newState
    })
  }
}