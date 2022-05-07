import type { LatLngExpression, MarkerOptions } from 'leaflet'

const L: typeof import('leaflet') = typeof window === 'undefined' ? ({ Marker: class dummy {} } as any) : window.L

export default class DataMarker<T> extends L.Marker {
  private _data: T

  constructor(latLng: LatLngExpression, data: T, options?: MarkerOptions) {
    super(latLng, options)
    this._data = data
  }

  get data(): T {
    return this._data
  }

  setData(data: T): this {
    this._data = data
    return this
  }
}
