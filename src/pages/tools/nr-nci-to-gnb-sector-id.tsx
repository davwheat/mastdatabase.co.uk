import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import LteTotalRadioPowerCalculator from '@components/Calculators/TotalTxPower'
import Link from '@components/Links/Link'

import sib2 from '@components/Calculators/TotalTxPower/sib2.png'

import Colors from '@data/colors.json'

import { type PageProps } from 'gatsby'
import NrNciCalculator from '@components/Calculators/NrNciToGnb'

export default function NrNciToGnbSectorId({ location }: PageProps) {
  return (
    <Layout location={location} title="NR NCI to gNB and sector ID">
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">NR NCI to gNB and sector ID</h1>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Tools', url: '/tools' },
          { t: 'NR NCI to gNB and sector ID', url: '/tools/nr-nci-to-gnb-sector-id' },
        ]}
      />

      <Section>
        <h2 className="text-loud">Background</h2>

        <p className="text-speak">
          In 5G NR, the NCI (NR cell identity) is a 36-bit number that is used to identify a cell. The NCI is split into two parts: the gNB ID
          and the sector ID. The gNB ID has a variable width of between 22 and 32 bits which can be different for each network.
        </p>
      </Section>

      <Section>
        <NrNciCalculator />
      </Section>

      <Section>
        <h2 className="text-loud">Examples</h2>

        <p className="text-speak">Below are the bit lengths in use on specific networks around the world.</p>

        <table style={{ marginTop: 24 }}>
          <thead>
            <tr>
              <th>Country</th>
              <th>Network</th>
              <th>gNB ID bit length</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UK</td>
              <td>EE</td>
              <td>22</td>
            </tr>
            <tr>
              <td>UK</td>
              <td>O2</td>
              <td>22</td>
            </tr>
            <tr>
              <td>UK</td>
              <td>Vodafone</td>
              <td>22</td>
            </tr>
            <tr>
              <td>UK</td>
              <td>Three</td>
              <td>22</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </Layout>
  )
}
