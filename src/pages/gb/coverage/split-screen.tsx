import React from 'react'

import Layout from '@components/Layout'
import { PageProps } from 'gatsby'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'

import CoverageMapCustomSplitScreen from '@components/Maps/UkCoverageMap/SplitScreen/UkCoverageMapCustomSplitScreen'

import Colors from '@data/colors.json'

import O2CoverageMapProvider from '@components/Maps/UkCoverageMap/Providers/O2Provider'
import VodafoneCoverageMapProvider from '@components/Maps/UkCoverageMap/Providers/VFProvider'
import ThreeUkCoverageMapProvider from '@components/Maps/UkCoverageMap/Providers/3UKProvider'
import EECoverageMapProvider from '@components/Maps/UkCoverageMap/Providers/EEProvider'

const AllProviders = {
  'O2 UK': O2CoverageMapProvider,
  Vodafone: VodafoneCoverageMapProvider,
  'Three UK': ThreeUkCoverageMapProvider,
  EE: EECoverageMapProvider,
}

export default function SplitScreenCoverageMap({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Split-screen UK coverage map"
      description="Compare mobile UK network coverage in the UK between different networks, technologies and dates."
    >
      <Hero firstElement size="large" color={Colors.primaryRed}>
        <h1 className="text-shout">Split-screen coverage map</h1>
        <p role="doc-subtitle" className="text-loud">
          Compare mobile UK network coverage in the UK between different networks, technologies and dates.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'United Kingdom', url: '/gb' },
          { t: 'Coverage', url: '/gb/coverage' },
          { t: 'Split-screen', url: '/gb/coverage/split-screen' },
        ]}
      />

      <CoverageMapCustomSplitScreen availableProviders={AllProviders} />
    </Layout>
  )
}
