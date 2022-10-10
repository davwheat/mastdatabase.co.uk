import React, { useRef, useState } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import UkCoverageMap from '@components/Maps/UkCoverageMap'
import SelectDropdown from '@components/Inputs/SelectDropdown'

import Colors from '@data/colors.json'
import O2CoverageMapProvider from '@components/Maps/UkCoverageMap/O2Provider'

import { makeStyles, NoSsr } from '@material-ui/core'
import clsx from 'clsx'

import type { PageProps } from 'gatsby'

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

export default function O2CoverageMapPage({ location }: PageProps) {
  const classes = useStyles()

  const provider = useRef(new O2CoverageMapProvider())

  const [selectedLayerId, setSelectedLayerId] = useState(provider.current.defaultLayerId)

  return (
    <Layout location={location} title="O2 UK coverage map" description="See an interactive map of O2 UK's network coverage.">
      <Hero firstElement size="huge" color={Colors.primaryRed}>
        <h1 className="text-shout">O2 UK coverage map</h1>
        <p role="doc-subtitle" className="text-loud">
          See an interactive map of O2 UK's network coverage.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'United Kingdom', url: '/gb' },
          { t: 'Coverage', url: '/gb/coverage' },
          { t: 'O2 UK', url: '/gb/coverage/o2' },
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
          options={provider.current.getLayers().map((layer, index) => ({ label: layer.label, value: index.toString() }))}
        />

        {provider.current.supportsSites && (
          <p className={clsx('text-speak', classes.sitesAvailable)}>
            This coverage map also shows the location of network sites. To see them, you must zoom in.
          </p>
        )}
      </Section>

      <Section width="full" className={classes.mapSection}>
        <NoSsr>
          <UkCoverageMap provider={provider.current} selectedLayerId={selectedLayerId} />
        </NoSsr>
      </Section>
    </Layout>
  )
}
