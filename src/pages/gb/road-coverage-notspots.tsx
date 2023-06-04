import React, { useState } from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import Link from '@components/Links/Link'
import SelectDropdown from '@components/Inputs/SelectDropdown'
import MinorAlert from '@components/Design/MinorAlert'
import UKRoadCoverageMap from '@components/Maps/UKRoadCoverageMap/UKRoadCoverageMap'

import Colors from '@data/colors.json'

import { makeStyles, NoSsr } from '@material-ui/core'
import { ErrorBoundaryContext } from 'react-use-error-boundary'

import type { PageProps } from 'gatsby'

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
      title="Road coverage not-spots"
      description='Every section of UK motorway and A-road marked as not having "indoor" 4G coverage.'
    >
      <ErrorBoundaryContext>
        <Hero firstElement size="huge" color={Colors.primaryBlue}>
          <h1 className="text-shout">Road coverage not-spots</h1>
          <p role="doc-subtitle" className="text-loud">
            Every section of UK motorway and A-road marked as not having "indoor" 4G coverage.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'United Kingdom', url: '/gb' },
            { t: 'Road coverage not-spots', url: '/gb/road-coverage-notspots' },
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
            For this map, we have highlighted all areas of the UK motorway and A-road network which operators do not list indoor 4G coverage for.
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
          <p className="text-speak">Select a network to view its road not-spots.</p>

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
            <UKRoadCoverageMap
              // key={mapOptions.network}
              data={[
                import(`@components/Maps/UKRoadCoverageMap/MapData/${mapOptions.network}/aroads.json`),
                import(`@components/Maps/UKRoadCoverageMap/MapData/${mapOptions.network}/motorways.json`),
              ]}
              style={{ weight: 5, color: dataColors[mapOptions.network] }}
              network={mapOptions.network}
            />
          </NoSsr>
        </Section>
      </ErrorBoundaryContext>
    </Layout>
  )
}
