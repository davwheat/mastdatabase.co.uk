import { SpectrumEditorAtom } from '@atoms'
import { useRecoilValue } from 'recoil'
import { parseStringAsSpectrumData } from './parseStringAsSpectrumData'

export function useParsedSpectrumState() {
  const { rawInput } = useRecoilValue(SpectrumEditorAtom)

  return parseStringAsSpectrumData(rawInput)
}
