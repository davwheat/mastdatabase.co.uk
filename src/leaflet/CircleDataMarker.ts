import type { CircleMarkerOptions, LatLngExpression } from 'leaflet'

const L: typeof import('leaflet') = typeof window === 'undefined' ? ({ CircleMarker: class dummy {} } as any) : window.L

export default class CircleDataMarker<T> extends L.CircleMarker {
  private _data: T

  constructor(latLng: LatLngExpression, data: T, options?: CircleMarkerOptions) {
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
