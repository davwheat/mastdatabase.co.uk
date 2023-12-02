import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import JMAllBands from 'mobile-spectrum-data/JM'

import type { PageProps } from 'gatsby'

function JMSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Jamaican mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Jamaica, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Jamaican mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Jamaica, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Jamaica', url: '/jm' },
          { t: 'Mobile spectrum allocation', url: '/jm/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="JM" bandsData={JMAllBands} />

      <AllSpectrumMaps locationName="Jamaica" countryCode="JM" bandsData={JMAllBands} />
    </Layout>
  )
}

export default JMSpectrumAllocationPage
