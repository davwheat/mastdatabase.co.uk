import React, { useMemo, useRef, useState } from 'react'
import { LayerGroup, useMap, useMapEvent } from 'react-leaflet'

import { debounce } from 'throttle-debounce'

import { getPromoterIcon, getPromoterName, isPromoterDataPoint } from '@functions/maps/streetworks/streetworksPromoterUtils'
import getStreetworksDataPointDetails from '@functions/maps/streetworks/getStreetworksDataPointDetails'
import DataMarker from '@leaflet/DataMarker'

import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import type { LayerGroup as LayerGroupType, Map } from 'leaflet'
import getStreetworksDataPoints, { StreetworksDataPoint } from '@functions/maps/streetworks/getStreetworksDataPoints'

const MapStatusMessages = {
  loading: 'Loading streetworks data...',
  fetchFail: 'Failed to load streetworks. Check your internet connection.',
  tooManyPoints: 'Too many streetworks in this area. Please zoom in.',
} as const

type StatusMessages = Record<keyof typeof MapStatusMessages, boolean>

export function StreetworksMarkers() {
  const map = useMap()
  const [statusMessages, setStatusMessages] = useState<StatusMessages>({
    loading: false,
    fetchFail: false,
    tooManyPoints: false,
  })
  const markerGroup = useRef<LayerGroupType<any> | null>(null)

  const _loadPoints = useMemo(() => {
    return () => {
      return loadPoints(map, setStatusMessages, markerGroup.current)
    }
  }, [map, setStatusMessages, markerGroup])

  const debouncedLoadPoints = debounce(1000, _loadPoints)

  const showLoadingMessage = debounce(
    100,
    useMemo(
      () => () => {
        if (!statusMessages.loading)
          setStatusMessages({
            loading: true,
            fetchFail: false,
            tooManyPoints: false,
          })
      },
      [setStatusMessages, statusMessages],
    ),
  )

  useMapEvent('move', () => {
    showLoadingMessage()
    debouncedLoadPoints()
  })

  return (
    <>
      <LayerGroup ref={markerGroup} />
      <div role="status" aria-live="polite">
        {Object.entries(MapStatusMessages).map(([messageKey, message]) => {
          if (!statusMessages[messageKey]) return null

          return <p key={messageKey}>{message}</p>
        })}
      </div>
    </>
  )
}

async function loadPoints(map: Map, setStatusMessages: React.Dispatch<React.SetStateAction<StatusMessages>>, markerGroup: LayerGroupType<any>) {
  setStatusMessages(s => ({ ...s, loading: true }))

  const bounds = map.getBounds()

  const bbString = bounds.toBBoxString()
  const rawData = await getStreetworksDataPoints(bbString)

  if (typeof rawData === 'string') {
    switch (rawData) {
      case 'fetch error':
        setStatusMessages({ loading: false, fetchFail: true, tooManyPoints: false })
        return

      case 'too many points':
        setStatusMessages({ loading: false, fetchFail: false, tooManyPoints: true })
        return
    }
  }

  const dataPoints = rawData.filter(isPromoterDataPoint)

  const oldMarkers = (markerGroup?.getLayers() as DataMarker<StreetworksDataPoint>[]) || []
  const newPoints: StreetworksDataPoint[] = []

  dataPoints.forEach(point => {
    const matchingOldMarker = oldMarkers.findIndex(marker => marker.data.se_id === point.se_id)

    // Remove matching marker
    if (matchingOldMarker !== -1) oldMarkers.splice(matchingOldMarker, 1)
    else newPoints.push(point)
  })

  oldMarkers.forEach(marker => markerGroup.removeLayer(marker))

  newPoints.map(point => {
    const name = getPromoterName(point)

    new DataMarker([point.latitude, point.longitude], point, {
      icon: getPromoterIcon(point),
    })
      .bindPopup(
        `
        <h1>${name} works</h1>
        <p>
          ${dayjs.tz(point.start_date, point.start_date_tz).format("DD MMM 'YY HH:mm")}
          to
          ${dayjs.tz(point.end_date, point.end_date_tz).format("DD MMM 'YY HH:mm")}
        </p>
          
        <h2>Work description</h2>
        <p>${point.works_desc || 'None provided'}</p>
          
        <h2>Work permit ref</h2>
        <p>${point.permit_ref || 'None provided'}</p>
          
        <h2>Promoter</h2>
        <p>${point.promoter || 'None provided'}</p>
          
        <h2>Current status</h2>
        <p>${
          dayjs.tz(point.start_date, point.start_date_tz).diff(dayjs()) < 0
            ? 'Works in progress'
            : dayjs.tz(point.end_date, point.start_date_tz).diff(dayjs()) < 0
            ? 'Completed'
            : 'Upcoming'
        }</p>
          
        <h2>Permit status</h2>
        <p id="${point.se_id}__permit_status_desc">Loading...</p>
          
        <h2>Works last updated</h2>
        <p id="${point.se_id}__event_lastmod_date_disp">Loading...</p>
          
        <h2>Last updated on one.network</h2>
        <p id="${point.se_id}__last_adapter_update_disp">Loading...</p>
        `,
      )
      .addTo(markerGroup)
      .on('popupopen', function (e) {
        const elementIdPrefix = `${e.target.data.se_id}__`

        getStreetworksDataPointDetails(e.target.data.se_id || e.target.data.entity_id, e.target.data.phase_id).then(data => {
          const fields = ['permit_status_desc', 'event_lastmod_date_disp', 'last_adapter_update_disp']

          fields.forEach(field => {
            const el = document.getElementById(`${elementIdPrefix}${field}`)
            if (!el) return

            el.innerText = data.swdata[field]
          })
        })
      })
  })
}
