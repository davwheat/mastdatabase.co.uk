import { createResourceLibrary } from 'active-resource'

export const store = createResourceLibrary(
  'https://dk-api.mastdatabase.co.uk',
  // { headers: { Authorization: 'Bearer ...' } },
)
