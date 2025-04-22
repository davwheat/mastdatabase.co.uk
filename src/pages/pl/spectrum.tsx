import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import PLAllBands from 'mobile-spectrum-data/PL'

import type { PageProps } from 'gatsby'

function PLSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Polish mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Poland, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Polish mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Poland, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Poland', url: '/pl' },
          { t: 'Mobile spectrum allocation', url: '/pl/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="PL" bandsData={PLAllBands} />

      <AllSpectrumMaps locationName="Poland" countryCode="PL" bandsData={PLAllBands} />
    </Layout>
  )
}

export default PLSpectrumAllocationPage
