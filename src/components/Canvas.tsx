import React, { useRef, useEffect } from 'react'
import { useVisible } from 'react-hooks-visible'

interface ICanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  draw: (context: CanvasRenderingContext2D) => void
  width: string
  height: string
}

/**
 * Creates a Canvas with the provided draw function.
 *
 * Does not run `draw` if the canvas is outside the viewport.
 */
export const Canvas = ({ draw, ...props }: ICanvasProps) => {
  const [targetRef, isVisible] = useVisible<HTMLDivElement>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let animationFrameId: number

    const render = () => {
      if (isVisible) draw(context)
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw, isVisible])

  return (
    <div ref={targetRef}>
      <canvas ref={canvasRef} {...props} />
    </div>
  )
}
