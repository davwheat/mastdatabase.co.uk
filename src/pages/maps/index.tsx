import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import CardLink from '@components/Links/CardLink'

import Colors from '@data/colors.json'
import Breakpoints from '@data/breakpoints'

import { makeStyles } from '@material-ui/core'
import { PageProps } from 'gatsby'

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

    '& img.emoji': {
      display: 'inline-block',
      height: '1em',
      width: 'auto',
      verticalAlign: '-0.1em',
    },
  },
})

export default function MapsPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout location={location} title="Maps">
      <Hero firstElement size="huge" color={Colors.primaryRed}>
        <h1 className="text-shout">Maps</h1>
        <p role="doc-subtitle" className="text-loud">
          Useful mobile-networking maps, such as maps of upcoming works and registered&nbsp;sites.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Maps', url: '/maps' },
        ]}
      />

      <Section>
        <div className={classes.linkList}>
          <CardLink
            title="UK streetworks map"
            description="See upcoming and current streetworks registered with councils, along with descriptions of the works."
            url="/maps/streetworks"
          />
          <CardLink
            title="Freshwave site map"
            description="See all registered site locations with Freshwave. This does not correspond to active sites, just possible locations."
            url="/maps/freshwave"
          />
        </div>
      </Section>
    </Layout>
  )
}
