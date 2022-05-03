import React from 'react'

import clsx from 'clsx'
import bestContrast from 'get-best-contrast-color'
import { makeStyles } from '@material-ui/core'
import Breakpoints from '../../data/breakpoints'

const useStyles = makeStyles({
  hero: {
    width: '100vw',
    position: 'relative',
    marginLeft: '-50vw',
    left: '50%',
    background: '#000',
    color: '#fff',
    overflow: 'hidden',
  },
  heroInner: {
    width: '100%',
    margin: 'auto',
    maxWidth: 1000,
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 48,
    paddingBottom: 48,
    '& p, & h1, & h2, & h3, & h4, & h5, & h6': {
      marginBottom: '0.1em',
      '&:last-child': {
        margin: 0,
      },
    },
    [Breakpoints.upTo.desktopSmall]: {
      paddingLeft: 36,
      paddingRight: 36,
    },
    [Breakpoints.upTo.phone]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
  firstElement: {
    marginTop: -24,
  },
  heroSmall: {
    '& $heroInner': {
      paddingTop: 24,
      paddingBottom: 24,
      [Breakpoints.upTo.desktopSmall]: {
        paddingTop: 16,
        paddingBottom: 16,
      },
    },
  },
  heroNormal: {
    '& $heroInner': {
      paddingTop: 48,
      paddingBottom: 48,
      [Breakpoints.upTo.desktopSmall]: {
        paddingTop: 24,
        paddingBottom: 24,
      },
    },
  },
  heroLarge: {
    '& $heroInner': {
      paddingTop: 56,
      paddingBottom: 56,
      [Breakpoints.upTo.desktopSmall]: {
        paddingTop: 36,
        paddingBottom: 36,
      },
    },
  },
  heroHuge: {
    '& $heroInner': {
      paddingTop: 72,
      paddingBottom: 72,
      [Breakpoints.upTo.desktopSmall]: {
        paddingTop: 48,
        paddingBottom: 48,
      },
    },
  },
})

interface Props {
  color?: string
  size?: 'small' | 'normal' | 'large' | 'huge'
  firstElement?: boolean
  className?: string
  innerClassName?: string
}

const Hero: React.FC<Props> = ({ children, color = '#000', size = 'normal', firstElement = false, className, innerClassName }) => {
  const classes = useStyles()

  return (
    <section
      className={clsx(
        classes.hero,
        [firstElement && classes.firstElement],
        [size === 'small' && classes.heroSmall],
        [size === 'normal' && classes.heroNormal],
        [size === 'large' && classes.heroLarge],
        [size === 'huge' && classes.heroHuge],
        className,
      )}
      style={{ backgroundColor: color, color: bestContrast(color, ['#000', '#fff']) }}
    >
      <div className={clsx(classes.heroInner, innerClassName)}>{children}</div>
    </section>
  )
}

export default Hero
