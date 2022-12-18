import React from 'react'

import Section from '@components/Design/Section'
import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'

import Colors from '@data/colors.json'
import ROAllBands from 'mobile-spectrum-data/RO'

import type { PageProps } from 'gatsby'
import SpectrumTotaller from '@components/MobileNetworking/SpectrumTotaller'

function ROSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Romania mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Romania, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Romania mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Romania, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Romania', url: '/ro' },
          { t: 'Mobile spectrum allocation', url: '/ro/spectrum' },
        ]}
      />

      <SpectrumTotaller countryCode="RO" bandsData={ROAllBands} />

      <AllSpectrumMaps locationName="Romania" countryCode="RO" bandsData={ROAllBands} />
    </Layout>
  )
}

export default ROSpectrumAllocationPage
