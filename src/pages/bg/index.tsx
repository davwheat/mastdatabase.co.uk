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
    groupDescription: 'A variety of Bulgarian mobile networking related datasets compiled by the community, available for free.',
    groupLinks: [
      {
        title: 'NR/EARFCN list',
        description: 'A list of Bulgarian mobile network frequencies by their NRARFCNs and EARFCNs.',
        url: '/bg/arfcn-list',
      },
      {
        title: 'Spectrum allocation',
        description: 'A visualisation of spectrum allocation for mobile networks within Bulgaria.',
        url: '/bg/spectrum',
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
      title="Mobile networking in Bulgaria"
      description="A collection of Bulgarian mobile networking tools and datasets maintained as part of my hobby."
    >
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Mobile networking in Bulgaria</h1>
        <p role="doc-subtitle" className="text-loud">
          A collection of Bulgarian mobile networking tools and datasets maintained as part of my hobby.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Bulgaria', url: '/bg' },
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
