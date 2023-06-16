import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import ATAllBands from 'mobile-spectrum-data/AT'

import type { PageProps } from 'gatsby'

function ATSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Austrian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Austria, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Austrian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Austria, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Austria', url: '/at' },
          { t: 'Mobile spectrum allocation', url: '/at/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="AT" bandsData={ATAllBands} />

      <AllSpectrumMaps locationName="Austria" countryCode="AT" bandsData={ATAllBands} />
    </Layout>
  )
}

export default ATSpectrumAllocationPage
