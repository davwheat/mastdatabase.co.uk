import React from 'react'

import Colors from '@data/colors.json'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import ArfcnListIntro from '@components/MobileNetworking/ArfcnListIntro'
import ArfcnList from '@components/MobileNetworking/ArfcnList'

import EARFCNs from 'mobile-spectrum-data/IE/EARFCNs'
import NRARFCNs from 'mobile-spectrum-data/IE/NRARFCNs'

import type { PageProps } from 'gatsby'

function IEArfcnListPage({ location }: PageProps) {
  return (
    <Layout location={location} title="Irish ARFCN list" description="A partial list of Irish mobile networks' ARFCNs for 4G LTE and 5G NR.">
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Irish ARFCN list</h1>
        <p role="doc-subtitle" className="text-loud">
          A partial dataset of Irish mobile network frequencies by their NR/EARFCN.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Ireland', url: '/ie' },
          { t: 'ARFCN list', url: '/ie/arfcn-list' },
        ]}
      />

      <ArfcnListIntro />

      <ArfcnList
        heading="Irish ARFCN table"
        ratData={{
          nr: NRARFCNs,
          lte: EARFCNs,
        }}
      />
    </Layout>
  )
}

export default IEArfcnListPage
