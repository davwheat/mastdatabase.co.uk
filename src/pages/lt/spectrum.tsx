import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import LTAllBands from 'mobile-spectrum-data/LT'

import type { PageProps } from 'gatsby'

function LTSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Lithuanian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Lithuania, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Lithuanian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Lithuania, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Lithuania', url: '/lt' },
          { t: 'Mobile spectrum allocation', url: '/lt/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="LT" bandsData={LTAllBands} />

      <AllSpectrumMaps locationName="Lithuania" countryCode="LT" bandsData={LTAllBands} />
    </Layout>
  )
}

export default LTSpectrumAllocationPage
