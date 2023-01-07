import { sha512 } from 'hash-wasm'

import type { StreetworksDataPoint } from './getStreetworksDataPoints'

export async function streetworksDataPointToHash(point: StreetworksDataPoint): Promise<string> {
  const stringToHash = JSON.stringify(point)

  return await sha512(stringToHash)
}
