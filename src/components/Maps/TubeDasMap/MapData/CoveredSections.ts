export type Networks = 'O2' | 'Vodafone' | 'EE' | 'Three'

interface Connectivity {
  '2G'?: ('G09' | 'G18')[] | null
  '3G'?: ('U09' | 'U21')[] | null
  '4G'?: ('B1' | 'B3' | 'B7' | 'B8' | 'B20' | 'B32' | 'B38' | 'B40')[] | null
  '5G'?: ('n1' | 'n3' | 'n7' | 'n8' | 'n20' | 'n28' | 'n38' | 'n40' | 'n77' | 'n78' | 'n258')[] | null
}

export type OperatorConnectivity = {
  [key in Networks]?: Connectivity
}

interface StationCoverageInfo {
  state: 'live' | 'planned'
  coverage: OperatorConnectivity
  coverageNotes?: string[]
  opens?: string
}

interface CoverageGroup {
  groupName: string
  state: 'live' | 'planned'
  opens: string
  segments: CoverageSegment[]
}

interface CoverageSegment {
  section: string
  services?: OperatorConnectivity
  startStationId: string
  endStationId: string
  lineFilter?: string[]
  coverageNotes?: string[]
  opens?: string
}

export const CoveragePresets: Record<'tunnels' | 'station', Record<Networks, Record<string, Connectivity>>> = {
  tunnels: {
    EE: {
      normal: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B1', 'B3', 'B3', 'B20'],
        '5G': ['n28'],
      },
      jle: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B1', 'B3'],
        '5G': null,
      },
      hex: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B3', 'B20'],
        '5G': null,
      },
    },
    Three: {
      normal: {
        '2G': null,
        '3G': null,
        '4G': ['B1', 'B3'],
        '5G': null,
      },
      jle: {
        '2G': null,
        '3G': null,
        '4G': ['B1', 'B3'],
        '5G': null,
      },
      hex: {
        '2G': null,
        '3G': null,
        '4G': ['B3'],
        '5G': null,
      },
    },
    O2: {
      normal: {
        '2G': ['G18'],
        '3G': ['U09'],
        '4G': ['B1', 'B8', 'B20'],
        '5G': ['n28'],
      },
      jle: {
        '2G': null,
        '3G': ['U09'],
        '4G': ['B20'],
        '5G': null,
      },
      hex: {
        '2G': ['G09'],
        '3G': null,
        '4G': ['B3', 'B20'],
        '5G': null,
      },
    },
    Vodafone: {
      normal: {
        '2G': ['G09'],
        '3G': ['U21'],
        '4G': ['B1', 'B20', 'B3', 'B8'],
        '5G': ['n8'],
      },
      jle: {
        '2G': null,
        '3G': ['U09'],
        '4G': ['B20', 'B8'],
        '5G': null,
      },
      hex: {
        '2G': ['G09'],
        '3G': null,
        '4G': ['B3', 'B8', 'B20'],
        '5G': null,
      },
    },
  },
  station: {
    EE: {
      no_5g: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B1', 'B3', 'B3', 'B7', 'B7'],
        '5G': null,
      },
      with_5g: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B1', 'B3', 'B3', 'B7', 'B7'],
        '5G': ['n78', 'n78'],
      },
      jle: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B1', 'B3', 'B7', 'B7'],
        '5G': null,
      },
      hex: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B3', 'B20'],
        '5G': null,
      },
    },
    Three: {
      no_5g: {
        '2G': null,
        '3G': null,
        '4G': ['B1', 'B3'],
        '5G': null,
      },
      with_5g: {
        '2G': null,
        '3G': null,
        '4G': ['B1', 'B3'],
        '5G': ['n78', 'n78'],
      },
      jle: {
        '2G': null,
        '3G': null,
        '4G': ['B1', 'B3'],
        '5G': null,
      },
      hex: {
        '2G': null,
        '3G': ['U21', 'U21'],
        '4G': ['B3'],
        '5G': null,
      },
    },
    O2: {
      with_5g: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B1', 'B20', 'B40', 'B40'],
        '5G': ['n78'],
      },
      no_5g: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B1', 'B20', 'B40', 'B40'],
        '5G': null,
      },
      jle: {
        '2G': null,
        '3G': ['U09', 'U21', 'U21'],
        '4G': ['B1', 'B20', 'B40', 'B40'],
        '5G': null,
      },
      hex: {
        '2G': ['G09'],
        '3G': ['U21'],
        '4G': ['B3', 'B20'],
        '5G': null,
      },
    },
    Vodafone: {
      no_5g: {
        '2G': ['G09'],
        '3G': ['U21'],
        '4G': ['B1', 'B3', 'B7'],
        '5G': null,
      },
      with_5g: {
        '2G': ['G09'],
        '3G': ['U21'],
        '4G': ['B1', 'B3', 'B7'],
        '5G': ['n78', 'n78'],
      },
      jle: {
        '2G': null,
        '3G': ['U09', 'U21'],
        '4G': ['B1', 'B7', 'B8', 'B20'],
        '5G': null,
      },
      hex: {
        '2G': ['G09'],
        '3G': ['U21'],
        '4G': ['B3', 'B7', 'B20'],
        '5G': null,
      },
    },
  },
}

const JleTunnels = {
  EE: CoveragePresets.tunnels.EE.jle,
  Three: CoveragePresets.tunnels.Three.jle,
  O2: CoveragePresets.tunnels.O2.jle,
  Vodafone: CoveragePresets.tunnels.Vodafone.jle,
}

const JleStations = {
  EE: CoveragePresets.station.EE.jle,
  Three: CoveragePresets.station.Three.jle,
  O2: CoveragePresets.station.O2.jle,
  Vodafone: CoveragePresets.station.Vodafone.jle,
}

const StationSegmentsWithCoverage: CoverageGroup[] = [
  {
    groupName: 'Jubilee Line Extension',
    state: 'live',
    opens: 'March 2020',
    segments: [
      {
        section: 'Canning Town to North Greenwich',
        startStationId: '940GZZLUCGT',
        endStationId: '940GZZLUNGW',
        services: JleTunnels,
      },
      {
        section: 'North Greenwich to Canary Wharf',
        startStationId: '940GZZLUNGW',
        endStationId: '940GZZLUCYF',
        services: JleTunnels,
      },
      {
        section: 'Canary Wharf to Canada Water',
        startStationId: '940GZZLUCYF',
        endStationId: '940GZZLUCWR',
        services: JleTunnels,
      },
      {
        section: 'Canada Water to Bermondsey',
        startStationId: '940GZZLUCWR',
        endStationId: '940GZZLUBMY',
        services: JleTunnels,
      },
      {
        section: 'Bermondsey to London Bridge',
        startStationId: '940GZZLUBMY',
        endStationId: '940GZZLULNB',
        services: JleTunnels,
      },
      {
        section: 'London Bridge to Southwark',
        startStationId: '940GZZLULNB',
        endStationId: '940GZZLUSWK',
        services: JleTunnels,
      },
      {
        section: 'Southwark to Waterloo',
        startStationId: '940GZZLUSWK',
        endStationId: '940GZZLUWLO',
        services: JleTunnels,
      },
      {
        section: 'Waterloo to Westminster',
        startStationId: '940GZZLUWLO',
        endStationId: '940GZZLUWSM',
        services: JleTunnels,
      },
    ],
  },
  {
    groupName: 'Heathrow Tunnels',
    state: 'live',
    opens: 'pre-2009',
    segments: [
      {
        section: 'Hayes & Harlington to Heathrow Terminals 2 & 3/4',
        startStationId: '910GHAYESAH',
        endStationId: '910GHTRWTM4',
        services: {
          EE: CoveragePresets.tunnels.EE.hex,
          Three: CoveragePresets.tunnels.Three.hex,
          O2: CoveragePresets.tunnels.O2.hex,
          Vodafone: CoveragePresets.tunnels.Vodafone.hex,
        },
      },
      {
        section: 'Heathrow Terminals 2 & 3 to Heathrow Terminal 5',
        startStationId: '910GHTRWAPT',
        endStationId: '910GHTRWTM5',
        services: {
          EE: CoveragePresets.tunnels.EE.hex,
          Three: CoveragePresets.tunnels.Three.hex,
          O2: CoveragePresets.tunnels.O2.hex,
          Vodafone: CoveragePresets.tunnels.Vodafone.hex,
        },
      },
    ],
  },
  {
    groupName: 'Central Line',
    state: 'live',
    opens: 'December 2022',
    segments: [
      {
        section: 'Holland Park to Notting Hill Gate',
        startStationId: '940GZZLUHPK',
        endStationId: '940GZZLUNHG',
        opens: 'December 2022',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Notting Hill Gate to Queensway',
        startStationId: '940GZZLUNHG',
        endStationId: '940GZZLUQWY',
        opens: 'December 2022',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Oxford Circus to Tottenham Court Road',
        startStationId: '940GZZLUOXC',
        endStationId: '940GZZLUTCR',
        opens: '8 September 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
    ],
  },
  {
    groupName: 'Northern Line',
    state: 'live',
    opens: 'January 2023',
    segments: [
      {
        section: 'Mornington Crescent to Camden Town',
        startStationId: '940GZZLUMTC',
        endStationId: '940GZZLUCTN',
        opens: 'late July 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Camden Town to Kentish Town',
        startStationId: '940GZZLUCTN',
        endStationId: '940GZZLUKSH',
        opens: 'late July 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Kentish Town to Tufnell Park',
        startStationId: '940GZZLUKSH',
        endStationId: '940GZZLUTFP',
        opens: 'January 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Tufnell Park to Archway',
        startStationId: '940GZZLUTFP',
        endStationId: '940GZZLUACY',
        opens: 'January 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
    ],
  },

  // UPCOMING
  {
    groupName: 'Central Line',
    state: 'planned',
    opens: 'by end of Spring 2024',
    segments: [
      {
        section: "White City to Shepherd's Bush",
        startStationId: '940GZZLUWCY',
        endStationId: '940GZZLUSBC',
      },
      {
        section: "Shepherd's Bush to Holland Park",
        startStationId: '940GZZLUSBC',
        endStationId: '940GZZLUHPK',
      },
      {
        section: 'Queensway to Lancaster Gate',
        startStationId: '940GZZLUQWY',
        endStationId: '940GZZLULGT',
      },
      {
        section: 'Lancaster Gate to Marble Arch',
        startStationId: '940GZZLULGT',
        endStationId: '940GZZLUMBA',
      },
      {
        section: 'Marble Arch to Bond Street',
        startStationId: '940GZZLUMBA',
        endStationId: '940GZZLUBND',
      },
      {
        section: 'Bond Street to Oxford Circus',
        startStationId: '940GZZLUBND',
        endStationId: '940GZZLUOXC',
      },
      {
        section: 'Tottenham Court Road to Holborn',
        startStationId: '940GZZLUTCR',
        endStationId: '940GZZLUHBN',
      },
      {
        section: 'Holborn to Chancery Lane',
        startStationId: '940GZZLUHBN',
        endStationId: '940GZZLUCHL',
      },
      {
        section: 'Chancery Lane to St Pauls',
        startStationId: '940GZZLUCHL',
        endStationId: '940GZZLUSPU',
      },
      {
        section: "St Paul's to Bank",
        startStationId: '940GZZLUSPU',
        endStationId: '940GZZLUBNK',
      },
    ],
  },
  {
    groupName: 'Northern Line',
    state: 'planned',
    opens: 'by end of Spring 2024',
    segments: [
      // Charing Cross branch
      {
        section: 'Tottenham Court Road to Goodge Street',
        startStationId: '940GZZLUTCR',
        endStationId: '940GZZLUGDG',
      },
      {
        section: 'Goodge Street to Warren Street',
        startStationId: '940GZZLUGDG',
        endStationId: '940GZZLUWRR',
      },
      {
        section: 'Warren Street to Euston',
        lineFilter: ['Northern'],
        startStationId: '940GZZLUWRR',
        endStationId: '940GZZLUEUS',
      },
      {
        section: 'Euston to Camden Town',
        startStationId: '940GZZLUEUS',
        endStationId: '940GZZLUCTN',
      },

      // Bank branch
      {
        section: 'Euston to Mornington Crescent',
        startStationId: '940GZZLUEUS',
        endStationId: '940GZZLUMTC',
      },
      {
        section: 'Mornington Crescent to Camden Town',
        startStationId: '940GZZLUMTC',
        endStationId: '940GZZLUCTN',
      },

      // Edgware branch
      {
        section: 'Camden Town to Chalk Farm',
        startStationId: '940GZZLUCTN',
        endStationId: '940GZZLUCFM',
      },
      {
        section: 'Chalk Farm to Belsize Park',
        startStationId: '940GZZLUCFM',
        endStationId: '940GZZLUBZP',
      },
      {
        section: 'Belsize Park to Hampstead',
        startStationId: '940GZZLUBZP',
        endStationId: '940GZZLUHTD',
      },
      {
        section: 'Hampstead to Golders Green',
        startStationId: '940GZZLUHTD',
        endStationId: '940GZZLUGGN',
      },

      // High Barnet branch
      {
        section: 'Archway to Highgate',
        startStationId: '940GZZLUACY',
        endStationId: '940GZZLUHGT',
      },
      {
        section: 'Highgate to East Finchley',
        startStationId: '940GZZLUHGT',
        endStationId: '940GZZLUEFY',
      },
    ],
  },
  {
    groupName: 'Elizabeth line',
    state: 'planned',
    opens: 'by end of Spring 2024',
    segments: [
      // #region Core
      {
        section: 'Paddington to Bond Street',
        startStationId: '910GPADTLL',
        endStationId: '910GBONDST',
      },
      {
        section: 'Bond Street to Tottenham Court Road',
        startStationId: '910GBONDST',
        endStationId: '910GTOTCTRD',
      },
      {
        section: 'Tottenham Court Road to Farringdon',
        startStationId: '910GTOTCTRD',
        endStationId: '910GFNTLSR',
      },
      {
        section: 'Farringdon to Liverpool Street',
        startStationId: '910GFNTLSR',
        endStationId: '910GLIVSTLL',
      },
      {
        section: 'Liverpool Street to Whitechapel',
        startStationId: '910GLIVSTLL',
        endStationId: '910GWCHAPEL',
      },
      // #endregion

      // #region Shenfield branch
      {
        section: 'Whitechapel to Stratford',
        startStationId: '910GWCHAPEL',
        endStationId: '910GSTFD',
      },
      // #endregion

      // #region Abbey Wood branch
      {
        section: 'Whitechapel to Canary Wharf',
        startStationId: '910GWCHAPEL',
        endStationId: '910G950',
      },
      {
        section: 'Canary Wharf to Custom House',
        startStationId: '910G950',
        endStationId: '910GCUSTMHS',
      },
      {
        section: 'Custom House to Woolwich',
        startStationId: '910GCUSTMHS',
        endStationId: '910GWOLWXR',
      },
    ],
  },
  {
    groupName: 'Victoria Line',
    state: 'planned',
    opens: 'by end of Spring 2024',
    segments: [
      {
        section: 'Oxford Circus to Warren Street',
        startStationId: '940GZZLUOXC',
        endStationId: '940GZZLUWRR',
      },
      {
        section: 'Warren Street to Euston',
        lineFilter: ['Victoria'],
        startStationId: '940GZZLUWRR',
        endStationId: '940GZZLUEUS',
      },
    ],
  },
  {
    groupName: 'Piccadilly Line',
    state: 'planned',
    opens: 'by end of Spring 2024',
    segments: [
      {
        section: 'Russell Square to Holborn',
        startStationId: '940GZZLURSQ',
        endStationId: '940GZZLUHBN',
      },
      {
        section: 'Holborn to Covent Garden',
        startStationId: '940GZZLUHBN',
        endStationId: '940GZZLUCGN',
      },
    ],
  },
]

const StationCoverageInfo: Record<string, StationCoverageInfo> = {
  // #region Northern Line
  // #region Northern Line, High Barnet branch
  // Kentish Town
  '940GZZLUKSH': {
    state: 'live',
    opens: 'January 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
    },
  },
  // Tufnell Park
  '940GZZLUTFP': {
    state: 'live',
    opens: 'January 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Archway
  '940GZZLUACY': {
    state: 'live',
    opens: 'January 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Highgate
  '940GZZLUHGT': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // East Finchley
  '940GZZLUEFY': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // #endregion

  // #region Northern Line, Edgware/High Barnet meeting point
  // Camden Town
  '940GZZLUCTN': {
    state: 'live',
    opens: '6 June 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Mornington Crescent
  '940GZZLUMTC': {
    state: 'live',
    opens: '20 June 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Euston
  '940GZZLUEUS': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // #endregion

  // #region Northern Line, Bank branch
  // Warren Street
  '940GZZLUWRR': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Goodge Street
  '940GZZLUGDG': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Tottenham Court Road
  '940GZZLUTCR': {
    state: 'live',
    opens: '8 September 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // #endregion

  // #region Northern Line, Edgware branch
  // Chalk Farm
  '940GZZLUCFM': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Belsize Park
  '940GZZLUBZP': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Hampstead
  '940GZZLUHTD': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Golders Green
  '940GZZLUGGN': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // #endregion
  // #endregion

  // #region Central Line
  // White City
  '940GZZLUWCY': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Shepherd's Bush
  '940GZZLUSBC': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Holland Park
  '940GZZLUHPK': {
    state: 'live',
    opens: 'December 2022',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
    },
  },
  // Notting Hill Gate
  '940GZZLUNHG': {
    state: 'live',
    opens: 'December 2022',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Queensway
  '940GZZLUQWY': {
    state: 'live',
    opens: 'December 2022',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
    },
  },
  // Lancaster Gate
  '940GZZLULGT': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Marble Arch
  '940GZZLUMBA': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Bond Street
  '940GZZLUBND': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },

  // Oxford Circus
  '940GZZLUOXC': {
    state: 'live',
    opens: '8 September 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Tottenham Court Road included through Northern Line
  // Holborn
  '940GZZLUHBN': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Chancery Lane
  '940GZZLUCHL': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // St Pauls
  '940GZZLUSPU': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Bank
  '940GZZLUBNK': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // #endregion

  // #region Jubilee Line Extension
  // Westminster
  '940GZZLUWSM': {
    state: 'live',
    opens: 'March 2020',
    coverage: JleStations,
  },
  // Waterloo
  '940GZZLUWLO': {
    state: 'live',
    opens: 'March 2020',
    coverage: JleStations,
  },
  // Southwark
  '940GZZLUSWK': {
    state: 'live',
    opens: 'March 2020',
    coverage: JleStations,
  },
  // London Bridge
  '940GZZLULNB': {
    state: 'live',
    opens: 'March 2020',
    coverage: JleStations,
  },
  // Bermondsey
  '940GZZLUBMY': {
    state: 'live',
    opens: 'March 2020',
    coverage: JleStations,
  },
  // Canada Water
  '940GZZLUCWR': {
    state: 'live',
    opens: 'March 2020',
    coverage: JleStations,
  },
  // Canary Wharf
  '940GZZLUCYF': {
    state: 'live',
    opens: 'March 2020',
    coverage: JleStations,
  },
  // North Greenwich
  '940GZZLUNGW': {
    state: 'live',
    opens: 'March 2020',
    coverage: JleStations,
  },
  // Canning Town
  '940GZZLUCGT': {
    state: 'live',
    opens: 'March 2020',
    coverage: JleStations,
  },
  // #endregion

  // #region Elizabeth Line
  // #region Elizabeth Line - Heathrow Branch
  // Heathrow Terminals 2 & 3
  '940GZZLUHRC': {
    state: 'live',
    opens: 'pre-2009',
    coverage: {
      EE: CoveragePresets.station.EE.hex,
      Three: CoveragePresets.station.Three.hex,
      O2: CoveragePresets.station.O2.hex,
      Vodafone: CoveragePresets.station.Vodafone.hex,
    },
  },
  // Heathrow Terminal 4
  '940GZZLUHR4': {
    state: 'live',
    opens: 'pre-2009',
    coverage: {
      EE: CoveragePresets.station.EE.hex,
      Three: CoveragePresets.station.Three.hex,
      O2: CoveragePresets.station.O2.hex,
      Vodafone: CoveragePresets.station.Vodafone.hex,
    },
  },
  // Heathrow Terminal 5
  '940GZZLUHR5': {
    state: 'live',
    opens: 'pre-2009',
    coverage: {
      EE: CoveragePresets.station.EE.hex,
      Three: CoveragePresets.station.Three.hex,
      O2: CoveragePresets.station.O2.hex,
      Vodafone: CoveragePresets.station.Vodafone.hex,
    },
  },
  // #endregion

  // #region Elizabeth Line core
  // Paddington
  '910GPADTLL': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Bond Street
  '910GBONDST': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Tottenham Court Road
  '910GTOTCTRD': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Farringdon
  '910GFNTLSR': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Liverpool Street
  '910GLIVSTLL': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Whitechapel
  '910GWCHAPEL': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // #endregion

  // #region Elizabeth Line - Shenfield Branch
  // Stratford
  '910GSTFD': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // #endregion

  // #region Elizabeth Line - Abbey Wood Branch
  // Canary Wharf
  '910G950': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Custom House
  '910GCUSTMHS': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Woolwich
  '910GWOLWXR': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // #endregion

  // #region Victoria Line
  // Oxford Circus included through Central Line
  // Warren Street included through Northern Line
  // Euston included through Northern Line
  // #endregion

  // #region Piccadilly Line
  // Russell Square
  '940GZZLURSQ': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // Holborn included through Central Line
  // Covent Garden
  '940GZZLUCGN': {
    state: 'planned',
    opens: 'by end of Spring 2024',
    coverage: {},
  },
  // #endregion
}

interface StationCoverage {
  end: string
  group: string
  section: string
  coverage?: OperatorConnectivity
  state?: 'live' | 'planned'
  opens: string
  lineFilter?: string[]
  coverageNotes?: string[]
}

const StationCoverageMap: Record<string, StationCoverage[]> = {}
const StationsWithCoverage: Map<string, 'live' | 'planned'> = new Map()

export function getStationInfo(sid: string): Readonly<StationCoverageInfo> {
  return StationCoverageInfo[sid] ?? {}
}

StationSegmentsWithCoverage.forEach(group => {
  group.segments.forEach(segment => {
    const segments = [segment.startStationId, segment.endStationId]
    segments.sort()

    StationCoverageMap[segments[0]] ||= []
    StationCoverageMap[segments[0]].push({
      end: segments[1],
      group: group.groupName,
      section: segment.section,
      coverage: segment.services,
      state: group.state,
      opens: group.opens,
      lineFilter: segment.lineFilter,
      coverageNotes: segment.coverageNotes,
    })

    if (StationsWithCoverage.get(segments[0]) !== 'live') {
      StationsWithCoverage.set(segments[0], group.state)
    }

    if (StationsWithCoverage.get(segments[1]) !== 'live') {
      StationsWithCoverage.set(segments[1], group.state)
    }
  })
})

export function isLineSegmentCovered(startSid: string, endSid: string, lines?: string[]): 'live' | 'planned' | 'none' {
  return getLineSegmentCoverage(startSid, endSid, lines)?.state || 'none'
}

export function getLineSegmentCoverage(startSid: string, endSid: string, lines?: string[]): StationCoverage | null {
  const segments = [startSid, endSid]
  segments.sort()

  const coveredSegments = StationCoverageMap[segments[0]]

  return (
    coveredSegments?.find(seg => {
      if (seg.end !== segments[1]) return false

      if (seg.lineFilter && lines) {
        if (!lines.some(line => seg.lineFilter?.includes(line))) return false
      }

      return true
    }) ?? null
  )
}

export function doesStationHaveCoverage(sid: string): 'live' | 'planned' | 'none' {
  return sid in StationCoverageInfo ? StationCoverageInfo[sid].state : 'none'
}
