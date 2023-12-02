import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import LVAllBands from 'mobile-spectrum-data/LV'

import type { PageProps } from 'gatsby'

function LVSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Latvian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Latvia, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Latvian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Latvia, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Latvia', url: '/lv' },
          { t: 'Mobile spectrum allocation', url: '/lv/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="LV" bandsData={LVAllBands} />

      <AllSpectrumMaps locationName="Latvia" countryCode="LV" bandsData={LVAllBands} />
    </Layout>
  )
}

export default LVSpectrumAllocationPage
