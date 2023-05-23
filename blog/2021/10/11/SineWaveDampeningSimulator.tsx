import React, { useRef, useState } from 'react'

import { Canvas } from '@components/Canvas'
import Breakpoints from '@data/breakpoints'

import { makeStyles, useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    border: '2px solid #000',
    padding: 16,
    marginTop: '1em',
    marginBottom: '1em',
  },
  canvas: {
    marginTop: 24,
    margin: 'auto',
    width: 'max-content',
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
  power: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'center',
    textAlign: 'center',
    rowGap: 8,

    '& strong': {
      fontWeight: 'bold',
    },
  },
  powerReduction: {
    gridColumn: '1 / 3',
  },
})

const SPEED_OF_LIGHT_METRES = 299_702_547

function calculateWavelengthKm(frequency: number): number {
  return SPEED_OF_LIGHT_METRES / frequency / 1_000
}

function calculatePower(amplitude: number): number {
  return Math.pow(amplitude / 4, 2)
}

function calculateAmplitudeFromPower(power: number): number {
  return 4 * Math.sqrt(power)
}

function getAttenuationCoefficient(frequency: number) {
  return Math.pow(10, frequency / 35_000) - 0.65
}

function calculatePostObstructionAmplitude(oldAmplitude: number, attenuationCoefficient: number): number {
  const oldPower = calculatePower(oldAmplitude)

  const newPower = oldPower * (1 - attenuationCoefficient) * 0.7

  return calculateAmplitudeFromPower(newPower)
}

export default function SineWaveDampeningSimulator() {
  const step = useRef(0)

  const [_frequency, setFrequency] = useState(2)
  const frequency = _frequency * 1000
  const [amplitude, setAmplitude] = useState(40)

  const attenuationCoefficient = getAttenuationCoefficient(frequency)
  const postObstructionAmplitude = calculatePostObstructionAmplitude(amplitude, attenuationCoefficient)

  function showObstruction(context: CanvasRenderingContext2D, obstructionWidth: number) {
    const width = context.canvas.width
    const height = context.canvas.height

    context.beginPath()
    context.strokeStyle = 'rgb(128,128,128)'

    // obstruction
    const obsLeft = (width - obstructionWidth) / 2
    context.fillRect(obsLeft, 0, obstructionWidth, height)

    // Starting line
    context.stroke()
  }

  function plotSine(ctx: CanvasRenderingContext2D, xOffset: number) {
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgb(66,44,255)'

    let x = 0
    let y = 0

    ctx.moveTo(0, getY(0, xOffset, height))

    while (x < width) {
      y = getY(x, xOffset, height)
      ctx.lineTo(x, y)
      ++x
    }

    ctx.stroke()
    ctx.closePath()
  }

  const visualWaveFrequency = frequency / 1000

  function draw(context: CanvasRenderingContext2D) {
    const width = context.canvas.width

    context.clearRect(0, 0, width, 150)

    plotSine(context, step.current)

    showObstruction(context, 40)

    step.current -= 1

    if (step.current < 0) {
      step.current = 360 / visualWaveFrequency
    }
  }

  function getY(x: number, offset: number, height: number) {
    let amp = amplitude
    if (x > canvasWidth / 2) amp = postObstructionAmplitude

    return height / 2 + amp * Math.sin((Math.PI / 180) * (x + offset) * visualWaveFrequency)
  }

  const classes = useStyles()

  const isUnder750px = useMediaQuery('(max-width: 750px)')
  const isUnder650px = useMediaQuery('(max-width: 650px)')
  const isUnder500px = useMediaQuery('(max-width: 500px)')
  const isUnder400px = useMediaQuery('(max-width: 400px)')
  const isUnder375px = useMediaQuery('(max-width: 375px)')
  const isUnder300px = useMediaQuery('(max-width: 300px)')
  const isUnder200px = useMediaQuery('(max-width: 200px)')

  let canvasWidth = 650

  if (isUnder200px) canvasWidth = 75
  else if (isUnder300px) canvasWidth = 100
  else if (isUnder375px) canvasWidth = 220
  else if (isUnder400px) canvasWidth = 280
  else if (isUnder500px) canvasWidth = 300
  else if (isUnder650px) canvasWidth = 400
  else if (isUnder750px) canvasWidth = 550

  const oldPower = calculatePower(amplitude)
  const newPower = calculatePower(amplitude) * (1 - attenuationCoefficient)
  const powerChangePct = ((oldPower - newPower) / oldPower) * 100

  return (
    <figure className={classes.root}>
      <figcaption className="text-loud text-center">Waves and obstructions</figcaption>

      <div className={classes.container}>
        <div className={classes.controls}>
          <label htmlFor="sine-freq-input">Frequency</label>
          <input
            id="sine-freq-input"
            type="range"
            min={1}
            step={0.01}
            max={5}
            value={_frequency}
            onChange={e => setFrequency(e.target.value as any as number)}
          />

          <label htmlFor="sine-amp-input">Amplitude</label>
          <input
            id="sine-amp-input"
            type="range"
            min={5}
            max={65}
            value={amplitude}
            onChange={e => setAmplitude(e.target.value as any as number)}
          />
        </div>

        <div className={classes.data}>
          <p>
            <strong>Frequency:</strong> {frequency.toFixed(0)} Hz
          </p>
          {/* Light in air: 299702547 m/s */}
          <p>
            <strong>Wavelength:</strong> {calculateWavelengthKm(frequency).toFixed(0)} km
          </p>
          <p>
            <strong>Attenuation coefficient:</strong> {attenuationCoefficient.toFixed(2)}
          </p>
        </div>
      </div>

      <div className={classes.canvas}>
        <Canvas width={`${canvasWidth}`} height="150" draw={draw} />
      </div>

      <div className={classes.power}>
        <span>
          <strong>{oldPower.toFixed(2)} W</strong>
        </span>
        <span>
          <strong>{newPower.toFixed(2)} W</strong>
        </span>
        <span className={classes.powerReduction}>{powerChangePct.toFixed(1)}% power reduction</span>
      </div>
    </figure>
  )
}
