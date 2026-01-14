import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import Link from '@components/Links/Link'
import TubeDasMap, { TubeDasMapProps } from '@components/Maps/TubeDasMap/TubeDasMap'
import Checkbox from '@components/Inputs/Checkbox'
import Accordion from '@components/Design/Accordion'
import LoadingSpinner from '@components/LoadingSpinner'
import { TubeDeploymentInfo } from '@components/Maps/TubeDasMap/TubeDeploymentInfo'

import Colors from '@data/colors.json'
import useStateWithLocalStorage from '@hooks/useStateWithLocalStorage'

import { makeStyles, NoSsr } from '@material-ui/core'
import { ErrorBoundaryContext } from 'react-use-error-boundary'

import type { PageProps } from 'gatsby'

const useStyles = makeStyles({
  loading: {
    margin: 'auto',
    textAlign: 'center',
  },
  mapSection: {
    '& .leaflet-popup-content': {
      '& dt': {
        fontWeight: 'bold',

        '&:not(:first-child)': {
          marginTop: 8,
        },
      },
    },
  },
  mapOptions: {
    marginTop: 24,
    padding: '16px 24px',
    backgroundColor: Colors.lightGrey,
  },
  accordionSpacing: {
    marginTop: 16,
  },
  lineToggleContainer: {
    // Vertically stacked list
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridAutoRows: 'min-content',
    gap: 8,
  },
})

interface MapOptions {
  /**
   * Hide sections of track and stations that do not have any mobile connectivity.
   */
  hideUnconnectedSegments: boolean
  /**
   * List of lines to hide.
   */
  hiddenLines: TubeDasMapProps['hiddenLines']
}

export default function TubeConnectivityMap({ location }: PageProps) {
  const classes = useStyles()

  const [mapOptions, setMapOptions] = useStateWithLocalStorage<MapOptions>(
    'tube-connectivity-map-options',
    {
      hideUnconnectedSegments: false,
      hiddenLines: [],
    },
    inp => {
      return Array.isArray(inp.hiddenLines) && typeof inp.hideUnconnectedSegments === 'boolean'
    },
  )

  const createLineToggleCheckbox = (line: TubeDasMapProps['hiddenLines'][number]) => (
    <Checkbox
      label={line}
      checked={!mapOptions.hiddenLines.includes(line)}
      onChange={() => {
        setMapOptions(prev => {
          const hiddenLines = prev.hiddenLines.includes(line) ? prev.hiddenLines.filter(l => l !== line) : [...prev.hiddenLines, line]

          return {
            ...prev,
            hiddenLines,
          }
        })
      }}
    />
  )

  return (
    <Layout
      location={location}
      title="London Underground mobile connectivity map"
      description="Interactive map of mobile network deployments on the London Underground."
    >
      <ErrorBoundaryContext>
        <Hero firstElement size="large" color={Colors.primaryRed}>
          <h1 className="text-shout">London Underground mobile connectivity</h1>
          <p role="doc-subtitle" className="text-loud">
            Interactive map of mobile network deployments on the London Underground.
          </p>
        </Hero>

        <Breadcrumbs
          data={[
            { t: 'Home', url: '/' },
            { t: 'United Kingdom', url: '/gb' },
            { t: 'London Underground connectivity', url: '/gb/london-underground-connectivity' },
          ]}
        />

        <Section>
          <p className="text-whisper-up">This page was updated January 2026.</p>

          <h2 className="text-louder">Mobile connectivity on the Tube</h2>
          <p className="text-speak">
            Mobile connectivity on the London Underground is provided by a combination of leaky feeders in tunnels and DAS units in stations. The
            programme is operated by Boldyn Networks (previously known as BAI Communications) as part of a{' '}
            <Link href="https://www.baicommunications.com/mediarelease/bai-communications-awarded-20-year-concession-to-deliver-high-speed-mobile-coverage-across-the-london-underground/">
              20-year concession awarded by Transport for&nbsp;London
            </Link>
            .
          </p>
          <p className="text-speak">
            The programme entails full mobile connectivity throughout the London Underground by the end of 2024 (which has inevitably been
            delayed), including 5G coverage. As of yet, the rollout is not complete, hence a map of deployments and other information is useful
            for those interested in tracking the rollout over&nbsp;time.
          </p>
        </Section>

        <Section>
          <h2 className="text-louder">Using the map</h2>

          <p className="text-speak">
            Sections of the network that have mobile connectivity within stations and tunnels are highlighted in green. Sections highlighted in
            orange are planned to open soon.
          </p>

          <p className="text-speak">
            If you'd prefer, you can hide all sections of the network that don't have connectivity, or show and hide particular lines.
          </p>

          <p className="text-speak">
            You can also click or tap stations and sections of line on the map to reveal what services (2G/3G/4G/5G) are available in that area
            for each mobile operator.
          </p>

          <section className={classes.mapOptions}>
            <h3 className="text-loud">Options</h3>

            <NoSsr
              fallback={
                <div className={classes.loading}>
                  <LoadingSpinner size={24} />
                  <p className="text-speak">Loading options...</p>
                </div>
              }
            >
              <Checkbox
                label="Hide sections without connectivity"
                checked={mapOptions.hideUnconnectedSegments}
                onChange={() => {
                  setMapOptions({
                    ...mapOptions,
                    hideUnconnectedSegments: !mapOptions.hideUnconnectedSegments,
                  })
                }}
              />

              <Accordion heading="Toggle lines" className={classes.accordionSpacing}>
                <div className={classes.lineToggleContainer}>
                  {createLineToggleCheckbox('Bakerloo')}
                  {createLineToggleCheckbox('Central')}
                  {createLineToggleCheckbox('Circle')}
                  {createLineToggleCheckbox('District')}
                  {createLineToggleCheckbox('Hammersmith & City')}
                  {createLineToggleCheckbox('Jubilee')}
                  {createLineToggleCheckbox('Metropolitan')}
                  {createLineToggleCheckbox('Northern')}
                  {createLineToggleCheckbox('Piccadilly')}
                  {createLineToggleCheckbox('Victoria')}
                  {createLineToggleCheckbox('Waterloo & City')}
                  <hr />
                  {createLineToggleCheckbox('DLR')}
                  {createLineToggleCheckbox('Elizabeth line')}
                </div>
              </Accordion>
            </NoSsr>
          </section>
        </Section>

        <Section width="full" className={classes.mapSection}>
          <TubeDasMap hideSectionsWithNoConnectivity={mapOptions.hideUnconnectedSegments} hiddenLines={mapOptions.hiddenLines} />
        </Section>

        <TubeDeploymentInfo />
      </ErrorBoundaryContext>
    </Layout>
  )
}
