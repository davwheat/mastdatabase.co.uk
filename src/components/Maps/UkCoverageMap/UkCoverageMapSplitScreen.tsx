import React, { useEffect, useMemo, useReducer, useRef } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import UkCoverageMap from '@components/Maps/UkCoverageMap'
import SelectDropdown from '@components/Inputs/SelectDropdown'
import MinorAlert from '@components/Design/MinorAlert'
import LoadingSpinner from '@components/LoadingSpinner'
import Button from '@components/Inputs/Button'

import Colors from '@data/colors.json'
import CoverageProvider from './Providers/CoverageProvider'
import CoverageKey from './CoverageKey'
import useIsFirstRender from '@hooks/useIsFirstRender'

import { makeStyles, NoSsr } from '@material-ui/core'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import FullscreenIcon from 'mdi-react/FullscreenIcon'
import clsx from 'clsx'

import O2CoverageMapProvider from './Providers/O2Provider'
import VodafoneCoverageMapProvider from './Providers/VFProvider'
import ThreeUkCoverageMapProvider from './Providers/3UKProvider'
import EECoverageMapProvider from './Providers/EEProvider'
import Breakpoints from '@data/breakpoints'

import 'leaflet.sync'

import type { PageProps } from 'gatsby'
import useForceRender from '@hooks/useForceRerender'

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
    gridTemplateColumns: '1fr 1fr',

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

type ActiveProvidersState = { name: string; version: string; layerId: number }[]

type ActiveProvidersStateAction =
  | {
      type: 'updateSelectedLayer'
      payload: {
        providerName: string
        layerId: number
      }
    }
  | {
      type: 'updateSelectedVersion'
      payload: {
        providerName: string
        version: string
      }
    }

function mapReducer(state: ActiveProvidersState, action: ActiveProvidersStateAction): ActiveProvidersState {
  switch (action.type) {
    case 'updateSelectedLayer': {
      const { providerName, layerId } = action.payload

      return state.map(p => {
        if (p.name === providerName) {
          return {
            ...p,
            layerId,
          }
        }

        return p
      })
    }

    case 'updateSelectedVersion': {
      const { providerName, version } = action.payload

      return state.map(p => {
        if (p.name === providerName) {
          return {
            ...p,
            version,
          }
        }

        return p
      })
    }
  }
}

const AllProviders = [O2CoverageMapProvider, VodafoneCoverageMapProvider, ThreeUkCoverageMapProvider, EECoverageMapProvider]

export default function UkCoverageMapSplitScreen() {
  return function CoverageMapPage({ location }: PageProps) {
    const classes = useStyles()
    const fullscreenHandle = useFullScreenHandle()
    const forceRerender = useForceRender()

    // multiple refs
    const mapRefs = React.useRef<Record<string, React.MutableRefObject<L.Map | null>>>(
      AllProviders.reduce(
        (acc, p) => {
          const provider = new p()

          acc[provider.providerName] = React.createRef()

          return acc
        },
        {} as Record<string, React.MutableRefObject<L.Map | null>>,
      ),
    )

    const allProviders = useMemo(
      () =>
        AllProviders.map(p => {
          const provider = new p()

          let valid = true

          try {
            provider.validate()
          } catch (e) {
            valid = false
          }

          return {
            providerName: provider.providerName,
            valid,
            provider,
          }
        }),
      [...AllProviders],
    )

    const [activeProviders, dispatch] = useReducer<React.Reducer<ActiveProvidersState, ActiveProvidersStateAction>>(
      mapReducer,
      allProviders
        .filter(p => p.valid)
        .map(p => ({
          name: p.providerName,
          version: p.provider.getCurrentVersion(),
          layerId: p.provider.defaultLayerId,
        })),
    )

    const filterHiddenLayers = useIsFirstRender()

    function getTileVersionsForProvider(provider: CoverageProvider<boolean>) {
      return (
        provider.supportsVersionHistory &&
        Object.entries(provider.getTilesVersions()).map(([k, v]) => ({
          label: v,
          value: k,
        }))
      )
    }

    function getTileLayersForProvider(provider: CoverageProvider<boolean>) {
      return provider
        .getLayers()
        .map((layer, index) => ({ label: layer.label, value: index.toString() }))
        .filter((_, i) => !provider.isLayerHidden(i, filterHiddenLayers))
    }

    useEffect(() => {
      activeProviders.forEach(({ name, layerId }) => {
        const provider = allProviders.find(p => p.providerName === name)?.provider!

        if (provider.isLayerHidden(layerId)) {
          const firstNonHiddenLayer = provider.getLayers().findIndex(layer => !layer.hidden)

          dispatch({ type: 'updateSelectedLayer', payload: { providerName: name, layerId: firstNonHiddenLayer } })
        }
      })
    }, [])

    // Synchronise maps
    useEffect(() => {
      const mapInstances = Object.values(mapRefs.current)
        .map(ref => ref.current)
        .filter(m => !!m)

      // call map.sync(map) for all pairings
      mapInstances.forEach((map, i) => {
        mapInstances.forEach((otherMap, j) => {
          if (i !== j) {
            ;(map as any).sync(otherMap)
          }
        })
      })
    })

    useEffect(() => {
      const refsPropagated = Object.values(mapRefs.current).every(ref => !!ref.current)

      if (refsPropagated) return

      const timeout = setTimeout(() => {
        if (Object.values(mapRefs.current).every(ref => !!ref.current)) {
          forceRerender()
        }
      }, 250)

      return () => clearTimeout(timeout)
    })

    return (
      <Layout location={location} title="All UK networks coverage map" description="See an interactive coverage map for all UK networks.">
        <Hero firstElement size="large" color={Colors.primaryRed}>
          <h1 className="text-shout">All networks coverage map</h1>
          <p role="doc-subtitle" className="text-loud">
            See an interactive coverage map for all UK networks.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'United Kingdom', url: '/gb' },
            { t: 'Coverage', url: '/gb/coverage' },
            { t: 'All networks', url: '/gb/coverage/all-networks' },
          ]}
        />

        <Section width="wider">
          <NoSsr
            fallback={
              <div className={classes.loading}>
                <LoadingSpinner />

                <p>Loading coverage map...</p>
              </div>
            }
          >
            <h2 className="text-louder">Map settings</h2>

            <ul className={classes.networkSettingsContainer}>
              {allProviders.map(({ providerName, provider, valid }) => {
                const tileVersions = getTileVersionsForProvider(provider)
                const tileLayers = getTileLayersForProvider(provider)

                const selectedVersionId = activeProviders.find(p => p.name === providerName)?.version!
                const selectedLayerId = activeProviders.find(p => p.name === providerName)?.layerId!

                return (
                  <li key={providerName}>
                    <h3 className="text-loud">{providerName}</h3>

                    {!valid && (
                      <MinorAlert color="primaryRed" coloredBackground className={classes.providerUnavailable}>
                        <p className="text-speak">There is an issue with this provider at the moment.</p>
                      </MinorAlert>
                    )}

                    {provider.supportsVersionHistory && tileVersions && (
                      <div className={classes.mapSettingsSection}>
                        <SelectDropdown
                          value={selectedVersionId}
                          label="Map version"
                          onChange={(value: string) => {
                            provider.setTilesVersion(value)
                            dispatch({ type: 'updateSelectedVersion', payload: { providerName, version: value } })
                          }}
                          options={tileVersions}
                        />
                      </div>
                    )}

                    <div className={classes.mapSettingsSection}>
                      <SelectDropdown
                        value={selectedLayerId.toString()}
                        label="Coverage type"
                        onChange={(value: string) => {
                          dispatch({ type: 'updateSelectedLayer', payload: { providerName, layerId: parseInt(value) } })
                        }}
                        options={tileLayers}
                      />
                    </div>

                    {/* {provider.supportsSites && (
                      <p className={clsx('text-speak', classes.sitesAvailable)}>
                        This coverage map also shows the location of network sites. To see them, you must zoom in.
                      </p>
                    )} */}

                    {provider.getPageMessages().map((msg, i) => (
                      <p key={i} className={clsx('text-speak', classes.sitesAvailable)}>
                        {msg}
                      </p>
                    ))}

                    <CoverageKey keyData={provider.getLayerKeys()[selectedLayerId]} />
                  </li>
                )
              })}
            </ul>
          </NoSsr>
        </Section>

        <Section width="full" className={classes.mapSection}>
          <NoSsr>
            <div className={classes.fullscreenButtonContainer}>
              <Button icon={<FullscreenIcon />} onClick={fullscreenHandle.enter}>
                Go fullscreen
              </Button>
            </div>
          </NoSsr>

          <FullScreen handle={fullscreenHandle}>
            <div className={classes.mapGrid}>
              <NoSsr>
                {activeProviders.map(({ name, layerId }) => {
                  const provider = allProviders.find(p => p.providerName === name)?.provider!
                  const mapRef = mapRefs.current[name]

                  return (
                    <UkCoverageMap
                      key={name}
                      provider={provider}
                      selectedLayerId={layerId}
                      showAttribution={false}
                      showFullscreenButton={false}
                      showGeolocation={false}
                      showZoomControl={false}
                      ref={mapRef}
                    >
                      <div className={classes.mapProviderIcon}>{provider.providerIcon}</div>
                    </UkCoverageMap>
                  )
                })}
              </NoSsr>
            </div>
          </FullScreen>
        </Section>
      </Layout>
    )
  }
}
