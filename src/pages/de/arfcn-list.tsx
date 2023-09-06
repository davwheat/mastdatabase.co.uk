import React from 'react'

import Colors from '@data/colors.json'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import ArfcnListIntro from '@components/MobileNetworking/ArfcnListIntro'
import ArfcnList from '@components/MobileNetworking/ArfcnList'

import EARFCNs from 'mobile-spectrum-data/DE/EARFCNs'
import NRARFCNs from 'mobile-spectrum-data/DE/NRARFCNs'
import { PageProps } from 'gatsby'

function DEArfcnListPage({ location }: PageProps) {
  return (
    <Layout location={location} title="German ARFCN list" description="A mostly complete list of German mobile networks' ARFCNs for 4G LTE.">
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">German ARFCN list</h1>
        <p role="doc-subtitle" className="text-loud">
          A mostly complete dataset of German mobile network data carriers by their NR/EARFCN.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Germany', url: '/de' },
          { t: 'ARFCN list', url: '/de/arfcn-list' },
        ]}
      />

      <ArfcnListIntro />

      <ArfcnList
        heading="German ARFCN table"
        ratData={{
          nr: NRARFCNs,
          lte: EARFCNs,
        }}
      />
    </Layout>
  )
}

export default DEArfcnListPage
