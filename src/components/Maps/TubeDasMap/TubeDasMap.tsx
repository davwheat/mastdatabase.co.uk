import React, { useEffect, useCallback } from 'react'

import { AttributionControl, MapContainer, TileLayer, useMap, GeoJSON, Pane } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import TflLines from './MapData/tfl_lines.geo.json'
import TflStations from './MapData/tfl_stations.geo.json'
import TflZones from './MapData/tfl_zones_1_to_6.geo.json'
import Thames from './MapData/thames.geo.json'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import GeolocationButton from '@leaflet/GeolocationButton'
import MapCustomButtonsContainer from '@leaflet/MapCustomButtonsContainer'

import type { PathOptions, Layer } from 'leaflet'
import type * as geojson from 'geojson'
import { doesStationHaveCoverage, isLineSegmentCovered } from './MapData/CoveredSections'
import { makeStyles } from '@material-ui/core'

const MULTI_LINE_STROKE_COLOUR_ALTERNATE = 8
const LINE_WIDTH = 5

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

function getLinesFromFeature(feature: geojson.Feature<geojson.GeometryObject, any> | undefined): { name: string }[] {
  let lines = feature?.properties?.lines

  const BLACKLISTED_LINES = ['National Rail', 'Tramlink', 'IFS Cloud Cable Car', 'London Overground']

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

function filterLineData(feature: geojson.Feature<geojson.GeometryObject, any> | undefined): boolean {
  const lines = getLinesFromFeature(feature)

  if (!lines) return true
  if (lines.length === 0) return false

  return true
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

function styleLineData(feature: geojson.Feature<geojson.GeometryObject, any> | undefined): PathOptions {
  const lines = getLinesFromFeature(feature).map(l => l.name)

  const firstLineColor = lineAttrs[lines[0]]?.colour ?? '#000'

  const stationSegments: [string, string] = feature?.properties.lines
    .map(l => [l.start_sid, l.end_sid])
    .filter(([a, b]) => !!a || !!b)
    .flat(1)

  const hasConnectivity = isLineSegmentCovered(...stationSegments)

  return {
    weight: LINE_WIDTH,
    color: firstLineColor,
    fill: true,
    fillColor: '#fff',
    lineCap: 'butt',
    className: hasConnectivity ? 'has-connectivity' : 'no-connectivity',
  }
}

function filterCoveredLineData(feature: geojson.Feature<geojson.GeometryObject, any> | undefined): boolean {
  const stationSegments: [string, string] = feature?.properties.lines
    .map(l => [l.start_sid, l.end_sid])
    .filter(([a, b]) => !!a || !!b)
    .flat(1)

  return isLineSegmentCovered(...stationSegments)
}

function styleCoveredLineData(feature: geojson.Feature<geojson.GeometryObject, any> | undefined): PathOptions {
  return {
    weight: LINE_WIDTH * 2,
    color: '#5de800',
    fill: true,
    fillColor: '#fff',
    lineCap: 'butt',
  }
}

function stationMarker(geoJsonPoint, latLng): Layer {
  const L = window.L as typeof import('leaflet')

  const lines = getLinesFromFeature(geoJsonPoint)

  const hasConnectivity = doesStationHaveCoverage(geoJsonPoint.properties.id)

  const popupContent = document.createElement('div')

  popupContent.innerHTML = `
  <p class="text-whisper-loud">${geoJsonPoint.properties.name}</p>
  <p class="text-whisper">Served by: ${lines.map(l => l?.name ?? '???').join(', ')}</p>
  <p class="text-whisper">Station ID: ${geoJsonPoint.properties.id}</p>
`

  return new L.CircleMarker(latLng, {
    radius: 6,
    fillColor: '#fff',
    fillOpacity: 1,
    color: lines.length === 1 ? lineAttrs[lines[0].name].colour : '#000',
    weight: 2.5,
    className: hasConnectivity ? 'has-connectivity' : 'no-connectivity',
  }).bindPopup(popupContent)
}

const useStyles = makeStyles({
  mapRoot: {
    '& .no-connectivity': {
      filter: 'grayscale(70%)',
    },
    '& .leaflet-base-pane': {
      filter: 'grayscale(100%)',
    },
  },
})

export default function TubeDasMap() {
  useFixLeafletAssets()
  const classes = useStyles()

  return (
    <MapContainer
      style={{
        height: '60vh',
        backgroundColor: '#fff',
      }}
      center={[51.509865, -0.118092]}
      zoom={11}
      minZoom={1}
      attributionControl={false}
      className={classes.mapRoot}
    >
      <MapLayers />

      <MapComponents />

      <AttributionControl position="bottomright" prefix={undefined} />

      <MapCustomButtonsContainer>
        <GeolocationButton />
      </MapCustomButtonsContainer>
    </MapContainer>
  )
}

function MapLayers() {
  const L = window.L as typeof import('leaflet')

  const map = useMap()

  const onLineLayerMade = useCallback(
    (feature, layer) => {
      const lines = getLinesFromFeature(feature).map(l => l.name)

      if (lines.length <= 1) return

      const allLineColours = lines.map(l => lineAttrs[l]?.colour ?? '#000')
      allLineColours.splice(0, 1)

      const coords = feature.geometry.coordinates
      const latLngs = L.GeoJSON.coordsToLatLngs(coords)

      allLineColours.forEach((color, i) => {
        const extraNum = i + 1
        const totalCount = lines.length

        let dashArray = `${MULTI_LINE_STROKE_COLOUR_ALTERNATE} ${MULTI_LINE_STROKE_COLOUR_ALTERNATE * (totalCount - 1)}`

        const popupContent = document.createElement('div')

        popupContent.innerHTML = `
  <p class="text-whisper"><strong>Track segment ID:</strong> ${feature.properties.id}</p>
`

        new L.Polyline(latLngs, {
          dashArray,
          dashOffset: (MULTI_LINE_STROKE_COLOUR_ALTERNATE * extraNum).toString(),
          color,
          lineCap: 'butt',
          weight: LINE_WIDTH,
        })
          .bindPopup(popupContent)
          .addTo(map)
      })
    },
    [map],
  )

  return (
    <>
      <Pane key="stations" name="stations" style={{ zIndex: 100 }}>
        <GeoJSON data={TflStations as any} filter={filterLineData} pointToLayer={stationMarker} />
      </Pane>

      <Pane key="lines" name="lines" style={{ zIndex: 50 }}>
        <GeoJSON data={TflLines as any} filter={filterLineData} style={styleLineData} onEachFeature={onLineLayerMade} />
      </Pane>

      <Pane name="coveredLines" key="coveredLines" style={{ zIndex: 49 }}>
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
