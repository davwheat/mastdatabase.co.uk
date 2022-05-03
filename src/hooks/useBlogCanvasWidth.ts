import { useMediaQuery } from '@material-ui/core'

/**
 * React Hook used to provide a responsive width for the blog canvas.
 *
 * Width ranges between 650px and 75px between viewports of 750px and 200px.
 */
export default function useBlogCanvasWidth(): string {
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

  return canvasWidth.toString()
}
