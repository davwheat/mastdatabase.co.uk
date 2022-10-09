import React from 'react'

export type ICoverageLayer = {
  label: string
  // minZoom: number
  // maxZoom: number
} & ({ url: string } | { layers: React.ReactChild })

export interface ISiteItem {
  lat: number
  long: number
  id: string
}

export default abstract class CoverageProvider {
  abstract providerName: string
  abstract defaultLayerId: number
  abstract supportsSites: boolean

  abstract getLayers(): ICoverageLayer[]

  async getSites(centreLat: number, centreLon: number, bbox: L.LatLngBounds): Promise<ISiteItem[]> {
    return []
  }

  attributionTemplate(layerLabel: string): string {
    return `© ${layerLabel} coverage info from ${this.providerName}`
  }
}
