import React from 'react'
import { SpectrumEditorAtom } from '@atoms'
import { useRecoilState } from 'recoil'
import Section from '@components/Design/Section'
import TextArea from '@components/Inputs/TextArea'
import { makeStyles } from '@material-ui/core'
import Button from '@components/Inputs/Button'
import { useParsedSpectrumState } from './useParsedSpectrumState'
import { readJsonFromFile, saveJsonToFile } from './InputOutput'
import { useResetRecoilState } from 'recoil'
import SelectDropdown from '@components/Inputs/SelectDropdown'
import * as _AllSpectrumData from 'mobile-spectrum-data'
import { SpectrumData } from 'mobile-spectrum-data/@types'
import jsonStableStringify from 'json-stable-stringify-without-jsonify'

const useStyles = makeStyles({
  root: {
    '& textarea': {
      fontFamily: "'Consolas', 'Courier New', Courier, monospace",
      cursor: 'text',
      minHeight: 200,
      maxHeight: '90vh',
    },
  },
  buttonContainer: {
    display: 'flex',
    marginTop: 16,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 16,
  },
  importDropdown: {
    marginTop: 24,
  },
})

const RegionDisplayNames = new Intl.DisplayNames(['en'], { type: 'region' })

// Filters out non-spectrum data keys (e.g. `utils`)
const AllSpectrumData = Object.entries(_AllSpectrumData).filter(([key]) => key.length === 2) as [string, { default: SpectrumData[] }][]
const AllSpectrumDataSelectOptions = AllSpectrumData.map(([countryCode, data]) => ({
  label: `${RegionDisplayNames.of(countryCode)} (${countryCode})`,
  value: JSON.stringify(data.default),
}))

const AllSelectOptions = [{ label: 'Select a region...', value: '' }, ...AllSpectrumDataSelectOptions]

export function SpectrumEditorSettings() {
  const classes = useStyles()
  const [{ rawInput }, setSpectrumEditorState] = useRecoilState(SpectrumEditorAtom)
  const resetSpectrumEditorState = useResetRecoilState(SpectrumEditorAtom)
  const parsedInput = useParsedSpectrumState()

  return (
    <Section darker width="wider">
      <TextArea
        label="Spectrum data JSON"
        helpText="You cannot type into this textbox."
        // @ts-expect-error-next-line
        readOnly
        onInput={() => {}}
        className={classes.root}
        value={rawInput}
        onClick={e => {
          e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
          e.currentTarget.focus()
        }}
      />

      <div className={classes.buttonContainer}>
        <Button
          onClick={() => {
            readJsonFromFile().then(text => {
              if (!text) return

              setSpectrumEditorState(s => ({ ...s, rawInput: text }))
            })
          }}
        >
          Import JSON from file
        </Button>
        <Button
          disabled={!parsedInput}
          onClick={() => {
            if (!parsedInput) return

            saveJsonToFile(parsedInput)
          }}
        >
          Export JSON to file
        </Button>
        <Button
          onClick={() => {
            if (confirm('You will lose all your changes. Are you sure?')) {
              resetSpectrumEditorState()
            }
          }}
        >
          Reset
        </Button>
      </div>

      <SelectDropdown
        label="Import from existing country data"
        value=""
        className={classes.importDropdown}
        options={AllSelectOptions}
        onChange={stringifiedData => {
          if (!stringifiedData) return

          setSpectrumEditorState(s => {
            return {
              ...s,
              rawInput: jsonStableStringify(JSON.parse(stringifiedData), { space: 2 }),
            }
          })
        }}
      />
    </Section>
  )
}
