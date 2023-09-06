import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import DEAllBands from 'mobile-spectrum-data/DE'

import type { PageProps } from 'gatsby'

function DESpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="German mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Germany, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">German mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Germany, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Germany', url: '/de' },
          { t: 'Mobile spectrum allocation', url: '/de/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="DE" bandsData={DEAllBands} />

      <AllSpectrumMaps locationName="German" countryCode="DE" bandsData={DEAllBands} />
    </Layout>
  )
}

export default DESpectrumAllocationPage
