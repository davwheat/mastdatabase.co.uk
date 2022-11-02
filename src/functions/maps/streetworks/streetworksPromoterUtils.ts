import { StreetworksDataPoint } from './getStreetworksDataPoints'

const DISABLED_PROMOTERS_LS_KEY = 'streetworksMapDisabledPromoters'

export interface IOneNetworkStreetworksPromoter {
  /**
   * Unique ID for each promoter
   */
  id: string
  /**
   * Name of the promoter to display to the user
   */
  name: string
  /**
   * Aliases to resolve to this promoter based on one.network's API response
   */
  aliases: string[]
  /**
   * Promoter category (what infrastructure they are responsible for)
   */
  category: 'Mobile network' | 'Fixed broadband' | 'Business broadband' | 'Street furniture'
  /**
   * Information for map marker icons
   */
  icon: {
    text: string
    type: string
  }
}

export const AllStreetworksPromoters: IOneNetworkStreetworksPromoter[] = [
  // Mobile networks
  {
    id: 'o2',
    name: 'O2',
    aliases: ['O2', '02', 'O 2', 'Telefonica', 'Telefónica'],
    category: 'Mobile network',
    icon: {
      text: 'O2',
      type: 'mobile',
    },
  },
  {
    id: 'vf',
    name: 'Vodafone',
    aliases: ['Vodafone'],
    category: 'Mobile network',
    icon: {
      text: 'VF',
      type: 'mobile',
    },
  },
  {
    id: 'three',
    name: 'Three',
    aliases: ['Three'],
    category: 'Mobile network',
    icon: {
      text: '3',
      type: 'mobile',
    },
  },
  {
    id: 'ee',
    name: 'EE',
    aliases: ['EE'],
    category: 'Mobile network',
    icon: {
      text: 'EE',
      type: 'mobile',
    },
  },
  {
    id: 'mbnl',
    name: 'Mobile Broadband Network Limited',
    aliases: ['MBNL'],
    category: 'Mobile network',
    icon: {
      text: 'MBNL',
      type: 'mobile',
    },
  },
  {
    id: 'ctil',
    name: 'Cornerstone Networks',
    aliases: ['Cornerstone', 'CTIL'],
    category: 'Mobile network',
    icon: {
      text: 'CTIL',
      type: 'mobile',
    },
  },

  // Fixed broadband
  {
    id: 'bt',
    name: 'BT',
    aliases: ['BT', 'British Telecom'],
    category: 'Fixed broadband',
    icon: {
      text: 'BT',
      type: 'bt',
    },
  },
  {
    id: 'or',
    name: 'Openreach',
    aliases: ['Openreach'],
    category: 'Fixed broadband',
    icon: {
      text: 'OR',
      type: 'bt',
    },
  },
  {
    id: 'virgin',
    name: 'Virgin Media',
    aliases: ['Virgin', 'Virgin Media'],
    category: 'Fixed broadband',
    icon: {
      text: 'VMED',
      type: 'vm',
    },
  },
  {
    id: 'cf',
    name: 'CityFibre',
    aliases: ['CityFibre', 'City Fibre', 'CityFibre Metro Networks Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'CTYF',
      type: 'cityfibre',
    },
  },
  {
    id: 'trooli',
    name: 'Trooli',
    aliases: ['Trooli'],
    category: 'Fixed broadband',
    icon: {
      text: 'TROO',
      type: 'trooli',
    },
  },
  {
    id: 'grain',
    name: 'Grain',
    aliases: ['Grain'],
    category: 'Fixed broadband',
    icon: {
      text: 'GRAI',
      type: 'grain',
    },
  },
  {
    id: 'ofnl',
    name: 'Open Fibre Networks Limited',
    aliases: [
      'Open Fibre Networks Limited',
      'Open Fibre Networks',
      'Open Fibre',
      'Independent Fibre Networks',
      'Independent Fibre',
      'Independent Fibre Networks Limited',
    ],
    category: 'Fixed broadband',
    icon: {
      text: 'OFNL',
      type: 'ofnl',
    },
  },
  {
    id: 'toob',
    name: 'TOOB',
    aliases: ['Toob'],
    category: 'Fixed broadband',
    icon: {
      text: 'TOOB',
      type: 'toob',
    },
  },
  {
    id: 'zzoomm',
    name: 'Zzoomm',
    aliases: ['Zzoomm'],
    category: 'Fixed broadband',
    icon: {
      text: 'ZOOM',
      type: 'zzoomm',
    },
  },
  {
    id: 'netomnia',
    name: 'Netomnia',
    aliases: ['Netomnia'],
    category: 'Fixed broadband',
    icon: {
      text: 'NOMN',
      type: 'netomnia',
    },
  },
  {
    id: 'fibrus',
    name: 'Fibrus Networks',
    aliases: ['fibrus networks'],
    category: 'Fixed broadband',
    icon: {
      text: 'FIB',
      type: 'fibrus',
    },
  },
  {
    id: 'hyperoptic',
    name: 'Hyperoptic',
    aliases: ['hyperoptic ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'HYPO',
      type: 'hyperoptic',
    },
  },
  {
    id: 'g-network',
    name: 'G. Network',
    aliases: ['g. network communications ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'G.N',
      type: 'gdotnetwork',
    },
  },
  {
    id: 'community-fibre',
    name: 'Community Fibre',
    aliases: ['community fibre limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'ComF',
      type: 'comm-fibre',
    },
  },
  {
    id: 'fibre-and-wireless',
    name: 'Fibre & Wireless',
    aliases: ['f & w networks ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'F&W',
      type: 'fibre-and-wireless',
    },
  },
  {
    id: 'swish',
    name: 'Swish Fibre',
    aliases: ['swish fibre ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'SWSH',
      type: 'swish',
    },
  },
  {
    id: 'giganet',
    name: 'Giganet',
    aliases: ['giganet'],
    category: 'Fixed broadband',
    icon: {
      text: 'GIGA',
      type: 'giganet',
    },
  },
  {
    id: 'box',
    name: 'Box Broadband',
    aliases: ['Box Broadband Ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'BOX',
      type: 'box',
    },
  },
  {
    id: 'lightningfibre',
    name: 'Lightning Fibre',
    aliases: ['Lightning Fibre'],
    category: 'Fixed broadband',
    icon: {
      text: 'LTNG',
      type: 'lightning-fibre',
    },
  },
  {
    id: 'fullfibre',
    name: 'Full Fibre',
    aliases: ['Full Fibre Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'FF',
      type: 'full-fibre',
    },
  },

  // Business broadband solutions
  {
    id: 'vorboss',
    name: 'Vorboss',
    aliases: ['vorboss ltd'],
    category: 'Business broadband',
    icon: {
      text: 'VORB',
      type: 'vorboss',
    },
  },
  {
    id: 'colt',
    name: 'CoL Telecomms',
    aliases: ['city of london telecomms'],
    category: 'Business broadband',
    icon: {
      text: 'COLT',
      type: 'colt',
    },
  },
  {
    id: 'neos',
    name: 'Neos Networks',
    aliases: ['neoscorp ltd'],
    category: 'Business broadband',
    icon: {
      text: 'NEOS',
      type: 'neos',
    },
  },
  {
    id: 'zayo',
    name: 'Zayo/Abovenet',
    aliases: ['abovenet communications uk ltd'],
    category: 'Business broadband',
    icon: {
      text: 'ZAYO',
      type: 'zayo',
    },
  },

  // Street furniture
  {
    id: 'new-world-payphones',
    name: 'New World Payphones',
    aliases: ['new world payphones ltd'],
    category: 'Street furniture',
    icon: {
      text: 'NWP',
      type: 'newworldpayphones',
    },
  },
]

export const promoterIds: string[] = AllStreetworksPromoters.map(x => x.id)

export const promoterAliases: Record<string, string[]> = AllStreetworksPromoters.reduce((acc, promoter) => {
  acc[promoter.id] = promoter.aliases
  return acc
}, {} as Record<string, string[]>)

export const promoterIcons: Record<string, L.DivIcon> = AllStreetworksPromoters.reduce((acc, promoter) => {
  acc[promoter.id] = createPromoterIcon(promoter.icon.text, promoter.icon.type)!
  return acc
}, {} as Record<string, L.DivIcon>)

export const promoterNames: Record<string, string> = AllStreetworksPromoters.reduce((acc, promoter) => {
  acc[promoter.id] = promoter.name
  return acc
}, {} as Record<string, string>)

function createPromoterIcon(
  iconText: IOneNetworkStreetworksPromoter['icon']['text'],
  type: IOneNetworkStreetworksPromoter['icon']['type'],
): L.DivIcon | null {
  // Mess is to fix Gatsby SSR issues, as this function is called
  // during the build process
  if (typeof window === 'undefined') return null

  const L = window.L as typeof import('leaflet')

  return L.divIcon({
    html: `<b>${iconText.toUpperCase()}</b><span></span>`,
    className: `network-icon network-icon__${type}`,
    iconSize: undefined,
    iconAnchor: [25, 28],
  })
}

function getPromoterId(dataPoint: StreetworksDataPoint): string | undefined {
  const name = dataPoint.promoter.toLowerCase()

  return Object.keys(promoterAliases).find(key => {
    const aliases = promoterAliases[key]
    return aliases.some((x: string) => name === x.toLowerCase())
  })
}

export function getPromoterIcon(dataPoint: StreetworksDataPoint) {
  return promoterIcons[getPromoterId(dataPoint)!]
}

export function getPromoterName(dataPoint: StreetworksDataPoint) {
  return promoterNames[getPromoterId(dataPoint)!]
}

export function isPromoterDataPoint(dataPoint: StreetworksDataPoint) {
  const id = getPromoterId(dataPoint)

  if (!id) return false

  const states = getPromoterStates()
  if (!states[id]) return false

  return true
}

export function getPromoterStates(): Record<string, boolean> {
  const promoterIdsByCategory: Record<string, string[]> = {}

  AllStreetworksPromoters.forEach(promoter => {
    promoterIdsByCategory[promoter.category] ||= []
    promoterIdsByCategory[promoter.category].push(promoter.id)
  })

  const strSetting = localStorage.getItem(DISABLED_PROMOTERS_LS_KEY)
  let arr: any[]

  try {
    arr = JSON.parse(strSetting ?? 'null')

    if (!Array.isArray(arr)) {
      throw new Error('Invalid disabled promoters value. Resetting...')
    }
  } catch {
    arr = []
    localStorage.setItem(DISABLED_PROMOTERS_LS_KEY, '[]')
  }

  return promoterIds.reduce((acc, curr) => {
    acc[curr] = !arr.includes(curr)
    return acc
  }, {} as Record<string, boolean>)
}

export function setPromoterState(promoterId: string, state: boolean) {
  const states = getPromoterStates()

  states[promoterId] = state

  const disabledIds = Object.entries(states)
    .map(([id, enabled]) => {
      if (!enabled) return id
      return null
    })
    .filter(x => x !== null)

  localStorage.setItem(DISABLED_PROMOTERS_LS_KEY, JSON.stringify(disabledIds))
}

export function setAllPromotersState(state: boolean) {
  if (state) {
    // Enable all
    localStorage.setItem(DISABLED_PROMOTERS_LS_KEY, '[]')
  } else {
    // Disable all
    localStorage.setItem(DISABLED_PROMOTERS_LS_KEY, JSON.stringify(promoterIds))
  }
}
