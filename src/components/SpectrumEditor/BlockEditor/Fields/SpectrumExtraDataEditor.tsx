import React from 'react'

import TextBox from '@components/Inputs/TextBox'
import { useParsedSpectrumState } from '@components/SpectrumEditor/useParsedSpectrumState'
import { useSetSpectrumAllocationState } from '@components/SpectrumEditor/useSetSpectrumAllocationState'
import Link from '@components/Links/Link'
import { useSectionStyles } from './SpectrumMetadataEditor'

import { makeStyles } from '@material-ui/core'
import { SpectrumData } from 'mobile-spectrum-data/@types'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
})

interface ISpectrumExtraDataEditorProps {
  dataIndex: number
}

export default function SpectrumExtraDataEditor({ dataIndex }: ISpectrumExtraDataEditorProps) {
  const classes = useStyles()
  const sectClasses = useSectionStyles()
  const blockData = useParsedSpectrumState()![dataIndex]
  const setSpectrumAllocationState = useSetSpectrumAllocationState(dataIndex)

  const { extraInfo } = blockData

  return (
    <div className={sectClasses.whiteSection}>
      <h3 className="text-loud">Extra data</h3>
      <p className="text-speak">
        Additional information about this spectrum allocation.{' '}
        <Link
          target="_blank"
          href="https://github.com/davwheat/mobile-spectrum-data/blob/70c9d112653fc2534116e5a4090f5acf42c0107a/src/GB/index.ts#L61-L69"
        >
          Example usage
        </Link>
      </p>

      <div className={classes.form}>
        <TextBox
          label="Short addendum"
          helpText='E.g. "post spectrum swap"'
          value={extraInfo?.shortAddendum ?? ''}
          onInput={val => {
            setSpectrumAllocationState(blockData => {
              const newState: SpectrumData = { ...blockData, extraInfo: { ...extraInfo, shortAddendum: val || undefined } }

              if (Object.values(newState.extraInfo!).every(v => v === undefined)) {
                newState.extraInfo = undefined
              }

              return newState
            })
          }}
        />

        <TextBox
          label="Description"
          helpText='A sentence explaining the "short addendum"'
          value={extraInfo?.description ?? ''}
          onInput={val => {
            setSpectrumAllocationState(blockData => {
              const newState: SpectrumData = { ...blockData, extraInfo: { ...extraInfo, description: val || undefined } }

              if (Object.values(newState.extraInfo!).every(v => v === undefined)) {
                newState.extraInfo = undefined
              }
              return newState
            })
          }}
        />
      </div>
    </div>
  )
}
