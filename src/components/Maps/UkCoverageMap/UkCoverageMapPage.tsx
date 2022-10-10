import React, { useRef, useState } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import UkCoverageMap from '@components/Maps/UkCoverageMap'
import SelectDropdown from '@components/Inputs/SelectDropdown'

import Colors from '@data/colors.json'
import EECoverageMapProvider from '@components/Maps/UkCoverageMap/Providers/EEProvider'

import { makeStyles, NoSsr } from '@material-ui/core'
import clsx from 'clsx'

import type { PageProps } from 'gatsby'
import CoverageProvider from './Providers/CoverageProvider'
import CoverageKey from './CoverageKey'

const useStyles = makeStyles({
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
})

export default function UkCoverageMapPage(Provider: { new (): CoverageProvider }) {
  return function CoverageMapPage({ location }: PageProps) {
    const classes = useStyles()

    const provider = useRef(new Provider())

    provider.current.validate()

    const { providerName } = provider.current

    const [selectedLayerId, setSelectedLayerId] = useState(provider.current.defaultLayerId)

    if (provider.current.isLayerHidden(selectedLayerId)) {
      const firstNonHiddenLayer = provider.current.getLayers().findIndex(layer => !layer.hidden)

      setSelectedLayerId(firstNonHiddenLayer)
    }

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
          <h2 className="text-loud">Layer selection</h2>

          <SelectDropdown
            value={selectedLayerId.toString()}
            label="Coverage type"
            onChange={(value: string) => {
              setSelectedLayerId(parseInt(value))
            }}
            options={provider.current
              .getLayers()
              .map((layer, index) => ({ label: layer.label, value: index.toString() }))
              .filter((_, i) => !provider.current.isLayerHidden(i))}
          />

          {provider.current.supportsSites && (
            <p className={clsx('text-speak', classes.sitesAvailable)}>
              This coverage map also shows the location of network sites. To see them, you must zoom in.
            </p>
          )}

          {provider.current.getPageMessages().map(msg => (
            <p className={clsx('text-speak', classes.sitesAvailable)}>{msg}</p>
          ))}

          <CoverageKey keyData={provider.current.getLayerKeys()[selectedLayerId]} />
        </Section>

        <Section width="full" className={classes.mapSection}>
          <NoSsr>
            <UkCoverageMap provider={provider.current} selectedLayerId={selectedLayerId} />
          </NoSsr>
        </Section>
      </Layout>
    )
  }
}
