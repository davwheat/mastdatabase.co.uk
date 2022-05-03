import React, { useRef } from 'react'

import { makeStyles } from '@material-ui/core'
import Link from '../Links/Link'
import Breakpoints from '../../data/breakpoints'
import generateTransitions, { Durations } from '../../functions/generateTransitions'

import MenuIcon from '../../assets/icons/menu.svg'
import CloseIcon from '../../assets/icons/close.svg'

const MOBILE_NAV_ZINDEX = 1000000

const useStyles = makeStyles({
  header: {
    background: '#000',
    color: '#fff',
    height: 56,
    borderBottom: '1px solid #fff',
    marginBottom: 24,
    lineHeight: '56px',
  },
  headerInnerContainer: {
    maxWidth: 960,
    margin: 'auto',
    paddingLeft: 24,
    paddingRight: 24,
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    fontWeight: 700,
    textDecoration: 'none',
    paddingLeft: 12,
    paddingRight: 12,
    outline: 'none',

    // hover colour
    '&:hover, &:focus, &:active': {
      backgroundColor: '#fff',
      color: '#000',
    },
    '&:focus:not(:focus-visible)': {
      backgroundColor: 'unset',
      color: 'unset',
    },
  },
  spacer: {
    flexGrow: 1,
  },
  nav: {
    '& a:any-link': {
      textDecoration: 'none',
      paddingLeft: 12,
      paddingRight: 12,
      lineHeight: '56px',
      height: 56,
      display: 'inline-block',
      outline: 'none',

      // hover colour
      '&:hover, &:focus, &:active': {
        backgroundColor: '#fff',
        color: '#000',
      },
      '&:focus:not(:focus-visible)': {
        backgroundColor: 'unset',
        color: 'unset',
      },

      // Make links full width on mobile menu
      [Breakpoints.upTo.tablet]: {
        paddingLeft: 24,
        paddingRight: 24,
        marginLeft: -16,
        marginRight: -16,
      },
    },
    [Breakpoints.upTo.tablet]: {
      padding: 16,
      paddingBottom: 64,
      background: '#000',
      // Fixed to bottom of screen
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      // Flex!
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      zIndex: MOBILE_NAV_ZINDEX,
      // Default off-screen transform
      transform: 'translateY(100%)',
      // Nav animations
      animationFillMode: 'forwards',
      animationDuration: Durations.long,
      animationIterationCount: 1,
      animationName: '$menuExit',
      // Scrollable nav links
      maxHeight: '50vh',
      overflowY: 'auto',
      ...generateTransitions('transform', 'long'),
      '@media (max-height: 600px)': {
        paddingBottom: 48,
      },
    },
  },
  navBtn: {
    // Don't show the nav toggle on desktop
    display: 'none',
    [Breakpoints.upTo.tablet]: {
      // If checked...
      '&:checked': {
        // Animate in the nav menu
        '&~ $nav': {
          animationName: '$menuEnter',
        },
        // Unhide the backdrop
        '&~ $navBackdrop': {
          transform: 'translate(0, 0)',
          opacity: 1,
          // Prevent transform delay when entering
          transitionDelay: `0ms`,
        },
        // Switch to the close menu icon
        '&~ $navBtnLabel': {
          '&::before': {
            opacity: 1,
          },
          '&::after': {
            opacity: 0,
          },
        },
      },
    },
  },
  // Nav toggle button label (this is the only touch point)
  // used to toggle the nav menu
  navBtnLabel: {
    display: 'none',
    fontSize: 0,
    height: 56,
    width: 56,
    position: 'relative',
    zIndex: MOBILE_NAV_ZINDEX + 1,
    marginRight: -20,
    cursor: 'pointer',
    // Only show on mobile
    [Breakpoints.upTo.tablet]: {
      display: 'block',
    },
    // Common icon styles
    '&::after, &::before': {
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      textAlign: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '65%',
      ...generateTransitions('opacity'),
    },
    // Menu icon
    '&::after': {
      content: '""',
      opacity: 1,
      backgroundImage: `url(${MenuIcon})`,
    },
    // Close icon
    '&::before': {
      content: '""',
      opacity: 0,
      backgroundImage: `url(${CloseIcon})`,
    },
  },
  // Grey background with onClick to hide the menu
  navBackdrop: {
    display: 'block',
    // Hide off-screen until needed
    // We use this instead of visibility: hidden or display: none
    // as they will break the opacity transition
    transform: 'translate(2000vw, 2000vh)',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.25)',
    opacity: 0,
    // Display under menu
    zIndex: MOBILE_NAV_ZINDEX - 1,
    // Delay transform off-screen until opacity has finished transitioning
    transitionDelay: `0ms, ${Durations.long}ms`,
    ...generateTransitions(['opacity', 'transform'], ['long', 1], ['ease-out', 'linear']),
  },
  '@keyframes menuEnter': {
    '0%': {
      visibility: 'hidden',
      transform: 'translateY(100%)',
    },
    '0.01%': {
      visibility: 'visible',
      transform: 'translateY(100%)',
    },
    '100%': {
      visibility: 'visible',
      transform: 'translateY(0)',
    },
  },
  '@keyframes menuExit': {
    '0%': {
      visibility: 'visible',
      transform: 'translateY(0)',
    },
    '99.99%': {
      visibility: 'visible',
      transform: 'translateY(100%)',
    },
    '100%': {
      visibility: 'hidden',
      transform: 'translateY(100%)',
    },
  },
})

const Header: React.FC = () => {
  const classes = useStyles()

  const navbarRef = useRef<HTMLDivElement>(null)
  const menuCheckboxRef = useRef<HTMLInputElement>(null)

  function closeMenu() {
    if (menuCheckboxRef.current) {
      menuCheckboxRef.current.checked = false
    }
  }

  return (
    <header className={classes.header}>
      <div className={classes.headerInnerContainer}>
        <Link href="/" className={classes.name}>
          David Wheatley
        </Link>

        <div aria-hidden className={classes.spacer} />

        <input
          ref={menuCheckboxRef}
          onChange={() => (navbarRef.current.style.animationName = '')}
          type="checkbox"
          id="navbar-menu-btn"
          className={classes.navBtn}
        />

        {/* Grey backdrop for mobile nav */}
        <div onClick={closeMenu} aria-hidden className={classes.navBackdrop} />

        <label htmlFor="navbar-menu-btn" className={classes.navBtnLabel}>
          Toggle menu
        </label>

        <nav ref={navbarRef} id="navbar" style={{ animationName: 'none' }} className={classes.nav}>
          <Link href="/">Home</Link>
          <Link href="/my-projects">My projects</Link>
          <Link href="/mobile-networking">Networking</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
