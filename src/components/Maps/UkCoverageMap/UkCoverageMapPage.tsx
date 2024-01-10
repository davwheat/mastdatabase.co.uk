import React, { useEffect, useState, useMemo } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import UkCoverageMap from '@components/Maps/UkCoverageMap'
import SelectDropdown from '@components/Inputs/SelectDropdown'

import Colors from '@data/colors.json'
import CoverageProvider from './Providers/CoverageProvider'
import CoverageKey from './CoverageKey'
import useIsFirstRender from '@hooks/useIsFirstRender'

import { makeStyles, NoSsr } from '@material-ui/core'
import clsx from 'clsx'

import type { PageProps } from 'gatsby'
import LoadingSpinner from '@components/LoadingSpinner'

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
})

export default function UkCoverageMapPage(Provider: { new (): CoverageProvider<boolean> }) {
  return function CoverageMapPage({ location }: PageProps) {
    const classes = useStyles()
    const filterHiddenLayers = useIsFirstRender()
    const provider = useMemo(() => new Provider(), [Provider])
    provider.validate()

    const { providerName } = provider

    const [selectedLayerId, setSelectedLayerId] = useState(
      provider.getLayers().map(l => ({ label: l.label, value: l.label }))[provider.defaultLayerIndex].value,
    )
    const [selectedVersionId, setSelectedVersionId] = useState(provider.getCurrentVersion())

    const tileVersions = useMemo(
      () =>
        provider.supportsVersionHistory &&
        Object.entries(provider.getTilesVersions()).map(([k, v]) => ({
          label: v,
          value: k,
        })),
      [provider],
    )

    const tileLayers = useMemo(() => {
      const layers = provider.getLayers().map(layer => ({ label: layer.label, value: layer.label }))

      if (!layers.some(l => l.value === selectedLayerId)) {
        setSelectedLayerId(layers[provider.defaultLayerIndex].value)
      }

      return layers
    }, [provider, provider.version, filterHiddenLayers])

    useEffect(() => {
      if (provider.isLayerHidden(tileLayers.findIndex(l => l.value === selectedLayerId)!!)) {
        const firstNonHiddenLayer = provider.getLayers().find(layer => !layer.hidden)?.label!!

        setSelectedLayerId(firstNonHiddenLayer)
      }
    }, [])

    useEffect(() => {
      if (tileLayers.findIndex(l => l.value === selectedLayerId) === -1) {
        console.log('Resetting layer')

        setSelectedLayerId(tileLayers[provider.defaultLayerIndex].value)
      }
    }, [provider.version])

    const shownTileLayers = tileLayers.filter((_, i) => !provider.isLayerHidden(i, filterHiddenLayers))

    let selectedLayerIndex = shownTileLayers.findIndex(l => l.value === selectedLayerId)
    if (selectedLayerIndex === -1) {
      selectedLayerIndex = provider.defaultLayerIndex
    }

    return (
      <Layout
        location={location}
        title={`${providerName} coverage map`}
        description={`See an interactive map of ${providerName}'s network coverage.`}
      >
        <Hero firstElement size="large" color={Colors.primaryRed}>
          <h1 className="text-shout">{providerName} coverage map</h1>
          <p role="doc-subtitle" className="text-loud">
            See an interactive map of {providerName}'s network coverage.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'United Kingdom', url: '/gb' },
            { t: 'Coverage', url: '/gb/coverage' },
            { t: providerName, url: location.pathname },
          ]}
        />

        <Section>
          <NoSsr
            fallback={
              <div className={classes.loading}>
                <LoadingSpinner />

                <p>Loading coverage map...</p>
              </div>
            }
          >
            <h2 className="text-loud">Layer selection</h2>

            {provider.supportsVersionHistory && tileVersions && (
              <div className={classes.mapSettingsSection}>
                <SelectDropdown
                  value={selectedVersionId}
                  label="Map version"
                  onChange={(value: string) => {
                    provider.setTilesVersion(value)
                    setSelectedVersionId(value)
                  }}
                  options={tileVersions}
                />
              </div>
            )}

            <div className={classes.mapSettingsSection}>
              <SelectDropdown
                value={selectedLayerId}
                label="Coverage type"
                onChange={(value: string) => {
                  setSelectedLayerId(value)
                }}
                options={shownTileLayers}
              />
            </div>

            {provider.supportsSites && (
              <p className={clsx('text-speak', classes.sitesAvailable)}>
                This coverage map also shows the location of network sites. To see them, you must zoom in.
              </p>
            )}

            {provider.getPageMessages().map((msg, i) => (
              <p key={i} className={clsx('text-speak', classes.sitesAvailable)}>
                {msg}
              </p>
            ))}

            <CoverageKey keyData={provider.getLayerKeys()[selectedLayerIndex]} />
          </NoSsr>
        </Section>

        <Section width="full" className={classes.mapSection}>
          <NoSsr>
            <UkCoverageMap provider={provider} selectedLayerId={selectedLayerIndex} />
          </NoSsr>
        </Section>
      </Layout>
    )
  }
}
