import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'

import Colors from '@data/colors.json'

import Breadcrumbs from '@components/Design/Breadcrumbs'
import { PageProps } from 'gatsby'
import ThreeRanStatusForm from '@components/MobileNetworking/UK/ThreeRanStatusForm'

function ThreeRanStatus({ location }: PageProps) {
  return (
    <Layout location={location} title="Three UK RAN status" description="A helper for accessing Three UK's RAN status private API endpoints.">
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Three UK RAN status</h1>
        <p role="doc-subtitle" className="text-loud">
          A helper for accessing Three UK's RAN status private API endpoints.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'United Kingdom', url: '/gb' },
          { t: 'Three UK RAN status', url: '/gb/three-ran-status' },
        ]}
      />

      <ThreeRanStatusForm />
    </Layout>
  )
}

export default ThreeRanStatus
