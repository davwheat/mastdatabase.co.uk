import React from 'react'

import Section from '@components/Design/Section'
import SpectrumBlockList from './BlockEditor/SpectrumAllocationList'
import { SpectrumEditorSettings } from './SpectrumEditorSettings'
import Breakpoints from '@data/breakpoints'

import { NoSsr, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  blocksListSection: {
    padding: '24px 32px',
    [Breakpoints.upTo.tablet]: {
      padding: 0,
    },
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

          <NoSsr>
            <SpectrumBlockList />
          </NoSsr>
        </div>
      </Section>
    </>
  )
}
