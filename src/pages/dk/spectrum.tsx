import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'
import SpectrumTotallerSection from '@components/MobileNetworking/SpectrumTotallerSection'
import MinorAlert from '@components/Design/MinorAlert'

import Colors from '@data/colors.json'
import DKAllBands from 'mobile-spectrum-data/DK'

import type { PageProps } from 'gatsby'

function DKSpectrumAllocationPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Danish mobile spectrum allocation"
      description="A visualisation of spectrum allocation across Denmark, per operator and radio access technology."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Danish mobile spectrum allocation</h1>
        <p role="doc-subtitle" className="text-loud">
          A visualisation of spectrum allocation across Denmark, per operator and radio access technology.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Denmark', url: '/dk' },
          { t: 'Mobile spectrum allocation', url: '/dk/spectrum' },
        ]}
      />

      <SpectrumTotallerSection countryCode="DK" bandsData={DKAllBands}>
        <MinorAlert color="primaryBlue" coloredBackground heading="Calculation info">
          <p className="text-speak">This total includes TDC's B67 LTE allocation which is not supported by any known COTS UE.</p>
        </MinorAlert>
      </SpectrumTotallerSection>

      <AllSpectrumMaps locationName="Danish" countryCode="DK" bandsData={DKAllBands} />
    </Layout>
  )
}

export default DKSpectrumAllocationPage
