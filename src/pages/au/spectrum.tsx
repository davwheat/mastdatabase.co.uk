import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import AUAllBands from 'mobile-spectrum-data/AU'

import type { PageProps } from 'gatsby'

function AUSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Australian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Australia, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Australian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Australia, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Australia', url: '/au' },
          { t: 'Mobile spectrum allocation', url: '/au/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="AU" bandsData={AUAllBands} />

      <AllSpectrumMaps locationName="Australia" countryCode="AU" bandsData={AUAllBands} />
    </Layout>
  )
}

export default AUSpectrumAllocationPage