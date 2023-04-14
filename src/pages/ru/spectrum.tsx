import React from 'react'
import Colors from '@data/colors.json'
import RUAllBands from 'mobile-spectrum-data/RU'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotaller from '@components/MobileNetworking/SpectrumTotaller'

import type { PageProps } from 'gatsby'

function RSSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Russian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Russia, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Russian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Russia, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Russia', url: '/ru' },
          { t: 'Mobile spectrum allocation', url: '/ru/spectrum' },
        ]}
      />

      <SpectrumTotaller countryCode="RU" bandsData={RUAllBands} />

      <AllSpectrumMaps locationName="Russia" countryCode="RU" bandsData={RUAllBands} />
    </Layout>
  )
}

export default RSSpectrumAllocationPage
