import React from 'react'

import Section from '@components/Design/Section'
import SpectrumBlockList from './BlockEditor/SpectrumAllocationList'
import { SpectrumEditorSettings } from './SpectrumEditorSettings'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  blocksListSection: {
    padding: '24px 32px',
  },
  narrow: {
    maxWidth: 1000,
    margin: 'auto',
    marginBottom: 32,
  },
})

export default function SpectrumEditor() {
  const classes = useStyles()

  return (
    <>
      <SpectrumEditorSettings />

      <Section width="full">
        <div className={classes.blocksListSection}>
          <div className={classes.narrow}>
            <h2 className="text-louder">All spectrum allocations</h2>
          </div>

          <SpectrumBlockList />
        </div>
      </Section>
    </>
  )
}