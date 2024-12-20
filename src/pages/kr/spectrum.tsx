import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import KRAllBands from 'mobile-spectrum-data/KR'

import type { PageProps } from 'gatsby'

function KRSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="South Korean mobile spectrum allocation"
      description="A visualisation of spectrum allocation across South Korea, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">South Korean mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across South Korea, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'South Korea', url: '/kr' },
          { t: 'Mobile spectrum allocation', url: '/kr/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="KR" bandsData={KRAllBands} />

      <AllSpectrumMaps locationName="South Korea" countryCode="KR" bandsData={KRAllBands} />
    </Layout>
  )
}

export default KRSpectrumAllocationPage
