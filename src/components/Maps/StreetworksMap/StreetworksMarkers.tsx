import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LayerGroup, useMap, useMapEvent } from 'react-leaflet'

import { debounce, throttle } from 'throttle-debounce'
import { useRecoilValue } from 'recoil'

import { getPromoterIcon, getPromoterName, isPromoterDataPoint } from '@functions/maps/streetworks/streetworksPromoterUtils'
import getStreetworksDataPointDetails from '@functions/maps/streetworks/getStreetworksDataPointDetails'
import getStreetworksDataPoints, { StreetworksDataPoint } from '@functions/maps/streetworks/getStreetworksDataPoints'
import { MapStatusMessages, StatusMessages } from './MapStatusMessages'
import DataMarker from '@leaflet/DataMarker'
import { IStreetworksMapSettingsState, StreetworksMapPersistentSettingsAtom, StreetworksMapSettingsAtom } from '@atoms'

import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import type { LayerGroup as LayerGroupType, Map as MapType } from 'leaflet'

export function StreetworksMarkers() {
  const map = useMap()
  const [statusMessages, _setStatusMessages] = useState<StatusMessages>({
    loading: false,
    fetchFail: false,
    tooManyPoints: false,
  })
  const markerGroup = useRef<LayerGroupType<any> | null>(null)
  const [aborter, setAborter] = useState<AbortController>(new AbortController())
  const oldAborter = useRef(aborter)

  const streetmapSettings = useRecoilValue(StreetworksMapSettingsAtom)
  const streetmapPersistentSettings = useRecoilValue(StreetworksMapPersistentSettingsAtom)

  const prevStreetmapSettings = useRef({ ...streetmapSettings })

  const loadPointsTimeoutKey = useRef<number | null>(null)

  /**
   * Set the status messages for the map, bailing out of the state change
   * if the status messages are the same as the current state.
   */
  const setStatusMessages = useCallback<React.Dispatch<React.SetStateAction<StatusMessages>>>(
    inp => {
      _setStatusMessages(curr => {
        const newVal = typeof inp === 'function' ? inp(curr) : inp

        // Bail if state is same
        if (Object.entries(newVal).every(([k, v]) => v === curr[k as keyof StatusMessages])) return curr

        return newVal
      })
    },
    [_setStatusMessages],
  )

  const debouncedLoadPoints = () => {
    if (loadPointsTimeoutKey.current) clearTimeout(loadPointsTimeoutKey.current)

    loadPointsTimeoutKey.current = window.setTimeout(() => {
      loadPointsTimeoutKey.current = null

      loadPoints(
        map,
        setStatusMessages,
        markerGroup.current!,
        aborter,
        streetmapSettings.streetworksStartDate,
        streetmapSettings.streetworksEndDate,
      )
    }, 1000)
  }

  if (
    streetmapSettings.streetworksStartDate !== prevStreetmapSettings.current.streetworksStartDate ||
    streetmapSettings.streetworksEndDate !== prevStreetmapSettings.current.streetworksEndDate
  ) {
    prevStreetmapSettings.current = { ...streetmapSettings }
    debouncedLoadPoints()
  }

  /**
   * Debounced, memoised callback to replace the current AbortController
   * with a new one.
   */
  const _resetAborter = useCallback(
    debounce(200, () => {
      setAborter(new AbortController())
    }),
    [],
  )

  // We need to trigger a final load after the map has stopped moving,
  // and the AbortController has been reset one final time.
  if (oldAborter.current !== aborter) {
    oldAborter.current = aborter
    debouncedLoadPoints()
  }

  /**
   * Triggers the showing of the loading message at the top of the map
   * and cancels any in-progress streetworks data fetching.
   */
  function showLoadingMessage() {
    aborter.abort()
    _resetAborter()

    if (!statusMessages.loading) {
      setStatusMessages({
        loading: true,
        fetchFail: false,
        tooManyPoints: false,
      })
    }
  }

  useMapEvent(
    'move',
    useCallback(() => {
      showLoadingMessage()
      debouncedLoadPoints()
    }, [showLoadingMessage, debouncedLoadPoints]),
  )

  // Memoise to prevent DOM redraws whenever position changes
  return useMemo(
    () => (
      <>
        <LayerGroup ref={markerGroup} />

        <MapStatusMessages messages={statusMessages} />
      </>
    ),
    [markerGroup, statusMessages],
  )
}

StreetworksMarkers.whyDidYouRender = true

async function loadPoints(
  map: MapType,
  setStatusMessages: React.Dispatch<React.SetStateAction<StatusMessages>>,
  markerGroup: LayerGroupType<any>,
  aborter: AbortController,
  startTime: number,
  endTime: number,
) {
  setStatusMessages(s => ({ ...s, loading: true }))

  const bounds = map.getBounds()

  const bbString = bounds.toBBoxString()
  const rawData = await getStreetworksDataPoints(bbString, aborter, new Date(startTime), new Date(endTime))

  if (typeof rawData === 'string') {
    switch (rawData) {
      case 'aborted':
        setStatusMessages({ loading: true, fetchFail: false, tooManyPoints: false })
        return

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
  const oldMarkersMap = new Map(oldMarkers.map(m => [m.data.u_se_id, m]))
  const newPoints: StreetworksDataPoint[] = []

  dataPoints.forEach(point => {
    // Remove matching markers from 'to be removed' list
    if (oldMarkersMap.has(point.u_se_id)) oldMarkersMap.delete(point.u_se_id)
    else newPoints.push(point)
  })

  oldMarkersMap.forEach(marker => markerGroup.removeLayer(marker))

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

  setStatusMessages({
    loading: false,
    fetchFail: false,
    tooManyPoints: false,
  })
}
