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
      elizabeth: {
        '2G': ['G18'],
        '3G': null,
        '4G': ['B1', 'B3', 'B3', 'B20'],
        '5G': null,
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
      elizabeth: {
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
      elizabeth: {
        '2G': ['G18'],
        '3G': ['U09'],
        '4G': ['B1', 'B8', 'B20'],
        '5G': null,
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
        '3G': null,
        '4G': ['B1', 'B20', 'B3', 'B8'],
        '5G': ['n8'],
      },
      elizabeth: {
        '2G': ['G09'],
        '3G': null,
        '4G': ['B1', 'B20', 'B3', 'B8'],
        '5G': null,
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
        '3G': null,
        '4G': ['B1', 'B3', 'B7'],
        '5G': null,
      },
      with_5g: {
        '2G': ['G09'],
        '3G': null,
        '4G': ['B1', 'B3', 'B7'],
        '5G': ['n78', 'n78'],
      },
      jle: {
        '2G': null,
        '3G': null,
        '4G': ['B1', 'B7', 'B8', 'B20'],
        '5G': null,
      },
      hex: {
        '2G': ['G09'],
        '3G': null,
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
        section: 'Queensway to Lancaster Gate',
        startStationId: '940GZZLUQWY',
        endStationId: '940GZZLULGT',
        opens: 'February 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Lancaster Gate to Marble Arch',
        startStationId: '940GZZLULGT',
        endStationId: '940GZZLUMBA',
        opens: 'February 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Marble Arch to Bond Street',
        startStationId: '940GZZLUMBA',
        endStationId: '940GZZLUBND',
        opens: 'January 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Bond Street to Oxford Circus',
        startStationId: '940GZZLUBND',
        endStationId: '940GZZLUOXC',
        opens: 'November 2023',
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
      {
        section: 'Tottenham Court Road to Holborn',
        startStationId: '940GZZLUTCR',
        endStationId: '940GZZLUHBN',
        opens: 'November 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Holborn to Chancery Lane',
        startStationId: '940GZZLUHBN',
        endStationId: '940GZZLUCHL',
        opens: 'November 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: "Chancery Lane to St. Paul's",
        startStationId: '940GZZLUCHL',
        endStationId: '940GZZLUSPU',
        opens: 'December 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: "St. Paul's to Bank",
        startStationId: '940GZZLUSPU',
        endStationId: '940GZZLUBNK',
        opens: 'December 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: "Shepherd's Bush to Holland Park",
        startStationId: '940GZZLUSBC',
        endStationId: '940GZZLUHPK',
        opens: 'Winter 2024',
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
      // I'm sure this *was* live, but now it is not.
      // {
      //   section: 'Euston to Camden Town',
      //   startStationId: '940GZZLUEUS',
      //   endStationId: '940GZZLUCTN',
      //   opens: 'September 2023',
      //   services: {
      //     EE: CoveragePresets.tunnels.EE.normal,
      //     Three: CoveragePresets.tunnels.Three.normal,
      //     O2: CoveragePresets.tunnels.O2.normal,
      //     Vodafone: CoveragePresets.tunnels.Vodafone.normal,
      //   },
      // },
      {
        section: 'Euston to Mornington Crescent',
        startStationId: '940GZZLUEUS',
        endStationId: '940GZZLUMTC',
        opens: 'September 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
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
      {
        section: 'Archway to Highgate',
        startStationId: '940GZZLUACY',
        endStationId: '940GZZLUHGT',
        opens: 'Winter 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },

      // Edgware branch
      {
        section: 'Camden Town to Chalk Farm',
        startStationId: '940GZZLUCTN',
        endStationId: '940GZZLUCFM',
        opens: 'October 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Chalk Farm to Belsize Park',
        startStationId: '940GZZLUCFM',
        endStationId: '940GZZLUBZP',
        opens: 'October 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Belsize Park to Hampstead',
        startStationId: '940GZZLUBZP',
        endStationId: '940GZZLUHTD',
        opens: 'Winter 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },

      // Charing X branch
      {
        section: 'Leicester Square to Charing Cross',
        startStationId: '940GZZLULSQ',
        endStationId: '940GZZLUCHX',
        opens: 'Winter 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Charing Cross to Embankment',
        startStationId: '940GZZLUCHX',
        endStationId: '940GZZLUEMB',
        lineFilter: ['Northern'],
        opens: 'Winter 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Leicester Square to Tottenham Court Road',
        startStationId: '940GZZLULSQ',
        endStationId: '940GZZLUTCR',
        opens: 'February 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Tottenham Court Road to Goodge Street',
        startStationId: '940GZZLUTCR',
        endStationId: '940GZZLUGDG',
        opens: 'September 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Goodge Street to Warren Street',
        startStationId: '940GZZLUGDG',
        endStationId: '940GZZLUWRR',
        opens: 'October 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Warren Street to Euston',
        lineFilter: ['Northern'],
        startStationId: '940GZZLUWRR',
        endStationId: '940GZZLUEUS',
        opens: 'October 2023',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },

      // BPS branch
      {
        section: 'Kennington to Nine Elms',
        startStationId: '940GZZLUKNG',
        endStationId: '940GZZNEUGST',
        opens: 'late 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Nine Elms to Battersea Power Station',
        startStationId: '940GZZNEUGST',
        endStationId: '940GZZBPSUST',
        opens: 'late 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },

      // Morden branch
      {
        section: 'Kennington to Oval',
        startStationId: '940GZZLUKNG',
        endStationId: '940GZZLUOVL',
        opens: 'late 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },

      {
        section: 'Stockwell to Clapham North',
        startStationId: '940GZZLUSKW',
        endStationId: '940GZZLUCPN',
        opens: 'July 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Clapham North to Clapham Common',
        startStationId: '940GZZLUCPN',
        endStationId: '940GZZLUCPC',
        opens: 'Winter 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Clapham Common to Clapham South',
        startStationId: '940GZZLUCPC',
        endStationId: '940GZZLUCPS',
        opens: 'Winter 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Clapham South to Balham',
        startStationId: '940GZZLUCPS',
        endStationId: '940GZZLUBLM',
        opens: 'Winter 2024',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Balham to Tooting Bec',
        startStationId: '940GZZLUBLM',
        endStationId: '940GZZLUTBC',
        opens: 'July 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Tooting Bec to Tooting Broadway',
        startStationId: '940GZZLUTBC',
        endStationId: '940GZZLUTBY',
        opens: 'July 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Tooting Broadway to Colliers Wood',
        startStationId: '940GZZLUTBY',
        endStationId: '940GZZLUCSD',
        opens: 'July 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Colliers Wood to South Wimbledon',
        startStationId: '940GZZLUCSD',
        endStationId: '940GZZLUSWN',
        opens: 'July 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },

      // Bank branch
      {
        section: "Euston to King's Cross St. Pancras",
        startStationId: '940GZZLUEUS',
        endStationId: '940GZZLUKSX',
        opens: 'July 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: "King's Cross St. Pancras to Angel",
        startStationId: '940GZZLUKSX',
        endStationId: '940GZZLUAGL',
        opens: 'July 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Angel to Old Street',
        startStationId: '940GZZLUAGL',
        endStationId: '940GZZLUODS',
        opens: 'July 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Old Street to Moorgate',
        startStationId: '940GZZLUODS',
        endStationId: '940GZZLUMGT',
        opens: 'July 2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Moorgate to Bank',
        startStationId: '940GZZLUMGT',
        endStationId: '940GZZLUBNK',
        opens: 'July 2025',
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
    groupName: 'Elizabeth line',
    state: 'live',
    opens: 'Winter 2024',
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
    groupName: 'Piccadilly Line',
    state: 'live',
    opens: 'Winter 2024',
    segments: [
      {
        section: 'Holloway Road to Caledonian Road',
        startStationId: '940GZZLUHWY',
        endStationId: '940GZZLUCAR',
        opens: '2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },

      {
        section: 'Russell Square to Holborn',
        startStationId: '940GZZLURSQ',
        endStationId: '940GZZLUHBN',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Holborn to Covent Garden',
        startStationId: '940GZZLUHBN',
        endStationId: '940GZZLUCGN',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Covent Garden to Leicester Square',
        startStationId: '940GZZLUCGN',
        endStationId: '940GZZLULSQ',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Leicester Square to Piccadilly Circus',
        startStationId: '940GZZLULSQ',
        endStationId: '940GZZLUPCC',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Piccadilly Circus to Green Park',
        startStationId: '940GZZLUPCC',
        endStationId: '940GZZLUGPK',
        opens: 'Summer 2024 (delayed)',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Green Park to Hyde Park Corner',
        startStationId: '940GZZLUGPK',
        endStationId: '940GZZLUHPC',
        opens: 'Summer 2024 (delayed)',
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
    groupName: 'Bakerloo Line',
    state: 'live',
    opens: 'Winter 2024',
    segments: [
      {
        section: 'Piccadilly Circus to Charing Cross',
        startStationId: '940GZZLUPCC',
        endStationId: '940GZZLUCHX',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Charing Cross to Embankment',
        startStationId: '940GZZLUCHX',
        endStationId: '940GZZLUEMB',
        lineFilter: ['Bakerloo'],
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Oxford Circus to Piccadilly Circus',
        startStationId: '940GZZLUOXC',
        endStationId: '940GZZLUPCC',
        opens: '2025',
        // lineFilter: ['Bakerloo'],
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
    groupName: 'Victoria Line',
    state: 'live',
    opens: 'Summer 2024 (delayed)',
    segments: [
      {
        section: 'Vauxhall to Pimlico',
        startStationId: '940GZZLUVXL',
        endStationId: '940GZZLUPCO',
        opens: '2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },

      {
        section: 'Green Park to Oxford Circus',
        startStationId: '940GZZLUGPK',
        endStationId: '940GZZLUOXC',
        opens: '2025',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Oxford Circus to Warren Street',
        startStationId: '940GZZLUOXC',
        endStationId: '940GZZLUWRR',
        opens: 'May 2024',
        coverageNotes: ['Live testing started late April 2024'],
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Warren Street to Euston',
        lineFilter: ['Victoria'],
        startStationId: '940GZZLUWRR',
        endStationId: '940GZZLUEUS',
        opens: 'May 2024',
        coverageNotes: ['Live testing started late April 2024'],
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
    groupName: 'Circle/District Lines',
    state: 'live',
    opens: 'Jan 2026',
    segments: [
      {
        section: 'Notting Hill Gate to Bayswater',
        startStationId: '940GZZLUNHG',
        endStationId: '940GZZLUBWT',
        opens: 'Jan 2026',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Blackfriars to Mansion House',
        startStationId: '940GZZLUBKF',
        endStationId: '940GZZLUMSH',
        opens: 'Jan 2026',
        services: {
          EE: CoveragePresets.tunnels.EE.normal,
          Three: CoveragePresets.tunnels.Three.normal,
          O2: CoveragePresets.tunnels.O2.normal,
          Vodafone: CoveragePresets.tunnels.Vodafone.normal,
        },
      },
      {
        section: 'Mansion House to Cannon Street',
        startStationId: '940GZZLUMSH',
        endStationId: '940GZZLUCST',
        opens: 'Jan 2026',
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
    opens: 'by end of Summer 2024 (delayed)',
    segments: [
      {
        section: "White City to Shepherd's Bush",
        startStationId: '940GZZLUWCY',
        endStationId: '940GZZLUSBC',
      },
    ],
  },
  {
    groupName: 'Northern Line',
    state: 'planned',
    opens: 'by end of Summer 2024 (delayed)',
    segments: [
      // Charing Cross branch
      // ...

      // Bank branch
      // ...

      // Edgware branch
      {
        section: 'Hampstead to Golders Green',
        startStationId: '940GZZLUHTD',
        endStationId: '940GZZLUGGN',
      },

      // High Barnet branch
      {
        section: 'Highgate to East Finchley',
        startStationId: '940GZZLUHGT',
        endStationId: '940GZZLUEFY',
      },

      // Morden
      {
        section: 'South Wimbledon to Morden',
        startStationId: '940GZZLUSWN',
        endStationId: '940GZZLUMDN',
      },
    ],
  },
  {
    groupName: 'Victoria Line',
    state: 'planned',
    opens: 'by end of Summer 2024 (delayed)',
    segments: [
      {
        section: 'Stockwell to Brixton',
        startStationId: '940GZZLUSKW',
        endStationId: '940GZZLUBXN',
      },
    ],
  },
  {
    groupName: 'Bakerloo Line',
    state: 'planned',
    opens: 'by end of Summer 2024 (delayed)',
    segments: [],
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
    state: 'live',
    opens: 'Winter 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // East Finchley
  '940GZZLUEFY': {
    state: 'planned',
    opens: 'by end of Summer 2024 (delayed)',
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
    state: 'live',
    opens: 'September 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // #endregion

  // #region Northern Line, Charing Cross branch
  // Warren Street
  '940GZZLUWRR': {
    state: 'live',
    opens: 'October 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Goodge Street
  '940GZZLUGDG': {
    state: 'live',
    opens: 'October 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
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
  // Leicester Square included through Piccadilly Line
  // Charing Cross
  '940GZZLUCHX': {
    state: 'live',
    opens: 'Winter 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Embankment
  '940GZZLUEMB': {
    state: 'live',
    opens: 'Winter 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // #endregion

  // #region Northern Line, Bank branch
  // King's Cross St. Pancras
  '940GZZLUKSX': {
    state: 'live',
    opens: 'July 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Angel
  '940GZZLUAGL': {
    state: 'live',
    opens: 'July 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Old Street
  '940GZZLUODS': {
    state: 'live',
    opens: 'July 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Moorgate
  '940GZZLUMGT': {
    state: 'live',
    opens: 'July 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Bank included through Central Line
  // #endregion

  // #region Northern Line, Edgware branch
  // Chalk Farm
  '940GZZLUCFM': {
    state: 'live',
    opens: 'October 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Belsize Park
  '940GZZLUBZP': {
    state: 'live',
    opens: 'October 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Hampstead
  '940GZZLUHTD': {
    state: 'live',
    opens: 'February 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Golders Green
  '940GZZLUGGN': {
    state: 'planned',
    opens: 'by end of Summer 2024 (delayed)',
    coverage: {},
  },
  // #endregion

  // #region Northern Line, Battersea branch
  // Nine Elms
  '940GZZNEUGST': {
    state: 'live',
    opens: 'late 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Battersea Power Station
  '940GZZBPSUST': {
    state: 'live',
    opens: 'late 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // #endregion

  // #region Northern Line, Morden branch
  // Kennington
  '940GZZLUKNG': {
    state: 'live',
    opens: 'late 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },

  // Oval
  '940GZZLUOVL': {
    state: 'live',
    opens: 'late 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },

  // Stockwell included through Victoria Line
  // Clapham North
  '940GZZLUCPN': {
    state: 'live',
    opens: 'Winter 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Clapham Common
  '940GZZLUCPC': {
    state: 'live',
    opens: 'Winter 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Clapham South
  '940GZZLUCPS': {
    state: 'live',
    opens: 'Winter 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Balham
  '940GZZLUBLM': {
    state: 'live',
    opens: 'Winter 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Tooting Bec
  '940GZZLUTBC': {
    state: 'live',
    opens: 'July 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Tooting Broadway
  '940GZZLUTBY': {
    state: 'live',
    opens: 'July 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Colliers Wood
  '940GZZLUCSD': {
    state: 'live',
    opens: 'July 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // South Wimbledon
  '940GZZLUSWN': {
    state: 'live',
    opens: 'July 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Morden
  '940GZZLUMDN': {
    state: 'planned',
    opens: 'by end of Summer 2024 (delayed)',
    coverage: {},
  },

  // #endregion

  // #endregion

  // #region Central Line
  // White City
  '940GZZLUWCY': {
    state: 'planned',
    opens: 'by end of Summer 2024 (delayed)',
    coverage: {},
  },
  // Shepherd's Bush
  '940GZZLUSBC': {
    state: 'live',
    opens: 'Winter 2024',
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
    state: 'live',
    opens: 'December 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
    },
  },
  // Marble Arch
  '940GZZLUMBA': {
    state: 'live',
    opens: 'December 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
    },
  },
  // Bond Street
  '940GZZLUBND': {
    state: 'live',
    opens: 'November 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
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
    state: 'live',
    opens: 'November 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Chancery Lane
  '940GZZLUCHL': {
    state: 'live',
    opens: 'November 2023',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // St Pauls
  '940GZZLUSPU': {
    state: 'live',
    opens: 'December 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
    },
  },
  // Bank
  '940GZZLUBNK': {
    state: 'live',
    opens: 'December 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
    },
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
    state: 'live',
    opens: '14 May 2024',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
    },
  },
  // Bond Street
  '910GBONDST': {
    state: 'live',
    opens: '16 December 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
    },
  },
  // Tottenham Court Road
  '910GTOTCTRD': {
    state: 'live',
    opens: '16 December 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
    },
  },
  // Farringdon
  '910GFNTLSR': {
    state: 'live',
    opens: '16 December 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
    },
  },
  // Liverpool Street
  '910GLIVSTLL': {
    state: 'live',
    opens: '16 December 2023',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
    },
  },
  // Whitechapel
  '910GWCHAPEL': {
    state: 'live',
    opens: '14 May 2024',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
    },
  },
  // #endregion

  // #region Elizabeth Line, Abbey Wood branch
  '910G950': {
    state: 'live',
    opens: '14 May 2024',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
    },
  },
  // Woolwich
  '910GWOLWXR': {
    state: 'live',
    opens: '14 May 2024',
    coverage: {
      EE: CoveragePresets.station.EE.no_5g,
      Three: CoveragePresets.station.Three.no_5g,
      O2: CoveragePresets.station.O2.no_5g,
      Vodafone: CoveragePresets.station.Vodafone.no_5g,
    },
  },
  // #endregion
  // #endregion

  // #region Victoria Line
  // Green Park included through Piccadilly Line
  // Oxford Circus included through Central Line
  // Warren Street included through Northern Line
  // Euston included through Northern Line

  // Pimlico
  '940GZZLUPCO': {
    state: 'live',
    opens: '2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },

  // Vauxhall
  '940GZZLUVXL': {
    state: 'live',
    opens: '2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },

  // Stockwell
  '940GZZLUSKW': {
    state: 'live',
    opens: 'July 2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },

  // Brixton
  '940GZZLUBXN': {
    state: 'planned',
    opens: 'by end of Summer 2024 (delayed)',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },

  // #endregion

  // #region Piccadilly Line
  // Holloway Road
  '940GZZLUHWY': {
    state: 'live',
    opens: '2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Caledonian Road
  '940GZZLUCAR': {
    state: 'live',
    opens: '2025',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },

  // Russell Square
  '940GZZLURSQ': {
    state: 'live',
    opens: 'Winter 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Holborn included through Central Line
  // Covent Garden
  '940GZZLUCGN': {
    state: 'live',
    opens: '14 May 2024',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
    },
  },
  // Leicester Square
  '940GZZLULSQ': {
    state: 'live',
    opens: 'Summer 2024 (delayed)',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Piccadilly Circus
  '940GZZLUPCC': {
    state: 'live',
    opens: 'Summer 2024 (delayed)',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Green Park
  '940GZZLUGPK': {
    state: 'live',
    opens: 'by end of Summer 2024 (delayed)',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Hyde Park Corner
  '940GZZLUHPC': {
    state: 'live',
    opens: 'by end of Summer 2024 (delayed)',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // #endregion

  // #region Bakerloo Line
  // Oxford Circus included through Central Line
  // Piccadilly Circus included through Piccadilly Line
  // Charing Cross included through Northern Line
  // Embankment included through Northern Line
  // #endregion

  // #region Circle & District Lines
  // Notting Hill Gate included through Central Line
  // Euston Square
  '940GZZLUESQ': {
    state: 'live',
    opens: 'Jan 2026',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },

  // Bayswater
  '940GZZLUBWT': {
    state: 'live',
    opens: 'Jan 2026',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Blackfriars
  '940GZZLUBKF': {
    state: 'live',
    opens: 'Jan 2026',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Mansion House
  '940GZZLUMSH': {
    state: 'live',
    opens: 'Jan 2026',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
  },
  // Cannon Street
  '940GZZLUCST': {
    state: 'live',
    opens: 'Jan 2026',
    coverage: {
      EE: CoveragePresets.station.EE.with_5g,
      Three: CoveragePresets.station.Three.with_5g,
      Vodafone: CoveragePresets.station.Vodafone.with_5g,
      O2: CoveragePresets.station.O2.with_5g,
    },
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
      opens: segment.opens ?? group.opens,
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
