import React from 'react'
import Colors from '@data/colors.json'
import RSAllBands from 'mobile-spectrum-data/RS'

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
      title="Serbian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Serbia, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Serbian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Serbia, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Serbia', url: '/rs' },
          { t: 'Mobile spectrum allocation', url: '/rs/spectrum' },
        ]}
      />

      <SpectrumTotaller countryCode="RS" bandsData={RSAllBands} />

      <AllSpectrumMaps locationName="Serbia" countryCode="RS" bandsData={RSAllBands} />
    </Layout>
  )
}

export default RSSpectrumAllocationPage
