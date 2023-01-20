import React, { useEffect, useRef } from 'react'

import { LayerGroup, useMap, useMapEvent } from 'react-leaflet'
import { ISiteDataPoint } from './UkSitesMap'
import CircleDataMarker from '@leaflet/CircleDataMarker'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { UkSitesMapStatusMessagesAtom } from '@atoms'

import { StatusMessages } from './MapStatusMessages'

import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import type { LayerGroup as LayerGroupType, Map as MapType } from 'leaflet'
import getUkTelcoSitesDataPoints from './getUkTelcoSitesDataPoints'

function getBusinessRates(value: number): string {
  let rates = 0

  // https://www.gov.uk/calculate-your-business-rates
  if (value < 51_000) {
    rates = value * 0.499
  } else {
    rates = value * 0.512
  }

  return '£' + rates.toFixed(2) + '/yr'
}

export function SitesMarkers() {
  const map = useMap()

  const _setStatusMessages = useSetRecoilState(UkSitesMapStatusMessagesAtom)
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

SitesMarkers.whyDidYouRender = true

async function loadPoints(
  map: MapType,
  setStatusMessages: (s: StatusMessages) => void,
  markerGroup: LayerGroupType<any>,
  aborter: AbortController,
) {
  const L = window.L as typeof import('leaflet')

  const bounds = map.getBounds()

  const rawData = await getUkTelcoSitesDataPoints(bounds, aborter)

  if (typeof rawData === 'string') {
    switch (rawData) {
      case 'aborted':
        return

      case 'fetch error':
        setStatusMessages({ loading: false, fetchFail: true, upstreamError: false })
        return

      case 'upstream error':
        setStatusMessages({ loading: false, fetchFail: false, upstreamError: true })
        return
    }
  }

  const dataPoints = rawData.data.filter(p => p.lat && p.lng)

  const oldMarkers = (markerGroup?.getLayers() as CircleDataMarker<ISiteDataPoint>[]) || []
  const oldMarkersMap = new Map(oldMarkers.map(m => [m.data.id, m]))
  const newPoints: ISiteDataPoint[] = []

  dataPoints.forEach(point => {
    // Remove matching markers from 'to be removed' list
    if (oldMarkersMap.has(point.id)) oldMarkersMap.delete(point.id)
    else newPoints.push(point)
  })

  oldMarkersMap.forEach(marker => markerGroup.removeLayer(marker))

  newPoints.map(point => {
    return new CircleDataMarker([parseFloat(point.lat!), parseFloat(point.lng!)], point, {
      radius: 5,
      weight: 2,
      color: '#000',
      fillColor: '#d00',
      fillOpacity: 1,
    })
      .bindPopup(
        `
          <h2>Business</h2>
          <p>${point['business name'] ?? 'Not specified'}</p>

          <h2>Address</h2>
          <p>${point.number} ${point.street} <br/>
          ${point.town} <br/>
          ${point.postcode}</p>

          ${
            point['rateable value']
              ? `
              <h2>Est. free market rent value</h2>
              <p>£${point['rateable value']}/yr</p>

              <h2>Annual business rates</h2>
              <p>${getBusinessRates(parseFloat(point['rateable value']))}</p>
              `
              : ''
          }`,
        { closeButton: false, className: 'streetworks-popup' },
      )
      .addTo(markerGroup)
  })

  setStatusMessages({
    loading: false,
    fetchFail: false,
    upstreamError: false,
  })
}
