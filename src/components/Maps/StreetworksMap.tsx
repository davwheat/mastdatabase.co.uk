import React, { useEffect, useMemo, useState } from 'react'

import useFixLeafletAssets from '@hooks/useFixLeafletAssets'
import { useUserLocation } from '@hooks/useUserLocation'
import useForceRender from '@hooks/useForceRerender'

import Checkbox from '@components/Inputs/Checkbox'
import { ModalDialog, ModalDialogContent, ModalDialogHeaderAndTitle } from '@components/ModalDialog'

import { AttributionControl, MapContainer, Marker, ScaleControl, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { makeStyles } from '@material-ui/core'

import {
  getPromoterStates,
  IOneNetworkStreetworksPromoter,
  promoters,
  setPromoterState,
} from '@functions/maps/streetworks/streetworksPromoterUtils'

import clsx from 'clsx'

import 'leaflet/dist/leaflet.css'

import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

export interface IStreetworksSitePoint {
  locationId: number
  lat: number
  lng: number
  name: string
  desc: string
}

export interface IStreetworksMapProps {
  sites: React.ReactNode
}

export default function StreetworksMap() {
  useFixLeafletAssets()

  return (
    <MapContainer
      style={{
        height: '60vh',
      }}
      center={[51.505, -0.09]}
      zoom={13}
      attributionControl={false}
    >
      <GeolocationMarker />
      <CustomControlButtons />

      <MapSetup />
      <ScaleControl imperial metric />
    </MapContainer>
  )
}

function MapSetup() {
  const map = useMap()

  console.log(map)

  // Attribute to one.network
  useEffect(() => {
    map.attributionControl?.addAttribution(`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`)
    map.attributionControl?.addAttribution(`&copy; Data from <a href="https://one.network">one.network</a>`)
  })

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
      <AttributionControl position="bottomright" prefix={null} />
    </>
  )
}

const useStyles = makeStyles({
  customButtonsContainer: {
    position: 'absolute',
    zIndex: 10e2,
    bottom: 32,
    right: 12,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16,
  },
  customButton: {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: '50%',
    padding: 8,
    background: '#fff',
    height: 52,
    width: 52,

    cursor: 'pointer',

    '& svg': {
      display: 'block',
      margin: 'auto',
    },
  },
  geolocationButton: {
    '&[data-located=true]': {
      background: '#4285f4',
      color: '#fff',
    },
  },
})

function CustomControlButtons() {
  const L = window.L as typeof import('leaflet')

  const forceRerender = useForceRender()
  const classes = useStyles()
  const map = useMap()
  const geolocation = useUserLocation()

  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)

  const location: [number, number] = geolocation ? [geolocation.latitude, geolocation.longitude] : null
  const isMapLocationCentred = map.getCenter().equals(location, 0.00001)

  useMapEvent(
    'move',
    useMemo(
      () => () => {
        const nowCentred = map.getCenter().equals(location, 0.00001)

        if (nowCentred !== isMapLocationCentred) forceRerender()
      },
      [location?.[0], location?.[1], map, forceRerender, isMapLocationCentred],
    ),
  )

  return (
    <>
      <div className={classes.customButtonsContainer}>
        <button
          className={clsx(classes.customButton)}
          aria-label="Map settings"
          onClick={() => {
            setSettingsDialogOpen(true)
          }}
          data-located={isMapLocationCentred}
        >
          <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
            />
          </svg>
        </button>

        <button
          className={clsx(classes.customButton, classes.geolocationButton)}
          aria-label="Pan map to current location"
          onClick={() => {
            map.flyTo(location, 14)
          }}
          data-located={isMapLocationCentred}
        >
          <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z"
            />
          </svg>
        </button>
      </div>

      <PromoterSettingsDialog open={settingsDialogOpen} onClose={() => setSettingsDialogOpen(false)} />
    </>
  )
}

function GeolocationMarker() {
  const L = window.L as typeof import('leaflet')

  const geolocation = useUserLocation()
  if (!geolocation) return null

  const location: [number, number] = [geolocation.latitude, geolocation.longitude]

  return (
    <Marker
      position={location}
      icon={L.icon({
        iconUrl: require('@assets/icons/geolocation.svg').default,
        iconSize: [18, 18],
      })}
    />
  )
}

const useDialogStyles = makeStyles({
  categoryHeader: {
    marginBottom: 8,
    paddingTop: 12,
    display: 'table',
  },
  checkbox: {
    '& + $checkbox': {
      marginTop: 4,
    },
  },
})

function PromoterSettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const classes = useDialogStyles()

  const [promoterStates, setPromoterStates] = useState(getPromoterStates())

  const promotersByCategory = promoters.reduce((acc, promoter) => {
    acc[promoter.category] ||= []
    acc[promoter.category].push(promoter)
    return acc
  }, {} as Record<string, IOneNetworkStreetworksPromoter[]>)

  function refreshPromoterStates() {
    setPromoterStates(getPromoterStates())
  }

  return (
    <ModalDialog open={open} onClose={() => onClose()}>
      <ModalDialogHeaderAndTitle title="Promoter settings" />
      <ModalDialogContent>
        <p className="text-speak">These options are saved in your browser for next time you visit this site.</p>

        <form onSubmit={e => e.preventDefault()}>
          {Object.entries(promotersByCategory).map(([category, promoters]) => {
            return (
              <fieldset>
                <legend className={clsx('text-speak-up', classes.categoryHeader)}>{category}</legend>

                {promoters.map(promoter => (
                  <Checkbox
                    label={promoter.name}
                    onChange={() => {
                      setPromoterState(promoter.id, !promoterStates[promoter.id])
                      refreshPromoterStates()
                    }}
                    key={promoter.id}
                    checked={promoterStates[promoter.id]}
                    className={classes.checkbox}
                  />
                ))}
              </fieldset>
            )
          })}
        </form>
      </ModalDialogContent>
    </ModalDialog>
  )
}
