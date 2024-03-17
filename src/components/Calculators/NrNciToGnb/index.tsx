import React, { useReducer, useState } from 'react'

import RadioButtonGroup from '@components/Inputs/RadioButtonGroup'
import { makeStyles } from '@material-ui/core'

import Colors from '@data/colors.json'

import TextBox from '@components/Inputs/TextBox'

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
  gnbBitLengthError: boolean
}

export default function NrNciCalculator() {
  const classes = useStyles()

  const [outputType, setOutputType] = useState<OutputType>('gnb')

  const [state, dispatch] = useReducer(
    (state: State, action: Partial<State>) => {
      const s = { ...state, ...action }

      s.gnbBitLengthError = parseInt(s.gnbBitLength) < 22 || parseInt(s.gnbBitLength) > 32

      return s
    },
    {
      nci: '',
      gnbId: '',
      sectorId: '',
      gnbBitLength: '22',
      gnbBitLengthError: false,
    },
  )

  function calculateOutput(): { nci: number; error: boolean } | { gnb: number; sector: number; error: boolean } {
    const bitLength = parseInt(state.gnbBitLength)
    const sectorBitLength = 36 - bitLength

    if (outputType === 'nci') {
      const sector = parseInt(state.sectorId)
      const gnb = parseInt(state.gnbId)

      const error = isNaN(sector) || isNaN(gnb)

      return { nci: (gnb << sectorBitLength) + sector, error }
    } else {
      const nci = parseInt(state.nci)

      const error = isNaN(nci)

      const andMask = (1 << sectorBitLength) - 1

      return { gnb: nci >> sectorBitLength, sector: nci & andMask, error }
    }
  }

  const output = calculateOutput()

  return (
    <div>
      <h2 className="text-loud">Calculator</h2>

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
            <TextBox label="gNB ID" value={state.gnbId} onInput={v => dispatch({ gnbId: v.replace(/[^0-9]/g, '') })} />
            <TextBox label="Sector ID" value={state.sectorId} onInput={v => dispatch({ sectorId: v.replace(/[^0-9]/g, '') })} />
          </>
        )}
        {outputType === 'gnb' && (
          <>
            <TextBox label="NR cell identity" value={state.nci} onInput={v => dispatch({ nci: v.replace(/[^0-9]/g, '') })} />
          </>
        )}
        <TextBox
          label="gNB bit length"
          value={state.gnbBitLength}
          type="number"
          min={22}
          max={32}
          step={1}
          onInput={v => dispatch({ gnbBitLength: v.replace(/[^0-9]/g, '') })}
          helpText={state.gnbBitLengthError ? 'Must be a whole integer between 22 and 32' : ''}
        />
      </div>

      {console.log('state.gnbBitLengthError', state.gnbBitLengthError)}
      {console.log('output.error', output.error)}

      <div className={classes.output}>
        {state.gnbBitLengthError || output.error ? (
          <p style={{ marginBottom: 0 }}>There is an error with your inputs. Please check them and try again.</p>
        ) : (
          <>
            {'nci' in output && (
              <p className="text-speak" style={{ marginBottom: 0 }}>
                <strong>NR cell identity:</strong> {output.nci}
              </p>
            )}
            {'gnb' in output && (
              <>
                <p className="text-speak">
                  <strong>gNB ID:</strong> {output.gnb}
                </p>
                <p className="text-speak" style={{ marginBottom: 0 }}>
                  <strong>Sector ID:</strong> {output.sector}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
