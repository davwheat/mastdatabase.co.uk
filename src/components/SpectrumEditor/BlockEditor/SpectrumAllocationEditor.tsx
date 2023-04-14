import React from 'react'

import MinorAlert from '@components/Design/MinorAlert'
import Button from '@components/Inputs/Button'
import SpectrumAllocationPreview from './Preview/SpectrumAllocationPreview'
import SpectrumAllocationPreviewErrorBoundary from './Preview/SpectrumAllocationPreviewErrorBoundary'
import SpectrumMetadataEditor from './Fields/SpectrumMetadataEditor'
import SpectrumBlockEditor from './Fields/SpectrumBlock/SpectrumBlockEditor'

import { SpectrumEditorAtom } from '@atoms'
import Breakpoints from '@data/breakpoints'
import Colors from '@data/colors.json'
import { useParsedSpectrumState } from '../useParsedSpectrumState'
import { parseStringAsSpectrumData } from '../parseStringAsSpectrumData'

import { makeStyles } from '@material-ui/core'
import { useSetRecoilState } from 'recoil'
import TrashIcon from 'mdi-react/TrashOutlineIcon'
import PlusIcon from 'mdi-react/PlusBoldIcon'
import jsonStableStringify from 'json-stable-stringify-without-jsonify'
import { useSetSpectrumAllocationState } from '../useSetSpectrumAllocationState'

const useStyles = makeStyles({
  root: {
    display: 'grid',
    maxWidth: 1700,
    margin: 'auto',
    gap: 32,

    '& + &': {
      marginTop: 48,
    },

    [Breakpoints.downTo.desktopLarge]: {
      gridTemplateColumns: '1fr 1fr',

      alignItems: 'start',
    },
  },

  headerDeleteSplit: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,

    '& h3': {
      margin: 0,
    },

    '& button': {
      marginLeft: 'auto',
      padding: '6px 12px',
    },
  },

  editorPanel: {
    backgroundColor: Colors.lightGrey,
    padding: 24,
  },

  blockList: {
    marginTop: 32,

    '& > ul': {
      margin: 0,

      '& > li': {
        marginTop: 24,
      },
    },
  },

  newBlockButton: {
    marginTop: '16px !important',
  },
})

interface ISpectrumAllocationEditorProps {
  dataIndex: number
}

export default function SpectrumAllocationEditor({ dataIndex }: ISpectrumAllocationEditorProps) {
  const classes = useStyles()
  const spectrumBlock = useParsedSpectrumState()![dataIndex]
  const setSpectrumEditorState = useSetRecoilState(SpectrumEditorAtom)

  const setSpectrumAllocationState = useSetSpectrumAllocationState(dataIndex)

  const errors = []

  if (!Array.isArray(spectrumBlock.names)) {
    errors.push(
      <MinorAlert color="primaryRed" heading="Error">
        At: <code className="code">[{dataIndex}].names</code>.
      </MinorAlert>,
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.editorPanel}>
        <div className={classes.headerDeleteSplit}>
          <h3 className="text-loud">Edit allocation {dataIndex + 1}</h3>
          <Button
            icon={<TrashIcon />}
            variant="danger"
            onClick={() => {
              if (
                confirm('You will lose all information about this entire spectrum deployment. Are you sure you want to delete this allocation?')
              ) {
                setSpectrumEditorState(state => {
                  const parsedState = parseStringAsSpectrumData(state.rawInput)!

                  parsedState.splice(dataIndex, 1)

                  const stringifiedState = jsonStableStringify(parsedState, { space: 2 })

                  return { ...state, rawInput: stringifiedState }
                })
              }
            }}
          >
            Delete allocation
          </Button>
        </div>

        <SpectrumMetadataEditor dataIndex={dataIndex} />

        <div className={classes.blockList}>
          <h4 className="text-loud">All spectrum blocks</h4>

          <ul>
            {spectrumBlock.spectrumData.map((_, blockIndex) => (
              <li key={blockIndex}>
                <SpectrumBlockEditor dataIndex={dataIndex} blockIndex={blockIndex} />
              </li>
            ))}
          </ul>

          <Button
            className={classes.newBlockButton}
            icon={<PlusIcon />}
            onClick={() => {
              setSpectrumAllocationState(state => {
                const newState = { ...state }

                newState.spectrumData.push({
                  startFreq: 0,
                  endFreq: 0,
                  owner: '',
                  type: 'generic',
                })

                return newState
              })
            }}
          >
            Add block
          </Button>
        </div>
      </div>

      <SpectrumAllocationPreviewErrorBoundary>
        <SpectrumAllocationPreview dataIndex={dataIndex} />
      </SpectrumAllocationPreviewErrorBoundary>
    </div>
  )
}
