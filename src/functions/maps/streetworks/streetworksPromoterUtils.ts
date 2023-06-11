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
  category:
    | 'Mobile network'
    | 'Fixed broadband'
    | 'Fixed wireless access'
    | 'Business broadband'
    | 'Street furniture'
    | 'Telecoms infrastructure'
  /**
   * Information for map marker icons
   */
  icon: {
    text: string
    type: string
  }
}

// Using data from https://portal-gb.one.network/prd-portal-one-network/json/settings.cfc?method=get&lang=en-GB&siteCode=v7&lang=en-GB
export const AllStreetworksPromoters: IOneNetworkStreetworksPromoter[] = [
  // Mobile networks
  {
    id: 'o2',
    name: 'O2',
    aliases: ['O2 (UK) Limited'],
    category: 'Mobile network',
    icon: {
      text: 'O2',
      type: 'mobile',
    },
  },
  {
    id: 'vf',
    name: 'Vodafone',
    aliases: ['Vodafone', 'Vodafone Group'],
    category: 'Mobile network',
    icon: {
      text: 'VF',
      type: 'mobile',
    },
  },
  {
    id: 'three',
    name: 'Three',
    aliases: ['Three UK', 'Hutchison 3G Ltd', 'Hutchinson Microtel'],
    category: 'Mobile network',
    icon: {
      text: '3',
      type: 'mobile',
    },
  },
  // {
  //   id: 'ee',
  //   name: 'EE',
  //   aliases: ['EE', 'EE Limited'],
  //   category: 'Mobile network',
  //   icon: {
  //     text: 'EE',
  //     type: 'mobile',
  //   },
  // },
  {
    id: 'mbnl',
    name: 'EE (Everything Everywhere)',
    aliases: ['MBNL', 'Orange PCS LTD', 'T-Mobile (UK) Limited'],
    category: 'Mobile network',
    icon: {
      text: 'EE',
      type: 'mobile',
    },
  },
  {
    id: 'ctil',
    name: 'CTIL (O2/VF)',
    aliases: ['CTIL', 'Cornerstone Telecommunications Infrastructure Limited', 'Cornerstone Telecommunications Infrastru'],
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
    aliases: ['Virgin Media'],
    category: 'Fixed broadband',
    icon: {
      text: 'VMED',
      type: 'vm',
    },
  },
  {
    id: 'cf',
    name: 'CityFibre',
    aliases: ['CityFibre', 'CityFibre Metro Networks Limited', 'CityFibre Metro Networks Ltd'],
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
    aliases: ['Grain', 'Grain Connect', 'Grain Communications Ltd', 'Grain Communications Ltd__1822'],
    category: 'Fixed broadband',
    icon: {
      text: 'GRAI',
      type: 'grain',
    },
  },
  {
    id: 'ofnl',
    name: 'Open Fibre Networks Limited',
    aliases: ['Open Fibre Networks Limited', 'Open Fibre Networks', 'Independent Fibre Networks'],
    category: 'Fixed broadband',
    icon: {
      text: 'OFNL',
      type: 'ofnl',
    },
  },
  {
    id: 'toob',
    name: 'TOOB',
    aliases: ['TOOB', 'TOOB Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'TOOB',
      type: 'toob',
    },
  },
  {
    id: 'zzoomm',
    name: 'Zzoomm',
    aliases: ['Zzoomm', 'Zzoomm PLC'],
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
    aliases: ['Fibrus Networks', 'Fibrus Networks Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'FIB',
      type: 'fibrus',
    },
  },
  {
    id: 'hyperoptic',
    name: 'Hyperoptic',
    aliases: ['Hyperoptic', 'Hyperoptic Ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'HYPO',
      type: 'hyperoptic',
    },
  },
  {
    id: 'g-network',
    name: 'G. Network',
    aliases: ['g. network communications', 'g. network communications ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'G.N',
      type: 'gdotnetwork',
    },
  },
  {
    id: 'community-fibre',
    name: 'Community Fibre',
    aliases: ['community fibre', 'community fibre limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'ComF',
      type: 'comm-fibre',
    },
  },
  {
    id: 'fibre-and-wireless',
    name: 'Fibre & Wireless',
    aliases: ['f&w networks'],
    category: 'Fixed broadband',
    icon: {
      text: 'F&W',
      type: 'fibre-and-wireless',
    },
  },
  {
    id: 'swish',
    name: 'Swish Fibre',
    aliases: ['swish fibre ltd', 'swish fibre', "people's fibre limited"],
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
    aliases: ['Box Broadband', 'Box Broadband Ltd'],
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
    aliases: ['Full Fibre', 'Full Fibre Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'FF',
      type: 'full-fibre',
    },
  },
  {
    id: 'midlandcablecomms',
    name: 'Midland Cable Comms',
    aliases: ['Midland Cable Comms'],
    category: 'Fixed broadband',
    icon: {
      text: 'MLCC',
      type: 'mlcc',
    },
  },
  {
    id: 'vx-fiber',
    name: 'VX Fiber',
    aliases: ['VX Fiber', 'VX Fiber Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'VX',
      type: 'vx-fiber',
    },
  },
  {
    id: 'encom-vm',
    name: 'Encom (Virgin Media)',
    aliases: ['Encom Cable TV & Comms'],
    category: 'Fixed broadband',
    icon: {
      text: 'ENCM',
      type: 'vm',
    },
  },
  {
    id: 'hampstead-fibre',
    name: 'Hampstead Fibre',
    aliases: ['Hampstead Fibre', 'Hampstead Fibre Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'HAMP',
      type: 'hampstead-fibre',
    },
  },
  {
    id: 'wightfibre',
    name: 'WightFibre',
    aliases: ['WightFibre'],
    category: 'Fixed broadband',
    icon: {
      text: 'WGHT',
      type: 'wightfibre',
    },
  },
  {
    id: 'c-w',
    name: 'Cable & Wireless',
    aliases: ['Cable and Wireless', 'Cable & Wireless UK', 'Mercury PCN'],
    category: 'Fixed broadband',
    icon: {
      text: 'C&W',
      type: 'cw',
    },
  },
  {
    id: 'telewest',
    name: 'Telewest Communications',
    aliases: ['Telewest Communications Group'],
    category: 'Fixed broadband',
    icon: {
      text: 'TELW',
      type: 'vm',
    },
  },
  {
    id: 'lit',
    name: 'Lit Fibre',
    aliases: ['Broadreach Networks', 'Broadreach Networks Limited', 'Lit Fibre Group Ltd', 'Lit Fibre'],
    category: 'Fixed broadband',
    icon: {
      text: 'LIT',
      type: 'lit',
    },
  },
  {
    id: 'gofibre',
    name: 'GoFibre',
    aliases: ['Borderlink Broadband', 'Borderlink Broadband Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'GOFB',
      type: 'gofibre',
    },
  },
  {
    id: 'cabletel',
    name: 'Cabletel',
    aliases: ['Cabletel'],
    category: 'Fixed broadband',
    icon: {
      text: 'CTEL',
      type: 'vm',
    },
  },
  {
    id: 'truespeed',
    name: 'Truespeed',
    aliases: ['Truespeed Communications', 'Truespeed Communications Ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'TRUE',
      type: 'truespeed',
    },
  },
  {
    id: 'ntl',
    name: 'NTL National Networks',
    aliases: ['Ntl National Networks', 'Ntl National Networks Ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'NTL',
      type: 'vm',
    },
  },
  {
    id: 'allpoints',
    name: 'Allpoints Fibre',
    aliases: ['Allpoints Fibre', 'Allpoints Fibre Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'ALLP',
      type: 'allpoints',
    },
  },
  {
    id: 'fibrespeed',
    name: 'Fibrespeed',
    aliases: ['Fibrespeed', 'Fibrespeed Ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'FSPD',
      type: 'fibrespeed',
    },
  },
  {
    id: 'tiger',
    name: 'Tiger Fibre',
    aliases: ['Tiger Fibre', 'Tiger Fibre Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'TIGR',
      type: 'tiger-fibre',
    },
  },
  {
    id: 'general-telecoms',
    name: 'General Telecommunications Ltd',
    aliases: ['General Telecommunications', 'General Telecommunications Ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'GENT',
      type: 'general-telecoms',
    },
  },
  {
    id: 'fibrewave',
    name: 'Fibrewave Networks',
    aliases: ['Fibrewave Networks', 'Fibrewave Networks Ltd', 'Fibre Wave Installations'],
    category: 'Fixed broadband',
    icon: {
      text: 'FWAV',
      type: 'fibrewave',
    },
  },
  {
    id: 'surf',
    name: 'National Grid Telecoms',
    aliases: ['Surf Telecoms'],
    category: 'Fixed broadband',
    icon: {
      text: 'NGRD',
      type: 'national-grid',
    },
  },
  {
    id: 'kingston-comms',
    name: 'KCOM',
    aliases: ['KCOM', 'Kingston Comms (Hull)'],
    category: 'Fixed broadband',
    icon: {
      text: 'KCOM',
      type: 'kingston-comms',
    },
  },
  {
    id: 'jurassic',
    name: 'Jurassic Fibre',
    aliases: ['Jurassic Fibre', 'Jurassic Fibre Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'JSSC',
      type: 'jurassic',
    },
  },
  {
    id: 'yesfibre',
    name: 'Yesfibre',
    aliases: ['Yesfibre', 'Yesfibre Ltd'],
    category: 'Fixed broadband',
    icon: {
      text: 'YES',
      type: 'yesfibre',
    },
  },
  {
    id: 'freedom-fibre',
    name: 'Freedom Fibre',
    aliases: ['Freedom Fibre', 'Freedom Fibre Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'FREE',
      type: 'freedom-fibre',
    },
  },
  {
    id: 'gigaclear',
    name: 'Gigaclear',
    aliases: ['Gigaclear'],
    category: 'Fixed broadband',
    icon: {
      text: 'GCLR',
      type: 'gigaclear',
    },
  },
  {
    id: 'ix-wireless',
    name: 'IX Wireless',
    aliases: ['IX Wireless', 'IX Wireless Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'IX W',
      type: 'ix-wireless',
    },
  },
  {
    id: 'brsk',
    name: 'BRSK Limited',
    aliases: ['BRSK', 'BRSK LIMITED'],
    category: 'Fixed broadband',
    icon: {
      text: 'BRSK',
      type: 'brsk',
    },
  },
  {
    id: 'wildanet',
    name: 'Wildanet',
    aliases: ['Wildanet'],
    category: 'Fixed broadband',
    icon: {
      text: 'WLDA',
      type: 'wildanet',
    },
  },

  // FWA
  {
    id: 'airband',
    name: 'Airband Community Internet',
    aliases: ['Airband Community Internet', 'Airband Community Internet Ltd'],
    category: 'Fixed wireless access',
    icon: {
      text: 'AIRB',
      type: 'airband',
    },
  },
  {
    id: 'stix',
    name: 'Stix Internet',
    aliases: ['Stix Internet', 'Stix Internet Limited'],
    category: 'Fixed wireless access',
    icon: {
      text: 'STIX',
      type: 'stix',
    },
  },

  // Infrastructure operators
  {
    id: 'arqiva',
    name: 'Arqiva',
    aliases: ['Arqiva', 'National Transcommunications', 'National Transcommunications Ltd'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'ARQ',
      type: 'arqiva',
    },
  },
  {
    id: 'cellnex',
    name: 'Cellnex',
    aliases: ['Cellnex', 'Cellnex (On Tower Uk Ltd)', 'Cellnex', 'Cellnex UK Limited'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'CLNX',
      type: 'cellnex',
    },
  },
  {
    id: 'arquiva-water',
    name: 'Arqiva - Smart Metering',
    aliases: ['Arqiva - Smart Metering'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'ARQW',
      type: 'arqiva',
    },
  },
  {
    id: 'eircom',
    name: 'Eircom (UK)',
    aliases: ['Eircom (UK)', 'Eircom (UK) Ltd'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'EIR',
      type: 'eircom',
    },
  },
  {
    id: 'my-fibre',
    name: 'My Fibre',
    aliases: ['My Fibre', 'My Fibre Limited'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'MY',
      type: 'my-fibre',
    },
  },
  {
    id: 'gtt',
    name: 'GTT Communications',
    aliases: ['Hibernia Networks', 'I-21 Holdings Ltd'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'GTT',
      type: 'gtt',
    },
  },
  {
    id: 'thales',
    name: 'Thales Group',
    aliases: ['Thales Group'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'THLS',
      type: 'thales',
    },
  },
  {
    id: 'openinfra',
    name: 'Open Infra',
    aliases: ['Open Infra', 'Open Infra Ltd'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'OINF',
      type: 'openinfra',
    },
  },
  {
    id: 'telcom',
    name: 'Telcom Infrastructure',
    aliases: ['Telcom Infrastructure', 'Telcom Infrastructure Limited', 'Telcom Infrastructure Ltd'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'TLCM',
      type: 'telcom',
    },
  },
  {
    id: 'optical-fibre-infra',
    name: 'Optical Fibre Infrastructure',
    aliases: ['Optical Fibre Infrastructure', 'Optical Fibre Infrastructure Limited'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'OFI',
      type: 'optical-fibre-infra',
    },
  },
  {
    id: 'eunetworks',
    name: 'euNetworks',
    aliases: ['euNetworks'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'EU',
      type: 'eunetworks',
    },
  },
  {
    id: 'fibre-guys',
    name: 'The Fibre Guys',
    aliases: ['The Fibre Guys', 'The Fibre Guys Ltd'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'FGUY',
      type: 'fibre-guys',
    },
  },
  {
    id: 'omne',
    name: 'Virgin Media (Omne Telecommunications)',
    aliases: ['Omne Telecommunications', 'Omne Telecommunications Ltd'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'OMNE',
      type: 'vm',
    },
  },
  {
    id: 'spring',
    name: 'Spring Fibre',
    aliases: ['Spring Fibre', 'Spring Fibre Limited'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'SPRN',
      type: 'spring-fibre',
    },
  },
  {
    id: 'verizon-business',
    name: 'Verizon',
    aliases: ['Verizon Business'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'VRZN',
      type: 'verizon',
    },
  },
  {
    id: 'tata',
    name: 'Tata Communications',
    aliases: [
      'VSNL Telecommunications (UK)',
      'VSNL Telecommunications (UK) Ltd',
      'Tata Communications (UK)',
      'Tata Communications (UK) Ltd',
      'Tata Communications (UK) Limited',
    ],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'TATA',
      type: 'tata',
    },
  },
  {
    id: 'next-gen-access',
    name: 'Next Gen Access Ltd',
    aliases: ['Next Gen Access', 'Next Gen Access Ltd'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'NGA',
      type: 'next-gen-access',
    },
  },
  {
    id: 'lumen-technologies',
    name: 'Lumen Technologies',
    aliases: ['Global Crossing (UK) Telecommunications'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'LUMN',
      type: 'lumen',
    },
  },
  {
    id: 'bai-comms',
    name: 'BAI Communications Limited',
    aliases: ['Bai Communications', 'Bai Communications Limited'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'BAI',
      type: 'bai',
    },
  },
  {
    id: 'digitalinfra',
    name: 'Digital Infrastructure',
    aliases: ['Digital Infrastructure'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'DNFR',
      type: 'digitalinfra',
    },
  },

  // Business broadband solutions
  {
    id: 'vorboss',
    name: 'Vorboss',
    aliases: ['vorboss', 'vorboss ltd'],
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
    id: 'exponential-e',
    name: 'Exponential-E',
    aliases: ['exponential-e', 'exponential-e limited'],
    category: 'Business broadband',
    icon: {
      text: 'EXPE',
      type: 'exponentiale',
    },
  },
  {
    id: 'neos',
    name: 'Neos Networks',
    aliases: ['neoscorp', 'neoscorp ltd'],
    category: 'Business broadband',
    icon: {
      text: 'NEOS',
      type: 'neos',
    },
  },
  {
    id: 'zayo',
    name: 'Zayo/Abovenet',
    aliases: ['abovenet communications uk', 'abovenet communications uk ltd'],
    category: 'Business broadband',
    icon: {
      text: 'ZAYO',
      type: 'zayo',
    },
  },
  {
    id: 'its-group',
    name: 'ITS Technology Group',
    aliases: ['ITS Technology Group'],
    category: 'Business broadband',
    icon: {
      text: 'ITS',
      type: 'its-group',
    },
  },
  {
    id: 'glide',
    name: 'Glide',
    aliases: ['Glide', 'Concept Solutions People', 'Concept Solutions People Ltd'],
    category: 'Business broadband',
    icon: {
      text: 'GLID',
      type: 'glide',
    },
  },
  {
    id: 'sky',
    name: 'Sky UK',
    aliases: ['sky uk'],
    category: 'Business broadband',
    icon: {
      text: 'SKY',
      type: 'sky_uk',
    },
  },

  // Street furniture
  {
    id: 'new-world-payphones',
    name: 'New World Payphones',
    aliases: ['new world payphones', 'new world payphones ltd'],
    category: 'Street furniture',
    icon: {
      text: 'NWP',
      type: 'newworldpayphones',
    },
  },
  {
    id: 'infolines',
    name: 'Infolines Public Networks Limited',
    aliases: ['Infolines Public Networks', 'Infolines Public Networks Limited'],
    category: 'Street furniture',
    icon: {
      text: 'INFO',
      type: 'infolines',
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
  return promoterIcons[getPromoterId(dataPoint)!] ?? createPromoterIcon('??', 'unknown')!
}

export function getPromoterName(dataPoint: StreetworksDataPoint) {
  return promoterNames[getPromoterId(dataPoint)!] ?? dataPoint.promoter ?? 'Unknown'
}

export function isPromoterDataPoint(dataPoint: StreetworksDataPoint) {
  const id = getPromoterId(dataPoint)

  if (!id) return true

  const states = getPromoterStates()
  if (id in states && !states[id]) return false

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
