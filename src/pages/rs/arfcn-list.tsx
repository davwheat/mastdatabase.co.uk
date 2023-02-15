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

function RSArfcnListPage({ location }: PageProps) {
  return (
    <Layout location={location} title="Serbian ARFCN list" description="A partial list of Serbian mobile networks' ARFCNs for 4G LTE and 5G NR.">
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Serbian ARFCN list</h1>
        <p role="doc-subtitle" className="text-loud">
          A partial dataset of Serbian mobile network frequencies by their NR/EARFCN.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Serbia', url: '/rs' },
          { t: 'ARFCN list', url: '/rs/arfcn-list' },
        ]}
      />

      <ArfcnListIntro />

      <ArfcnList
        heading="Serbian ARFCN table"
        ratData={{
          nr: NRARFCNs,
          lte: EARFCNs,
        }}
      />
    </Layout>
  )
}

export default RSArfcnListPage
