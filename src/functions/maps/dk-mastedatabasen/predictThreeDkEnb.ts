const NamePrefixToEnbPrefix: Record<string, string> = {
  /**
   * Sjælland - Copenhagen/Center
   */
  CC: '10',
  /**
   * Sjælland - South
   */
  CS: '11',
  /**
   * Sjælland - North
   */
  CN: '12',
  /**
   * Sjælland - West
   */
  CW: '13',
  /**
   * Bornholm
   */
  CE: '14',

  /**
   * Jylland - Center
   */
  JC: '20',
  /**
   * Jylland - South
   */
  JS: '21',
  /**
   * Jylland - North
   */
  JN: '22',
  /**
   * Jylland - West
   */
  JW: '23',
  /**
   * Jylland - East
   */
  JE: '24',
}

export function predictThreeDkEnb(stationName: string): string | null {
  const namePrefix = stationName.substring(0, 2)
  const splitNum = stationName.substring(2, 3)
  const stationNum = stationName.substring(3, 6)
  const siteVariant = stationName.substring(6, 7)

  const enbPrefix = NamePrefixToEnbPrefix[namePrefix]

  if (!enbPrefix) {
    return null
  }

  return `${enbPrefix}X${stationNum}`
}
