import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import CardLink from '@components/Links/CardLink'
import FeaturedBlogArticles from '@components/FeaturedBlogArticles/FeaturedBlogArticles'

import countryCodeToFlag from '@functions/countryCodeToFlag'

import Colors from '@data/colors.json'
import Breakpoints from '@data/breakpoints'

import { makeStyles } from '@material-ui/core'

import { type PageProps } from 'gatsby'

const useStyles = makeStyles({
  featuredBlogArticles: {
    width: '100vw',
    position: 'relative',
    marginLeft: '-50vw',
    left: '50%',
    backgroundColor: Colors.pale.primaryBlue,
    padding: 24,
    marginTop: 32,
    marginBottom: 32,
  },
  featuredBlogArticlesInner: {
    backgroundColor: 'white',
    padding: 24,
    margin: 'auto',
    maxWidth: 700,
  },
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
  nativeName: React.ReactNode
}

const Countries: ICountryItem[] = [
  { code: 'gb', name: 'United Kingdom', nativeName: 'United Kingdom' },
  { code: 'dk', name: 'Denmark', nativeName: 'Danmark' },
  { code: 'de', name: 'Germany', nativeName: 'Deutschland' },
  { code: 'bg', name: 'Bulgaria', nativeName: 'България' },
  { code: 'at', name: 'Austria', nativeName: 'Österreich' },
  { code: 'fi', name: 'Finland', nativeName: 'Suomi' },
  { code: 'ee', name: 'Estonia', nativeName: 'Eesti' },
  { code: 'ua', name: 'Ukraine', nativeName: 'Україна' },
  { code: 'ro', name: 'Romania', nativeName: 'România' },
  { code: 'ie', name: 'Republic of Ireland', nativeName: 'Éire' },
  { code: 'it', name: 'Italy', nativeName: 'Italia' },
  { code: 'lt', name: 'Lithuania', nativeName: 'Lietuva' },
  { code: 'kr', name: 'South Korea', nativeName: '대한민국' },
  {
    code: 'mk',
    name: 'North Macedonia',
    nativeName: (
      <>
        Северна Македонија/
        <wbr />
        Maqedonia e Veriut
      </>
    ),
  },
  {
    code: 'rs',
    name: 'Serbia',
    nativeName: (
      <>
        Србија/
        <wbr />
        Srbija
      </>
    ),
  },
  { code: 'ru', name: 'Russia', nativeName: 'Россия' },
  { code: 'pt', name: 'Portugal', nativeName: 'Portugal' },
  { code: 'hu', name: 'Hungary', nativeName: 'Magyarország' },
  { code: 'jm', name: 'Jamaica', nativeName: 'Jamaica' },
  { code: 'lv', name: 'Latvia', nativeName: 'Latvija' },
  { code: 'tt', name: 'Trinidad and Tobago', nativeName: 'Trinidad and Tobago' },
  { code: 'au', name: 'Australia', nativeName: 'Australia' },
  { code: 'pl', name: 'Poland', nativeName: 'Polska' },
]

export default function IndexPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout location={location} title="Home">
      <Hero firstElement size="large" color={Colors.primaryBlue}>
        <h1 className="text-shout">Mast Database</h1>
      </Hero>

      <Breadcrumbs data={[{ t: 'Home', url: '/' }]} />

      <Section>
        <h2 className="text-louder">Welcome</h2>
        <p className="text-speak">
          Mastdatabase.co.uk provides a vast array of mobile networking tools, information and resources for many countries across the world.
        </p>

        <aside className={classes.featuredBlogArticles}>
          <div className={classes.featuredBlogArticlesInner}>
            <FeaturedBlogArticles />
          </div>
        </aside>

        <h2 className="text-loud">Quick links</h2>

        <p className="text-speak">Shortcuts to commonly accessed pages by their categories.</p>

        <p className="text-speak">
          View various maps, including UK network coverage, streetworks, London Undergound mobile coverage, and more. Or, open the spectrum
          editor to contribute data for your own country to this website. You can also read the blog, which contains articles about mobile
          networking, such as new developments, technologies, and more.
        </p>

        <div className={classes.linkList}>
          <CardLink title="Maps" description="Useful mobile networking maps, such as maps of upcoming works and registered sites." url="/maps" />
          <CardLink
            title="Spectrum editor"
            description="Web GUI for editing spectrum data for this site, and the mobile-spectrum-data package."
            url="/spectrum-editor"
          />
          <CardLink title="Blog" description="Mobile networking blog, explaining technologies, new developments and more." url="/blog" />
          <CardLink title="Tools" description="Handy tools and calculators for networking values and parameters." url="/tools" />
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
