export default async function getStreetworksDataPointDetails(se_id: string, phase_id: string) {
  const url = new URL(`https://api-gb.one.network/map/callout/streetwork`)
  const params = url.searchParams

  params.append('historicWorks', 'false')
  params.append('id', se_id)
  params.append('phase_id', phase_id)
  params.append('mode', 'v7')
  params.append('lang', 'en-GB')
  params.append('_', new Date().getTime().toString())

  let response: Response
  try {
    response = await fetch(url.toString())
  } catch {
    return undefined
  }

  const json = await response.json()

  return json
}
