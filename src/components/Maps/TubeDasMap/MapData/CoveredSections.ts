type Networks = 'O2' | 'Vodafone' | 'EE' | 'Three'

interface Connectivity {
  '2G'?: ('G09' | 'G18')[]
  '3G'?: ('U09' | 'U21')[]
  '4G'?: ('B1' | 'B3' | 'B7' | 'B8' | 'B20' | 'B32' | 'B38' | 'B40')[]
  '5G'?: ('n1' | 'n3' | 'n7' | 'n8' | 'n20' | 'n28' | 'n38' | 'n40' | 'n77' | 'n78' | 'n258')[]
}

type OperatorConnectivity = {
  [key in Networks]?: Connectivity
}

interface CoverageGroup {
  groupName: string
  state: 'live' | 'planned'
  segments: CoverageSegment[]
}

interface CoverageSegment {
  section: string
  services?: OperatorConnectivity
  startStationId: string
  endStationId: string
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
    },
    Three: {
      normal: {
        '2G': [],
        '3G': [],
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
    },
    Vodafone: {
      normal: {
        '2G': ['G09'],
        '3G': ['U21'],
        '4G': ['B1', 'B20'],
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
        '5G': ['n78'],
      },
    },
    O2: {
      normal: {
        '2G': ['G18'],
        '3G': [],
        '4G': ['B1', 'B40', 'B40'],
        '5G': ['n78'],
      },
    },
    Vodafone: {
      normal: {
        '2G': ['G09'],
        '3G': ['U21'],
        '4G': ['B1', 'B3', 'B7'],
      },
    },
  },
}

const StationSegmentsWithCoverage: CoverageGroup[] = [
  {
    groupName: 'Jubilee Line Extension',
    state: 'live',
    segments: [
      {
        section: 'Canning Town to North Greenwich',
        startStationId: '940GZZLUCGT',
        endStationId: '940GZZLUNGW',
      },
      {
        section: 'North Greenwich to Canary Wharf',
        startStationId: '940GZZLUNGW',
        endStationId: '940GZZLUCYF',
      },
      {
        section: 'Canary Wharf to Canada Water',
        startStationId: '940GZZLUCYF',
        endStationId: '940GZZLUCWR',
      },
      {
        section: 'Canada Water to Bermondsey',
        startStationId: '940GZZLUCWR',
        endStationId: '940GZZLUBMY',
      },
      {
        section: 'Bermondsey to London Bridge',
        startStationId: '940GZZLUBMY',
        endStationId: '940GZZLULNB',
      },
      {
        section: 'London Bridge to Southwark',
        startStationId: '940GZZLULNB',
        endStationId: '940GZZLUSWK',
      },
      {
        section: 'Southwark to Waterloo',
        startStationId: '940GZZLUSWK',
        endStationId: '940GZZLUWLO',
      },
      {
        section: 'Waterloo to Westminster',
        startStationId: '940GZZLUWLO',
        endStationId: '940GZZLUWSM',
      },
    ],
  },
  {
    groupName: 'Central Line',
    state: 'live',
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
]

const StationCoverageInfo: Record<string, OperatorConnectivity> = {
  // Kentish Town
  '940GZZLUKSH': {
    EE: CoveragePresets.station.EE.no_5g,
    Three: CoveragePresets.station.Three.normal,
    Vodafone: CoveragePresets.station.Vodafone.normal,
    O2: CoveragePresets.station.O2.normal,
  },
}

const StationCoverageMap: Record<string, { end: string; group: string; section: string; coverage: OperatorConnectivity }[]> = {}
const StationsWithCoverage: Set<string> = new Set()

export function getStationCoverageInfo(sid: string): Readonly<OperatorConnectivity> {
  return StationCoverageInfo[sid]
}

StationSegmentsWithCoverage.forEach((group, groupNum) => {
  group.segments.forEach((segment, segmentNum) => {
    const segments = [segment.startStationId, segment.endStationId]
    segments.sort()

    StationCoverageMap[segments[0]] ||= []
    StationCoverageMap[segments[0]].push({ end: segments[1], group: group.groupName, section: segment.section, coverage: segment.services })

    StationsWithCoverage.add(segments[0])
    StationsWithCoverage.add(segments[1])
  })
})

export function isLineSegmentCovered(startSid: string, endSid: string): boolean {
  return !!getLineSegmentCoverage(startSid, endSid)
}

export function getLineSegmentCoverage(
  startSid: string,
  endSid: string,
): { group: string; section: string; coverage: OperatorConnectivity } | null {
  const segments = [startSid, endSid]
  segments.sort()

  const coveredSegments = StationCoverageMap[segments[0]]

  return coveredSegments?.find(seg => seg.end === segments[1]) ?? null
}

export function doesStationHaveCoverage(sid: string): boolean {
  return StationsWithCoverage.has(sid)
}
