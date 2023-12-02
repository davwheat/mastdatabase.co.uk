import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import TTAllBands from 'mobile-spectrum-data/TT'

import type { PageProps } from 'gatsby'

function TTSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Trinidadian and Tobagonian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Russia, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Trinidadian and Tobagonian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Trinidad and Tobago, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Trinidad and Tobago', url: '/tt' },
          { t: 'Mobile spectrum allocation', url: '/tt/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="TT" bandsData={TTAllBands} />

      <AllSpectrumMaps locationName="Trinidad and Tobago" countryCode="TT" bandsData={TTAllBands} />
    </Layout>
  )
}

export default TTSpectrumAllocationPage
