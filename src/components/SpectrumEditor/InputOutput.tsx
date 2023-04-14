import { saveAs } from 'file-saver'
import jsonStableStringify from 'json-stable-stringify-without-jsonify'

export function readJsonFromFile(fileSelected: (file: File) => void) {
  const inp = document.createElement('input')
  inp.setAttribute('type', 'file')
  inp.setAttribute('accept', '.json,application/json')

  inp.addEventListener('change', () => {
    if (inp.files?.length !== 1) {
      alert('Error: No file selected for import.')
      return
    }

    fileSelected(inp.files[0])
  })

  inp.click()
}

export function saveJsonToFile(jsonData: object) {
  try {
    const jsonString = jsonStableStringify(jsonData, { space: 2 })

    saveAs(new Blob([jsonString]), 'spectrum-data.json')
  } catch {
    alert('Error: Invalid JSON')
  }
}
