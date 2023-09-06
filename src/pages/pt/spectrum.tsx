import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import PTAllBands from 'mobile-spectrum-data/PT'

import type { PageProps } from 'gatsby'

function PTSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Portuguese mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Portugal, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Portuguese mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Portugal, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Portugal', url: '/pt' },
          { t: 'Mobile spectrum allocation', url: '/pt/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="PT" bandsData={PTAllBands} />

      <AllSpectrumMaps locationName="Portugal" countryCode="PT" bandsData={PTAllBands} />
    </Layout>
  )
}

export default PTSpectrumAllocationPage
