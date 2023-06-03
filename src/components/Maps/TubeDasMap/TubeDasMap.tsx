import React, { useEffect, useCallback } from 'react'

import { AttributionControl, MapContainer, TileLayer, useMap, GeoJSON, Pane, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import TflLines from './MapData/tfl_lines.geo.json'
import TflStations from './MapData/tfl_stations.geo.json'
import TflZones from './MapData/tfl_zones_1_to_6.geo.json'
import Thames from './MapData/thames.geo.json'
import { doesStationHaveCoverage, getLineSegmentCoverage, getStationCoverageInfo, isLineSegmentCovered } from './MapData/CoveredSections'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import GeolocationButton from '@leaflet/GeolocationButton'
import MapCustomButtonsContainer from '@leaflet/MapCustomButtonsContainer'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

import type * as geojson from 'geojson'
import type { PathOptions, Layer, LatLngExpression } from 'leaflet'

const MULTI_LINE_STROKE_COLOUR_ALTERNATE = 8
const LINE_WIDTH = 5

interface GeoJsonLineProperties {
  id: string
  lines: { name: string; opened?: number; nightopened?: number; start_sid?: string; end_sid?: string; otend_sid?: string; closed?: number }[]
}

interface GeoJsonStationProperties {
  id: string
  lines: { name: string; opened?: number; nightopened?: number; start_sid?: string; end_sid?: string; otend_sid?: string; closed?: number }[]

  name: string
  nlc_id: string
  cartography: { labelX: number }
  altmodeid: string
  alt_id: number
  zone: string
}

function styleZoneData(feature: geojson.Feature<geojson.GeometryObject, any> | undefined): PathOptions {
  const zone: string = feature?.properties?.name ?? ''

  if (!zone) return {}

  const zoneNumber = parseInt(zone.substring(5))

  const commonOptions = {
    stroke: false,
    fill: true,
  }

  switch (zoneNumber) {
    default:
    case 1:
    case 3:
    case 5:
      return {
        ...commonOptions,
        fillColor: 'rgba(255, 255, 255, 0.0)',
      }

    case 2:
    case 4:
      return {
        ...commonOptions,
        fillColor: 'rgba(0, 0, 0, 0.35)',
      }

    case 6:
      return {
        ...commonOptions,
        fillColor: 'rgba(0, 0, 0, 0.45)',
      }
  }
}

function styleThamesData(feature: geojson.Feature<geojson.GeometryObject, any> | undefined): PathOptions {
  return {
    stroke: false,
    fill: true,
    fillColor: '#80becd',
    fillOpacity: 0.6,
  }
}

function getLinesFromFeature(
  feature: geojson.Feature<geojson.GeometryObject, GeoJsonLineProperties> | undefined,
  hiddenLines: TubeDasMapProps['hiddenLines'],
): { name: TubeDasMapProps['hiddenLines'][number] }[] {
  let lines = feature?.properties?.lines

  const BLACKLISTED_LINES = ['National Rail', 'Tramlink', 'IFS Cloud Cable Car', 'London Overground', ...(hiddenLines ?? [])]

  if (Array.isArray(lines)) {
    lines = lines.filter(line => {
      // Only active lines
      if (!((line?.opened ?? 0) <= 2022 && (line?.closed ?? 9999) >= 2022)) return false

      if (BLACKLISTED_LINES.includes(line?.name ?? '')) return false

      return true
    })
  }

  return lines ?? []
}

const lineAttrs = {
  Bakerloo: { id: 'B', colour: '#B36305', network: 'Tube' },
  Central: { id: 'C', colour: '#E32017', network: 'Tube' },
  Circle: { id: 'I', colour: '#FFD300', network: 'Tube' },
  'Elizabeth line': { id: 'X', colour: '#7156A5', network: 'Rail' },
  DLR: { id: 'L', colour: '#00A4A7', network: 'DLR' },
  District: { id: 'D', colour: '#00782A', network: 'Tube' },
  'IFS Cloud Cable Car': { id: 'A', colour: '#E51836', network: 'IFS Cloud Cable Car' },
  'Hammersmith & City': { id: 'H', colour: '#F3A9BB', network: 'Tube' },
  Jubilee: { id: 'J', colour: '#A0A5A9', network: 'Tube' },
  Metropolitan: { id: 'M', colour: '#9B0056', network: 'Tube' },
  Northern: { id: 'N', colour: '#000000', network: 'Tube' },
  'London Overground': { id: 'O', colour: '#EE7C0E', network: 'Rail' },
  Piccadilly: { id: 'P', colour: '#003688', network: 'Tube' },
  Tramlink: { id: 'T', colour: '#84B817', network: 'Tramlink' },
  Victoria: { id: 'V', colour: '#0098D4', network: 'Tube' },
  'Waterloo & City': { id: 'W', colour: '#95CDBA', network: 'Tube' },
}

function styleCoveredLineData(feature: geojson.Feature<geojson.GeometryObject, GeoJsonLineProperties>): PathOptions {
  const segments = getStationSegmentsFromLineData(feature)
  const hasConnectivity = segments && isLineSegmentCovered(...segments)

  return {
    weight: LINE_WIDTH * 2,
    color: hasConnectivity === 'live' ? '#5de800' : '#ff8400',
    fill: false,
    lineCap: 'butt',
  }
}

function stationMarker(feature: geojson.Feature<geojson.GeometryObject, GeoJsonStationProperties>, latLng: LatLngExpression): Layer {
  const L = window.L as typeof import('leaflet')

  const hasConnectivity = doesStationHaveCoverage(feature.properties.id)

  return new L.CircleMarker(latLng, {
    radius: 5,
    fillColor: '#fff',
    fillOpacity: 1,
    color: '#000',
    weight: 2,
    className: `${hasConnectivity}-connectivity`,
  }).bindPopup(generatePopupContentForStation(feature))
}

const useStyles = makeStyles({
  mapRoot: {
    '& .none-connectivity': {
      filter: 'grayscale(70%)',
    },
    '& .leaflet-base-pane': {
      filter: 'grayscale(100%)',
    },
    '& .leaflet-popup-content': {
      '& p': {
        margin: 0,
        marginBottom: '0.5em',
      },
    },
    '& .leaflet-pane > svg path.leaflet-interactive': {
      pointerEvents: 'visiblePainted !important',
    },
  },
  hideNonConnectedAreas: {
    '& .none-connectivity': {
      display: 'none',
    },
  },
})

export interface TubeDasMapProps {
  hideSectionsWithNoConnectivity: boolean
  hiddenLines: (
    | 'Bakerloo'
    | 'Central'
    | 'Circle'
    | 'District'
    | 'Hammersmith & City'
    | 'Jubilee'
    | 'Metropolitan'
    | 'Northern'
    | 'Piccadilly'
    | 'Victoria'
    | 'Waterloo & City'
    | 'DLR'
    | 'Elizabeth line'
  )[]
}

export default function TubeDasMap({ hideSectionsWithNoConnectivity, hiddenLines }: TubeDasMapProps) {
  useFixLeafletAssets()
  const classes = useStyles()

  return (
    <div className={clsx(classes.mapRoot)}>
      <MapContainer
        style={{
          height: '60vh',
          backgroundColor: '#fff',
        }}
        center={[51.509865, -0.118092]}
        zoom={10}
        minZoom={1}
        attributionControl={false}
        maxBounds={[
          [51.775, -1.172],
          [51.3, 0.41],
        ]}
        maxBoundsViscosity={0.5}
      >
        <MapLayers hiddenLines={hiddenLines} hideSectionsWithNoConnectivity={hideSectionsWithNoConnectivity} />

        <MapComponents />

        <AttributionControl position="bottomright" prefix={undefined} />

        <MapCustomButtonsContainer>
          <GeolocationButton />
        </MapCustomButtonsContainer>
      </MapContainer>
    </div>
  )
}

function getStationSegmentsFromLineData(feature: geojson.Feature<geojson.GeometryObject, GeoJsonLineProperties>): [string, string] | undefined {
  return feature
    ?.properties!.lines!.map(l => [l.start_sid, l.end_sid] as [string | undefined, string | undefined])
    .filter(([a, b]) => !!a && !!b)?.[0] as [string, string] | undefined
}

function generatePopupContentForLineSection(feature: geojson.Feature<geojson.GeometryObject, GeoJsonLineProperties>): HTMLDivElement {
  const segments = getStationSegmentsFromLineData(feature)
  const popupContent = document.createElement('div')

  if (!segments) {
    popupContent.innerHTML = `
<p class="text-whisper">Unknown track - no data available</p>
<p class="text-whisper">${feature.properties.id}</p>
`
  } else {
    const data = getLineSegmentCoverage(...segments)

    if (!data) {
      popupContent.innerHTML = `
      <p class="text-whisper">No data available</p>
      <p class="text-whisper">${segments.join('/')}</p>
`
    } else {
      const { group, section, coverage, opens, state } = data

      popupContent.innerHTML = `
  <p class="text-whisper"><strong>${group}</strong></p>
  <p class="text-whisper"><strong>${section}</strong></p>

  ${!!state ? `<p class="text-whisper">${state === 'planned' ? 'Launches' : 'Launched'} ${opens}</p>` : ''}
`

      if (!coverage) {
        popupContent.innerHTML += `
  <p class="text-whisper">No coverage data available</p>
`
      } else {
        popupContent.innerHTML += `
  <table>
    <thead>
      <tr>
        <th>Network</th>
        <th>2G</th>
        <th>3G</th>
        <th>4G</th>
        <th>5G</th>
      </tr>
    </thead>
    <tbody>
      ${Object.entries(coverage)
        .map(([network, networkCoverage]) => {
          return `
        <tr>
          <td>${network}</td>
          <td>${(networkCoverage?.['2G']?.join(', ') || 'N/A') ?? 'Unknown'}</td>
          <td>${(networkCoverage?.['3G']?.join(', ') || 'N/A') ?? 'Unknown'}</td>
          <td>${(networkCoverage?.['4G']?.join(', ') || 'N/A') ?? 'Unknown'}</td>
          <td>${(networkCoverage?.['5G']?.join(', ') || 'N/A') ?? 'Unknown'}</td>
        </tr>
      `
        })
        .join('')}
    </tbody>
  </table>
`
      }
    }
  }

  return popupContent
}

function generatePopupContentForStation(feature: geojson.Feature<geojson.GeometryObject, GeoJsonStationProperties>): HTMLDivElement {
  const popupContent = document.createElement('div')

  const lines = getLinesFromFeature(feature, [])
  const coverage = getStationCoverageInfo(feature.properties.id)

  popupContent.innerHTML = `
  <p class="text-whisper"><strong>${feature.properties.name}</strong></p>
  <p class="text-whisper">Served by ${lines.map(l => l?.name ?? '???').join(', ')}</p>
`

  if (!coverage) {
    popupContent.innerHTML += `
  <p class="text-whisper">No coverage data available</p>
`
  } else {
    popupContent.innerHTML += `
  <table>
    <thead>
      <tr>
        <th>Network</th>
        <th>2G</th>
        <th>3G</th>
        <th>4G</th>
        <th>5G</th>
      </tr>
    </thead>
    <tbody>
      ${Object.entries(coverage)
        .map(([network, networkCoverage]) => {
          return `
        <tr>
          <td>${network}</td>
          <td>${(networkCoverage?.['2G']?.join(', ') || 'N/A') ?? 'Unknown'}</td>
          <td>${(networkCoverage?.['3G']?.join(', ') || 'N/A') ?? 'Unknown'}</td>
          <td>${(networkCoverage?.['4G']?.join(', ') || 'N/A') ?? 'Unknown'}</td>
          <td>${(networkCoverage?.['5G']?.join(', ') || 'N/A') ?? 'Unknown'}</td>
        </tr>
      `
        })
        .join('')}
    </tbody>
  </table>
`
  }

  return popupContent
}

function MapLayers({ hideSectionsWithNoConnectivity, hiddenLines }: TubeDasMapProps) {
  const L = window.L as typeof import('leaflet')

  const map = useMap()

  const filterLineData = useCallback(
    (feature: geojson.Feature<geojson.GeometryObject, GeoJsonLineProperties | GeoJsonStationProperties> | undefined): boolean => {
      if (!feature) return false

      const lines = getLinesFromFeature(feature, hiddenLines)

      if (hideSectionsWithNoConnectivity) {
        if (!!('zone' in feature.properties)) {
          // Station
          const hasConnectivity = doesStationHaveCoverage(feature.properties.id)

          if (hasConnectivity === 'none') return false
        } else {
          const stationSegments = getStationSegmentsFromLineData(feature)
          const hasConnectivity = stationSegments && isLineSegmentCovered(...stationSegments)

          if (hasConnectivity === 'none') return false
        }
      }

      if (!lines) return true
      if (lines.length === 0) return false

      return true
    },
    [map, hiddenLines, getLinesFromFeature, hideSectionsWithNoConnectivity],
  )

  const filterCoveredLineData = useCallback(
    (feature: geojson.Feature<geojson.GeometryObject, GeoJsonLineProperties> | undefined): boolean => {
      if (!filterLineData(feature)) return false

      const stationSegments = getStationSegmentsFromLineData(feature!)
      if (!stationSegments) return false

      const hasConnectivity = isLineSegmentCovered(...stationSegments)

      return hasConnectivity !== 'none'
    },
    [map, isLineSegmentCovered, filterLineData, hideSectionsWithNoConnectivity],
  )

  const styleLineData = useCallback(
    (feature: geojson.Feature<geojson.GeometryObject, GeoJsonLineProperties> | undefined): PathOptions => {
      if (!feature) return {}

      const lines = getLinesFromFeature(feature, hiddenLines).map(l => l.name)
      const firstLineColor = lineAttrs[lines[0]]?.colour ?? '#000'

      const stationSegments = getStationSegmentsFromLineData(feature)
      const hasConnectivity = stationSegments && isLineSegmentCovered(...stationSegments)

      return {
        weight: LINE_WIDTH,
        color: firstLineColor,
        fill: false,
        lineCap: 'butt',
        className: `${hasConnectivity}-connectivity`,
      }
    },
    [hiddenLines],
  )

  const onLineLayerMade = useCallback(
    (feature: geojson.Feature<geojson.GeometryObject, GeoJsonLineProperties>, layer) => {
      layer.bindPopup(generatePopupContentForLineSection(feature))

      const lines = getLinesFromFeature(feature, hiddenLines).map(l => l.name)
      if (lines.length <= 1) return

      const allLineColours = lines.map(l => lineAttrs[l]?.colour ?? '#000')
      allLineColours.splice(0, 1)

      const coords = feature.geometry.coordinates
      const latLngs = L.GeoJSON.coordsToLatLngs(coords)

      const hasConnectivity = doesStationHaveCoverage(feature.properties.id)

      allLineColours.forEach((color, i) => {
        const extraNum = i + 1
        const totalCount = lines.length

        let dashArray = `${MULTI_LINE_STROKE_COLOUR_ALTERNATE} ${MULTI_LINE_STROKE_COLOUR_ALTERNATE * (totalCount - 1)}`

        new L.Polyline(latLngs, {
          pane: 'linesOverlay',
          dashArray,
          dashOffset: (MULTI_LINE_STROKE_COLOUR_ALTERNATE * extraNum).toString(),
          color,
          lineCap: 'butt',
          weight: LINE_WIDTH,
          className: `${hasConnectivity}-connectivity`,
        })
          .bindPopup(generatePopupContentForLineSection(feature))
          .addTo(map)
      })
    },
    [map, hiddenLines],
  )

  return (
    <>
      <Pane key={`stations__${JSON.stringify(hiddenLines)}_${hideSectionsWithNoConnectivity}`} name="stations" style={{ zIndex: 100 }}>
        <GeoJSON data={TflStations as any} filter={filterLineData} pointToLayer={stationMarker} />
      </Pane>

      <Pane key={`lines__${JSON.stringify(hiddenLines)}_${hideSectionsWithNoConnectivity}`} name="lines" style={{ zIndex: 50 }}>
        <GeoJSON data={TflLines as any} filter={filterLineData} style={styleLineData} onEachFeature={onLineLayerMade} />
      </Pane>

      <Pane key={`linesOverlay__${JSON.stringify(hiddenLines)}_${hideSectionsWithNoConnectivity}`} name="linesOverlay" style={{ zIndex: 51 }} />

      <Pane key={`coveredLines__${JSON.stringify(hiddenLines)}_${hideSectionsWithNoConnectivity}`} name="coveredLines" style={{ zIndex: 49 }}>
        <GeoJSON data={TflLines as any} filter={filterCoveredLineData} style={styleCoveredLineData} />
      </Pane>

      <Pane key="zones" name="zones" style={{ zIndex: 10 }}>
        <GeoJSON data={TflZones as any} style={styleZoneData} />
      </Pane>

      <Pane key="thames" name="thames" style={{ zIndex: 1 }}>
        <GeoJSON data={Thames as any} style={styleThamesData} />
      </Pane>

      <Pane key="base" name="base" style={{ zIndex: 0 }}>
        <TileLayer
          opacity={0.45}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Pane>
    </>
  )
}

function MapComponents() {
  const L = window.L as typeof import('leaflet')

  const map = useMap()

  useEffect(() => {
    if (!map.fullScreenControl) {
      L.fullScreen({
        position: 'topleft',
        title: 'Enter fullscreen mode',
        titleCancel: 'Exit fullscreen mode',
        forceSeparateButton: true,
      }).addTo(map)
    }
  })

  return null
}
