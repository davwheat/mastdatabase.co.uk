import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMap, useMapEvent } from 'react-leaflet'

import { debounce, throttle } from 'throttle-debounce'

import { MapStatusMessages, StatusMessages } from './MapStatusMessages'
import MarkersCanvas from './MarkersCanvas'
import DataMarker from '@leaflet/DataMarker'
import { MasteDatabasenMapOptionsAtom } from './MasteDatabasenMapOptionsAtom'
import { mergeSites } from '@functions/maps/dk-mastedatabasen/mergeSites'

import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import type { LayerGroup as LayerGroupType, Map as MapType } from 'leaflet'
import { ISite, Site } from './JsonApi/Models'

import SiteIcon from '@assets/icons/site-icon.png'
import { useRecoilValue } from 'recoil'

export function SiteMarkers() {
  const map = useMap()
  const filterState = useRecoilValue(MasteDatabasenMapOptionsAtom)
  const lastFilterState = useRef(filterState)

  const [statusMessages, _setStatusMessages] = useState<StatusMessages>({
    loading: false,
    fetchFail: false,
    tooManySites: false,
  })

  const markerGroup = useRef<LayerGroupType<any> | null>(null)

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

  const addDataMarkersToMap = useCallback(
    function addDataMarkersToMap(sitesData: ISite[]) {
      const sitesToAdd: { id: string; sites: ISite[] }[] = mergeSites(sitesData)

      markerGroup.current!.clear()

      const newMarkers: DataMarker<{ id: string; sites: ISite[] }>[] = sitesToAdd.map(point => {
        const sitesByRat: Record<string, ISite[]> = {}

        point.sites.forEach(site => {
          sitesByRat[site.Technology().id] ||= []
          sitesByRat[site.Technology().id].push(site)
        })

        const popupTextSegments: string[] = []

        popupTextSegments.push(`
        <dt>Operator</dt>
        <dd>${point.sites[0].Operator()?.operatorName ?? 'Unknown'}</dd>
        `)

        popupTextSegments.push(`
        <dt>Adress</dt>
        <dd>${[(point.sites[0].streetName ?? '') + ' ' + (point.sites[0].houseNumber ?? ''), point.sites[0].town, point.sites[0].postNumber]
          .map(s => s?.trim())
          .filter(t => !!t)
          .join(', ')}</dd>
        `)

        popupTextSegments.push(`
        <dt>Station name(s)</dt>
        <dd>${Array.from(new Set(point.sites.map(s => s.stationName))).join(', ')}</dd>
        `)

        return new DataMarker<{ id: string; sites: ISite[] }>([point.sites[0].lat, point.sites[0].lon], point, {
          icon: L.icon({
            iconUrl: SiteIcon,
            iconSize: [18, 18],
            iconAnchor: [9, 9],
            popupAnchor: [0, 9],
          }),
          text: generateLabelSegments(point.sites)
            .filter(l => !!l)
            .join('\n'),
        })
          .bindPopup(`<dl>${popupTextSegments.join('')}</dl>`, { closeButton: false, className: 'mastedatabasen-dk-popup' })
          .on({
            click(e) {
              this.openPopup()
            },
          })
      })

      markerGroup.current!.addMarkers(newMarkers)
    },
    [markerGroup, markerGroup.current],
  )

  const debouncedLoadPoints = useCallback(
    debounce(1000, async () => {
      const mapBounds = map.getBounds()

      const where: Record<string, string> = {}

      where.boundingBox = `${mapBounds.getNorth()},${mapBounds.getEast()},${mapBounds.getSouth()},${mapBounds.getWest()}`

      if (filterState.operatorId) where.operator = filterState.operatorId
      if (filterState.technologyId) where.technology = filterState.technologyId

      let collection = await Site.where(where).all()

      setStatusMessages({
        loading: false,
        fetchFail: false,
        tooManySites: collection.hasNextPage(),
      })

      addDataMarkersToMap(collection.all())
    }),
    [filterState, map, setStatusMessages, markerGroup],
  )

  /**
   * **Throttled**
   *
   * Triggers the showing of the loading message at the top of the map
   * and cancels any in-progress streetworks data fetching.
   */
  const showLoadingMessage = useCallback(
    throttle(
      100,
      () => {
        setStatusMessages({
          loading: true,
          fetchFail: false,
          tooManySites: false,
        })
      },
      { noTrailing: true },
    ),
    [setStatusMessages],
  )

  useMapEvent(
    'move',
    useCallback(() => {
      showLoadingMessage()
      debouncedLoadPoints()
    }, [showLoadingMessage, debouncedLoadPoints]),
  )

  useEffect(() => {
    if (lastFilterState.current.operatorId !== filterState.operatorId || lastFilterState.current.technologyId !== filterState.technologyId) {
      debouncedLoadPoints()
    }
  }, [filterState, debouncedLoadPoints])

  // Memoise to prevent DOM redraws whenever position changes
  return useMemo(
    () => (
      <>
        {/* <LayerGroup ref={markerGroup} /> */}
        <MarkersCanvas ref={markerGroup} />

        <MapStatusMessages messages={statusMessages} />
      </>
    ),
    [markerGroup, statusMessages],
  )
}

const OperatorIdToAbbr: Record<string, string> = {
  '1': 'Banedanmark',
  '2': 'TDC',
  '3': 'Cibicom',
  '4': 'Telia-Telenor',
  '5': '3 DK',
  '6': 'Norlys',
  '7': 'DR',
}

const RatShorthand: Record<string, string> = {
  GSM: 'G',
  UMTS: 'U',
  LTE: 'L',
  NR: 'NR',
}

function generateLabelSegments(sites: ISite[]): string[] {
  const labelSegments: string[] = []

  // #region Operator shortname
  labelSegments.push(OperatorIdToAbbr[sites[0].Operator()?.id] ?? sites[0].Operator()?.operatorName ?? 'UNKNOWN')
  // #endregion

  // #region Station name(s)
  const names = Array.from(new Set(sites.map(s => s.stationName)))
  labelSegments.push(names.length > 1 ? `${names[0]}, (+${names.length - 1} more)` : names[0])
  // #endregion

  // #region Frequency list
  const ratFreqList: Record<'GSM' | 'UMTS' | 'LTE' | 'NR' | 'Other', number[]> = {
    GSM: [],
    UMTS: [],
    LTE: [],
    NR: [],
    Other: [],
  }

  sites.forEach(s => {
    const rat: string | null = s.Technology()?.technologyName
    const freq: number | null = s.FrequencyBand()?.frequencyBand

    if (!freq) return null

    if (rat && ['GSM', 'UMTS', 'LTE', 'NR'].includes(rat)) {
      ratFreqList[rat as keyof typeof ratFreqList].push(freq)
    } else {
      ratFreqList.Other.push(freq)
    }
  })

  const allFreqs = Array.from(new Set(Object.values(ratFreqList).flat()))
  allFreqs.sort((a, b) => a - b)

  const ratFreqs = allFreqs.map(freq => {
    let str = ''

    Object.entries(ratFreqList).forEach(([rat, freqs]) => {
      if (rat === 'Other') return

      if (freqs.includes(freq)) {
        str += RatShorthand[rat] + '/'
      }
    })

    if (str.length === 0) {
      // Skip freq rewrite for non-mobile networking sites
      str += freq.toString()
    } else {
      // 800 -> 08, 2100 -> 21, 260000 -> 2600, etc
      str = str.slice(0, -1)
      str += freq.toString().slice(0, -2).padStart(2, '0')
    }

    return str
  })

  labelSegments.push(ratFreqs.join(', '))

  // #endregion

  return labelSegments
}
