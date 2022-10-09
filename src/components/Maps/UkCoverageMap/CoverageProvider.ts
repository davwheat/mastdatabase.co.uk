export interface ICoverageLayer {
  label: string
  url: string
  minZoom: number
  maxZoom: number
}

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
  abstract getSites(centreLat: number, centreLon: number, bbox: L.LatLngBounds): Promise<ISiteItem[]>

  attributionTemplate(layerLabel: string): string {
    return `© ${layerLabel} coverage info from ${this.providerName}`
  }
}
