import { SpectrumData } from 'mobile-spectrum-data/@types'

export function parseStringAsSpectrumData(rawInput: string): SpectrumData[] | null {
  let data: SpectrumData[]

  try {
    data = JSON.parse(rawInput)
  } catch {
    return null
  }

  return data
}
