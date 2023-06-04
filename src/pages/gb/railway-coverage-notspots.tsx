import React, { useState } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import Link from '@components/Links/Link'
import TubeDasMap, { TubeDasMapProps } from '@components/Maps/TubeDasMap/TubeDasMap'
import Checkbox from '@components/Inputs/Checkbox'
import Accordion from '@components/Design/Accordion'

import Colors from '@data/colors.json'

import { makeStyles, NoSsr } from '@material-ui/core'
import { ErrorBoundaryContext } from 'react-use-error-boundary'

import type { PageProps } from 'gatsby'
import UKRailCoverageMap from '@components/Maps/UKRailCoverageMap/UKRailCoverageMap'
import SelectDropdown from '@components/Inputs/SelectDropdown'
import MinorAlert from '@components/Design/MinorAlert'

const useStyles = makeStyles({
  mapSection: {},
  attributionBox: {
    marginTop: 16,
  },
})

interface MapOptions {
  network: 'EE' | 'O2' | 'Three' | 'Vodafone'
}

const dataColors: Record<MapOptions['network'], string> = {
  EE: '#007b85',
  O2: '#000066',
  Three: '#ff7c69',
  Vodafone: '#e60000',
}

export default function UKRailwayCoverageNotSpotMap({ location }: PageProps) {
  const classes = useStyles()
  const [mapOptions, setMapOptions] = useState<MapOptions>({
    network: 'EE',
  })

  return (
    <Layout
      location={location}
      title="Railway coverage not-spots"
      description='Everywhere on the British railway network marked as not having "indoor" 4G coverage.'
    >
      <ErrorBoundaryContext>
        <Hero firstElement size="huge" color={Colors.primaryBlue}>
          <h1 className="text-shout">Railway coverage not-spots</h1>
          <p role="doc-subtitle" className="text-loud">
            Everywhere on the British railway network marked as not having "indoor" 4G coverage.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'United Kingdom', url: '/gb' },
            { t: 'Railway coverage not-spots', url: '/gb/railway-coverage-notspots' },
          ]}
        />

        <Section>
          <h2 className="text-loud">About this map</h2>

          <p className="text-speak">Great Britain has a distinct lack of mobile connectivity across swaths of its transportation network.</p>

          <p className="text-speak">
            We can combine data collected from network coverage maps with maps of major UK transport infrastructure to find where networks report
            they have sub-standard coverage.
          </p>

          <p className="text-speak">
            For this map, we have highlighted all areas of the British rail network which operators do not list indoor 4G coverage for.
            Unfortunately, this does rely on the networks not providing overly generous coverage estimations for their maps.
          </p>

          <p className="text-speak">
            We note that EE appears to provide the most realistic coverage estimations on their maps, so appear to have more "not-spots" than
            other networks, but it is likely the other networks would perform similarly if real-world testing was performed.
          </p>

          <MinorAlert heading="Attribution" color="blueDark" coloredBackground className={classes.attributionBox}>
            <p className="text-speak">
              A huge thanks to <Link href="https://twitter.com/lightspeed2398">@lightspeed2398</Link> who created this dataset, utilising
              coverage data archives from this site.
            </p>
          </MinorAlert>
        </Section>

        <Section>
          <h2 className="text-loud">Network selection</h2>
          <p className="text-speak">Select a network to view its rail not-spots.</p>

          <SelectDropdown
            label="Network"
            value={mapOptions.network}
            onChange={val => setMapOptions({ ...mapOptions, network: val as MapOptions['network'] })}
            options={[
              {
                label: 'EE',
                value: 'EE',
              },
              {
                label: 'O2',
                value: 'O2',
              },
              {
                label: 'Three',
                value: 'Three',
              },
              {
                label: 'Vodafone',
                value: 'Vodafone',
              },
            ]}
          />
        </Section>

        <Section width="full" className={classes.mapSection}>
          <NoSsr>
            <UKRailCoverageMap
              // key={mapOptions.network}
              data={import(`@components/Maps/UKRailCoverageMap/MapData/${mapOptions.network}.json`)}
              style={{ weight: 5, color: dataColors[mapOptions.network] }}
              network={mapOptions.network}
            />
          </NoSsr>
        </Section>
      </ErrorBoundaryContext>
    </Layout>
  )
}
