import type { ISite } from '@components/Maps/MasteDatabasenMap/JsonApi/Models'

export function mergeSites(sites: ISite[]): {
  id: string
  sites: ISite[]
}[] {
  const LatLngOperatorMap: Record<string, Map<string, ISite[]>> = {}

  sites.forEach(site => {
    const op = site.Operator()

    if (!op) return

    LatLngOperatorMap[op.id] ||= new Map<string, ISite[]>()

    const key = `${site.lat},${site.lon}`

    LatLngOperatorMap[op.id].set(key, (LatLngOperatorMap[op.id].get(key) || []).concat(site))
  })

  const mergedSites: { id: string; sites: ISite[] }[] = Object.values(LatLngOperatorMap)
    .map(opMap => {
      const arr = Array.from(opMap.values())
      return arr.map(sitesArrs => {
        return {
          id: sitesArrs.map(s => s.id).join(','),
          sites: sitesArrs,
        }
      })
    })
    .flat()

  return mergedSites
}
