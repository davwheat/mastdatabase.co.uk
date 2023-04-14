import React from 'react'

import Button from '@components/Inputs/Button'
import TextBox from '@components/Inputs/TextBox'
import { useParsedSpectrumState } from '@components/SpectrumEditor/useParsedSpectrumState'
import { useSetSpectrumAllocationState } from '@components/SpectrumEditor/useSetSpectrumAllocationState'
import { useSectionStyles } from './SpectrumMetadataEditor'

import PlusIcon from 'mdi-react/PlusBoldIcon'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  nameTextbox: {
    display: 'flex',
    gap: 16,
    alignItems: 'baseline',

    '& + &': {
      marginTop: 8,
    },

    '& .textbox-label': {
      minWidth: '80px',
    },

    '& .textbox-wrapper': {
      margin: 0,
      flexGrow: 1,
    },

    '& .textbox-endAppendix': {
      display: 'block',
      paddingRight: 0,
      alignSelf: 'stretch',
    },
  },

  textboxRemoveButton: {
    padding: '0 !important',
    height: '100%',
    width: 48,
    justifyContent: 'center',
  },

  addNameButton: {
    marginTop: '16px !important',
  },
})

interface ISpectrumNamesEditorProps {
  dataIndex: number
}

export default function SpectrumNamesEditor({ dataIndex }: ISpectrumNamesEditorProps) {
  const classes = useStyles()
  const sectClasses = useSectionStyles()
  const blockData = useParsedSpectrumState()![dataIndex]
  const setSpectrumAllocationState = useSetSpectrumAllocationState(dataIndex)

  const { names } = blockData

  return (
    <div className={sectClasses.whiteSection}>
      <h3 className="text-loud">Block name(s)</h3>
      <p className="text-speak">Name(s) for the frequency band (e.g., B20, n78)</p>

      {names.map((name, i) => (
        <TextBox
          key={i}
          className={classes.nameTextbox}
          label={`Name ${i + 1}`}
          value={name}
          onInput={(val: string) => {
            setSpectrumAllocationState(allocation => {
              const newNames = [...allocation.names]

              newNames[i] = val

              return { ...allocation, names: newNames }
            })
          }}
          endAdornment={
            <Button
              disabled={i === 0}
              className={classes.textboxRemoveButton}
              title="Remove name"
              onClick={() => {
                setSpectrumAllocationState(allocation => {
                  const newNames = [...allocation.names]

                  newNames.splice(i, 1)

                  return { ...allocation, names: newNames }
                })
              }}
            >
              X
            </Button>
          }
        />
      ))}

      <Button
        className={classes.addNameButton}
        onClick={() => {
          setSpectrumAllocationState(allocation => {
            const newNames = [...allocation.names]

            newNames.push('<new name>')

            return { ...allocation, names: newNames }
          })
        }}
        icon={<PlusIcon />}
      >
        Add another name
      </Button>
    </div>
  )
}
