import React from 'react'

import Section from '@components/Design/Section'
import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'

import Colors from '@data/colors.json'
import BGAllBands from 'mobile-spectrum-data/BG'
import { PageProps } from 'gatsby'
import SpectrumTotaller from '@components/MobileNetworking/SpectrumTotaller'

function BGSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Bulgarian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Bulgaria, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Bulgarian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Bulgaria, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Bulgaria', url: '/bg' },
          { t: 'Mobile spectrum allocation', url: '/bg/spectrum' },
        ]}
      />

      <SpectrumTotaller countryCode="BG" bandsData={BGAllBands} />

      <AllSpectrumMaps locationName="Bulgaria" countryCode="BG" bandsData={BGAllBands} />
    </Layout>
  )
}

export default BGSpectrumAllocationPage
