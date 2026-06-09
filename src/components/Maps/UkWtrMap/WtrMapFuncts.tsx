import { MapLibreMap } from 'maplibre-gl'
import React from 'react'
import type { WtrFilters, FilterOptions } from './types'

type Expr = readonly unknown[]

const KEY_SEP = '\0'
const FREQ_UNIT_HZ: Readonly<Record<string, number>> = {
  ghz: 1e9,
  mhz: 1e6,
  khz: 1e3,
  hz: 1,
}
const ACTIVE_FILTER_KEYS = ['product', 'frequency', 'frequencyBand', 'antennaType', 'licensee'] as const
const MAX_FREQUENCY_BANDS = 40
const MAX_LICENSEES = 250

// Helpers
function finiteNumber(value: unknown): number | null {
  if (value == null) return null
  const text = String(value).trim()
  if (!text || text === '-') return null
  const n = Number.parseFloat(text)
  return Number.isFinite(n) ? n : null
}

function frequencyGhzFloor(frequency: unknown): number | null {
  const hz = finiteNumber(frequency)
  if (hz == null || hz <= 0) return null
  return Math.floor(hz / 1e9)
}

function displayText(value: unknown): string | null {
  const text = String(value ?? '').trim()
  if (!text || text === '-' || text.toLowerCase() === 'nan') return null
  return text
}

function formatFixed(value: unknown, decimals = 1): string | null {
  const n = finiteNumber(value)
  if (n == null) return null
  return n.toFixed(decimals).replace(/\.0$/, '')
}

function formatHz(hz: unknown): string | null {
  const n = finiteNumber(hz)
  if (n == null) return displayText(hz)
  if (n >= 1e9) return `${(n / 1e9).toFixed(3)} GHz`
  if (n >= 1e6) return `${(n / 1e6).toFixed(3)} MHz`
  if (n >= 1e3) return `${(n / 1e3).toFixed(3)} kHz`
  return `${n} Hz`
}

function formatM(value: unknown): string | null {
  const n = formatFixed(value)
  return n == null ? null : `${n} m`
}

function formatDeg(value: unknown): string | null {
  const n = formatFixed(value)
  return n == null ? null : `${n}°`
}

function formatDb(value: unknown): string | null {
  const n = formatFixed(value)
  return n == null ? null : `${n} dBd`
}

function formatErp(p: Record<string, unknown>): string | null {
  const erp = formatFixed(p.antennaErp)
  if (erp == null) return null
  return [erp, displayText(p.antennaErpUnit), displayText(p.antennaErpType)].filter(Boolean).join(' ')
}

function formatDirection(direction: unknown, azimuth: unknown): string | null {
  const existing = displayText(direction)
  if (existing) return existing
  const deg = finiteNumber(azimuth)
  if (deg == null) return null
  const LABELS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'] as const
  return LABELS[Math.round((((deg % 360) + 360) % 360) / 22.5) % LABELS.length]
}

function addStringOption(set: Set<string>, value: unknown): void {
  const text = String(value ?? '').trim()
  if (text) set.add(text)
}

function addOption(set: Set<string>, value: unknown) {
  const text = String(value ?? '').trim()
  if (text) set.add(text)
}

function sortedOptions(set: Set<string>): string[] {
  return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

// Filter logic
function hasActiveFilters(filters: WtrFilters): boolean {
  return ACTIVE_FILTER_KEYS.some(key => Boolean(filters[key]))
}

function parseFrequencyFilter(input: string): Expr | null {
  const text = input.trim().toLowerCase().replace(/\s+/g, '')
  if (!text) return null
  const match = text.match(/^(\d+(?:\.\d+)?)(ghz|mhz|khz|hz)?$/)
  if (!match) return ['==', ['get', 'frequency'], input.trim()]
  const value = Number(match[1])
  if (!Number.isFinite(value)) return null
  const unit = match[2] ?? 'hz'
  const hz = value * (FREQ_UNIT_HZ[unit] ?? 1)
  // Whole-number GHz inputs (e.g. "18GHz") match the entire 1 GHz band, as documented in the filter panel hint text.
  if (unit === 'ghz' && Number.isInteger(value)) {
    return [
      'any',
      ['!', ['has', 'frequencyHz']],
      ['all', ['>=', ['to-number', ['get', 'frequencyHz']], hz], ['<', ['to-number', ['get', 'frequencyHz']], hz + 1e9]],
    ]
  }
  return ['any', ['!', ['has', 'frequencyHz']], ['==', ['to-number', ['get', 'frequencyHz']], hz]]
}

function buildWtrFilter(filters: WtrFilters): Expr | null {
  const clauses: Expr[] = []
  // Each clause uses a pass-through pattern:
  //   ['any', ['!', ['has', <prop>]], ['==', ['get', <prop>], <value>]]
  if (filters.product) clauses.push(['any', ['!', ['has', 'productDescription']], ['==', ['get', 'productDescription'], filters.product]])
  if (filters.antennaType) clauses.push(['any', ['!', ['has', 'antennaType']], ['==', ['get', 'antennaType'], filters.antennaType]])
  if (filters.licensee) clauses.push(['any', ['!', ['has', 'licensee']], ['==', ['get', 'licensee'], filters.licensee]])
  if (filters.frequencyBand) {
    const band = parseInt(filters.frequencyBand, 10)
    if (Number.isFinite(band)) clauses.push(['any', ['!', ['has', 'frequencyGhzFloor']], ['==', ['get', 'frequencyGhzFloor'], band]])
  }
  const frequencyFilter = parseFrequencyFilter(filters.frequency)
  if (frequencyFilter) clauses.push(frequencyFilter)
  return clauses.length ? ['all', ...clauses] : null
}

function selectLicence(map: MapLibreMap, selectedRef: React.MutableRefObject<string>, licenceNumber: string): void {
  selectedRef.current = licenceNumber
  const filter: Expr = ['==', ['get', 'licenceNumber'], licenceNumber]
  if (map.getLayer('wtr-licences-selected')) map.setFilter('wtr-licences-selected', filter as any)
  if (map.getLayer('wtr-links-selected')) map.setFilter('wtr-links-selected', filter as any)
}

function uniqueLicenceFeatures(features: readonly GeoJSON.Feature[]): GeoJSON.Feature[] {
  const seen = new Set<string>()
  return features.filter(feature => {
    const p = (feature.properties ?? {}) as Record<string, unknown>
    const key = [p.licenceNumber, p.stationType, p.frequency, p.antennaAzimuth, p.antennaType].map(v => String(v ?? '')).join(KEY_SEP)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function collectFilterOptions(map: MapLibreMap): FilterOptions {
  const features = map.querySourceFeatures('wtr', { sourceLayer: 'licences' })
  const products = new Set<string>()
  const frequencyBands = new Set<number>()
  const antennaTypes = new Set<string>()
  const licensees = new Set<string>()

  for (const feature of features) {
    const p = feature.properties as Record<string, unknown>
    addStringOption(products, p.productDescription)
    addStringOption(antennaTypes, p.antennaType)
    addStringOption(licensees, p.licensee)
    // p.frequencyGhzFloor is a pre-computed integer tile property; fall back
    // to computing it from the raw frequency when absent.
    const floor = Number(p.frequencyGhzFloor ?? frequencyGhzFloor(p.frequency))
    if (Number.isFinite(floor) && floor > 0) frequencyBands.add(floor)
  }

  return {
    products: sortedOptions(products),
    frequencyBands: Array.from(frequencyBands)
      .sort((a, b) => a - b)
      .slice(0, MAX_FREQUENCY_BANDS),
    antennaTypes: sortedOptions(antennaTypes),
    licensees: sortedOptions(licensees).slice(0, MAX_LICENSEES),
  }
}

// Colours
function productColourExpression(): Expr {
  const product = ['downcase', ['to-string', ['get', 'productDescription']]]
  return [
    'case',
    ['>=', ['index-of', 'fixed', product], 0],
    '#000000',
    ['>=', ['index-of', 'business radio', product], 0],
    '#277da1',
    ['>=', ['index-of', 'cellular', product], 0],
    '#7b2cbf',
    ['>=', ['index-of', 'telemetry', product], 0],
    '#6a994e',
    ['>=', ['index-of', 'programme', product], 0],
    '#f77f00',
    ['>=', ['index-of', 'satellite', product], 0],
    '#2a9d8f',
    ['>=', ['index-of', 'maritime', product], 0],
    '#0081a7',
    ['>=', ['index-of', 'aeronautical', product], 0],
    '#bc4749',
    '#1d4ed8',
  ]
}

function licenceColourExpression(): Expr {
  return [
    'match',
    ['downcase', ['to-string', ['get', 'licensee']]],
    'vodafone limited',
    '#e60000',
    'telefonica uk limited',
    '#0050ff',
    'ee limited',
    '#00a859',
    'mobile broadband network limited',
    '#7b2cbf',
    'network rail infrastructure limited',
    '#f77f00',
    'arqiva limited',
    '#006d77',
    'british telecommunications public limited company',
    '#5514B4',
    'airwave solutions limited',
    '#bc4749',
    '#00b13f',
  ]
}

// Popup HTML generators
function esc(v: unknown): string {
  if (v == null) return ''
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function row(label: string, value: string | null | undefined, mono = false): string {
  if (!value) return ''
  const cls = mono ? 'wtr-popup__value wtr-popup__value--mono' : 'wtr-popup__value'
  return `<dt class="wtr-popup__label">${esc(label)}</dt><dd class="${cls}">${esc(value)}</dd>`
}

function wtrUrl(licNo: string): string {
  return `https://www.ofcom.org.uk/spectrum/frequencies/spectrum-information-portal?licenceNumber=${encodeURIComponent(licNo)}`
}

function getProductTag(x: string): string {
  const product = x.toLowerCase()
  if (product.includes('br tech')) return 'Business Radio'
  if (product.includes('ais')) return 'Maritime'
  if (product.includes('csr')) return 'Maritime'
  if (product.includes('maritime')) return 'Maritime'
  if (product.includes('fixed links')) return 'P2P Link'
  if (product.includes('gnss')) return 'GNSS'
  if (product.includes('satellite')) return 'Satellite'
  if (product.includes('scanning telemetry')) return 'Telemetry'
  if (product.includes('shared access')) return 'Cellular'
}

function basePopupRows(p: Record<string, unknown>): string {
  return [
    row('Licence no.', String(p.licenceNumber ?? ''), true),
    row('Status', String(p.status ?? '')),
    row('Issued', String(p.licenceIssueDate ?? '')),
    row('Product', String(p.productDescription ?? '')),
    row('Product code', String(p.productCode ?? '')),
    row('Sector', String(p.sector ?? '')),
    row('Class', String(p.class ?? '')),
    row('Station type', String(p.stationType ?? '')),
    row('Frequency', formatHz(p.frequency)),
    row('Channel width', formatHz(p.channelWidth)),
    row('Height', formatM(p.heightAsl)),
    row('Antenna type', String(p.antennaType ?? '')),
    row('Azimuth', formatDeg(p.antennaAzimuth)),
    row('Direction', formatDirection(p.antennaDirection, p.antennaAzimuth)),
    row('Gain', formatDb(p.antennaGain)),
    row('ERP', formatErp(p)),
    row('NGR', String(p.ngr ?? ''), true),
  ].join('')
}

function licenceChooserHTML(licences: ReadonlyArray<Record<string, unknown>>): string {
  return `
<div class="wtr-popup">
  <p class="wtr-popup__licensee">${licences.length} licences at this location</p>
  <div class="wtr-popup__licence-list">
    ${licences
      .map(
        (p, index) => `
      <button type="button" class="wtr-popup__licence-choice" data-wtr-licence-index="${index}">
        <span class="wtr-popup__choice-main">${esc(p.licenceNumber)}${displayText(p.stationType) ? ` (${esc(p.stationType)})` : ''}</span>
        <span class="wtr-popup__choice-sub">${esc(displayText(p.licensee) ?? 'Unknown holder')}${formatHz(p.frequency) ? ` - ${esc(formatHz(p.frequency))}` : ''}</span>
      </button>`,
      )
      .join('')}
  </div>
</div>`
}

function licencePopupHTML(p: Record<string, unknown>): string {
  const licNo = String(p.licenceNumber ?? '')
  const licenceType = getProductTag(String(p.productDescription ?? ''))
  return `
<div class="wtr-popup">
  <p class="wtr-popup__licensee">${p.licensee ? esc(p.licensee) : '<em>Unknown licensee</em>'}</p>
  <dl class="wtr-popup__details">${basePopupRows(p)}</dl>
    <span class="wtr-popup__badge wtr-popup__badge--link">${licenceType}</span>
  <a class="wtr-popup__wtr-link" href="${esc(wtrUrl(licNo))}" target="_blank" rel="noopener noreferrer">View on Ofcom WTR ↗</a>
</div>`
}

function linkPopupHTML(p: Record<string, unknown>, geometryCoordinates?: GeoJSON.Position[]): string {
  const licNo = String(p.licenceNumber ?? '')
  const fallbackA = geometryCoordinates?.[0]
  const fallbackB = geometryCoordinates?.[geometryCoordinates.length - 1]
  const lngA = finiteNumber(p.lngA) ?? fallbackA?.[0]
  const latA = finiteNumber(p.latA) ?? fallbackA?.[1]
  const lngB = finiteNumber(p.lngB) ?? fallbackB?.[0]
  const latB = finiteNumber(p.latB) ?? fallbackB?.[1]
  const jumpButtons = [lngA, latA, lngB, latB].every(Number.isFinite)
    ? `<div class="wtr-popup__jump-buttons">
    <button type="button" class="wtr-popup__jump-btn" data-wtr-jump="a" data-lng="${esc(lngA)}" data-lat="${esc(latA)}">Jump to A</button>
    <button type="button" class="wtr-popup__jump-btn" data-wtr-jump="b" data-lng="${esc(lngB)}" data-lat="${esc(latB)}">Jump to B</button>
  </div>`
    : ''
  return `
<div class="wtr-popup">
  <p class="wtr-popup__licensee">${p.licensee ? esc(p.licensee) : '<em>Unknown licensee</em>'}</p>
  <dl class="wtr-popup__details">${basePopupRows(p)}</dl>
  <span class="wtr-popup__badge wtr-popup__badge--link">P2P Fixed Link</span>
  ${jumpButtons}
  <a class="wtr-popup__wtr-link" href="${esc(wtrUrl(licNo))}" target="_blank" rel="noopener noreferrer">View on Ofcom WTR ↗</a>
</div>`
}

function FilterSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <>
      <label className="wtr-filter-panel__label" htmlFor={id}>
        {label}
      </label>
      <select id={id} className="wtr-filter-panel__input" value={value} onChange={e => onChange(e.target.value)}>
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  )
}

export {
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
}
