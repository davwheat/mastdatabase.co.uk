import React from 'react'

import Section from '@components/Design/Section'
import { CoverageTable } from './CoverageTable'
import { CoveragePresets } from './MapData/CoveredSections'
import { makeStyles } from '@material-ui/core'

import TubeTunnelFigure from './tube-tunnel-feeder-figure.inline.svg'
import Link from '@components/Links/Link'

const useStyles = makeStyles({
  coverageTableFigure: {
    margin: '24px 0',

    '& figcaption': {
      textAlign: 'center',
      margin: '12px 0',
    },
  },
})

export function TubeDeploymentInfo() {
  const classes = useStyles()

  return (
    <Section>
      <h2 className="text-louder">Deployment info</h2>

      <p className="text-speak">
        UK networks are deploying pre-determined and standardised coverage at each station and tunnel section across the network. Low footfall
        stations receive the standard 2G, 3G and 4G, while higher footfall stations get 5G coverage on top of this. Thankfully, this makes
        demonstrating the available coverage across the network simpler for us.
      </p>

      <p className="text-speak">
        The Jubilee Line Extension coverage which launched in March 2020 has differences compared to the widespread rollout that began in
        December 2020. Namely that overall capacity is lower due to less spectrum being active, and that some networks focused on legacy
        technologies in order to consistently provide voice services.
      </p>

      <h3 className="text-loud">Jubilee Line Extension</h3>

      <p className="text-speak">
        As the first section of the sub-surface London Underground to receive mobile connectivity, the JLE has a more limited deployment of
        spectrum and radio technologies.
      </p>

      <figure className={classes.coverageTableFigure}>
        <figcaption>
          <p className="text-speak-up">Deployment in Jubilee Line Extension stations</p>
        </figcaption>

        <CoverageTable
          coverage={{
            EE: CoveragePresets.station.EE.jle,
            Three: CoveragePresets.station.Three.jle,
            O2: CoveragePresets.station.O2.jle,
            Vodafone: CoveragePresets.station.Vodafone.jle,
          }}
        />
      </figure>

      <figure className={classes.coverageTableFigure}>
        <figcaption>
          <p className="text-speak-up">Deployment in Jubilee Line Extension tunnels</p>
        </figcaption>

        <CoverageTable
          coverage={{
            EE: CoveragePresets.tunnels.EE.jle,
            Three: CoveragePresets.tunnels.Three.jle,
            O2: CoveragePresets.tunnels.O2.jle,
            Vodafone: CoveragePresets.tunnels.Vodafone.jle,
          }}
        />
      </figure>

      <h3 className="text-loud">Wider rollout</h3>

      <p className="text-speak">
        The wider mobile coverage rollout is generally unified across all tunnel segments, however stations have both 5G and non-5G
        configurations present.
      </p>

      <p className="text-speak">
        The Elizabeth line will not have 5G coverage at any station or tunnel segment due to potential interference issues with the signalling
        equipment on the line. It is unclear whether this means <em>any</em> 5G, or only mid-band 5G, such as n78. There would be no reason to
        ban 5G connectivity as a whole as low-band (sub 3 GHz) frequencies are already used for 4G LTE coverage on this line.
      </p>

      <p className="text-speak">
        3G was initially only deployed at new stations on Vodafone, but this was switched off by February 2024 as part of their{' '}
        <Link href="https://www.vodafone.co.uk/help-and-information/3g-switch-off">nationwide 3G switch-off programme</Link>.
      </p>

      <figure className={classes.coverageTableFigure}>
        <figcaption>
          <p className="text-speak-up">Deployment in 5G-equipped stations</p>
        </figcaption>

        <CoverageTable
          coverage={{
            EE: CoveragePresets.station.EE.with_5g,
            Three: CoveragePresets.station.Three.with_5g,
            O2: CoveragePresets.station.O2.with_5g,
            Vodafone: CoveragePresets.station.Vodafone.with_5g,
          }}
        />
      </figure>

      <figure className={classes.coverageTableFigure}>
        <figcaption>
          <p className="text-speak-up">Deployment in non-5G-equipped stations</p>
        </figcaption>

        <CoverageTable
          coverage={{
            EE: CoveragePresets.station.EE.no_5g,
            Three: CoveragePresets.station.Three.no_5g,
            O2: CoveragePresets.station.O2.no_5g,
            Vodafone: CoveragePresets.station.Vodafone.no_5g,
          }}
        />
      </figure>

      <p className="text-speak">
        Each tunnel segment is fed by the station at either end of the tunnel, with a split in the leaky feeders mid-way through the tunnel. It
        has been noted during testing that some networks have not configured devices to hand over between the two leaky feeder sections, which
        can lead to a brief loss of connectivity mid-way through a tunnel.
      </p>

      <figure className={classes.coverageTableFigure}>
        <TubeTunnelFigure />

        <figcaption className="text-speak-up">Illustration of the London Underground leaky feeder configuration.</figcaption>
      </figure>

      <p className="text-speak">
        Three does not have 5G service inside tunnels yet, but it is likely that they will deploy n28 in the future, similar to O2 and EE, as
        they have spectrum holdings within this band. Elizabeth line tunnel coverage is not live yet, but it is possible they will not contain 5G
        coverage shown below that is present on other TfL tunnels.
      </p>

      <figure className={classes.coverageTableFigure}>
        <figcaption>
          <p className="text-speak-up">Deployment in tunnels</p>
        </figcaption>

        <CoverageTable
          coverage={{
            EE: CoveragePresets.tunnels.EE.normal,
            Three: CoveragePresets.tunnels.Three.normal,
            O2: CoveragePresets.tunnels.O2.normal,
            Vodafone: CoveragePresets.tunnels.Vodafone.normal,
          }}
        />
      </figure>

      <h3 className="text-loud">Heathrow tunnels</h3>

      <p className="text-speak">
        The tunnels between the Great Western Mainline and Heathrow Airport are privately owned by Heathrow Airport Holdings rather than being
        part of Network Rail's infrastructure. They were also some of the first railway tunnels to gain a specialist mobile phone coverage
        solution.
      </p>

      <p className="text">
        Stretching back as far as 2009 (or earlier), the Heathrow tunnels have had a mobile coverage solution of some form, starting with 2G only
        for Orange, and moving up to today's 4G solution covering all four UK networks.
      </p>

      <figure className={classes.coverageTableFigure}>
        <figcaption>
          <p className="text-speak-up">Deployment in Heathrow tunnels</p>
        </figcaption>

        <CoverageTable
          coverage={{
            EE: CoveragePresets.tunnels.EE.hex,
            Three: CoveragePresets.tunnels.Three.hex,
            O2: CoveragePresets.tunnels.O2.hex,
            Vodafone: CoveragePresets.tunnels.Vodafone.hex,
          }}
        />
      </figure>

      <figure className={classes.coverageTableFigure}>
        <figcaption>
          <p className="text-speak-up">Deployment in Heathrow stations</p>
        </figcaption>

        <CoverageTable
          coverage={{
            EE: CoveragePresets.station.EE.hex,
            Three: CoveragePresets.station.Three.hex,
            O2: CoveragePresets.station.O2.hex,
            Vodafone: CoveragePresets.station.Vodafone.hex,
          }}
        />
      </figure>
    </Section>
  )
}
