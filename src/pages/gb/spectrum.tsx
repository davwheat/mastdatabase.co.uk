import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotaller from '@components/MobileNetworking/SpectrumTotaller'
import MinorAlert from '@components/Design/MinorAlert'

import Colors from '@data/colors.json'
import GBAllBands from 'mobile-spectrum-data/GB'

import type { PageProps } from 'gatsby'

function GBSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="UK mobile spectrum allocation"
      description="A visualisation of spectrum allocation across the UK, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">UK mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across the UK, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'United Kingdom', url: '/gb' },
          { t: 'Mobile spectrum allocation', url: '/gb/spectrum' },
        ]}
      />

      {/* <Section>
        <h2 className="text-louder">How does allocation work?</h2>

        <p className="text-speak">
          Mobile networks use a variety of frequencies to transmit and receive data between the network's nodes and end devices (UEs). These
          frequencies are usually auctioned by regulatory bodies, such as Ofcom in the UK, and operators are bound by license terms set out by
          the&nbsp;licensor.
        </p>
        <p className="text-speak">
          These licenses dictate a large variety of info, such as: areas where the license is valid, the maximum transmit power permitted, limits
          on what the spectrum may be used for, terms for license renewal, and much&nbsp;more.
        </p>
        <p className="text-speak">
          The UK's spectrum share is rather varied, with many networks being in posession of much larger amounts of spectrum compared to others,
          which can have a significant impact on their ability to provide consistent experiences to&nbsp;customers.
        </p>
      </Section> */}

      <SpectrumTotaller countryCode="GB" bandsData={GBAllBands}>
        <MinorAlert color="primaryBlue" coloredBackground heading="Calculation info">
          <p className="text-speak">This total includes EE's B67 LTE allocation which is not supported by any known COTS UE.</p>
        </MinorAlert>
      </SpectrumTotaller>

      <AllSpectrumMaps locationName="UK" countryCode="GB" bandsData={GBAllBands} />
    </Layout>
  )
}

export default GBSpectrumAllocationPage
