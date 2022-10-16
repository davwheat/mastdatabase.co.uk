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
})

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
    </Section>
  )
}
