import { saveAs } from 'file-saver'
import jsonStableStringify from 'json-stable-stringify-without-jsonify'

export async function readJsonFromFile(): Promise<string | void> {
  const inp = document.createElement('input')
  inp.setAttribute('type', 'file')
  inp.setAttribute('accept', '.json,application/json')

  inp.click()

  const files = inp.files

  if (files?.length !== 1) {
    alert('Error: No file selected for import.')
    return
  }

  return await files[0].text()
}

export function saveJsonToFile(jsonData: object) {
  try {
    const jsonString = jsonStableStringify(jsonData, { space: 2 })

    saveAs(new Blob([jsonString]), 'spectrum-data.json')
  } catch {
    alert('Error: Invalid JSON')
  }
}
