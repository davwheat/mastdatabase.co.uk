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

import O2Logo from '@assets/icons/brands/o2.inline.svg'
import VodafoneLogo from '@assets/icons/brands/vodafone.inline.svg'
import EELogo from '@assets/icons/brands/ee.inline.svg'
import ThreeLogo from '@assets/icons/brands/three.inline.svg'

interface ILinkGroup {
  groupName: string
  groupDescription: string
  groupLinks: ILink[]
}

interface ILink {
  title: string
  icon: ({ className }: { className: string }) => JSX.Element
  url: string
}

const Links: ILinkGroup[] = [
  {
    groupName: 'Available networks',
    groupDescription: 'Choose a network to view a coverage map for:',
    groupLinks: [
      {
        title: 'O2 UK',
        icon: ({ className }) => <O2Logo className={className} />,
        url: '/gb/coverage/o2',
      },
      // {
      //   title: 'Vodafone UK',
      //   icon: ({ className }) => <VodafoneLogo className={className} />,
      //   url: '/gb/coverage/o2',
      // },
      // {
      //   title: 'EE',
      //   icon: ({ className }) => <EELogo className={className} />,
      //   url: '/gb/coverage/o2',
      // },
      {
        title: 'Three UK',
        icon: ({ className }) => <ThreeLogo className={className} />,
        url: '/gb/coverage/three',
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
  icon: {
    height: '1em',
    marginRight: 10,
  },
})

function CoverageMapsPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout location={location} title="Coverage maps for the UK" description="Official mobile network coverage maps for the UK.">
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Coverage maps for the UK</h1>
        <p role="doc-subtitle" className="text-loud">
          Official mobile network coverage maps for the UK.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'United Kingdom', url: '/gb' },
          { t: 'Coverage', url: '/gb/coverage' },
        ]}
      />

      {Links.map((group, i) => (
        <Section key={i} darker={i % 2 === 0 ? false : true} width="wider">
          <h2 className="text-louder">{group.groupName}</h2>
          <p className="text-speak">{group.groupDescription}</p>

          <div className={classes.linkList}>
            {group.groupLinks.map(({ title, icon: Icon, ...link }) => (
              <CardLink
                key={title}
                title={
                  <>
                    <Icon className={classes.icon} /> &mdash; {title}
                  </>
                }
                {...link}
              />
            ))}
          </div>
        </Section>
      ))}
    </Layout>
  )
}

export default CoverageMapsPage