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
    aliases: ['O2 (UK)'],
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
    aliases: ['Three UK', 'Hutchison 3G', 'Hutchinson Microtel'],
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
    aliases: ['MBNL', 'Orange PCS', 'T-Mobile (UK)'],
    category: 'Mobile network',
    icon: {
      text: 'EE',
      type: 'mobile',
    },
  },
  {
    id: 'ctil',
    name: 'CTIL (O2/VF)',
    aliases: ['CTIL', 'Cornerstone Telecommunications Infrastructure', 'Cornerstone Telecommunications Infrastru'],
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
    aliases: ['BT', 'British Telecom', 'British Telecommunications'],
    category: 'Fixed broadband',
    icon: {
      text: 'BT',
      type: 'bt',
    },
  },
  {
    id: 'or',
    name: 'Openreach',
    aliases: ['Openreach',],
    category: 'Fixed broadband',
    icon: {
      text: 'OR',
      type: 'bt',
    },
  },
  {
    id: 'virgin',
    name: 'Virgin Media',
    aliases: ['Virgin Media', 'Virgin Media.__149'],
    category: 'Fixed broadband',
    icon: {
      text: 'VMED',
      type: 'vm',
    },
  },
  {
    id: 'cf',
    name: 'CityFibre',
    aliases: ['CityFibre', 'CityFibre Metro Networks', 'Cityfibre Holdings'],
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
    aliases: ['Grain', 'Grain Connect', 'Grain Communications', 'Grain Communications Ltd__1822'],
    category: 'Fixed broadband',
    icon: {
      text: 'GRAI',
      type: 'grain',
    },
  },
  {
    id: 'ofnl',
    name: 'Open Fibre Networks',
    aliases: ['Open Fibre Networks', 'Independent Fibre Networks',],
    category: 'Fixed broadband',
    icon: {
      text: 'OFNL',
      type: 'ofnl',
    },
  },
  {
    id: 'toob',
    name: 'TOOB',
    aliases: ['TOOB'],
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
    aliases: ['NETOMNIA LIMITED'],
    category: 'Fixed broadband',
    icon: {
      text: 'NOMN',
      type: 'netomnia',
    },
  },
  {
    id: 'fibrus',
    name: 'Fibrus Networks',
    aliases: ['Fibrus Networks'],
    category: 'Fixed broadband',
    icon: {
      text: 'FIB',
      type: 'fibrus',
    },
  },
  {
    id: 'hyperoptic',
    name: 'Hyperoptic',
    aliases: ['Hyperoptic'],
    category: 'Fixed broadband',
    icon: {
      text: 'HYPO',
      type: 'hyperoptic',
    },
  },
  {
    id: 'g-network', // todo: probably reundant now
    name: 'G. Network',
    aliases: ['g. network communications', 'G.NETWORK COMMUNICATIONS'],
    category: 'Fixed broadband',
    icon: {
      text: 'G.N',
      type: 'gdotnetwork',
    },
  },
  {
    id: 'community-fibre',
    name: 'Community Fibre',
    aliases: ['community fibre'],
    category: 'Fixed broadband',
    icon: {
      text: 'ComF',
      type: 'comm-fibre',
    },
  },
  {
    id: 'fibre-and-wireless',
    name: 'Fibre & Wireless',
    aliases: ['f&w networks', 'f & w networks'],
    category: 'Fixed broadband',
    icon: {
      text: 'F&W',
      type: 'fibre-and-wireless',
    },
  },
  {
    id: 'swish',
    name: 'Swish Fibre',
    aliases: ['swish fibre', 'swish fibre', "people's fibre"],
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
    aliases: ['Box Broadband'],
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
    id: 'lightspeed',
    name: 'LightSpeed Broadband',
    aliases: ['LIGHTSPEED NETWORKS'],
    category: 'Fixed broadband',
    icon: {
      text: 'LS',
      type: 'lightspeed',
    },
  },
  {
    id: 'fullfibre',
    name: 'Full Fibre',
    aliases: ['Full Fibre'],
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
    aliases: ['VX Fiber'],
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
    aliases: ['Hampstead Fibre'],
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
    aliases: ['Broadreach Networks', 'Lit Fibre Group', 'Lit Fibre'],
    category: 'Fixed broadband',
    icon: {
      text: 'LIT',
      type: 'lit',
    },
  },
  {
    id: 'gofibre',
    name: 'GoFibre',
    aliases: ['Borderlink Broadband'],
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
    aliases: ['Truespeed', 'Truespeed Communications', 'County Broadband'],
    category: 'Fixed broadband',
    icon: {
      text: 'TRUE',
      type: 'truespeed',
    },
  },
  {
    id: 'ntl',
    name: 'NTL National Networks',
    aliases: ['Ntl National Networks'],
    category: 'Fixed broadband',
    icon: {
      text: 'NTL',
      type: 'vm',
    },
  },
  {
    id: 'allpoints',
    name: 'Allpoints Fibre',
    aliases: ['Allpoints Fibre'],
    category: 'Fixed broadband',
    icon: {
      text: 'ALLP',
      type: 'allpoints',
    },
  },
  {
    id: 'fibrespeed',
    name: 'Fibrespeed',
    aliases: ['Fibrespeed'],
    category: 'Fixed broadband',
    icon: {
      text: 'FSPD',
      type: 'fibrespeed',
    },
  },
  {
    id: 'tiger',
    name: 'Tiger Fibre',
    aliases: ['Tiger Fibre'],
    category: 'Fixed broadband',
    icon: {
      text: 'TIGR',
      type: 'tiger-fibre',
    },
  },
  {
    id: 'general-telecoms',
    name: 'General Telecommunications Ltd',
    aliases: ['General Telecommunications'],
    category: 'Fixed broadband',
    icon: {
      text: 'GENT',
      type: 'general-telecoms',
    },
  },
  {
    id: 'fibrewave',
    name: 'Fibrewave Networks',
    aliases: ['Fibrewave Networks', 'Fibre Wave Installations'],
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
    aliases: ['KCOM', 'Kingston Comms (Hull)', 'KCOM Group'],
    category: 'Fixed broadband',
    icon: {
      text: 'KCOM',
      type: 'kcom',
    },
  },
  {
    id: 'jurassic',
    name: 'Jurassic Fibre',
    aliases: ['Jurassic Fibre'],
    category: 'Fixed broadband',
    icon: {
      text: 'JSSC',
      type: 'jurassic',
    },
  },
  {
    id: 'yesfibre',
    name: 'Yesfibre',
    aliases: ['Yesfibre'],
    category: 'Fixed broadband',
    icon: {
      text: 'YES',
      type: 'yesfibre',
    },
  },
  {
    id: 'freedom-fibre',
    name: 'Freedom Fibre',
    aliases: ['Freedom Fibre'],
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
    aliases: ['IX Wireless'],
    category: 'Fixed broadband',
    icon: {
      text: 'IX W',
      type: 'ix-wireless',
    },
  },
  {
    id: 'brsk',
    name: 'BRSK Limited',
    aliases: ['BRSK'],
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
  {
    id: 'ogi',
    name: 'Ogi',
    aliases: ['Ogi'],
    category: 'Fixed broadband',
    icon: {
      text: 'OGI',
      type: 'ogi',
    },
  },
  {
    id: 'borderlink',
    name: 'GoFibre (Borderlink Broadband)',
    aliases: ['Borderlink Broadband (Go Fibre)'],
    category: 'Fixed broadband',
    icon: {
      text: 'GO',
      type: 'borderlink',
    },
  },
  {
    id: 'b4rn',
    name: 'B4RN',
    aliases: ['Broadband for the Rural North Limited'],
    category: 'Fixed broadband',
    icon: {
      text: 'B4RN',
      type: 'b4rn',
    },
  },
  {
    id: 'quickline',
    name: 'Quickline Communications',
    aliases: ['Quickline Communications'],
    category: 'Fixed broadband',
    icon: {
      text: 'QLNE',
      type: 'quickline',
    },
  },
  {
    id: 'ms3',
    name: 'MS3 Networks',
    aliases: ['MS3 NETWORKS'],
    category: 'Fixed broadband',
    icon: {
      text: 'MS3',
      type: 'ms3',
    },
  },
  {
    id: 'connexin',
    name: 'Connexin',
    aliases: ['Connexin'],
    category: 'Fixed broadband',
    icon: {
      text: 'CNXN',
      type: 'connexin',
    },
  },
  {
    id: 'fibre-me',
    name: 'Upp (Fibre Me)',
    aliases: ['FIBRE ME'],
    category: 'Fixed broadband',
    icon: {
      text: 'UPP',
      type: 'fibre-me',
    },
  },
  {
    id: 'global-reach',
    name: 'Global Reach Networks',
    aliases: ['Global Reach Networks'],
    category: 'Fixed broadband',
    icon: { text: 'GRN', type: 'global-reach' },
  },
  {
    id: 'nexfibre',
    name: 'Nexfibre',
    aliases: ['Nexfibre', 'Nexfibre Networks'],
    category: 'Fixed broadband',
    icon: { text: 'NEX', type: 'nexfibre' },
  },
  {
    id: 'nynet',
    name: 'Nynet',
    aliases: ['Nynet'],
    category: 'Fixed broadband',
    icon: { text: 'NY', type: 'nynet' },
  },
  {
    id: 'voneus',
    name: 'Voneus',
    aliases: ['Voneus Broadband'],
    category: 'Fixed broadband',
    icon: { text: 'VONE', type: 'voneus' },
  },
  {
    id: 'wessex',
    name: 'Wessex Internet',
    aliases: [],
    category: 'Fixed broadband',
    icon: { text: "WESX", type: 'wessex' },
  },
  {
    id: 'runfibre',
    name: 'Runfibre',
    aliases: [],
    category: 'Fixed broadband',
    icon: { text: 'RUN', type: 'runfibre' }
  },

  // FWA
  {
    id: 'airband',
    name: 'Airband Community Internet',
    aliases: ['Airband Community Internet'],
    category: 'Fixed wireless access',
    icon: {
      text: 'AIRB',
      type: 'airband',
    },
  },
  {
    id: 'stix',
    name: 'Stix Internet',
    aliases: ['Stix Internet'],
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
    aliases: ['Arqiva', 'National Transcommunications'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'ARQ',
      type: 'arqiva',
    },
  },
  {
    id: 'cellnex',
    name: 'Cellnex',
    aliases: ['Cellnex', 'Cellnex (On Tower Uk Ltd)', 'Cellnex UK'],
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
    aliases: ['Eircom (UK)'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'EIR',
      type: 'eircom',
    },
  },
  {
    id: 'my-fibre',
    name: 'My Fibre',
    aliases: ['My Fibre'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'MY',
      type: 'my-fibre',
    },
  },
  {
    id: 'gtt',
    name: 'GTT Communications',
    aliases: ['GTT', 'Hibernia Networks', 'I-21 Holdings'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'GTT',
      type: 'gtt',
    },
  },
  {
    id: 'thales',
    name: 'Thales Group',
    aliases: ['Thales Group', 'Thales'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'THLS',
      type: 'thales',
    },
  },
  {
    id: 'openinfra',
    name: 'Open Infra',
    aliases: ['Open Infra'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'OINF',
      type: 'openinfra',
    },
  },
  {
    id: 'telcom',
    name: 'Telcom Infrastructure',
    aliases: ['Telcom Infrastructure'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'TLCM',
      type: 'telcom',
    },
  },
  {
    id: 'optical-fibre-infra',
    name: 'Optical Fibre Infrastructure',
    aliases: ['Optical Fibre Infrastructure'],
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
    aliases: ['The Fibre Guys'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'FGUY',
      type: 'fibre-guys',
    },
  },
  {
    id: 'omne',
    name: 'Virgin Media (Omne Telecommunications)',
    aliases: ['Omne Telecommunications'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'OMNE',
      type: 'vm',
    },
  },
  {
    id: 'spring',
    name: 'Spring Fibre',
    aliases: ['Spring Fibre'],
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
    aliases: ['VSNL Telecommunications (UK)', 'Tata Communications (UK)'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'TATA',
      type: 'tata',
    },
  },
  {
    id: 'next-gen-access',
    name: 'Next Gen Access',
    aliases: ['Next Gen Access'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'NGA',
      type: 'next-gen-access',
    },
  },
  {
    id: 'lumen-technologies',
    name: 'Lumen Technologies',
    aliases: ['Global Crossing (UK) Telecommunications', 'Global Crossing'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'LUMN',
      type: 'lumen',
    },
  },
  {
    id: 'bai-comms',
    name: 'BAI Communications Limited',
    aliases: ['Bai Communications'],
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
  {
    id: 'railsite',
    name: 'Railsite Telecom',
    aliases: ['Railsite Telecom'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'RAIL',
      type: 'railsite',
    },
  },
  {
    id: 'freshwave',
    name: 'Freshwave',
    aliases: ['Freshwave Facilities', 'Freshwave Services'],
    category: 'Telecoms infrastructure',
    icon: {
      text: 'FRSH',
      type: 'freshwave'
    }
  },

  // Business broadband solutions
  {
    id: 'vorboss',
    name: 'Vorboss',
    aliases: ['vorboss'],
    category: 'Business broadband',
    icon: {
      text: 'VORB',
      type: 'vorboss',
    },
  },
  {
    id: 'colt',
    name: 'CoL Telecomms',
    aliases: ['city of london telecomms', 'colt'],
    category: 'Business broadband',
    icon: {
      text: 'COLT',
      type: 'colt',
    },
  },
  {
    id: 'exponential-e',
    name: 'Exponential-E',
    aliases: ['exponential-e'],
    category: 'Business broadband',
    icon: {
      text: 'EXPE',
      type: 'exponentiale',
    },
  },
  {
    id: 'neos',
    name: 'Neos Networks',
    aliases: ['neoscorp'],
    category: 'Business broadband',
    icon: {
      text: 'NEOS',
      type: 'neos',
    },
  },
  {
    id: 'zayo',
    name: 'Zayo/Abovenet',
    aliases: ['abovenet communications uk'],
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
    aliases: ['Glide', 'Concept Solutions People', 'Glide Business'],
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
    aliases: ['new world payphones'],
    category: 'Street furniture',
    icon: {
      text: 'NWP',
      type: 'newworldpayphones',
    },
  },
  {
    id: 'infolines',
    name: 'Infolines Public Networks Limited',
    aliases: ['Infolines Public Networks'],
    category: 'Street furniture',
    icon: {
      text: 'INFO',
      type: 'infolines',
    },
  },
]

export const promoterIds: readonly string[] = AllStreetworksPromoters.map(p => p.id)
export const promoterAliases: Readonly<Record<string, string[]>> = Object.freeze(
  AllStreetworksPromoters.reduce<Record<string, string[]>>((acc, p) => {
    acc[p.id] = p.aliases
    return acc
  }, {}),
)
export const promoterNames: Readonly<Record<string, string>> = Object.freeze(
  AllStreetworksPromoters.reduce<Record<string, string>>((acc, p) => {
    acc[p.id] = p.name
    return acc
  }, {}),
)
export let promoterIcons: Record<string, L.DivIcon> = {}

const promoterLookup = new Map<string, string>()
let cachedPromoterStates: Record<string, boolean> | null = null

const BUSINESS_SUFFIXES = [
  'ltd', 'limited', 'plc', 'public limited company', 'llp',
  'uk', '(uk)'
];

function indexAlias(raw: string, promoterId: string): void {
  const key = raw.trim().toLowerCase()

  if (!promoterLookup.has(key)) {
    promoterLookup.set(key, promoterId)
  }

  for (const suffix of BUSINESS_SUFFIXES) {
    if (key.endsWith(suffix)) {
      const stripped = key.slice(0, -suffix.length).trimEnd()
      if (stripped.length > 0 && !promoterLookup.has(stripped)) {
        promoterLookup.set(stripped, promoterId)
      }
    }
  }
}

for (const promoter of AllStreetworksPromoters) {
  indexAlias(promoter.name, promoter.id)
  for (const alias of promoter.aliases) {
    indexAlias(alias, promoter.id)
  }
}

Object.freeze(promoterLookup)


function createPromoterIcon(
  iconText: IOneNetworkStreetworksPromoter['icon']['text'],
  type: IOneNetworkStreetworksPromoter['icon']['type'],
  promoterName: IOneNetworkStreetworksPromoter['name'],
): L.DivIcon | null {
  // Mess is to fix Gatsby SSR issues, as this function is called
  // during the build process
  if (typeof window === 'undefined' || typeof window.L === 'undefined') return null

  const L = window.L as typeof import('leaflet')

  return L.divIcon({
    html: `<span class="sr-only">${promoterName}</span><b aria-hidden="true">${iconText.toUpperCase()}</b><span></span>`,
    className: `network-icon network-icon__${type}`,
    iconSize: undefined,
    iconAnchor: [25, 28],
  })
}

let unknownIcon: L.DivIcon | null = null
function getUnknownIcon(): L.DivIcon {
  unknownIcon ??= createPromoterIcon('??', 'unknown', 'Unknown')
  return unknownIcon!
}

function ensureIconsInitialised(): void {
  if (Object.keys(promoterIcons).length > 0) return

  promoterIcons = AllStreetworksPromoters.reduce<Record<string, L.DivIcon>>(
    (acc, promoter) => {
      const icon = createPromoterIcon(promoter.icon.text, promoter.icon.type, promoter.name)
      if (icon) acc[promoter.id] = icon
      return acc
    },
    {},
  )
}

export function getPromoterId(dataPoint: StreetworksDataPoint): string | undefined {
  if (!dataPoint?.promoter) return undefined

  const key = dataPoint.promoter.trim().toLowerCase()

  // Exact match
  const exact = promoterLookup.get(key)
  if (exact !== undefined) return exact

  // O(1) - Check stripped name of unseen suffix not pre indexed
  for (const suffix of BUSINESS_SUFFIXES) {
    if (key.endsWith(suffix)) {
      const baseName = key.slice(0, -suffix.length).trim()
      const id = promoterLookup.get(baseName)
      if (id !== undefined) return id
    }
  }

  return undefined
}

export function getPromoterIcon(dataPoint: StreetworksDataPoint) {
  ensureIconsInitialised()
  const id = getPromoterId(dataPoint)
  return (id && promoterIcons[id]) ? promoterIcons[id] : getUnknownIcon()
}

export function getPromoterName(dataPoint: StreetworksDataPoint) {
  const id = getPromoterId(dataPoint)
  return id ? promoterNames[id] : (dataPoint.promoter ?? 'Unknown')
}

export function isPromoterDataPoint(dataPoint: StreetworksDataPoint) {
  const id = getPromoterId(dataPoint)
  if (!id) return true

  const states = getPromoterStates()

  return states[id] !== false
}

export function getPromoterStates(): Record<string, boolean> {
  // Return early using cached map
  if (cachedPromoterStates !== null) return cachedPromoterStates

  ensureIconsInitialised()

  let disabledIds: Set<string> | null = null

  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(DISABLED_PROMOTERS_LS_KEY) : null
    const parsed = JSON.parse(raw ?? 'null')

    if (!Array.isArray(parsed)) {
      throw new TypeError('expected json in localstorage')
    }

    disabledIds = new Set<string>(parsed)
  } catch {
    disabledIds = new Set<string>()
    _persistDisabledIds(disabledIds)
  }

  // build cache
  cachedPromoterStates = promoterIds.reduce<Record<string, boolean>>((acc, id) => {
    acc[id] = !disabledIds?.has(id)
    return acc
  }, {})

  return cachedPromoterStates

}

export function setPromoterState(promoterId: string, state: boolean) {
  const states = getPromoterStates()

  states[promoterId] = state

  const disabledIds = new Set(
    Object.keys(states).filter(id => !states[id]),
  )
  _persistDisabledIds(disabledIds)
}

export function setAllPromotersState(state: boolean) {
  const disabledIds = state
    ? new Set<string>()        // enable all = nothing disabled
    : new Set<string>(promoterIds) // disable all = everything disabled

  _persistDisabledIds(disabledIds)

  // Invalidate cache
  cachedPromoterStates = null;
}

function _persistDisabledIds(disabledIds: Set<string>): void {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(
    DISABLED_PROMOTERS_LS_KEY,
    JSON.stringify([...disabledIds]),
  );
}