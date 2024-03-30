import Section from '@components/Design/Section'
import LoadingSpinner from '@components/LoadingSpinner'
import { makeStyles, NoSsr } from '@material-ui/core'
import React, { useEffect } from 'react'
import CoverageProvider from '../Providers/CoverageProvider'
import CoverageKey from '../CoverageKey'
import clsx from 'clsx'
import SelectDropdown from '@components/Inputs/SelectDropdown'
import { useRecoilState } from 'recoil'
import { SplitScreenCoverageMapAtom } from '@atoms'
import useIsFirstRender from '@hooks/useIsFirstRender'
import MinorAlert from '@components/Design/MinorAlert'
import Breakpoints from '@data/breakpoints'
import Colors from '@data/colors.json'
import Button from '@components/Inputs/Button'
import PlusBoldIcon from 'mdi-react/PlusBoldIcon'
import TrashOutlineIcon from 'mdi-react/TrashOutlineIcon'

interface ISplitScreenSettingsProps {
  availableProviders: Record<string, { new (): CoverageProvider<boolean> }>
}

export function getTileVersionsForProvider(provider: CoverageProvider<boolean>) {
  return (
    provider.supportsVersionHistory &&
    Object.entries(provider.getTilesVersions()).map(([k, v]) => ({
      label: v,
      value: k,
    }))
  )
}

export function getTileLayersForProvider(provider: CoverageProvider<boolean>, hideHiddenLayers: boolean) {
  return provider
    .getLayers()
    .map(l => ({ label: l.label, value: l.label }))
    .filter(l => !provider.isLayerHidden(l.value, hideHiddenLayers))
}

export const MAX_SPLIT_COVERAGE_LAYERS = 4

export default function SplitScreenSettings({ availableProviders }: ISplitScreenSettingsProps) {
  const classes = useStyles()
  const firstRender = useIsFirstRender()

  const [activeProviders, _setActiveProviders] = useRecoilState(SplitScreenCoverageMapAtom)

  function setActiveProviders(fn: (prev: typeof activeProviders) => typeof activeProviders) {
    _setActiveProviders(prev => {
      const newProviders = fn(prev)

      // Update URL query params
      const params = new URLSearchParams()
      newProviders.layers.forEach(l => {
        params.append('layer', `${l.provider.providerName};${l.selectedVersion};${l.selectedLayer}`)
      })
      window.history.replaceState({}, '', `?${params.toString()}${window.location.hash ? `#${window.location.hash}` : ''}`)

      return newProviders
    })
  }

  useEffect(() => {
    // Load from URL query params

    const urlParams = new URLSearchParams(window.location.search)
    let providers = urlParams.getAll('layer')

    if (providers.length > MAX_SPLIT_COVERAGE_LAYERS) {
      console.warn('Too many layers in URL, truncating to', MAX_SPLIT_COVERAGE_LAYERS)
      providers = providers.slice(0, MAX_SPLIT_COVERAGE_LAYERS)
    }

    _setActiveProviders(prev => {
      const newLayers = providers
        .map(p => {
          let [providerName, version, layer] = p.split(';')

          const pClass = availableProviders[providerName]
          if (!pClass) {
            console.warn('Provider not found:', providerName)
            return null
          }

          const provider = new pClass()

          if (version === 'default') {
            version = provider.version ?? ''
          } else if (!provider.setTilesVersion(version)) {
            console.warn('Version not found:', version)
          }

          if (layer === 'default') {
            layer = provider.getLayers()[provider.defaultLayerIndex].label
          } else if (!provider.getLayers().find(l => l.label === layer)) {
            console.warn('Layer not found:', layer)
          }

          return {
            provider,
            selectedLayer: layer,
            selectedVersion: version,
          }
        })
        .filter(Boolean) as { provider: CoverageProvider<boolean>; selectedLayer: string; selectedVersion: string }[]

      return { ...prev, layers: newLayers }
    })
  }, [])

  return (
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
          {activeProviders.layers.map((layer, i) => {
            const { provider, selectedLayer, selectedVersion } = layer

            const tileVersions = getTileVersionsForProvider(provider)
            const tileLayers = getTileLayersForProvider(provider, firstRender)

            try {
              provider.validate()
            } catch (e) {
              return (
                <li key={provider.providerName}>
                  <h3 className="text-loud">{provider.providerName}</h3>

                  <MinorAlert color="primaryRed" coloredBackground className={classes.providerUnavailable}>
                    <p className="text-speak">
                      There is an issue with this provider at the moment. We're looking into resolving this problem as quickly as possible.
                    </p>
                  </MinorAlert>
                </li>
              )
            }

            let selectedLayerIndex = tileLayers.findIndex(l => l.label === selectedLayer)
            if (selectedLayerIndex === -1) {
              console.log('updated selected layer to', tileLayers[provider.defaultLayerIndex].value)
              selectedLayerIndex = provider.defaultLayerIndex
            }

            return (
              <li key={`${i}: ${provider.providerName}_${selectedVersion}_${selectedLayer}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                  <h3 style={{ margin: 0 }} className="text-loud">
                    {provider.providerName}
                  </h3>
                  <Button
                    style={{ padding: 6 }}
                    onClick={() => {
                      setActiveProviders(prev => {
                        const newLayers = [...prev.layers]
                        newLayers.splice(i, 1)
                        return { ...prev, layers: newLayers }
                      })
                    }}
                  >
                    <span className="sr-only">Remove provider</span>
                    <TrashOutlineIcon />
                  </Button>
                </div>

                {provider.supportsVersionHistory && tileVersions && (
                  <div className={classes.mapSettingsSection}>
                    <SelectDropdown
                      value={selectedVersion}
                      label="Map version"
                      onChange={(value: string) => {
                        setActiveProviders(prev => {
                          const newLayers = [...prev.layers]
                          prev.layers[i].provider.setTilesVersion(value)
                          newLayers[i] = { ...prev.layers[i], selectedVersion: value }
                          return { ...prev, layers: newLayers }
                        })
                      }}
                      options={tileVersions}
                    />
                  </div>
                )}

                <div className={classes.mapSettingsSection}>
                  <SelectDropdown
                    value={selectedLayer}
                    label="Coverage type"
                    onChange={(value: string) => {
                      setActiveProviders(prev => {
                        const newLayers = [...prev.layers]
                        newLayers[i] = { ...prev.layers[i], selectedLayer: value }
                        return { ...prev, layers: newLayers }
                      })
                    }}
                    options={tileLayers}
                  />
                </div>

                {provider.getPageMessages().map((msg, i) => (
                  <p key={i} className={clsx('text-speak', classes.sitesAvailable)}>
                    {msg}
                  </p>
                ))}

                <CoverageKey keyData={provider.getLayerKeys()[selectedLayerIndex]} />
              </li>
            )
          })}

          {activeProviders.layers.length < MAX_SPLIT_COVERAGE_LAYERS && (
            <li key="new">
              <p className="text-center text-loud">Add new layer</p>

              {Object.entries(availableProviders).map(([providerName, provider]) => (
                <Button
                  key={providerName}
                  icon={<PlusBoldIcon />}
                  onClick={() => {
                    setActiveProviders(prev => {
                      const p = new provider()
                      return {
                        ...prev,
                        layers: [
                          ...prev.layers,
                          {
                            provider: p,
                            selectedLayer: p.getLayers()[p.defaultLayerIndex].label,
                            selectedVersion: p.version ?? '',
                          },
                        ],
                      }
                    })
                  }}
                >
                  {providerName}
                </Button>
              ))}

              {/* Fix for last button getting margin-top: auto */}
              <span />
            </li>
          )}
        </ul>
      </NoSsr>
    </Section>
  )
}

const useStyles = makeStyles({
  loading: {
    textAlign: 'center',

    '& p': {
      marginTop: 24,
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
})
