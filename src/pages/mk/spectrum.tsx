import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotaller from '@components/MobileNetworking/SpectrumTotaller'

import Colors from '@data/colors.json'
import MKAllBands from 'mobile-spectrum-data/MK'

import type { PageProps } from 'gatsby'

function MKSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="North Macedonian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across North Macedonia, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">North Macedonian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across North Macedonia, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'North Macedonia', url: '/mk' },
          { t: 'Mobile spectrum allocation', url: '/mk/spectrum' },
        ]}
      />

      <SpectrumTotaller countryCode="MK" bandsData={MKAllBands} />

      <AllSpectrumMaps locationName="North Macedonia" countryCode="MK" bandsData={MKAllBands} />
    </Layout>
  )
}

export default MKSpectrumAllocationPage
