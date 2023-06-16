import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import FIAllBands from 'mobile-spectrum-data/FI'

import type { PageProps } from 'gatsby'

function FISpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Finnish mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Finland, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Finnish mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Finland, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Finland', url: '/fi' },
          { t: 'Mobile spectrum allocation', url: '/fi/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="FI" bandsData={FIAllBands} />

      <AllSpectrumMaps locationName="Finland" countryCode="FI" bandsData={FIAllBands} />
    </Layout>
  )
}

export default FISpectrumAllocationPage
