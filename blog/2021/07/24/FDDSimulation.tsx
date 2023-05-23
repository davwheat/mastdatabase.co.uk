import React, { useRef, useState, useEffect } from 'react'

import { makeStyles, useMediaQuery } from '@material-ui/core'
import clsx from 'clsx'

import Breakpoints from '@data/breakpoints'
import Colors from '@data/colors.json'

import SignalSvgUrl from './signal-wave.svg'
import { FactBox } from '@blog/index'
import { useVisible } from 'react-hooks-visible'

const ArrowHeadHypotenuse = Math.sqrt(30 ** 2 + 30 ** 2)

const useStyles = makeStyles({
  root: {
    border: '2px solid #000',
    padding: 16,
    marginTop: '1em',
    marginBottom: '1em',
  },
  container: {
    marginTop: 12,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'center',
    gap: 16,
    [Breakpoints.upTo.tablet]: {
      gridTemplateColumns: '1fr',
    },
  },
  controls: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: 4,
    columnGap: 16,
    width: 'max-content',
    margin: 'auto',
    [Breakpoints.upTo.phone]: {
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
    },
  },
  data: {
    width: 'max-content',
    '& p': {
      marginBottom: '2px !important',
      width: 'max-content',
    },
  },
  ratioText: {
    fontVariantNumeric: 'tabular-nums',
  },
  '@keyframes signalMove': {
    from: {
      backgroundPosition: '0 -9999%',
    },
    to: {
      backgroundPosition: '0 100%',
    },
  },
  visualiser: {
    marginTop: 24,
    display: 'flex',
    border: '0 solid #666',
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    marginLeft: '1.25em',
    marginBottom: '1.25em',
    position: 'relative',
    justifyContent: 'center',
    [Breakpoints.upTo.tablet]: {
      display: 'none',
    },
  },
  axisXLabel: {
    position: 'absolute',
    left: '50%',
    bottom: 'calc(-1.5em - 4px)',
    transform: 'translateX(-50%)',
  },
  axisYLabel: {
    writingMode: 'vertical-lr',
    position: 'absolute',
    left: 'calc(-1.5em - 4px)',
    top: '50%',
    transformOrigin: 'center',
    transform: 'translateY(-50%) rotate(0.5turn)',
  },
  frequencySelect: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 4,
    justifyItems: 'center',
    alignItems: 'center',
  },
  signal: {
    position: 'relative',
    height: 150,
    width: 'var(--maxBandwidthWidth)',
  },
  guardBand: {
    height: 150,
    fontWeight: 'bold',
    marginLeft: `calc(2px + var(--gb-lr-neg-m))`,
    marginRight: `calc(2px + var(--gb-lr-neg-m))`,
    background: Colors.lightGrey,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minWidth: 'min-content',
    width: 'calc(var(--gb-width) - 2 * var(--gb-lr-neg-m))',
    [Breakpoints.upTo.desktopSmall]: {
      maxWidth: 200,
    },
  },
  frequencyNotch: {
    position: 'absolute',
    width: '100%',
    top: 'calc(100% - 4px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '&::before': {
      margin: 'auto',
      content: '""',
      display: 'block',
      width: 2,
      height: 12,
      background: '#666',
    },

    '& span': {
      display: 'block',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      minWidth: 'max-content',
    },
  },
  signalWave: {
    background: `url(${SignalSvgUrl}) center repeat-y`,
    height: 150,
    width: 60,
    animation: '$signalMove infinite linear 100s',
    transformOrigin: 'center',
    margin: 'auto',
    transform: `scaleX(calc(var(--widthNoUnits) / 60))`,
  },
  smallDeviceWarning: {
    [Breakpoints.downTo.tablet]: {
      display: 'none',
    },
  },
})

const AvailableFrequencies = [
  { 0: 842, 1: 801, band: 20 },
  { 0: 1930, 1: 2120, band: 1 },
  { 0: 2510, 1: 2630, band: 7 },
]

export default function FDDSimulation() {
  const classes = useStyles()

  const [speed, setSpeed] = useState(5)
  const [bandwidth, setBandwidth] = useState(10)
  const [frequency, setFrequency] = useState<0 | 1 | 2>(2)

  const carrierFrequencies = AvailableFrequencies[frequency] || AvailableFrequencies[0]

  const signalStyles = {
    '--width': `${getSignalWidth(bandwidth)}px`,
    '--widthNoUnits': getSignalWidth(bandwidth),
    '--maxBandwidthWidth': `${getSignalWidth(20)}px`,
  } as any

  const guardBandWidth = Math.abs(carrierFrequencies[0] - carrierFrequencies[1]) - bandwidth

  return (
    <figure
      className={classes.root}
      aria-label="Visual simulation of frequency-division duplexing. This content is not accessible due to significant interactivity."
    >
      <figcaption className="text-loud text-center">Frequency-division Duplexing Simulation</figcaption>

      <div className={classes.container} aria-hidden>
        <div className={classes.controls}>
          <label htmlFor="fdd-speed-input">Rx/Tx speed</label>
          <input id="fdd-speed-input" type="range" min={1} step={0.1} max={5} value={speed} onChange={e => setSpeed(parseInt(e.target.value))} />

          <label htmlFor="fdd-bandwidth-input">Bandwidth</label>
          <input
            id="fdd-bandwidth-input"
            type="range"
            min={5}
            step={5}
            max={20}
            value={bandwidth}
            onChange={e => setBandwidth(parseInt(e.target.value))}
          />

          <legend>Frequency</legend>
          <div className={classes.frequencySelect}>
            <input type="radio" name="dl-ul-freq-freq" checked={frequency === 0} onChange={() => setFrequency(0)} />
            <input type="radio" name="dl-ul-freq-freq" checked={frequency === 1} onChange={() => setFrequency(1)} />
            <input type="radio" name="dl-ul-freq-freq" checked={frequency === 2} onChange={() => setFrequency(2)} />
          </div>
        </div>

        <div className={classes.data}>
          <p>
            <strong>Bandwidth:</strong> <span className={classes.ratioText}>{bandwidth} MHz</span>
          </p>
          <p>
            <strong>guard band width:</strong> <span className={classes.ratioText}>{guardBandWidth} MHz</span>
          </p>
          <p>
            <strong>duplex spacing:</strong> <span className={classes.ratioText}>{carrierFrequencies[1] - carrierFrequencies[0]} MHz</span>
          </p>
          <p>
            <strong>LTE Band:</strong> <span className={classes.ratioText}>B{carrierFrequencies.band}</span>
          </p>
        </div>
      </div>

      <div className={classes.smallDeviceWarning}>
        <FactBox title="Warning">Please turn your device landscape to view the simulation.</FactBox>
      </div>

      <div className={classes.visualiser} aria-hidden>
        <span className={classes.axisXLabel}>Frequency</span>
        <span className={classes.axisYLabel}>Distance</span>

        <div className={classes.signal} style={signalStyles}>
          <div
            className={classes.signalWave}
            style={{
              animationDirection: carrierFrequencies[0] > carrierFrequencies[1] ? 'reverse' : 'normal',
              animationDuration: `${getAnimationDuration(speed)}s`,
            }}
          />
          <div className={classes.frequencyNotch}>
            <span className="text-whisper">{`${Math.min(carrierFrequencies[0], carrierFrequencies[1])} MHz`}</span>
          </div>
        </div>

        <div
          className={classes.guardBand}
          style={
            {
              '--gb-width': `${Math.max(1.5 * (guardBandWidth + bandwidth), 100)}px`,
              '--gb-lr-neg-m': `${(30 * -(20 - bandwidth)) / 5 / 2}px`,
            } as any
          }
        >
          GUARD BAND
        </div>

        <div className={classes.signal} style={signalStyles}>
          <div
            className={classes.signalWave}
            style={{
              animationDirection: carrierFrequencies[1] > carrierFrequencies[0] ? 'reverse' : 'normal',
              animationDuration: `${getAnimationDuration(speed)}s`,
            }}
          />
          <div className={classes.frequencyNotch}>
            <span className="text-whisper">{`${Math.max(carrierFrequencies[0], carrierFrequencies[1])} MHz`}</span>
          </div>
        </div>
      </div>
    </figure>
  )
}

function getSignalWidth(bandwidth: number) {
  return 30 * (bandwidth / 5 + 1)
}

function getAnimationDuration(speed: number) {
  return 35 * (5 / (speed / 2))
}
