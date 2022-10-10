import React from 'react'

export type ICoverageLayer = {
  label: string
  hidden?: true
} & ({ url: string } | { layers: React.ReactChild })

export interface ISiteItem {
  lat: number
  long: number
  id: string
}

export interface ICoverageLayerKey {
  key: { color: string; label: string }[]
}

export default abstract class CoverageProvider {
  abstract providerName: string
  abstract defaultLayerId: number
  abstract supportsSites: boolean

  abstract getLayers(): ICoverageLayer[]
  abstract getLayerKeys(): ICoverageLayerKey[]
  abstract getPageMessages(): string[]

  validate() {
    if (this.getLayers().length !== this.getLayerKeys().length) {
      throw new Error('Number of layers and layer keys must match')
    }
  }

  isLayerHidden(layerId: number): boolean {
    return !!this.getLayers()[layerId].hidden && window.location.search !== '?hidden'
  }

  async getSites(centreLat: number, centreLon: number, bbox: L.LatLngBounds): Promise<ISiteItem[]> {
    return []
  }

  attributionTemplate(layerLabel: string): string {
    return `© ${layerLabel} coverage info from ${this.providerName}`
  }
}
