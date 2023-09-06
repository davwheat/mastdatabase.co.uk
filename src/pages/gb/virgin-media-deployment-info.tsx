import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import VirginMediaDeploymentInfoForm from '@components/MobileNetworking/UK/VirginMediaDeploymentInfoForm'

import Colors from '@data/colors.json'

import type { PageProps } from 'gatsby'
import Section from '@components/Design/Section'

export default function VirginMediaDeploymentInfoPage({ location }: PageProps) {
  return (
    <Layout
      location={location}
      title="Virgin Media deployment info"
      description="Discover hidden information about Virgin Media deployments in your local area with just a house number and postcode."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Virgin Media deployment info</h1>
        <p role="doc-subtitle" className="text-loud">
          Discover hidden information about Virgin Media deployments in your local area with just a house number and postcode.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'United Kingdom', url: '/gb' },
          { t: 'Virgin Media deployment info', url: '/gb/virgin-media-deployment-info' },
        ]}
      />

      <Section>
        <p className="text-speak">
          Virgin Media have a variety of public API endpoints to provide information about service availability for new installs at properties.
          By default, a lot of this information is hidden from the public-facing website, but the data itself is still present.
        </p>
        <p className="text-speak">
          This tool allows you to enter a house number and postcode, and it will query the Virgin Media API to find out information about their
          services at that property. This ranges from whether there is an active account at the address, its unique ID within the network, the
          network connection type, how telephone services are provided, and more.
        </p>
      </Section>

      <VirginMediaDeploymentInfoForm />
    </Layout>
  )
}
