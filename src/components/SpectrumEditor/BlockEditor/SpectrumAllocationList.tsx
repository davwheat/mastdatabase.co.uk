import React from 'react'

import MinorAlert from '@components/Design/MinorAlert'
import Button from '@components/Inputs/Button'
import { useParsedSpectrumState } from '../useParsedSpectrumState'
import { parseStringAsSpectrumData } from '../parseStringAsSpectrumData'
import SpectrumAllocationEditor from './SpectrumAllocationEditor'

import { ISpectrumEditorState, SpectrumEditorAtom } from '@atoms'

import { makeStyles } from '@material-ui/core'
import PlusIcon from 'mdi-react/PlusBoldIcon'

import { useSetRecoilState } from 'recoil'
import jsonStableStringify from 'json-stable-stringify-without-jsonify'

const useStyles = makeStyles({
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  error: {
    maxWidth: 720,
    margin: 'auto',
  },
  addAnotherContainer: {
    maxWidth: 1700,
    margin: 'auto',
    marginTop: 24,
    padding: 10,
  },
})

export default function SpectrumBlockList() {
  const classes = useStyles()

  const spectrumEditorState = useParsedSpectrumState()
  const setSpectrumAllocationState = useSetRecoilState(SpectrumEditorAtom)

  if (!spectrumEditorState || !Array.isArray(spectrumEditorState)) {
    return (
      <MinorAlert className={classes.error} heading="No spectrum data" color="primaryRed">
        No valid spectrum data has been loaded.
      </MinorAlert>
    )
  }

  return (
    <>
      <ul className={classes.list}>
        {spectrumEditorState.map((_, i) => (
          <SpectrumAllocationEditor key={i} dataIndex={i} />
        ))}
      </ul>

      <div className={classes.addAnotherContainer}>
        <Button
          icon={<PlusIcon />}
          onClick={() => {
            setSpectrumAllocationState(state => {
              const parsedState = parseStringAsSpectrumData(state.rawInput) || []

              parsedState.push({ names: ['123'], spectrumData: [] })

              const stringifiedState = jsonStableStringify(parsedState, { space: 2 })

              const newState: ISpectrumEditorState = { ...state, rawInput: stringifiedState }

              return newState
            })
          }}
        >
          Add another allocation
        </Button>
      </div>
    </>
  )
}
