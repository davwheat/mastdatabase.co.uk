type Networks = 'O2' | 'Vodafone' | 'EE' | 'Three'

interface Connectivity {
  '2G'?: ('GSM900' | 'GSM1800')[]
  '3G'?: ('UMTS900' | 'UMTS2100')[]
  '4G'?: ('B1' | 'B3' | 'B8' | 'B20' | 'B32' | 'B38' | 'B40')[]
  '5G'?: ('n1' | 'n3' | 'n7' | 'n8' | 'n20' | 'n28' | 'n38' | 'n40' | 'n77' | 'n78' | 'n258')[]
}

type OperatorConnectivity = {
  [key in Networks]: Connectivity
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

const StationSegmentsWithCoverage: CoverageGroup[] = [
  {
    groupName: 'Jubilee Line Extension',
    state: 'live',
    segments: [
      {
        section: 'Jubilee Line Extension - Canning Town to North Greenwich',
        startStationId: '940GZZLUCGT',
        endStationId: '940GZZLUNGW',
      },
      {
        section: 'Jubilee Line Extension - North Greenwich to Canary Wharf',
        startStationId: '940GZZLUNGW',
        endStationId: '940GZZLUCYF',
      },
      {
        section: 'Jubilee Line Extension - Canary Wharf to Canada Water',
        startStationId: '940GZZLUCYF',
        endStationId: '940GZZLUCWR',
      },
      {
        section: 'Jubilee Line Extension - Canada Water to Bermondsey',
        startStationId: '940GZZLUCWR',
        endStationId: '940GZZLUBMY',
      },
      {
        section: 'Jubilee Line Extension - Bermondsey to London Bridge',
        startStationId: '940GZZLUBMY',
        endStationId: '940GZZLULNB',
      },
      {
        section: 'Jubilee Line Extension - London Bridge to Southwark',
        startStationId: '940GZZLULNB',
        endStationId: '940GZZLUSWK',
      },
      {
        section: 'Jubilee Line Extension - Southwark to Waterloo',
        startStationId: '940GZZLUSWK',
        endStationId: '940GZZLUWLO',
      },
      {
        section: 'Jubilee Line Extension - Waterloo to Westminster',
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
        section: 'Central Line - Holland Park to Notting Hill Gate',
        startStationId: '940GZZLUHPK',
        endStationId: '940GZZLUNHG',
      },
      {
        section: 'Central Line - Notting Hill Gate to Queensway',
        startStationId: '940GZZLUNHG',
        endStationId: '940GZZLUQWY',
      },
    ],
  },
  {
    groupName: 'Northern Line',
    state: 'live',
    segments: [
      {
        section: 'Northern Line - Kentish Town to Tufnell Park',
        startStationId: '940GZZLUKSH',
        endStationId: '940GZZLUTFP',
      },
      {
        section: 'Northern Line - Tufnell Park to Archway',
        startStationId: '940GZZLUTFP',
        endStationId: '940GZZLUACY',
      },
    ],
  },
]

const StationCoverageMap: Record<string, { end: string; group: string; section: string }[]> = {}
const StationsWithCoverage: Set<string> = new Set()

StationSegmentsWithCoverage.forEach((group, groupNum) => {
  group.segments.forEach((segment, segmentNum) => {
    const segments = [segment.startStationId, segment.endStationId]
    segments.sort()

    StationCoverageMap[segments[0]] ||= []
    StationCoverageMap[segments[0]].push({ end: segments[1], group: group.groupName, section: segment.section })

    StationsWithCoverage.add(segments[0])
    StationsWithCoverage.add(segments[1])
  })
})

export function isLineSegmentCovered(startSid: string, endSid: string): boolean {
  return !!getLineSegmentCoverage(startSid, endSid)
}

export function getLineSegmentCoverage(startSid: string, endSid: string): { group: string; section: string } | null {
  const segments = [startSid, endSid]
  segments.sort()

  const coveredSegments = StationCoverageMap[segments[0]]

  return coveredSegments?.find(seg => seg.end === segments[1]) ?? null
}

export function doesStationHaveCoverage(sid: string): boolean {
  return StationsWithCoverage.has(sid)
}
