import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMap, useMapEvent } from 'react-leaflet'

import { debounce, throttle } from 'throttle-debounce'

import { MapStatusMessages, StatusMessages } from './MapStatusMessages'
import MarkersCanvas from './MarkersCanvas'
import DataMarker from '@leaflet/DataMarker'
import { MasteDatabasenMapOptionsAtom } from './MasteDatabasenMapOptionsAtom'
import { mergeSites } from '@functions/maps/dk-mastedatabasen/mergeSites'
import { getSiteLabelText } from '@functions/maps/dk-mastedatabasen/getSiteLabelText'
import { getSitePopUpHtml } from '@functions/maps/dk-mastedatabasen/getSitePopUpHtml'

import dayjs from 'dayjs'
import dayjs_tz from 'dayjs/plugin/timezone'
import dayjs_utc from 'dayjs/plugin/utc'

dayjs.extend(dayjs_tz)
dayjs.extend(dayjs_utc)

import type { LayerGroup as LayerGroupType } from 'leaflet'
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

        return new DataMarker<{ id: string; sites: ISite[] }>([point.sites[0].lat, point.sites[0].lon], point, {
          icon: L.icon({
            iconUrl: SiteIcon,
            iconSize: [18, 18],
            iconAnchor: [9, 9],
            popupAnchor: [0, 9],
          }),
          text: getSiteLabelText(point.sites, filterState.showEnbOnLabel),
        })
          .bindPopup(getSitePopUpHtml(point.sites), { closeButton: false, className: 'mastedatabasen-dk-popup' })
          .on({
            click(e) {
              this.openPopup()
            },
          })
      })

      markerGroup.current!.addMarkers(newMarkers)
    },
    [markerGroup, markerGroup.current, filterState],
  )

  const debouncedLoadPoints = useCallback(
    debounce(1000, async () => {
      const mapBounds = map.getBounds()

      const where: Record<string, string> = {}

      where.boundingBox = `${mapBounds.getNorth()},${mapBounds.getEast()},${mapBounds.getSouth()},${mapBounds.getWest()}`

      if (filterState.operatorId) where.operator = filterState.operatorId
      if (filterState.technologyId) where.technology = filterState.technologyId
      if (filterState.frequencyBand) where.frequencyBand = filterState.frequencyBand

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
    if (JSON.stringify(lastFilterState.current) !== JSON.stringify(filterState)) {
      showLoadingMessage()
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
