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
import countryCodeToFlag from '@functions/countryCodeToFlag'

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

interface ICountryItem {
  code: string
  name: string
  nativeName: string
}

const Countries: ICountryItem[] = [
  { code: 'gb', name: 'United Kingdom', nativeName: 'United Kingdom' },
  { code: 'dk', name: 'Denmark', nativeName: 'Danmark' },
  { code: 'de', name: 'Germany', nativeName: 'Deutschland' },
]

export default function IndexPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout location={location} title="Home">
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">Mast Database</h1>
        <p role="doc-subtitle" className="text-loud">
          A collection of mobile networking tools and resources for the&nbsp;UK.
        </p>
      </Hero>

      <Breadcrumbs data={[{ t: 'Home', url: '/' }]} />

      <Section>
        <h2 className="text-louder">Welcome</h2>
        <p className="text-speak">
          Mastdatabase.co.uk aims to provide a vast array of mobile networking tools and resources for the UK and rest of the&nbsp;world.
        </p>
        <p className="text-speak">Choose a section below to get&nbsp;started.</p>

        <div className={classes.linkList}>
          <CardLink title="Maps" description="Useful mobile networking maps, such as maps of upcoming works and registered sites." url="/maps" />
        </div>
      </Section>

      <Section>
        <h2 className="text-loud">Country data</h2>
        <p>Mobile networking info about specific countries, such as spectrum allocation and ARFCN lists.</p>

        <div className={classes.linkList}>
          {Countries.map(({ code, name, nativeName }) => (
            <CardLink
              key={code}
              title={
                <>
                  {countryCodeToFlag(code)} {name}
                </>
              }
              description={nativeName}
              url={`/${code}`}
            />
          ))}
        </div>
      </Section>
    </Layout>
  )
}
