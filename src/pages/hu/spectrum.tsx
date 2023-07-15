import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import HUAllBands from 'mobile-spectrum-data/HU'

import type { PageProps } from 'gatsby'

function HUSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Hungarian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Hungary, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Hungarian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Hungary, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Hungary', url: '/hu' },
          { t: 'Mobile spectrum allocation', url: '/hu/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="HU" bandsData={HUAllBands} />

      <AllSpectrumMaps locationName="Hungary" countryCode="HU" bandsData={HUAllBands} />
    </Layout>
  )
}

export default HUSpectrumAllocationPage
