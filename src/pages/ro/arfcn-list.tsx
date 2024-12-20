import React from 'react'

import Colors from '@data/colors.json'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'

import ArfcnListIntro from '@components/MobileNetworking/ArfcnListIntro'
import ArfcnList from '@components/MobileNetworking/ArfcnList'
import Breadcrumbs from '@components/Design/Breadcrumbs'

import EARFCNs from 'mobile-spectrum-data/RO/EARFCNs'
import NRARFCNs from 'mobile-spectrum-data/RO/NRARFCNs'

import type { PageProps } from 'gatsby'

function ROArfcnListPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Romanian ARFCN list"
      description="A mostly complete list of Romanian mobile networks' ARFCNs for 4G LTE and 5G NR."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Romanian ARFCN list</h1>
        <p role="doc-subtitle" className="text-loud">
          A mostly complete dataset of Romanian mobile network data carriers by their NR/EARFCN.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Romania', url: '/ro' },
          { t: 'ARFCN list', url: '/ro/arfcn-list' },
        ]}
      />

      <ArfcnListIntro />

      <ArfcnList
        heading="Romanian ARFCN table"
        ratData={{
          nr: NRARFCNs,
          lte: EARFCNs,
        }}
      />
    </Layout>
  )
}

export default ROArfcnListPage
