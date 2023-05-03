import React from 'react'

import Colors from '@data/colors.json'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'

import ArfcnListIntro from '@components/MobileNetworking/ArfcnListIntro'
import ArfcnList from '@components/MobileNetworking/ArfcnList'
import Breadcrumbs from '@components/Design/Breadcrumbs'

import EARFCNs from 'mobile-spectrum-data/MK/EARFCNs'
import NRARFCNs from 'mobile-spectrum-data/MK/NRARFCNs'

import type { PageProps } from 'gatsby'

function MKArfcnListPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="North Macedonian ARFCN list"
      description="A mostly complete list of North Macedonian mobile networks' ARFCNs for 4G LTE and 5G NR."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">North Macedonian ARFCN list</h1>
        <p role="doc-subtitle" className="text-loud">
          A mostly complete dataset of North Macedonian mobile network data carriers by their NR/EARFCN.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'North Macedonia', url: '/mk' },
          { t: 'ARFCN list', url: '/mk/arfcn-list' },
        ]}
      />

      <ArfcnListIntro />

      <ArfcnList
        heading="North Macedonian ARFCN table"
        ratData={{
          nr: NRARFCNs,
          lte: EARFCNs,
        }}
      />
    </Layout>
  )
}

export default MKArfcnListPage
