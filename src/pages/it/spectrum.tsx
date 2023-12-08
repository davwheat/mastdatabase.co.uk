import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotaller from '@components/MobileNetworking/SpectrumTotaller'

import Colors from '@data/colors.json'
import ITAllBands from 'mobile-spectrum-data/IT'

import type { PageProps } from 'gatsby'

function LTSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Italian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Italy, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Italian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Italy, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Italy', url: '/it' },
          { t: 'Mobile spectrum allocation', url: '/it/spectrum' },
        ]}
      />

      <SpectrumTotaller countryCode="IT" bandsData={ITAllBands} />

      <AllSpectrumMaps locationName="Italy" countryCode="IT" bandsData={ITAllBands} />
    </Layout>
  )
}

export default LTSpectrumAllocationPage
