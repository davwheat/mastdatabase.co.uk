import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'

import { AllBands } from '@data/SpectrumAllocation/DK/Bands'
import Colors from '@data/colors.json'
import { PageProps } from 'gatsby'

function DKSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Danish mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Denmark, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Danish mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Denmark, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Denmark', url: '/dk' },
          { t: 'Mobile spectrum allocation', url: '/dk/spectrum' },
        ]}
      />

      <AllSpectrumMaps locationName="Danish" bandsData={AllBands} />
    </Layout>
  )
}

export default DKSpectrumAllocationPage
