import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import EEAllBands from 'mobile-spectrum-data/EE'

import type { PageProps } from 'gatsby'

function EESpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Estonian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Estonia, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Estonian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Estonia, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Estonia', url: '/ee' },
          { t: 'Mobile spectrum allocation', url: '/ee/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="EE" bandsData={EEAllBands} />

      <AllSpectrumMaps locationName="Estonia" countryCode="EE" bandsData={EEAllBands} />
    </Layout>
  )
}

export default EESpectrumAllocationPage
