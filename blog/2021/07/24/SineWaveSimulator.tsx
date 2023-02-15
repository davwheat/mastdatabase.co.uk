import React, { useRef, useState } from 'react'

import { Canvas } from '@components/Canvas'
import Breakpoints from '@data/breakpoints'

import { makeStyles, useMediaQuery } from '@material-ui/core'
import useBlogCanvasWidth from '@hooks/useBlogCanvasWidth'

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
})

export default function SineWaveSimulator() {
  const step = useRef(0)

  const [frequency, setFrequency] = useState(2)
  const [amplitude, setAmplitude] = useState(40)

  function showAxes(context: CanvasRenderingContext2D) {
    const width = context.canvas.width
    const height = context.canvas.height
    const xMin = 0

    context.beginPath()
    context.strokeStyle = 'rgb(128,128,128)'

    // X-Axis
    context.moveTo(xMin, height / 2)
    context.lineTo(width, height / 2)

    // Y-Axis
    context.moveTo(width / 2, 0)
    context.lineTo(width / 2, height)

    // Starting line
    context.stroke()
  }

  function drawCentrePoint(context: CanvasRenderingContext2D, x: number, y: number) {
    const height = context.canvas.height
    const radius = 3

    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = '#f00'
    context.moveTo(x, height / 2)
    context.lineTo(x, y)
    context.stroke()

    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI, false)

    context.fillStyle = 'red'
    context.fill()
    context.lineWidth = 1
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

    const dotX = width / 2

    ctx.moveTo(0, getY(0, xOffset, height))

    while (x < width) {
      y = getY(x, xOffset, height)
      ctx.lineTo(x, y)
      x++
    }

    ctx.stroke()
    ctx.closePath()

    drawCentrePoint(ctx, dotX, getY(dotX, xOffset, height))

    ctx.stroke()
  }

  function draw(context: CanvasRenderingContext2D) {
    const width = context.canvas.width

    context.clearRect(0, 0, width, 150)

    showAxes(context)
    plotSine(context, step.current)

    step.current += 1

    if (step.current > 360 / frequency) {
      step.current = 0
    }
  }

  function getY(x: number, offset: number, height: number) {
    return height / 2 + amplitude * Math.sin((Math.PI / 180) * (x + offset) * frequency)
  }

  const classes = useStyles()
  const canvasWidth = useBlogCanvasWidth()

  return (
    <figure className={classes.root}>
      <figcaption className="text-loud text-center">Sine wave simulator</figcaption>

      <div className={classes.container}>
        <div className={classes.controls}>
          <label htmlFor="sine-freq-input">Frequency</label>
          <input
            id="sine-freq-input"
            type="range"
            min={1}
            step={0.01}
            max={15}
            value={frequency}
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
            <strong>Frequency:</strong> {(frequency * 1000).toFixed(0)} Hz
          </p>
          {/* Light in air: 299702547 m/s */}
          <p>
            <strong>Wavelength:</strong> {(299_702_547 / (frequency * 1000) / 1_000).toFixed(0)} km
          </p>
          <p>
            <strong>Amplitude:</strong> {amplitude} m
          </p>
        </div>
      </div>

      <div className={classes.canvas}>
        <Canvas width={`${canvasWidth}`} height="150" draw={draw} />
      </div>
    </figure>
  )
}
