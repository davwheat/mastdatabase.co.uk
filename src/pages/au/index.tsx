import React from 'react'

import Section from '@components/Design/Section'
import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import CardLink from '@components/Links/CardLink'

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
    groupDescription: 'A variety of Australian mobile networking related datasets compiled by the community, available for free.',
    groupLinks: [
      // {
      //   title: 'NR/EARFCN list',
      //   description: 'A list of Australian mobile network frequencies by their NRARFCNs and EARFCNs.',
      //   url: '/au/arfcn-list',
      // },
      {
        title: 'Spectrum allocation',
        description: 'A visualisation of spectrum allocation for mobile networks within Australia.',
        url: '/au/spectrum',
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
      title="Mobile networking in Australia"
      description="A collection of Australian mobile networking tools and datasets compiled by the community."
    >
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Mobile networking in Australia</h1>
        <p role="doc-subtitle" className="text-loud">
          A collection of Australian mobile networking tools and datasets compiled by the community.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Australia', url: '/au' },
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
