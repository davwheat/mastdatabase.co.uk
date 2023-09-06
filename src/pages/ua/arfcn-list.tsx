import React from 'react'

import Colors from '@data/colors.json'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'

import ArfcnListIntro from '@components/MobileNetworking/ArfcnListIntro'
import ArfcnList from '@components/MobileNetworking/ArfcnList'
import Breadcrumbs from '@components/Design/Breadcrumbs'

import EARFCNs from 'mobile-spectrum-data/UA/EARFCNs'
// import NRARFCNs from 'mobile-spectrum-data/UA/NRARFCNs'

import type { PageProps } from 'gatsby'

function UAArfcnListPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Ukrainian ARFCN list"
      description="A mostly complete list of Ukrainian mobile networks' ARFCNs for 4G LTE and 5G NR."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Ukrainian ARFCN list</h1>
        <p role="doc-subtitle" className="text-loud">
          A mostly complete dataset of Ukrainian mobile network data carriers by their NR/EARFCN.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Ukraine', url: '/ua' },
          { t: 'ARFCN list', url: '/ua/arfcn-list' },
        ]}
      />

      <ArfcnListIntro />

      <ArfcnList
        heading="Ukrainian ARFCN table"
        ratData={{
          // nr: NRARFCNs,
          lte: EARFCNs,
        }}
      />
    </Layout>
  )
}

export default UAArfcnListPage
