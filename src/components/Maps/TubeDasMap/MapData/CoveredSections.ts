export type Networks = 'O2' | 'Vodafone' | 'EE' | 'Three'

interface Connectivity {
  '2G'?: ('G09' | 'G18')[]
  '3G'?: ('U09' | 'U21')[]
  '4G'?: ('B1' | 'B3' | 'B7' | 'B8' | 'B20' | 'B32' | 'B38' | 'B40')[]
  '5G'?: ('n1' | 'n3' | 'n7' | 'n8' | 'n20' | 'n28' | 'n38' | 'n40' | 'n77' | 'n78' | 'n258')[]
}

export type OperatorConnectivity = {
  [key in Networks]?: Connectivity
}

interface StationCoverageInfo {
  state: 'live' | 'planned'
  coverage: OperatorConnectivity
  coverageNotes?: string[]
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
}

const CoveragePresets: Record<'tunnels' | 'station', Record<Networks, Record<string, Connectivity>>> = {
  tunnels: {
    EE: {
      normal: {
        '2G': ['G18'],
        '3G': [],
        '4G': ['B1', 'B3', 'B3', 'B20'],
        '5G': ['n28'],
      },
      jle: {
        '2G': ['G18'],
        '3G': [],
        '4G': ['B1', 'B3'],
        '5G': [],
      },
    },
    Three: {
      normal: {
        '2G': [],
        '3G': [],
        '4G': ['B1', 'B3'],
        '5G': [],
      },
      jle: {
        '2G': [],
        // '3G': [],
        '4G': ['B1', 'B3'],
        '5G': [],
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
        // '2G': [],
        '3G': ['U09'],
        '4G': ['B20'],
        '5G': [],
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
        // '2G': [],
        // '3G': [],
        '4G': ['B20', 'B8'],
        '5G': [],
      },
    },
  },
  station: {
    EE: {
      no_5g: {
        '2G': ['G18'],
        '3G': [],
        '4G': ['B1', 'B3', 'B3', 'B7', 'B7'],
        '5G': [],
      },
      with_5g: {
        '2G': ['G18'],
        '3G': [],
        '4G': ['B1', 'B3', 'B3', 'B7', 'B7'],
        '5G': ['n78', 'n78'],
      },
      jle: {
        '2G': ['G18'],
        '3G': [],
        '4G': ['B1', 'B3', 'B7', 'B7'],
        '5G': [],
      },
    },
    Three: {
      no_5g: {
        '2G': [],
        '3G': [],
        '4G': ['B1', 'B3'],
        '5G': [],
      },
      with_5g: {
        '2G': [],
        '3G': [],
        '4G': ['B1', 'B3'],
        '5G': ['n78', 'n78'],
      },
      jle: {
        '2G': [],
        // '3G': [],
        '4G': ['B1', 'B3'],
        '5G': [],
      },
    },
    O2: {
      with_5g: {
        '2G': ['G18'],
        '3G': [],
        '4G': ['B1', 'B20', 'B40', 'B40'],
        '5G': ['n78'],
      },
      no_5g: {
        '2G': ['G18'],
        '3G': [],
        '4G': ['B1', 'B20', 'B40', 'B40'],
        '5G': [],
      },
      jle: {
        // '2G': [],
        '3G': [],
        '4G': ['B1', 'B20', 'B40', 'B40'],
        '5G': [],
      },
    },
    Vodafone: {
      no_5g: {
        '2G': ['G09'],
        '3G': ['U21'],
        '4G': ['B1', 'B3', 'B7'],
        '5G': [],
      },
      with_5g: {
        '2G': ['G09'],
        '3G': ['U21'],
        '4G': ['B1', 'B3', 'B7'],
        '5G': ['n78', 'n78'],
      },
      jle: {
        // '2G': [],
        // '3G': [],
        '4G': ['B1', 'B7', 'B8', 'B20'],
        '5G': [],
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
      },
      {
        section: 'Heathrow Terminals 2 & 3 to Heathrow Terminal 5',
        startStationId: '910GHTRWAPT',
        endStationId: '910GHTRWTM5',
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
        section: 'Kentish Town to Tufnell Park',
        startStationId: '940GZZLUKSH',
        endStationId: '940GZZLUTFP',
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
    opens: 'Summer 2023',
    segments: [
      {
        section: 'Oxford Circus to Tottenham Court Road',
        startStationId: '940GZZLUOXC',
        endStationId: '940GZZLUTCR',
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
    opens: 'Summer 2023',
    segments: [
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
        section: 'Euston to Mornington Crescent',
        startStationId: '940GZZLUEUS',
        endStationId: '940GZZLUMTC',
      },
      {
        section: 'Mornington Crescent to Camden Town',
        startStationId: '940GZZLUMTC',
        endStationId: '940GZZLUCTN',
      },
      {
        section: 'Camden Town to Kentish Town',
        startStationId: '940GZZLUCTN',
        endStationId: '940GZZLUKSH',
      },
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
    ],
  },
]

const StationCoverageInfo: Record<string, StationCoverageInfo> = {
  // #region Northern Line
  // #region Northern Line, Kentish Branch
  // Kentish Town
  '940GZZLUKSH': {
    state: 'live',
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
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // #endregion

  // Camden Town
  '940GZZLUCTN': {
    state: 'live',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Mornington Crescent
  '940GZZLUMTC': {
    state: 'planned',
    coverage: {
      Three: CoveragePresets.station.Three.with_5g,
    },
    coverageNotes: ['Three is present, but disabled to the public.'],
  },
  // Euston
  '940GZZLUEUS': {
    state: 'planned',
    coverage: {},
  },
  // Warren Street
  '940GZZLUWRR': {
    state: 'planned',
    coverage: {},
  },
  // Goodge Street
  '940GZZLUGDG': {
    state: 'planned',
    coverage: {},
  },
  // Tottenham Court Road
  '940GZZLUTCR': {
    state: 'planned',
    coverage: {},
  },
  // #endregion

  // #region Chalk Farm branch
  // Chalk Farm
  '940GZZLUCFM': {
    state: 'planned',
    coverage: {},
  },
  // Belsize Park
  '940GZZLUBZP': {
    state: 'planned',
    coverage: {},
  },
  // Hampstead
  '940GZZLUHTD': {
    state: 'planned',
    coverage: {},
  },

  // #region Central Line
  // Queensway
  '940GZZLUQWY': {
    state: 'live',
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
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Holland Park
  '940GZZLUHPK': {
    state: 'live',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
    },
  },

  // Oxford Circus
  '940GZZLUOXC': {
    state: 'planned',
    coverage: {},
  },
  // Tottenham Court Road
  '940GZZLUTCR': {
    state: 'planned',
    coverage: {},
  },
  // Holborn
  '940GZZLUHBN': {
    state: 'planned',
    coverage: {},
  },
  // Chancery Lane
  '940GZZLUCHL': {
    state: 'planned',
    coverage: {},
  },
  // St Pauls
  '940GZZLUSPU': {
    state: 'planned',
    coverage: {},
  },
  // Bank
  '940GZZLUBNK': {
    state: 'planned',
    coverage: {},
  },
  // #endregion

  // #region Jubilee Line Extension
  // Westminster
  '940GZZLUWSM': {
    state: 'live',
    coverage: JleStations,
  },
  // Waterloo
  '940GZZLUWLO': {
    state: 'live',
    coverage: JleStations,
  },
  // Southwark
  '940GZZLUSWK': {
    state: 'live',
    coverage: JleStations,
  },
  // London Bridge
  '940GZZLULNB': {
    state: 'live',
    coverage: JleStations,
  },
  // Bermondsey
  '940GZZLUBMY': {
    state: 'live',
    coverage: JleStations,
  },
  // Canada Water
  '940GZZLUCWR': {
    state: 'live',
    coverage: JleStations,
  },
  // Canary Wharf
  '940GZZLUCYF': {
    state: 'live',
    coverage: JleStations,
  },
  // North Greenwich
  '940GZZLUNGW': {
    state: 'live',
    coverage: JleStations,
  },
  // Canning Town
  '940GZZLUCGT': {
    state: 'live',
    coverage: JleStations,
  },
  // #endregion

  // #region Elizabeth Line - Heathrow Branch
  // Heathrow Terminals 2 & 3
  '940GZZLUHRC': {
    state: 'live',
    coverage: {},
  },
  // Heathrow Terminal 4
  '940GZZLUHR4': {
    state: 'live',
    coverage: {},
  },
  // Heathrow Terminal 5
  '940GZZLUHR5': {
    state: 'live',
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
