import React, { useEffect } from 'react'

import MarkerClusterGroup from '@components/MarkerClusterGroup'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

export interface IFreshwaveSitePoint {
  locationId: number
  lat: number
  lng: number
  name: string
  desc: string
}

export interface IFreshwaveMapProps {
  sites: IFreshwaveSitePoint[]
}

export default function FreshwaveMap({ sites }: IFreshwaveMapProps) {
  useEffect(() => {
    // @ts-expect-error
    delete L.Icon.Default.prototype._getIconUrl

    // @ts-expect-error
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
      iconUrl: require('leaflet/dist/images/marker-icon.png').default,
      shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
    })
  })

  return (
    <MapContainer
      style={{
        height: '60vh',
      }}
      center={[51.692, 5.155]}
      zoom={5}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup>
        {sites
          ? sites.map(({ locationId, lat, lng, name, desc }) => {
              return (
                <Marker key={locationId} position={[lat, lng]}>
                  <Popup>
                    <dl>
                      <dt>Location ID</dt>
                      <dd>{locationId}</dd>
                      <dt>Name</dt>
                      <dd>{name}</dd>
                      {desc.trim() !== '' && (
                        <>
                          <dt>Description</dt>
                          <dd>{desc}</dd>
                        </>
                      )}
                    </dl>
                  </Popup>
                </Marker>
              )
            })
          : undefined}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
