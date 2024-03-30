import React, { useEffect } from 'react'

import Section from '@components/Design/Section'
import Button from '@components/Inputs/Button'
import Link from '@components/Links/Link'
import UkCoverageMap from '@components/Maps/UkCoverageMap'
import PostcodeSearch from '@components/Maps/PostcodeSearch'
import SplitScreenSettings, { MAX_SPLIT_COVERAGE_LAYERS } from './SplitScreenSettings'

import Colors from '@data/colors.json'
import CoverageProvider from '../Providers/CoverageProvider'

import { makeStyles, NoSsr } from '@material-ui/core'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import FullscreenIcon from 'mdi-react/FullscreenIcon'

import useForceRender from '@hooks/useForceRerender'
import Breakpoints from '@data/breakpoints'

import { useRecoilValue } from 'recoil'
import { SplitScreenCoverageMapAtom } from '@atoms'

import 'leaflet.sync'

import type { Map } from 'leaflet'

const useStyles = makeStyles({
  loading: {
    textAlign: 'center',

    '& p': {
      marginTop: 24,
    },
  },
  mapSection: {
    '& .leaflet-popup-content': {
      '& dt': {
        fontWeight: 'bold',

        '&:not(:first-child)': {
          marginTop: 8,
        },
      },
    },
  },
  sitesAvailable: {
    margin: '12px 0',
  },
  mapSettingsSection: {
    '& + &': {
      margin: '24px 0',
    },
  },
  networkSettingsContainer: {
    margin: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--columns), 1fr)',
    '--columns': 1,

    gap: 16,

    [Breakpoints.downTo.tablet]: {
      '--columns': 2,
    },

    '& > li': {
      padding: 16,
      backgroundColor: Colors.lightGrey,
      display: 'flex',
      flexDirection: 'column',
      '& > :last-child': {
        marginTop: 'auto',
      },
    },
  },
  providerUnavailable: {
    marginBottom: 16,
  },
  mapGrid: {
    display: 'grid',

    '& > *': {
      height: '45vh !important',

      '.fullscreen-enabled &': {
        height: '50vh !important',
      },

      '&:nth-child(1)': {
        '& $mapProviderIcon': {
          top: 'var(--inset)',
          left: 'var(--inset)',
        },
      },

      '&:nth-child(2)': {
        '& $mapProviderIcon': {
          top: 'var(--inset)',
          right: 'var(--inset)',
        },
      },

      '&:nth-child(3)': {
        '& $mapProviderIcon': {
          bottom: 'var(--inset)',
          left: 'var(--inset)',
        },
      },

      '&:nth-child(4)': {
        '& $mapProviderIcon': {
          bottom: 'var(--inset)',
          right: 'var(--inset)',
        },
      },
    },

    '&[data-map-count="1"]': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr',

      '.fullscreen-enabled & > *': {
        height: '100vh !important',
      },
    },
    '&[data-map-count="2"]': {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr',

      '.fullscreen-enabled & > *': {
        height: '100vh !important',
      },
    },
    '&[data-map-count="3"]': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 1fr 1fr',

      '.fullscreen-enabled & > *': {
        height: '33.33333vh !important',
      },

      '& > *': {
        height: '28vh !important',

        '& $mapProviderIcon': {
          top: '50% !important',
          left: 'var(--inset) !important',
          transform: 'translateY(-50%)',

          [Breakpoints.downTo.desktopSmall]: {
            top: 'var(--inset) !important',
            left: '50% !important',
            transform: 'translateX(-50%)',
          },
        },
      },

      [Breakpoints.downTo.desktopSmall]: {
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr',

        '.fullscreen-enabled & > *': {
          height: '100vh !important',
        },
      },
    },
    '&[data-map-count="4"]': {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
    },
  },
  mapProviderIcon: {
    '--size': '48px',
    '--inset': '16px',

    position: 'absolute',
    height: 'var(--size)',
    width: 'var(--size)',
    zIndex: 1001,

    '& svg': {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },
  fullscreenButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
})

interface ICoverageMapCustomSplitScreenProps {
  availableProviders: Record<string, { new (): CoverageProvider<boolean> }>
}

export default function CoverageMapCustomSplitScreen({ availableProviders }: ICoverageMapCustomSplitScreenProps) {
  const classes = useStyles()
  const fullscreenHandle = useFullScreenHandle()

  // multiple refs
  const mainMapRef = React.useRef<L.Map>()

  return (
    <>
      <SplitScreenSettings availableProviders={availableProviders} />

      <PostcodeSearch map={mainMapRef.current} />

      <Section width="full" className={classes.mapSection}>
        <NoSsr>
          <div className={classes.fullscreenButtonContainer}>
            <Button icon={<FullscreenIcon />} onClick={fullscreenHandle.enter}>
              Go fullscreen
            </Button>
          </div>
        </NoSsr>

        <FullScreen handle={fullscreenHandle}>
          <NoSsr>
            <SplitMaps ref={mainMapRef} />
          </NoSsr>
        </FullScreen>
      </Section>
    </>
  )
}

const SplitMaps = React.forwardRef(_SplitMaps)

function _SplitMaps(_: any, ref: React.Ref<Map | undefined>) {
  const classes = useStyles()
  const { layers } = useRecoilValue(SplitScreenCoverageMapAtom)
  const forceRerender = useForceRender()

  const mapRefs = React.useRef<React.MutableRefObject<L.Map | null>[]>(
    Array.from({ length: MAX_SPLIT_COVERAGE_LAYERS }).map(() => React.createRef()),
  )

  // Synchronise maps
  useEffect(() => {
    const mapInstances = Object.values(mapRefs.current)
      .map(ref => ref.current)
      .filter(Boolean)

    // call map.sync(map) for all pairings
    mapInstances.forEach((map, i) => {
      mapInstances.forEach((otherMap, j) => {
        if (i !== j) {
          console.log('Syncing map', i, 'with map', j)
          try {
            if ((map as any).isSynced(otherMap)) {
              console.log('Already synced')
              return
            }
            ;(map as any).sync(otherMap, {
              syncCursor: true,
            })
          } catch (e) {
            console.warn(e)
          }
        }
      })

      map?.invalidateSize()
    })

    console.log('Synced maps')
    return () => {
      console.log('Unsyncing')

      mapInstances.forEach((map, i) => {
        mapInstances.forEach((otherMap, j) => {
          if (i !== j) {
            try {
              ;(map as any).unsync(otherMap)
            } catch (e) {
              console.warn(e)
            }
          }
        })
      })
    }
  })

  // Force re-render when all map refs are propagated
  useEffect(() => {
    const refsPropagated = Object.values(mapRefs.current).filter(ref => !!ref.current).length

    if (refsPropagated === layers.length) return

    const timeout = setTimeout(() => {
      console.log('Checking refs')
      console.log(Object.values(mapRefs.current).map(ref => !!ref.current))

      if (Object.values(mapRefs.current).filter(ref => !!ref.current).length === layers.length) {
        console.log('All refs propagated')
        forceRerender()
      } else {
        console.log('Not all refs propagated')
      }
    }, 250)

    return () => clearTimeout(timeout)
  })

  if (layers.length === 0) {
    if (typeof ref === 'function') {
      ref(undefined)
    } else {
      // @ts-expect-error
      ref!!.current = undefined
    }
  }

  const defaultParams = new URLSearchParams()
  defaultParams.append('layer', 'O2 UK;default;default')
  defaultParams.append('layer', 'Vodafone;default;default')
  defaultParams.append('layer', 'Three UK;default;default')
  defaultParams.append('layer', 'EE;default;default')

  return (
    <>
      {layers.length === 0 && (
        <Section style={{ margin: 'auto', maxWidth: 768, paddingLeft: 24, paddingRight: 24, marginTop: 36 }}>
          <p className="text-speak-up">Get started by adding your first layer above.</p>

          <p className="text-speak">
            Or{' '}
            <Link internal={false} href={`/gb/coverage/split-screen?${defaultParams}`}>
              start from a comparison of all UK networks' 4G coverage
            </Link>
            .
          </p>
        </Section>
      )}

      <div className={classes.mapGrid} data-map-count={layers.length}>
        {layers.map((layer, i) => {
          return (
            <UkCoverageMap
              key={i}
              provider={layer.provider}
              selectedLayerId={layer.selectedLayer}
              showAttribution={false}
              showFullscreenButton={false}
              showGeolocation={false}
              showZoomControl={false}
              inertia={false}
              ref={that => {
                if (i === 0) {
                  // set `ref` whether it is refobject or function
                  if (typeof ref === 'function') {
                    ref(that)
                  } else {
                    // @ts-expect-error
                    ref!!.current = that
                  }
                }

                mapRefs.current[i].current = that
              }}
            >
              <div className={classes.mapProviderIcon}>{layer.provider.providerIcon}</div>
            </UkCoverageMap>
          )
        })}
      </div>
    </>
  )
}
