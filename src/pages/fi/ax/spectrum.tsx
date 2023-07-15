import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import AXAllBands from 'mobile-spectrum-data/AX'

import type { PageProps } from 'gatsby'

function AXSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Åland Islands mobile spectrum allocation"
      description="A visualisation of spectrum allocation across the Åland Islands, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Åland Islands mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across the Åland Islands, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Finland', url: '/fi' },
          { t: 'Åland Islands', url: '/fi/ax' },
          { t: 'Mobile spectrum allocation', url: '/fi/ax/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="FI" bandsData={AXAllBands} />

      <AllSpectrumMaps locationName="Åland Islands" countryCode="AX" bandsData={AXAllBands} />
    </Layout>
  )
}

export default AXSpectrumAllocationPage
