import React from 'react'

import Section from '@components/Design/Section'
import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import CardLink from '@components/MobileNetworking/CardLink'

import Colors from '@data/colors.json'
import Breakpoints from '@data/breakpoints'

import { makeStyles } from '@material-ui/styles'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import { PageProps } from 'gatsby'

interface ILinkGroup {
  groupName: string
  groupDescription: string
  groupLinks: ILink[]
}

interface ILink {
  title: string
  description: string
  url: string
}

const Links: ILinkGroup[] = [
  {
    groupName: 'Datasets',
    groupDescription: 'A variety of UK mobile networking related datasets compiled by the community, available for free.',
    groupLinks: [
      {
        title: 'NR/EARFCN list',
        description: 'A list of UK mobile network frequencies by their NRARFCNs and EARFCNs.',
        url: '/gb/arfcn-list',
      },
      {
        title: 'Spectrum allocation',
        description: 'A visualisation of spectrum allocation for mobile networks within the UK.',
        url: '/gb/spectrum',
      },
    ],
  },
  {
    groupName: 'Maps',
    groupDescription: 'UK mobile network related maps.',
    groupLinks: [
      {
        title: 'Telecoms streetworks',
        description: 'See upcoming and current streetworks registered with councils, along with descriptions of the works.',
        url: '/maps/streetworks',
      },
      {
        title: 'UK telecom sites',
        description: 'View a map of UK telecom sites, compiled from various government datasets.',
        url: '/gb/sites',
      },
      {
        title: 'Network coverage',
        description: 'See official UK mobile network coverage plots for 2G/3G/4G/5G on simple, easy-to-use maps.',
        url: '/gb/coverage',
      },
    ],
  },
  {
    groupName: 'Utilities',
    groupDescription: 'UK mobile networking tools and utilities.',
    groupLinks: [
      {
        title: 'Three UK RAN status API',
        description: "Access to Three UK's RAN status API endpoint via a proxy.",
        url: '/gb/three-ran-status',
      },
      {
        title: 'Virgin Media deployment info',
        description: 'Discover hidden information about Virgin Media deployments in your local area.',
        url: '/gb/virgin-media-deployment-info',
      },
    ],
  },
]

const useStyles = makeStyles({
  linkList: {
    marginTop: 24,
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--columns), minmax(0, 1fr))',
    gap: 32,
    '--columns': 1,

    [Breakpoints.downTo.tablet]: {
      '--columns': 2,
    },
  },
})

function MobileNetworkingPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout
      location={location}
      title="Mobile networking in the UK"
      description="A collection of UK mobile networking tools and datasets compiled by the community."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Mobile networking in the UK</h1>
        <p role="doc-subtitle" className="text-loud">
          A collection of UK mobile networking tools and datasets compiled by the community.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'United Kingdom', url: '/gb' },
        ]}
      />

      {Links.map((group, i) => (
        <Section key={i} darker={i % 2 === 0 ? false : true} width="wider">
          <h2 className="text-louder">{group.groupName}</h2>
          <p className="text-speak">{group.groupDescription}</p>

          <div className={classes.linkList}>
            {group.groupLinks.map(link => (
              <CardLink key={link.title} {...link} />
            ))}
          </div>
        </Section>
      ))}
    </Layout>
  )
}

export default MobileNetworkingPage
