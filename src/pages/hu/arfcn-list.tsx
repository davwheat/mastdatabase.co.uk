import React from 'react'

import Colors from '@data/colors.json'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'

import ArfcnListIntro from '@components/MobileNetworking/ArfcnListIntro'
import ArfcnList from '@components/MobileNetworking/ArfcnList'
import Breadcrumbs from '@components/Design/Breadcrumbs'

import EARFCNs from 'mobile-spectrum-data/HU/EARFCNs'
import NRARFCNs from 'mobile-spectrum-data/HU/NRARFCNs'

import type { PageProps } from 'gatsby'

function HUArfcnListPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Hungarian ARFCN list"
      description="A mostly complete list of Hungarian mobile networks' ARFCNs for 4G LTE and 5G NR."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Hungarian ARFCN list</h1>
        <p role="doc-subtitle" className="text-loud">
          A mostly complete dataset of Hungarian mobile network data carriers by their NR/EARFCN.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Hungary', url: '/HU' },
          { t: 'ARFCN list', url: '/HU/arfcn-list' },
        ]}
      />

      <ArfcnListIntro />

      <ArfcnList
        heading="Hungarian ARFCN table"
        ratData={{
          nr: NRARFCNs,
          lte: EARFCNs,
        }}
      />
    </Layout>
  )
}

export default HUArfcnListPage
