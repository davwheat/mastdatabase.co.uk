import React, { forwardRef, useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import { Protocol } from 'pmtiles'
import type { Map as MapLibreMap } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './UkWtrMap.less'
import type { WtrFilters, FilterOptions, WtrMeta } from './types'
import {
  licencePopupHTML,
  linkPopupHTML,
  licenceChooserHTML,
  collectFilterOptions,
  uniqueLicenceFeatures,
  buildWtrFilter,
  hasActiveFilters,
  FilterSelect,
  selectLicence,
  productColourExpression,
  licenceColourExpression,
} from './WtrMapFuncts'

const emptyFilters: WtrFilters = {
  product: '',
  frequency: '',
  frequencyBand: '',
  antennaType: '',
  licensee: '',
  colourBy: 'licensee',
}

const emptyOptions: FilterOptions = {
  products: [],
  frequencyBands: [],
  antennaTypes: [],
  licensees: [],
}

const tilesUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080/wtr.pmtiles' : 'https://osm-assets.coveragetiles.com/ofcom-wireless.pmtiles'

const WtrMap = forwardRef<MapLibreMap>(function WtrMap(_, fwdRef) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const selectedLicenceRef = useRef('')
  const activePopupRef = useRef<maplibregl.Popup | null>(null)
  const stackedLicencesRef = useRef<Array<{ props: Record<string, unknown>; lngLat: [number, number] }>>([])
  const [filters, setFilters] = useState<WtrFilters>(emptyFilters)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(emptyOptions)
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [wtrMeta, setWtrMeta] = useState<WtrMeta | null>(null)
  const [tooZoomedOut, setTooZoomedOut] = useState(false)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return
    }
    const container = containerRef.current

    const protocol = new Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Ofcom WTR © Ofcom (OGL)',
            maxzoom: 19,
          },
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
      },
      center: [-3.5, 54.5],
      zoom: 7,
      minZoom: 5,
      maxZoom: 18,
      attributionControl: false,
    })

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right')
    map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-right')

    // propagate forwarded ref so PostcodeSearch / wtr.tsx can call flyTo
    if (typeof fwdRef === 'function') {
      fwdRef(map)
    } else if (fwdRef) {
      fwdRef.current = map
    }
    mapRef.current = map
    // ;(window as any).__wtrMap = map

    map.on('load', () => {
      const pmtilesUrl = `pmtiles://${tilesUrl}`

      map.addSource('wtr', { type: 'vector', url: pmtilesUrl })

      map.addLayer({
        id: 'wtr-clusters',
        type: 'circle',
        source: 'wtr',
        'source-layer': 'licence_clusters',
        minzoom: 9,
        maxzoom: 11,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['get', 'point_count'], 2, 8, 25, 15, 100, 24, 500, 34],
          'circle-color': ['interpolate', ['linear'], ['get', 'point_count'], 2, '#d8f0ff', 50, '#62b6cb', 250, '#006d77'],
          'circle-opacity': 0.78,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      })

      map.addLayer({
        id: 'wtr-cluster-count',
        type: 'symbol',
        source: 'wtr',
        'source-layer': 'licence_clusters',
        minzoom: 9,
        maxzoom: 11,
        layout: {
          'text-field': ['to-string', ['get', 'point_count']],
          'text-size': ['interpolate', ['linear'], ['get', 'point_count'], 2, 11, 100, 13, 500, 15],
          'text-font': ['Open Sans Bold'],
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#073b4c',
          'text-halo-color': 'rgba(255,255,255,0.8)',
          'text-halo-width': 1,
        },
      })

      // P2P links - rendered first so they sit below the point markers
      map.addLayer({
        id: 'wtr-links',
        type: 'line',
        source: 'wtr',
        'source-layer': 'links',
        minzoom: 9,
        maxzoom: 15,
        paint: {
          'line-color': productColourExpression() as any,
          'line-width': ['interpolate', ['linear'], ['zoom'], 9, 1, 13, 2, 15, 2.5],
          'line-opacity': 0.68,
        },
      })

      // Dashed overlay for close-up zoom — separate layer avoids tile-boundary phase resets on the solid layer
      map.addLayer({
        id: 'wtr-links-dashed',
        type: 'line',
        source: 'wtr',
        'source-layer': 'links',
        minzoom: 15,
        paint: {
          'line-color': productColourExpression() as any,
          'line-width': ['interpolate', ['linear'], ['zoom'], 15, 2.5, 17, 3],
          'line-opacity': 0.68,
          'line-dasharray': ['step', ['zoom'], ['literal', [1.4, 1.2]], 17, ['literal', [0.8, 1.4]]],
        },
      })

      map.addLayer({
        id: 'wtr-links-selected',
        type: 'line',
        source: 'wtr',
        'source-layer': 'links',
        minzoom: 9,
        filter: ['==', ['get', 'licenceNumber'], ''],
        paint: {
          'line-color': '#ffbe0b',
          'line-width': ['interpolate', ['linear'], ['zoom'], 9, 3, 14, 5, 17, 6],
          'line-opacity': 0.95,
        },
      })

      // Licence points
      map.addLayer({
        id: 'wtr-licences',
        type: 'circle',
        source: 'wtr',
        'source-layer': 'licences',
        minzoom: 11,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, 3, 14, 6],
          'circle-color': productColourExpression() as any,
          'circle-opacity': ['interpolate', ['linear'], ['zoom'], 9, 0.55, 12, 0.82],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
          'circle-stroke-opacity': ['interpolate', ['linear'], ['zoom'], 9, 0, 12, 0.5],
        },
      })

      map.addLayer({
        id: 'wtr-licences-selected',
        type: 'circle',
        source: 'wtr',
        'source-layer': 'licences',
        minzoom: 11,
        filter: ['==', ['get', 'licenceNumber'], ''],
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, 6, 14, 10, 17, 12],
          'circle-color': '#ffbe0b',
          'circle-opacity': 0.94,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#111827',
        },
      })

      map.addLayer({
        id: 'wtr-azimuth',
        type: 'symbol',
        source: 'wtr',
        'source-layer': 'licences',
        minzoom: 13,
        filter: ['has', 'antennaAzimuth'],
        layout: {
          'text-field': '▲',
          'text-size': ['interpolate', ['linear'], ['zoom'], 13, 12, 17, 18],
          'text-rotate': ['get', 'antennaAzimuth'],
          'text-rotation-alignment': 'map',
          'text-allow-overlap': true,
          'text-ignore-placement': true,
          'text-offset': [0, -1.1],
        },
        paint: {
          'text-color': '#111827',
          'text-halo-color': '#fff',
          'text-halo-width': 1,
          'text-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0.45, 16, 0.9],
        },
      })

      setLoading(false)
      setMapLoaded(true)
    })

    map.on('sourcedataloading', (e: maplibregl.MapSourceDataEvent) => {
      if (e.sourceId === 'wtr') setLoading(true)
    })
    map.on('idle', () => {
      setLoading(false)
      setFilterOptions(collectFilterOptions(map))
    })
    map.on('zoomend', () => setTooZoomedOut(map.getZoom() < 9))

    map.on('click', 'wtr-clusters', (e: maplibregl.MapLayerMouseEvent) => {
      if (!e.features?.length) return
      map.easeTo({ center: e.lngLat, zoom: Math.min(map.getZoom() + 2, 12) })
    })

    // Licence click popup
    map.on('click', 'wtr-licences', (e: maplibregl.MapLayerMouseEvent) => {
      if (!e.features?.length) return
      const rendered = uniqueLicenceFeatures(map.queryRenderedFeatures(e.point, { layers: ['wtr-licences'] }))
      const features = rendered.length ? rendered : uniqueLicenceFeatures(e.features)
      if (features.length > 1) {
        const lngLat: [number, number] = [e.lngLat.lng, e.lngLat.lat]
        stackedLicencesRef.current = features.map(feature => {
          const geom = feature.geometry as GeoJSON.Point
          return {
            props: feature.properties as Record<string, unknown>,
            lngLat: Array.isArray(geom.coordinates) ? (geom.coordinates as [number, number]) : lngLat,
          }
        })
        activePopupRef.current?.remove()
        activePopupRef.current = new maplibregl.Popup({ maxWidth: '340px' })
          .setLngLat(e.lngLat)
          .setHTML(licenceChooserHTML(stackedLicencesRef.current.map(item => item.props)))
          .addTo(map)
        return
      }
      const f = features[0]
      const geom = f.geometry as GeoJSON.Point
      const props = f.properties as Record<string, unknown>
      selectLicence(map, selectedLicenceRef, String(props.licenceNumber ?? ''))
      activePopupRef.current?.remove()
      activePopupRef.current = new maplibregl.Popup({ maxWidth: '320px' })
        .setLngLat(geom.coordinates as [number, number])
        .setHTML(licencePopupHTML(props))
        .addTo(map)
    })

    // Link click popup
    map.on('click', 'wtr-links', (e: maplibregl.MapLayerMouseEvent) => {
      if (!e.features?.length) return
      const f = e.features[0]
      const props = f.properties as Record<string, unknown>
      selectLicence(map, selectedLicenceRef, String(props.licenceNumber ?? ''))
      const geom = f.geometry as GeoJSON.LineString
      activePopupRef.current?.remove()
      activePopupRef.current = new maplibregl.Popup({ maxWidth: '320px' })
        .setLngLat(e.lngLat)
        .setHTML(linkPopupHTML(props, geom.coordinates))
        .addTo(map)
    })

    const onPopupClick = (event: MouseEvent) => {
      const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-wtr-jump]')
      if (!button) return
      event.preventDefault()
      event.stopPropagation()
      const lng = Number(button.dataset.lng)
      const lat = Number(button.dataset.lat)
      if (!Number.isFinite(lng) || !Number.isFinite(lat)) return
      map.flyTo({ center: [lng, lat], zoom: Math.max(15, map.getZoom()) })
    }
    const onLicenceChoiceClick = (event: MouseEvent) => {
      const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-wtr-licence-index]')
      if (!button) return
      event.preventDefault()
      event.stopPropagation()
      const index = Number(button.dataset.wtrLicenceIndex)
      const item = stackedLicencesRef.current[index]
      if (!item) return
      selectLicence(map, selectedLicenceRef, String(item.props.licenceNumber ?? ''))
      activePopupRef.current?.remove()
      activePopupRef.current = new maplibregl.Popup({ maxWidth: '320px' })
        .setLngLat(item.lngLat)
        .setHTML(licencePopupHTML(item.props))
        .addTo(map)
    }
    container.addEventListener('click', onPopupClick)
    container.addEventListener('click', onLicenceChoiceClick)

    map.on('click', e => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['wtr-licences', 'wtr-links', 'wtr-clusters'] })
      if (features.length === 0) selectLicence(map, selectedLicenceRef, '')
    })

    map.on('mouseenter', 'wtr-clusters', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'wtr-clusters', () => {
      map.getCanvas().style.cursor = ''
    })
    map.on('mouseenter', 'wtr-licences', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'wtr-licences', () => {
      map.getCanvas().style.cursor = ''
    })
    map.on('mouseenter', 'wtr-links', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'wtr-links', () => {
      map.getCanvas().style.cursor = ''
    })

    fetch('/wtr-meta.json')
      .then(r => r.json())
      .then((d: WtrMeta) => setWtrMeta(d))
      .catch(() => {})

    return () => {
      container.removeEventListener('click', onPopupClick)
      container.removeEventListener('click', onLicenceChoiceClick)
      activePopupRef.current?.remove()
      maplibregl.removeProtocol('pmtiles')
      if (typeof fwdRef === 'function') fwdRef(null)
      else if (fwdRef) fwdRef.current = null
      mapRef.current = null
      map.remove()
    }
  }, [fwdRef])

  // Sync filters and colour mode to the map layers.
  useEffect(() => {
    if (!mapLoaded) return
    const map = mapRef.current
    if (!map) return
    const filter = buildWtrFilter(filters)
    const filtersActive = hasActiveFilters(filters)

    map.setFilter('wtr-licences', filter as any)
    map.setFilter('wtr-links', filter as any)
    if (map.getLayer('wtr-links-dashed')) map.setFilter('wtr-links-dashed', filter as any)
    map.setFilter('wtr-azimuth', (filter ? ['all', ['has', 'antennaAzimuth'], filter] : ['has', 'antennaAzimuth']) as any)

    // Clusters are pre-built aggregates with no licence properties — hide them
    // when filters are active so the filtered individual points show through instead.
    const clusterVis = filtersActive ? 'none' : 'visible'
    if (map.getLayer('wtr-clusters')) map.setLayoutProperty('wtr-clusters', 'visibility', clusterVis)
    if (map.getLayer('wtr-cluster-count')) map.setLayoutProperty('wtr-cluster-count', 'visibility', clusterVis)

    const linkColour = (filters.colourBy === 'licensee' ? licenceColourExpression('licensee') : productColourExpression()) as any
    map.setPaintProperty(
      'wtr-licences',
      'circle-color',
      (filters.colourBy === 'licensee' ? licenceColourExpression('licensee') : productColourExpression()) as any,
    )
    map.setPaintProperty('wtr-links', 'line-color', linkColour)
    if (map.getLayer('wtr-links-dashed')) map.setPaintProperty('wtr-links-dashed', 'line-color', linkColour)
  }, [filters, mapLoaded])

  return (
    <div className="wtr-map-container">
      <div ref={containerRef} className="wtr-map-canvas" />

      <div className="wtr-status-bar">
        {tooZoomedOut && <div className="wtr-status-bar__message wtr-status-bar__message--warn">⚠ Zoom in past level 9 to see data</div>}
        {loading && (
          <div className="wtr-status-bar__message wtr-status-bar__message--loading">
            <span className="wtr-status-bar__spinner" />
            Loading…
          </div>
        )}
        {wtrMeta && (
          <div className="wtr-status-bar__version">
            {wtrMeta.recordCount.toLocaleString()} licences · {wtrMeta.linkCount.toLocaleString()} links · updated{' '}
            {new Date(wtrMeta.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        )}
      </div>

      {filterOpen && (
        <div className="wtr-filter-panel">
          <div className="wtr-filter-panel__header">
            <span className="wtr-filter-panel__title">Filter licences</span>
            <button className="wtr-filter-panel__close" onClick={() => setFilterOpen(false)} aria-label="Close filter">
              ✕
            </button>
          </div>
          <FilterSelect
            id="wtr-product-filter"
            label="Product"
            value={filters.product}
            options={filterOptions.products}
            onChange={product => setFilters(f => ({ ...f, product }))}
          />
          <FilterSelect
            id="wtr-band-filter"
            label="Common frequency"
            value={filters.frequencyBand}
            options={filterOptions.frequencyBands.map(b => `${b} GHz`)}
            onChange={frequencyBand => setFilters(f => ({ ...f, frequencyBand }))}
          />
          <label className="wtr-filter-panel__label" htmlFor="wtr-freq-filter">
            Frequency
          </label>
          <input
            id="wtr-freq-filter"
            className="wtr-filter-panel__input"
            type="text"
            placeholder="18GHz, 18000MHz, or Hz"
            value={filters.frequency}
            onChange={e => setFilters(f => ({ ...f, frequency: e.target.value }))}
          />
          <p className="wtr-filter-panel__hint">Rounded GHz values match the whole band, e.g. 18GHz = 18-19GHz</p>
          <FilterSelect
            id="wtr-antenna-filter"
            label="Antenna type"
            value={filters.antennaType}
            options={filterOptions.antennaTypes}
            onChange={antennaType => setFilters(f => ({ ...f, antennaType }))}
          />
          <FilterSelect
            id="wtr-licensee-filter"
            label="Licence holder"
            value={filters.licensee}
            options={filterOptions.licensees}
            onChange={licensee => setFilters(f => ({ ...f, licensee }))}
          />
          <label className="wtr-filter-panel__label" htmlFor="wtr-colour-filter">
            Dot colours
          </label>
          <select
            id="wtr-colour-filter"
            className="wtr-filter-panel__input"
            value={filters.colourBy}
            onChange={e => setFilters(f => ({ ...f, colourBy: e.target.value as WtrFilters['colourBy'] }))}
          >
            <option value="product">By product</option>
            <option value="licensee">By licence holder</option>
          </select>
          {hasActiveFilters(filters) && (
            <button className="wtr-filter-panel__clear" onClick={() => setFilters(emptyFilters)}>
              Clear
            </button>
          )}
        </div>
      )}

      <div className="wtr-controls">
        <button className="wtr-control-btn" title="Filter licences" aria-label="Filter licences" onClick={() => setFilterOpen(o => !o)}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z"
            />
          </svg>
        </button>
        <button
          className="wtr-control-btn"
          title="My location"
          aria-label="Centre on my location"
          onClick={() => {
            navigator.geolocation?.getCurrentPosition(pos => {
              mapRef.current?.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 12 })
            })
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
})

export default WtrMap
