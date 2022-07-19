import React from 'react'

import Colors from '@data/colors.json'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'

import ArfcnListIntro from '@components/MobileNetworking/ArfcnListIntro'
import ArfcnList from '@components/MobileNetworking/ArfcnList'

import EARFCNs from '@data/ArfcnData/GB/EARFCNs'
import NRARFCNs from '@data/ArfcnData/GB/NRARFCNs'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import { PageProps } from 'gatsby'

function BGArfcnListPage({ location }: PageProps) {
  return (
    <Layout location={location} title="Bulgarian ARFCN list" description="A mostly complete list of Bulgarian mobile networks' ARFCNs for 4G LTE and 5G NR.">
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Bulgarian ARFCN list</h1>
        <p role="doc-subtitle" className="text-loud">
          A mostly complete dataset of Bulgarian mobile network data carriers by their NR/EARFCN.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Bulgaria', url: '/bg' },
          { t: 'ARFCN list', url: '/bg/arfcn-list' },
        ]}
      />

      <ArfcnListIntro />

      <ArfcnList
        heading="Bulgarian ARFCN table"
        ratData={{
          nr: NRARFCNs,
          lte: EARFCNs,
        }}
      />
    </Layout>
  )
}

export default BGArfcnListPage
