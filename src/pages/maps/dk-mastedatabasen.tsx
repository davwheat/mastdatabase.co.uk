import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import MasteDatabasenMap from '@components/Maps/MasteDatabasenMap'
import Link from '@components/Links/Link'

import Colors from '@data/colors.json'

import { ErrorBoundaryContext } from 'react-use-error-boundary'
import { makeStyles, NoSsr } from '@material-ui/core'

import { RecoilRoot } from 'recoil'

import type { PageProps } from 'gatsby'
import MasteDatabasenFilterControls from '@components/Maps/MasteDatabasenMap/FilterControls'

const useStyles = makeStyles({
  mapSection: {},
})

export default function MastedatabasenMapPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout
      location={location}
      title="Danish Mastedatabasen"
      description="A reimplementation of Denmark's mastedatabasen with new filtering and display options."
    >
      <ErrorBoundaryContext>
        <Hero firstElement size="huge" color={Colors.primaryRed}>
          <h1 className="text-shout">Danish Mastedatabasen</h1>
          <p role="doc-subtitle" className="text-loud">
            A reimplementation of Denmark's mastedatabasen with new filtering and display options.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'Maps', url: '/maps' },
            { t: 'Danish Mastedatabasen', url: '/maps/dk-mastedatabasen' },
          ]}
        />

        <Section>
          <h2 className="text-loud">About</h2>
          <p className="text-speak">
            In Denmark, mobile network operators keep track of all sites throughout the country by submitting information to the{' '}
            <Link href="https://sdfi.dk/">Agency for Data Supply and Infrastructure (Styrelsen for Dataforsyning og Infrastruktur)</Link>. The
            agency then publishes this data to the public on <Link href="https://mastedatabasen.dk/">Mastedatabasen.dk</Link>.
          </p>
          <p>
            The official site is rather lacking, providing limited filtering options, and not showing company data without first clicking on a
            point on the map, hence I have created a reimplementation of the site.
          </p>
        </Section>

        <RecoilRoot>
          <Section width="full" className={classes.mapSection}>
            <NoSsr>
              <MasteDatabasenMap />
            </NoSsr>
          </Section>

          <Section>
            <MasteDatabasenFilterControls />
          </Section>
        </RecoilRoot>
      </ErrorBoundaryContext>
    </Layout>
  )
}
