import React from 'react'

import Section from '@components/Design/Section'
import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'

import Colors from '@data/colors.json'
import BGAllBands from 'mobile-spectrum-data/BG'
import { PageProps } from 'gatsby'

function BGSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Bulgarian mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Bulgaria, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Bulgarian mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Bulgaria, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Bulgaria', url: '/bg' },
          { t: 'Mobile spectrum allocation', url: '/bg/spectrum' },
        ]}
      />

      <Section>
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
      </Section>

      <AllSpectrumMaps locationName="Bulgaria" countryCode="BG" bandsData={BGAllBands} />
    </Layout>
  )
}

export default BGSpectrumAllocationPage
