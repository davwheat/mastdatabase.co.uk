import React, { useReducer, useState } from 'react'

import RadioButtonGroup from '@components/Inputs/RadioButtonGroup'
import { makeStyles } from '@material-ui/core'

import Colors from '@data/colors.json'

import TextBox from '@components/Inputs/TextBox'
import Breakpoints from '@data/breakpoints'
import SelectDropdown from '@components/Inputs/SelectDropdown'

type OutputType = 'gnb' | 'nci'

const useStyles = makeStyles({
  outputSelection: {
    backgroundColor: `${Colors.lightGrey} !important`,
    marginTop: 16,
  },
  output: {
    backgroundColor: Colors.lightGrey,
    padding: 16,
    marginTop: 48,
  },
  inputs: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16,
    marginTop: 32,
  },
})

interface State {
  nci: string
  gnbId: string
  sectorId: string
  gnbBitLength: string
}

export default function NrNciCalculator() {
  const classes = useStyles()

  const [outputType, setOutputType] = useState<OutputType>('gnb')

  const [state, dispatch] = useReducer((state: State, action: Partial<State>) => ({ ...state, ...action }), {
    nci: '',
    gnbId: '',
    sectorId: '',
    gnbBitLength: '22',
  })

  return (
    <div>
      <h2 className="text-loud">5G NR NCI to gNB and local cell ID</h2>

      <p className="text-speak">
        In 5G NR, the NCI (NR Cell Identity) is a 36-bit number that is used to identify a cell. The NCI is split into two parts: the gNB ID and
        the sector ID. The gNB ID has a variable width of between 22 and 32 bits which can be different for each network.
      </p>

      <RadioButtonGroup<OutputType>
        className={classes.outputSelection}
        groupLabel="Calculate value of..."
        value={outputType}
        onChange={v => setOutputType(v)}
        options={[
          {
            label: 'gNB ID and sector ID',
            value: 'gnb',
          },
          {
            label: 'NR cell identity',
            value: 'nci',
          },
        ]}
      />

      <div className={classes.inputs}>
        {outputType === 'nci' && (
          <>
            <TextBox label="gNB ID" value={state.gnbId} onInput={dispatch()} />
            <TextBox label="Sector ID" value={state.sectorId} onInput={() => {}} />
            <TextBox label="gNB bit length" value="" type="number" min={22} max={32} onInput={() => {}} />
          </>
        )}
      </div>
    </div>
  )
}
