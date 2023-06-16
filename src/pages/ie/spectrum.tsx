import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import MinorAlert from '@components/Design/MinorAlert'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'

import Colors from '@data/colors.json'
import IEAllBands from 'mobile-spectrum-data/IE'

import type { PageProps } from 'gatsby'

function IESpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Irish mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Ireland, per operator and radio access technology."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Irish mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Ireland, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Ireland', url: '/ie' },
          { t: 'Mobile spectrum allocation', url: '/ie/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="IE" bandsData={IEAllBands}>
        <MinorAlert color="primaryBlue" coloredBackground heading="Calculation info">
          <p className="text-speak">This total includes n78/3500 MHz spectrum for cities only. Rural allocation is not included.</p>
        </MinorAlert>
      </SpectrumTotallerSection>

      <AllSpectrumMaps locationName="Ireland" countryCode="IE" bandsData={IEAllBands} />
    </Layout>
  )
}

export default IESpectrumAllocationPage
