import React from 'react'

export type ICoverageLayer = {
  label: string
  hidden?: true
} & ({ url: string } | { layers: React.ReactNode })

export interface ISiteItem {
  lat: number
  long: number
  id: string
}

export interface ICoverageLayerKey {
  key: { color: string; label: string }[]
}

export default abstract class CoverageProvider<VersionHistorySupported extends boolean = false> {
  abstract providerName: string
  abstract defaultLayerId: number
  abstract supportsSites: boolean
  abstract readonly supportsVersionHistory: VersionHistorySupported

  abstract getLayers(): ICoverageLayer[]
  abstract getLayerKeys(): ICoverageLayerKey[]
  abstract getPageMessages(): string[]

  protected abstract version: VersionHistorySupported extends true ? string : never
  protected abstract readonly allVersions: VersionHistorySupported extends true ? Record<string, string> : never

  public getCurrentVersion(): string {
    return this.version
  }

  public getTilesVersions(): Record<string, string> {
    return { ...this.allVersions }
  }

  public setTilesVersion(version: string): boolean {
    if (this.supportsVersionHistory === false) {
      throw new Error("This provider doesn't support version history")
    }

    if (!Object.keys(this.allVersions).includes(version)) {
      return false
    }

    ;(this.version as string) = version
    return true
  }

  validate() {
    if (this.getLayers().length !== this.getLayerKeys().length) {
      throw new Error('Number of layers and layer keys must match')
    }
  }

  isLayerHidden(layerId: number, forceHideHidden: boolean = false): boolean {
    if (!!this.getLayers()[layerId].hidden) {
      // Hidden
      if (forceHideHidden) return true

      return typeof window === 'undefined' || window.location.search !== '?hidden'
    }

    return false
  }

  async getSites(centreLat: number, centreLon: number, bbox: L.LatLngBounds): Promise<ISiteItem[]> {
    return []
  }

  attributionTemplate(layerLabel: string): string {
    return `© ${layerLabel} coverage info from ${this.providerName}`
  }
}
