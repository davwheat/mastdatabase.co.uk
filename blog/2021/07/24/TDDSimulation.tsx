import React, { useRef, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

import Breakpoints from '@data/breakpoints'
import Colors from '@data/colors.json'

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
  '@keyframes stepFlash': {
    '0%': {
      outline: `4px solid ${Colors.primaryRed}ff`,
    },
    '75%': {
      outline: `4px solid ${Colors.primaryRed}ff`,
    },
    '100%': {
      outline: `4px solid ${Colors.primaryRed}00`,
    },
  },
  visualiser: {
    marginTop: 24,
    display: 'flex',
  },
  directionVisual: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    border: '2px solid black',
    width: 125,
    padding: 8,
    '& p': {
      width: 'max-content',
      maxWidth: '100%',
      textAlign: 'center',
      marginBottom: '0 !important',
    },
  },
  arrow: {
    position: 'relative',
    display: 'inline-block',
    '&::before, &::after': {
      content: '""',
      display: 'block',
      transformOrigin: 'center',
    },
    '&::before': {
      width: 4,
      height: 60,
      background: '#000',
      transform: `translate(${ArrowHeadHypotenuse / 2 - 8}px, 10px)`,
    },
    '&::after': {
      border: 'none',
      borderColor: '#000',
      borderWidth: 0,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      borderStyle: 'solid',
      width: 30,
      height: 30,
      transform: `translateY(-${ArrowHeadHypotenuse / 2}px) rotate(45deg)`,
    },
  },
  arrowFlip: {
    transformOrigin: 'center',
    transform: 'rotate(180deg)',
  },
  stepAnimation: {
    animation: '$stepFlash 1 linear 0.5s',
  },
  frequencySelect: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 4,
    justifyItems: 'center',
    alignItems: 'center',
  },
})

const AvailableFrequencies = [
  [1940, 1940], // Band 36
  [2580, 2580], // Band 38
  [2310, 2310], // Band 40
]

export default function TDDSimulation() {
  const ratioParts = 10
  const NormalStepDuration = 2

  const classes = useStyles()
  const [targetRef, isVisible] = useVisible()

  const [uplinkRatio, setUplinkRatio] = useState(5)
  const [speed, setSpeed] = useState(15)
  const [distance, setDistance] = useState(4)
  const [frequency, setFrequency] = useState<0 | 1 | 2>(2)

  const selectedFrequencies = AvailableFrequencies[frequency] || AvailableFrequencies[0]

  const RealStepDuration = NormalStepDuration / speed

  const downlinkRatio = ratioParts - uplinkRatio

  const uplinkRef = useRef<HTMLDivElement>(null)
  const downlinkRef = useRef<HTMLDivElement>(null)
  const guardRef = useRef<HTMLDivElement>(null)

  const guardPeriodLength = distance * 50

  useEffect(() => {
    let num: number
    let nextStep = new Date().getTime()

    let currentPart = 1

    function performStep() {
      if (isVisible && nextStep < new Date().getTime()) {
        uplinkRef.current.classList.remove(classes.stepAnimation)
        downlinkRef.current.classList.remove(classes.stepAnimation)
        guardRef.current.classList.remove(classes.stepAnimation)

        // Used to force document reflow, so that the class list changes
        // take effect before we add the animation back
        void uplinkRef.current.offsetWidth

        if (currentPart === 0 || currentPart === uplinkRatio + 1) {
          // This is a guard period
          guardRef.current.classList.add(classes.stepAnimation)

          nextStep = new Date().getTime() + guardPeriodLength
        } else if (currentPart <= uplinkRatio) {
          // This is an uplink period
          uplinkRef.current.classList.add(classes.stepAnimation)

          nextStep = new Date().getTime() + 1000 * RealStepDuration
        } else {
          // This is a downlink period
          downlinkRef.current.classList.add(classes.stepAnimation)

          nextStep = new Date().getTime() + 1000 * RealStepDuration
        }

        currentPart++
        if (currentPart > ratioParts + 1) currentPart = 0
      }

      num = requestAnimationFrame(performStep)
    }

    num = requestAnimationFrame(performStep)

    return () => {
      cancelAnimationFrame(num)
    }
  })

  return (
    <figure
      ref={targetRef}
      className={classes.root}
      aria-label="Visual simulation of time-division duplexing. This content is not accessible due to significant interactivity."
    >
      <figcaption className="text-loud text-center">Time-division Duplexing Simulation</figcaption>

      <div className={classes.container} aria-hidden>
        <div className={classes.controls}>
          <label htmlFor="tdd-dl-ul-ratio-input">Ratio</label>
          <input
            id="tdd-dl-ul-ratio-input"
            type="range"
            min={1}
            step={1}
            max={ratioParts - 1}
            value={uplinkRatio}
            onChange={e => setUplinkRatio(parseInt(e.target.value))}
          />

          <label htmlFor="tdd-dl-ul-speed-input">Period length</label>
          <input
            id="tdd-dl-ul-speed-input"
            type="range"
            min={1}
            step={1}
            max={25}
            value={26 - speed}
            onChange={e => setSpeed(26 - parseInt(e.target.value))}
          />

          <label htmlFor="tdd-dl-ul-distance-input">Distance</label>
          <input
            id="tdd-dl-ul-distance-input"
            type="range"
            min={1}
            step={0.05}
            max={8}
            value={distance}
            onChange={e => setDistance(parseInt(e.target.value))}
          />

          <legend>Frequency</legend>
          <div className={classes.frequencySelect}>
            <input type="radio" name="tdd-dl-ul-freq" checked={frequency === 0} onChange={() => setFrequency(0)} />
            <input type="radio" name="tdd-dl-ul-freq" checked={frequency === 1} onChange={() => setFrequency(1)} />
            <input type="radio" name="tdd-dl-ul-freq" checked={frequency === 2} onChange={() => setFrequency(2)} />
          </div>
        </div>

        <div className={classes.data}>
          <p>
            <strong>uplink&ndash;downlink ratio:</strong>{' '}
            <span className={classes.ratioText}>
              {uplinkRatio}:{downlinkRatio}
            </span>
          </p>
          <p>
            <strong>period length:</strong> <span className={classes.ratioText}>{RealStepDuration.toFixed(3)}s</span>
          </p>
          <p>
            <strong>guard period:</strong> <span className={classes.ratioText}>{(guardPeriodLength / 1000).toFixed(3)}s</span>
          </p>
        </div>
      </div>

      <div className={classes.visualiser} aria-hidden>
        <div ref={uplinkRef} className={classes.directionVisual} style={{ animationDuration: `${RealStepDuration}s` }}>
          <div className={clsx(classes.arrow, classes.arrowFlip)} />
          <p>UPLINK</p>
          <p>{selectedFrequencies[0]} MHz</p>
        </div>

        <div ref={guardRef} className={classes.directionVisual} style={{ animationDuration: `${guardPeriodLength}ms` }}>
          <p>GUARD PERIOD</p>
        </div>

        <div ref={downlinkRef} className={classes.directionVisual} style={{ animationDuration: `${RealStepDuration}s` }}>
          <div className={classes.arrow} />
          <p>DOWNLINK</p>
          <p>{selectedFrequencies[1]} MHz</p>
        </div>
      </div>
    </figure>
  )
}
