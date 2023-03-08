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

    const provider = useMemo(() => new Provider(), [Provider])

    provider.validate()

    const { providerName } = provider

    const [selectedLayerId, setSelectedLayerId] = useState(provider.defaultLayerId)
    const [selectedVersionId, setSelectedVersionId] = useState(provider.getCurrentVersion())

    const filterHiddenLayers = useIsFirstRender()

    const tileVersions = useMemo(
      () =>
        provider.supportsVersionHistory &&
        Object.entries(provider.getTilesVersions()).map(([k, v]) => ({
          label: v,
          value: k,
        })),
      [provider],
    )

    const tileLayers = useMemo(
      () =>
        provider
          .getLayers()
          .map((layer, index) => ({ label: layer.label, value: index.toString() }))
          .filter((_, i) => !provider.isLayerHidden(i, filterHiddenLayers)),
      [provider, filterHiddenLayers],
    )

    useEffect(() => {
      if (provider.isLayerHidden(selectedLayerId)) {
        const firstNonHiddenLayer = provider.getLayers().findIndex(layer => !layer.hidden)

        setSelectedLayerId(firstNonHiddenLayer)
      }
    }, [])

    return (
      <Layout
        location={location}
        title={`${providerName} coverage map`}
        description={`See an interactive map of ${providerName}'s network coverage.`}
      >
        <Hero firstElement size="huge" color={Colors.primaryRed}>
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
                value={selectedLayerId.toString()}
                label="Coverage type"
                onChange={(value: string) => {
                  setSelectedLayerId(parseInt(value))
                }}
                options={tileLayers}
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

            <CoverageKey keyData={provider.getLayerKeys()[selectedLayerId]} />
          </NoSsr>
        </Section>

        <Section width="full" className={classes.mapSection}>
          <NoSsr>
            <UkCoverageMap provider={provider} selectedLayerId={selectedLayerId} />
          </NoSsr>
        </Section>
      </Layout>
    )
  }
}
