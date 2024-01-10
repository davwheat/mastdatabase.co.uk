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
  abstract defaultLayerIndex: number
  abstract supportsSites: boolean
  abstract readonly supportsVersionHistory: VersionHistorySupported
  readonly maxZoom: number = 15

  protected abstract _getLayers(version: VersionHistorySupported extends true ? string : undefined): ICoverageLayer[]
  protected abstract _getLayerKeys(version: VersionHistorySupported extends true ? string : undefined): ICoverageLayerKey[]
  abstract getPageMessages(): string[]

  abstract readonly providerIcon: React.ReactNode

  protected abstract _version: VersionHistorySupported extends true ? string : undefined
  protected abstract readonly allVersions: VersionHistorySupported extends true ? Record<string, string> : undefined

  get version() {
    return this._version
  }

  public getCurrentVersion(): string {
    return this._version!
  }

  public getTilesVersions(): Record<string, string> {
    return { ...this.allVersions }
  }

  public setTilesVersion(version: string): boolean {
    if (this.supportsVersionHistory === false) {
      throw new Error("This provider doesn't support version history")
    }

    if (!Object.keys(this.allVersions!).includes(version)) {
      return false
    }

    ;(this._version as string) = version
    return true
  }

  validate() {
    if (this.supportsVersionHistory) {
      return Object.keys(this.getTilesVersions()).every(version => {
        // @ts-expect-error
        if (this._getLayers(version).length !== this._getLayerKeys(version).length) {
          throw new Error(`Number of layers and layer keys do not match for version ${version}`)
        }
      })
    } else {
      // @ts-expect-error
      if (this._getLayers(undefined).length !== this._getLayerKeys(undefined).length) {
        throw new Error(`Number of layers and layer keys do not match`)
      }

      return true
    }
  }

  isLayerHidden(layerId: number, forceHideHidden: boolean = false): boolean {
    if (!!this._getLayers(this._version)[layerId].hidden) {
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

  getLayers(): ICoverageLayer[] {
    return this._getLayers(this._version)
  }

  getLayerKeys(): ICoverageLayerKey[] {
    return this._getLayerKeys(this._version)
  }
}
