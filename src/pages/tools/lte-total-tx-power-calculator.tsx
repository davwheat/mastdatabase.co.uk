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

export default function LteTotalTxPower({ location }: PageProps) {
  return (
    <Layout location={location} title="LTE total RRU transmit power calculator">
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">LTE total RRU transmit power calculator</h1>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Tools', url: '/tools' },
          { t: 'LTE total RRU transmit power', url: '/tools/lte-total-tx-power-calculator' },
        ]}
      />

      <Section>
        <h2 className="text-loud">Background</h2>
        <p className="text-speak">
          The total transmit power of an LTE RRU (Remote Radio Unit) can be calculated using a combination of four other values: reference signal
          power (RSP), number of TX ports, bandwidth, and the value of p-b in LTE SIB2.
        </p>
        <p className="text-speak">
          Both RSP and <code className="code">p-b</code> can be found within a network's LTE SIB2, as seen below in a screenshot of Network
          Signal Guru:
        </p>
        <Link internal={false} href={sib2} target="_blank">
          <img
            style={{
              width: '100%',
              maxWidth: '400px',
              objectFit: 'contain',
              margin: '0 auto',
              display: 'block',
            }}
            src={sib2}
            alt="Screenshot showing LTE SIB2"
          />
        </Link>
      </Section>

      <Section>
        <LteTotalRadioPowerCalculator />
      </Section>
    </Layout>
  )
}
