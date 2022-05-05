import type * as Leaflet from 'leaflet'

declare type ValuesOf<T extends readonly unknown[]> = T[number]

// declare var globalVar: mytype

declare global {
  interface Window {
    L: typeof Leaflet
  }
}
