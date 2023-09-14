import React, { useReducer, useState } from 'react'

import RadioButtonGroup from '@components/Inputs/RadioButtonGroup'
import { makeStyles } from '@material-ui/core'

import Colors from '@data/colors.json'

import * as maths from './maths'
import TextBox from '@components/Inputs/TextBox'
import Breakpoints from '@data/breakpoints'
import SelectDropdown from '@components/Inputs/SelectDropdown'

type Input = 'txPower' | 'rsp' | 'txPorts' | 'bandwidth' | 'pb'

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
  txPower: number
  rsp: string
  txPorts: number
  bandwidth: number
  pb: string
}

export default function LteTotalRadioPowerCalculator() {
  const classes = useStyles()
  const tbClasses = useTextBoxStyles()

  const [outputType, setOutputType] = useState<Input>('txPower')

  // Input values
  const [state, dispatch] = useReducer<<T extends Input>(state: State, action: { type: T; value: State[T] }) => State>(
    (state, action) => {
      switch (action.type) {
        case 'txPower':
          return { ...state, txPower: action.value } as State
        case 'rsp':
          return { ...state, rsp: action.value } as State
        case 'txPorts':
          return { ...state, txPorts: action.value } as State
        case 'bandwidth':
          return { ...state, bandwidth: action.value } as State
        case 'pb':
          return { ...state, pb: action.value } as State
      }

      return state
    },
    {
      txPower: 43,
      rsp: '',
      txPorts: 2,
      bandwidth: 10,
      pb: '',
    },
  )

  return (
    <div>
      <h2 className="text-loud">Total LTE RRU/RFU transmit power calculator</h2>

      <p className="text-speak">
        Options other than total transmit power may be slightly inaccurate due to the nature of calculations involved.
      </p>

      <RadioButtonGroup<Input>
        className={classes.outputSelection}
        groupLabel="Calculate value of..."
        value={outputType}
        onChange={v => setOutputType(v)}
        options={[
          {
            label: 'Total transmit power',
            value: 'txPower',
          },
          {
            label: 'Reference signal power',
            value: 'rsp',
          },
          {
            label: 'Number of TX ports',
            value: 'txPorts',
          },
          {
            label: 'Bandwidth',
            value: 'bandwidth',
          },
          {
            label: 'SIB2 p-b',
            value: 'pb',
          },
        ]}
      />

      <div className={classes.inputs}>
        {outputType !== 'txPower' && (
          <TotalPowerTextBox dBm={state.txPower} onChange={dBm => dispatch({ type: 'txPower', value: dBm.toString() })} />
        )}

        {outputType !== 'rsp' && (
          <TextBox label="Reference signal power" value={state.rsp} onInput={value => dispatch({ type: 'rsp', value })} />
        )}

        {outputType !== 'pb' && <TextBox label="p-b" value={state.pb} onInput={value => dispatch({ type: 'pb', value })} />}

        {outputType !== 'bandwidth' && (
          <SelectDropdown
            label="Carrier bandwidth"
            onChange={value => dispatch({ type: 'bandwidth', value: parseInt(value) })}
            options={[
              { label: '1.4 MHz', value: '1.4' },
              { label: '3 MHz', value: '3' },
              { label: '5 MHz', value: '5' },
              { label: '10 MHz', value: '10' },
              { label: '15 MHz', value: '15' },
              { label: '20 MHz', value: '20' },
            ]}
            value={state.bandwidth.toString()}
          />
        )}

        {outputType !== 'txPorts' && (
          <SelectDropdown
            label="Tx antenna ports"
            onChange={value => dispatch({ type: 'txPorts', value: parseInt(value) })}
            options={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '4', value: '4' },
              { label: '8', value: '8' },
            ]}
            value={state.txPorts.toString()}
          />
        )}
      </div>

      <div className={classes.output}>
        {outputType === 'txPower' && (
          <div className={tbClasses.root}>
            <TextBox
              label="Total transmit power"
              value={maths
                .calculateTotalPower(parseFloat(state.rsp), state.txPorts, maths.getRbsForBandwidth(state.bandwidth), parseInt(state.pb))
                .toFixed(4)}
              readOnly
              endAdornment="dBm"
              onInput={() => {}}
            />
            <TextBox
              label="Total transmit power"
              value={maths
                .dBmToWatts(
                  maths.calculateTotalPower(parseFloat(state.rsp), state.txPorts, maths.getRbsForBandwidth(state.bandwidth), parseInt(state.pb)),
                )
                .toFixed(4)}
              readOnly
              endAdornment="Watts"
              onInput={() => {}}
            />
          </div>
        )}

        {outputType === 'rsp' && (
          <TextBox
            label="Reference signal power"
            value={maths.calculateRsp(state.txPower, state.txPorts, maths.getRbsForBandwidth(state.bandwidth), parseInt(state.pb)).toString()}
            readOnly
            onInput={() => {}}
          />
        )}

        {outputType === 'txPorts' && (
          <TextBox
            label="Tx antenna ports"
            value={maths
              .calculateTxPorts(state.txPower, parseFloat(state.rsp), maths.getRbsForBandwidth(state.bandwidth), parseInt(state.pb))
              .toString()}
            readOnly
            endAdornment="ports"
            onInput={() => {}}
          />
        )}

        {outputType === 'bandwidth' && (
          <div className={tbClasses.root}>
            <TextBox
              label="Carrier bandwidth"
              value={maths.calculateRbCount(state.txPower, parseFloat(state.rsp), state.txPorts, parseInt(state.pb)).toString()}
              readOnly
              endAdornment="RBs"
              onInput={() => {}}
            />
            <TextBox
              label="Carrier bandwidth"
              value={maths
                .getBandwidthForRbs(maths.calculateRbCount(state.txPower, parseFloat(state.rsp), state.txPorts, parseInt(state.pb)))
                .toString()}
              readOnly
              endAdornment="MHz"
              onInput={() => {}}
            />
          </div>
        )}

        {outputType === 'pb' && (
          <TextBox
            label="p-b"
            value={maths.calculatePb(state.txPower, parseFloat(state.rsp), state.txPorts, maths.getRbsForBandwidth(state.bandwidth)).toString()}
            readOnly
            onInput={() => {}}
          />
        )}
      </div>
    </div>
  )
}

const useTextBoxStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16,
    [Breakpoints.downTo.tablet]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
})

interface TotalPowerTextBoxProps {
  onChange: (dBm: number) => void
  dBm: number
  readOnly?: boolean
}

function TotalPowerTextBox({ onChange, dBm, readOnly = false }: TotalPowerTextBoxProps) {
  const classes = useTextBoxStyles()

  const [inputs, setInputs] = useState({
    watts: maths.dBmToWatts(dBm).toFixed(4).toString(),
    dBm: dBm.toString(),
  })

  return (
    <div className={classes.root}>
      <TextBox
        label="Total transmit power"
        endAdornment="dBm"
        value={inputs.dBm}
        onInput={value => {
          try {
            const dbm = parseFloat(value)
            const w = maths.dBmToWatts(dbm)
            if (w < 0 || isNaN(w)) throw 0

            setInputs(s => ({ ...s, dBm: value, watts: w.toFixed(4).toString() }))
            onChange(dbm)
          } catch {
            setInputs(s => ({ ...s, dBm: value }))
          }
        }}
        readOnly={readOnly}
      />
      <TextBox
        label="Total transmit power"
        endAdornment="W"
        value={inputs.watts}
        onInput={value => {
          try {
            const watts = parseFloat(value)
            const dbm = maths.wattsToDbm(watts)
            if (dbm < 0 || isNaN(dbm)) throw 0

            setInputs(s => ({ ...s, watts: value, dBm: dbm.toFixed(4).toString() }))
            onChange(dbm)
          } catch {
            setInputs(s => ({ ...s, watts: value }))
          }
        }}
        readOnly={readOnly}
      />
    </div>
  )
}
