import React, { useEffect } from 'react'

import { AttributionControl, MapContainer, TileLayer, useMap, Pane } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import GeolocationButton from '@leaflet/GeolocationButton'
import MapCustomButtonsContainer from '@leaflet/MapCustomButtonsContainer'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

import type * as geojson from 'geojson'
import type { PathOptions } from 'leaflet'

const useStyles = makeStyles({
  mapRoot: {
    '& .leaflet-base-pane': {
      filter: 'grayscale(1)',
    },
  },
})

export interface UKRailCoverageMapProps {
  data: Promise<geojson.FeatureCollection<geojson.Geometry, geojson.GeoJsonProperties>>
  style?: PathOptions
  network: string
}

export default function UKRailCoverageMap({ data, style, network }: UKRailCoverageMapProps) {
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
      >
        <MapLayers data={data} style={style} network={network} />

        <MapComponents />

        <AttributionControl position="bottomright" prefix={undefined} />

        <MapCustomButtonsContainer>
          <GeolocationButton />
        </MapCustomButtonsContainer>
      </MapContainer>
    </div>
  )
}

function MapLayers({ data, style, network }: UKRailCoverageMapProps) {
  const L = window.L as typeof import('leaflet')

  const map = useMap()

  useEffect(() => {
    let layer: L.GeoJSON | null = null

    // Add layer to the map
    data.then(data => {
      layer = L.geoJSON(data, {
        pane: 'notspots',
        style: {
          weight: 5,
          ...(style ?? {}),
        },
        interactive: false,
      })

      layer.addTo(map)
    })

    return () => {
      // Remove layers from the map
      if (layer) {
        layer.clearLayers()
      }
    }
  }, [data, style])

  return (
    <>
      <Pane key={network} name="notspots" style={{ zIndex: 1 }} />

      <Pane key="base" name="base" style={{ zIndex: 0 }}>
        <TileLayer
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
