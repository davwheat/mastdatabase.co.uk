import React, { useState } from 'react'

import { useParsedSpectrumState } from '@components/SpectrumEditor/useParsedSpectrumState'
import { useSetSpectrumBlockState } from '@components/SpectrumEditor/useSetSpectrumBlockState'
import TextBox from '@components/Inputs/TextBox'
import Button from '@components/Inputs/Button'
import { useSectionStyles } from '../SpectrumMetadataEditor'
import ButtonLink from '@components/Links/ButtonLink'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    height: '100%',
    margin: '0 !important',
  },

  arfcnTextbox: {
    '& .textbox-endAppendix': {
      display: 'block',
      paddingRight: 0,
      alignSelf: 'stretch',
    },
  },

  textboxAddButton: {
    padding: '0 !important',
    height: '100%',
    width: 48,
    justifyContent: 'center',
  },

  addArfcnButton: {
    marginTop: 16,
  },

  arfcnList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    margin: 0,
    marginTop: 16,
  },

  noArfcnsMsg: {
    margin: 0,
  },

  arfcnItem: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    backgroundColor: Colors.primaryBlue,
    padding: '2px 8px',
    height: '1.65rem',
    fontSize: '0.9em',
    borderRadius: 'calc(1.65rem / 2)',
  },

  arfcnItemButton: {
    textDecoration: 'none',
  },
})

interface ISpectrumBlockARFCNEditorProps {
  dataIndex: number
  blockIndex: number
  type: 'nrarfcns' | 'earfcns' | 'uarfcns' | 'arfcns'
}

export default function SpectrumBlockARFCNEditor({ dataIndex, blockIndex, type }: ISpectrumBlockARFCNEditorProps) {
  const sectClasses = useSectionStyles()
  const classes = useStyles()

  const blockData = useParsedSpectrumState()![dataIndex].spectrumData[blockIndex]
  const setSpectrumBlockState = useSetSpectrumBlockState(dataIndex, blockIndex)

  const [inputState, setInputState] = useState('')

  // complex because ts is being ts :(
  const arfcnData: (number | string)[] =
    typeof blockData[type] === 'string'
      ? ([blockData[type]] as (number | string)[])
      : (blockData[type] as (number | string)[]) || ([] as (number | string)[])
  const isArfcnsVarious = Array.isArray(blockData[type]) && blockData[type]!.length === 0
  const arfcnTypeStr = type.substring(0, type.length - 1).toUpperCase()

  function handleAddArfcn(val: string) {
    const value = val.trim()

    if (!value) return

    // force '.' and '-' to make string
    const numericValue = val.includes('.') || val.includes('-') ? NaN : Number(value)

    setInputState('')
    setSpectrumBlockState(block => {
      return { ...block, [type]: [...(block[type] || []), isNaN(numericValue) ? value : numericValue] }
    })
  }

  function handleRemoveArfcn(i: number) {
    setSpectrumBlockState(block => {
      let arfcns = block![type]!
      if (!Array.isArray(arfcns)) arfcns = [arfcns]

      arfcns.splice(i, 1)

      const newState = { ...block, [type]: arfcns }

      if (arfcns.length === 0) delete newState[type]

      return newState
    })
  }

  return (
    <div className={clsx(sectClasses.greySection, classes.root)}>
      <TextBox
        label={arfcnTypeStr + 's'}
        helpText={`Press ENTER or the + to add an ${arfcnTypeStr} to the list. Can be a number, or text (e.g., 1-16 to show a range).`}
        value={inputState}
        className={classes.arfcnTextbox}
        onKeyUp={e => {
          if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault()
            handleAddArfcn(inputState)
          }
        }}
        onInput={val => {
          setInputState(val)
        }}
        endAdornment={
          <Button
            title={`Add ${arfcnTypeStr}`}
            className={classes.textboxAddButton}
            onClick={() => {
              handleAddArfcn(inputState)
            }}
          >
            +
          </Button>
        }
      />

      <ul className={clsx(sectClasses.whiteSection, classes.arfcnList)}>
        {arfcnData.map((arfcn, i) => (
          <span className={classes.arfcnItem} key={i}>
            {arfcn}{' '}
            <ButtonLink
              title={`Remove ${arfcnTypeStr}`}
              className={classes.arfcnItemButton}
              onClick={() => {
                handleRemoveArfcn(i)
              }}
            >
              X
            </ButtonLink>
          </span>
        ))}

        {arfcnData.length === 0 &&
          (isArfcnsVarious ? (
            <p className={clsx('text-whisper-up', classes.noArfcnsMsg)}>various/unconfirmed {arfcnTypeStr}s</p>
          ) : (
            <p className={clsx('text-whisper-up', classes.noArfcnsMsg)}>No {arfcnTypeStr}s added&#8230;</p>
          ))}
      </ul>
    </div>
  )
}
