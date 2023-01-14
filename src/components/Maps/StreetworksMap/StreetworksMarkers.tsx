import React, { useEffect, useRef } from 'react'
import { LayerGroup, useMap, useMapEvent } from 'react-leaflet'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { getPromoterIcon, getPromoterName, isPromoterDataPoint } from '@functions/maps/streetworks/streetworksPromoterUtils'
import getStreetworksDataPoints, { StreetworksDataPoint } from '@functions/maps/streetworks/getStreetworksDataPoints'
import getStreetworksDataPointDetails from '@functions/maps/streetworks/getStreetworksDataPointDetails'

import { StatusMessages } from './MapStatusMessages'
import DataMarker from '@leaflet/DataMarker'
import { StreetworksMapPersistentSettingsAtom, StreetworksMapStatusMessagesAtom } from '@atoms'

import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import type { LayerGroup as LayerGroupType, Map as MapType } from 'leaflet'

export function StreetworksMarkers() {
  const map = useMap()

  const _setStatusMessages = useSetRecoilState(StreetworksMapStatusMessagesAtom)
  const markerGroup = useRef<LayerGroupType<any> | null>(null)

  const aborter = useRef<AbortController>(new AbortController())

  // const streetmapSettings = useRecoilValue(StreetworksMapSettingsAtom)
  // const streetmapPersistentSettings = useRecoilValue(StreetworksMapPersistentSettingsAtom)

  const loadPointsTimeoutKey = useRef<number | null>(null)

  function setStatusMessages(newState: StatusMessages) {
    _setStatusMessages(oldState => {
      if (JSON.stringify(oldState) !== JSON.stringify(newState)) {
        return newState
      }

      return oldState
    })
  }

  /**
   * Triggers the showing of the loading message at the top of the map
   * and cancels any in-progress streetworks data fetching.
   */
  const showLoadingMessage = () =>
    setStatusMessages({
      loading: true,
      fetchFail: false,
      upstreamError: false,
      tooManyPoints: false,
      settingsError: false,
    })

  // function validateSettings(): boolean {
  //   // If end is before start
  //   if (streetmapSettings.streetworksEndDate < streetmapSettings.streetworksStartDate) {
  //     return false
  //   }

  //   return true
  // }

  const debouncedLoadPoints = () => {
    if (loadPointsTimeoutKey.current) clearTimeout(loadPointsTimeoutKey.current)

    aborter.current = new AbortController()
    showLoadingMessage()

    loadPointsTimeoutKey.current = window.setTimeout(() => {
      loadPointsTimeoutKey.current = null

      loadPoints(map, setStatusMessages, markerGroup.current!, aborter.current)
    }, 1000)
  }

  function loadNewPoints() {
    aborter.current.abort()

    // if (!validateSettings()) {
    //   markerGroup.current?.clearLayers()

    //   setStatusMessages({
    //     loading: false,
    //     fetchFail: false,
    //     upstreamError: false,
    //     tooManyPoints: false,
    //     settingsError: true,
    //   })

    //   return
    // }

    debouncedLoadPoints()
  }

  useMapEvent('move', loadNewPoints)

  useEffect(() => {
    loadNewPoints()

    return () => {
      aborter.current.abort()

      if (loadPointsTimeoutKey.current) clearTimeout(loadPointsTimeoutKey.current)
    }
  })

  return <LayerGroup ref={markerGroup} />
}

StreetworksMarkers.whyDidYouRender = true

async function loadPoints(
  map: MapType,
  setStatusMessages: (s: StatusMessages) => void,
  markerGroup: LayerGroupType<any>,
  aborter: AbortController,
) {
  const L = window.L as typeof import('leaflet')

  const bounds = map.getBounds()

  const rawData = await getStreetworksDataPoints(bounds, aborter)

  if (typeof rawData === 'string') {
    switch (rawData) {
      case 'aborted':
        return

      case 'fetch error':
        setStatusMessages({ loading: false, fetchFail: true, upstreamError: false, tooManyPoints: false, settingsError: false })
        return

      case 'too many points':
        setStatusMessages({ loading: false, fetchFail: false, upstreamError: false, tooManyPoints: true, settingsError: false })
        return

      case 'upstream error':
        setStatusMessages({ loading: false, fetchFail: false, upstreamError: true, tooManyPoints: false, settingsError: false })
        return
    }
  }

  const dataPoints = rawData.filter(isPromoterDataPoint)

  const oldMarkers = (markerGroup?.getLayers() as DataMarker<StreetworksDataPoint>[]) || []
  const oldMarkersMap = new Map(oldMarkers.map(m => [m.data.id, m]))
  const newPoints: StreetworksDataPoint[] = []

  dataPoints.forEach(point => {
    // Remove matching markers from 'to be removed' list
    if (oldMarkersMap.has(point.id)) oldMarkersMap.delete(point.id)
    else newPoints.push(point)
  })

  oldMarkersMap.forEach(marker => markerGroup.removeLayer(marker))

  newPoints.map(point => {
    const name = getPromoterName(point)

    L.geoJSON(JSON.parse(point.geojson_wgs84), {
      pointToLayer(geoJsonPoint, latlng) {
        return new DataMarker([latlng.lat, latlng.lng], point, {
          icon: getPromoterIcon(point),
        })
          .bindPopup(
            `
          <h1>${name} works</h1>
          <p>
            ${dayjs.tz(point.start_date, 'Europe/London').format("DD MMM 'YY HH:mm")}
            to
            ${dayjs.tz(point.end_date, 'Europe/London').format("DD MMM 'YY HH:mm")}
          </p>
            
          <h2>Work description</h2>
          <p>${point.works_desc || 'None provided'}</p>

          <h2>Promoter</h2>
          <p>${point.promoter || 'None provided'}</p>
          
          <h2>Permit status</h2>
          <p id="${point.id}__permit_status_desc">Loading...</p>
            
          <h2>Works last updated</h2>
          <p id="${point.id}__event_lastmod_date_disp">Loading...</p>
            
          <h2>Last updated on one.network</h2>
          <p id="${point.id}__last_adapter_update_disp">Loading...</p>
          `,
            { closeButton: false, className: 'streetworks-popup' },
          )
          .addTo(markerGroup)
          .on('popupopen', function (e) {
            const elementIdPrefix = `${e.target.data.id}__`

            getStreetworksDataPointDetails(e.target.data.id, e.target.data.phase_id ?? 1).then(data => {
              const fields = ['permit_status_desc', 'event_lastmod_date_disp', 'last_adapter_update_disp']
              const dateFields = ['event_lastmod_date_disp', 'last_adapter_update_disp']

              fields.forEach(field => {
                const el = document.getElementById(`${elementIdPrefix}${field}`)
                if (!el) return

                const info = data.swdata[field]

                if (dateFields.includes(field) && info) {
                  el.innerText = dayjs.tz(info, 'Europe/London').format('DD MMM YYYY HH:mm:ss')
                } else {
                  el.innerText = info ?? 'Unknown'
                }
              })
            })
          })
      },
    })
  })

  setStatusMessages({
    loading: false,
    fetchFail: false,
    upstreamError: false,
    tooManyPoints: false,
    settingsError: false,
  })
}
