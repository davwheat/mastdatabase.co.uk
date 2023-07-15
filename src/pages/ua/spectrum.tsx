import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import UAAllBands from 'mobile-spectrum-data/UA'

import type { PageProps } from 'gatsby'

function UASpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Ukraine mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Ukraine, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Ukraine mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Ukraine, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Ukraine', url: '/ua' },
          { t: 'Mobile spectrum allocation', url: '/ua/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="UA" bandsData={UAAllBands} />

      <AllSpectrumMaps locationName="Ukraine" countryCode="UA" bandsData={UAAllBands} />
    </Layout>
  )
}

export default UASpectrumAllocationPage
