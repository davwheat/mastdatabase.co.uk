import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Section from '@components/Design/Section'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'

import MergerAllBands from '@data/spectrum/VHUK-merger/base'

import { StaticImage } from 'gatsby-plugin-image'

import type { PageProps } from 'gatsby'
import Link from '@components/Links/Link'
import { makeStyles } from '@material-ui/core'
import Breakpoints from '@data/breakpoints'

const useStyles = makeStyles({
  inlineImage: {
    margin: '16px auto',
    textAlign: 'center',

    [Breakpoints.downTo.desktopSmall]: {
      display: 'inline-block',
      float: 'var(--direction)' as any,
      margin: 16,
    },
  },
})

function VHUKMergerPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout
      location={location}
      title="Merger of Vodafone and Three UK"
      description="How the merger between Vodafone UK and Three UK might affect the nation's telecommunications."
    >
      <Hero firstElement size="huge">
        <h1 className="text-shout">Merger of Vodafone and Three UK</h1>
        <p role="doc-subtitle" className="text-loud">
          How the merger between Vodafone UK and Three UK might affect the nation's telecommunications.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'United Kingdom', url: '/gb' },
          { t: 'Vodafone-Three merger', url: '/gb/vodafone-three-merger' },
        ]}
      />

      <Section>
        <h2 className="text-louder">Background</h2>

        <p className="text-speak">
          Three UK is owned by a Hong Kong-based conglomerate named CK Hutchison, which also owns Three in various other countries, including
          Ireland, Austria, Denmark, Italy (WindTre), and more. Hutchison are deeply ingrained within the history of UK mobile networks, with
          Three UK being their third UK mobile network since they entered the market.
        </p>

        <p className="text-speak">
          Vodafone UK is the third largest mobile network in the UK, as of 2022, and is owned by Vodafone Group, a British multinational
          telecommunications company headquartered in Newbury, England. Vodafone Group is the second largest mobile network operator in the
          world, operating networks in 21 countries and partners in a further 47.
        </p>

        <h3 className="text-loud">History of Three</h3>

        <h4 className="text-speak-up">Rabbit</h4>

        <p className="text-speak">
          CK Hutchison launched their first UK mobile network in May 1992 named Rabbit. Rabbit offered CT2 (often seen as the precursor to modern
          DECT) coverage within 100m of their transmitters, and, at their peak, operated 12,000 base stations and provided services to 10,000
          subscribers.
        </p>

        <p className="text-speak">
          Rabbit ceased operations only 20 months after launch. This was primarily due to the imminent launch of newer analogue GSM on competitor
          networks, such as Vodafone and BT Cellnet, who also offered an incoming calls service. Hutchison lost close to $183 million from the
          failure of Rabbit, but this wouldn't make them think twice about another entry into the UK market.
        </p>

        <h4 className="text-speak-up">Orange</h4>

        <p className="text-speak">
          While Rabbit was being launched, in July 1991, Hutchison acquired a controlling stake in a business named Microtel, who obtained a
          license to run a GSM-based mobile network in the UK. Hutchison renamed this business to Orange Personal Communication Services (PCS) in
          March 1994.
        </p>

        <p className="text-speak">
          Services on Orange launched exactly a month later in April 1994 on 1800 MHz, contracting an advertising agency to create a now iconic
          slogan for those living through the era, "The future's bright, the future's Orange." Orange made their intial public offering and
          floated on the London stock exchange in April 1996, and became the youngest company to enter the FTSE100 in June 1996, with a valuation
          of £2.4 billion.
        </p>

        <p className="text-speak">
          Orange PCS was eventually purchased in October 1999 by German conglomerate Mannesmann for $33 billion, which caused Vodafone to make a
          hostile takeover bid for the German company. 4 months later, in February 2000, Vodafone Group announced it had completed an acquisition
          of Mannesmann for $128 billion, but was forced to divest Orange due to EU competition regulations with regards to mobile licenses. In
          May 2000, it was announced that France Télécom (France's now-privatised telecommunications provider) would purchase Orange PCS for $37
          billion, completing the sale in August of that year.
        </p>

        <p className="text-speak">
          Orange UK later merged with T-Mobile UK in 2010 to form a new company named Everything Everywhere, which is still in operation today as
          simply "EE". The Orange brand was phased out completely by mid-2015, and EE was purchased by BT Group in 2016 following unconditional
          approval by the UK's Competition and Markets Authority.
        </p>

        <h4 className="text-speak-up">Three</h4>

        <p className="text-speak">
          Three UK is Hutchison's third play at a UK mobile network, so far. It launched on 3 March 2003 (3/3/03), offering a fully 3G-based
          network without any GSM functionality unlike the other networks at the time. Three was the first UK network to meet the coverage
          obligation within its network license of 80% of the population, doing so by 9 December 2004.
        </p>

        <p className="text-speak">
          At the start of its operations, Three partnered with O2 to provide national roaming on O2's GSM service in order to offer coverage
          parity outside of their own 3G areas. Three replaced O2's services with Orange in May 2006, who provided GSM fallback until 2010 when
          Three opted to begin switching off national roaming entirely.
        </p>

        <p className="text-speak">
          In 2007, Three UK and T-Mobile UK announced a joint-venture named MBNL to consolidate their network infrastructure build and upgrades
          programme, with the goal of reducing costs and improving coverage. Later, this expanded to include Orange UK after it merged with
          T-Mobile to form EE. MBNL started to wind down from April 2023, with Three and EE handling upgrades and maintenance unilaterally into
          the future.
        </p>

        <p className="text-speak">
          Three pioneered the concept of the EU's "roam like at home" policies, with customers, until 2009, able to roam on Three's other
          networks in Europe at no additional cost compared to their domestic pricing. This restarted in 2013, with further countries without
          Three networks being added in coming years, before the re-introduction of roaming fees from 2021 due to the UK's exit from the EU.
        </p>

        <p className="text-speak">
          Three's merger talks with Vodafone are not Hutchison's first attempt at a merger with another network, first announcing in March 2015
          that a deal had been struck with O2 to acquire its UK-based operations for a total of £10.25 billion. This purchase was blocked by the
          EU's competition commission on the grounds it would significantly affect competition within the UK market.
        </p>

        <h2 className="text-louder">Merger with Vodafone</h2>

        <p className="text-speak">
          Three's latest merger talks are with Vodafone, for which rumours first began circulating around May 2022, potentially sparked by
          Liberty Global and Telefónica UK's merger of their respective businesses (Virgin Media and O2) in 2021.
        </p>

        <p className="text-speak">
          The pairing of Vodafone and Three may seem odd at first, considering the two businesses' differences in operations. Vodafone UK is a
          long-standing, traditional brand which many young people may interpret as "old", meanwhile Three is the youth-centric brand that offers
          fantastic value for money data across its own brand and its in-house MVNO, SMARTY, exacerbated by Three removing fair usage caps from
          their unlimited plans entirely in 2022.
        </p>

        <p className="text-speak">
          In actual fact, this combination works very well. Vodafone has both a strong brand awareness, as well as a huge infrastructure network
          of both mobile base stations, and its own dark fibre network across the UK. Vodafone also has a strong presence in the enterprise
          market, with Three UK having a strong presence in the consumer market. With the two networks being the two smallest in the UK, its
          unsurprising why they would like to join forces to compete against the larger BT/EE and Virgin Media O2.
        </p>

        <h2 className="text-louder">Infrastructure</h2>

        <h3 className="text-speak-up">Cornerstone and Beacon</h3>

        <div className={classes.inlineImage} style={{ '--direction': 'left' } as any}>
          <StaticImage
            height={400}
            src="../../assets/images/misc/o2-vodafone-beacon-split.png"
            alt="Diagram of O2 and Vodafone's management split, showing O2 managing Scotland, Northern Ireland and the east of England, while Vodafone manages Wales and the West of England."
          />
        </div>

        <p className="text-speak">
          Vodafone has a large infrastructure network of mobile base stations across the UK, operated in partnership with O2 under the
          joint-venture Cornerstone. Cornerstone was formed in 2009, and is responsible for the maintenance and upgrades of both Vodafone and
          O2's mobile networks, with the two networks sharing the same infrastructure. The two networks share repsonsibility of the
          infrastructure by splitting the country into zones under projects named Beacon 1 and Beacon 2.
        </p>

        <p className="text-speak">
          Cornerstone and Beacon means that Vodafone has reliable coverage arrangements across the entire UK, which could extend to Three in the
          case of a merger. Some speculation suggests the Cornerstone agreement could be terminated in the case of a merger, but this would also
          place O2 at such a disadvantage across huge swaths of the UK so it appears very unlikely.
        </p>

        <p className="text-speak">
          That being said, many major UK cities (including London, Birmingham, Brighton, Cardiff, Manchester, and Liverpool) are already being
          "unwound" in another project named Beacon 3. In these areas, shared infrastructure is being separated into two networks, with Vodafone
          and O2 each taking responsibility for their own infrastructure and, hence, network coverage.
        </p>

        <h3 className="text-speak-up">Three's rapid 5G expansion</h3>

        <div className={classes.inlineImage} style={{ '--direction': 'left' } as any}>
          <StaticImage
            height={400}
            src="../../assets/images/misc/three phase 8.jpg"
            alt="Picture of a Three UK Phase 8 streetworks site painted in white, with four surrounding cabinets. Mast is on a pavement next to a road, with shops visible on a high street behind the pole."
          />
        </div>

        <p className="text-speak">
          In the past few years, Three have invested heavily in expanding their 5G coverage through new streetworks sites. The unilateral
          streetworks programme consists of slimline monopoles across towns, cities and the countryside that are capable of hosting Three's full
          range of technologies.
        </p>

        <p className="text-speak">
          Three's rapid deployment programme is a huge success, with the networking having over 4,250 live 5G sites as of May 2023, up from 2,200
          in 2022. This rollout is shown by Three taking the crown for fastest median and peak 5G speeds in the UK{' '}
          <Link href="https://www.ookla.com/articles/three-5g-performance-uk-ireland-austria-q2-2023">according to Ookla</Link>. Three have also
          been working on upgrading backhaul to all their sites to 10 Gbps to maximise 5G performance. We have seen single user{' '}
          <Link href="https://twitter.com/davwheat_/status/1649699563530334208">peaks of up to 2.1 Gbps on Three 5G</Link> which is near
          impossible to achieve on other UK networks.
        </p>

        <table>
          <thead>
            <tr>
              <th>Network</th>
              <th>Median 5G speed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Three UK</td>
              <td>275.83 Mbps</td>
            </tr>
            <tr>
              <td>Vodafone UK</td>
              <td>138.90 Mbps</td>
            </tr>
            <tr>
              <td>EE</td>
              <td>111.14 Mbps</td>
            </tr>
            <tr>
              <td>O2 UK</td>
              <td>70.63 Mbps</td>
            </tr>
          </tbody>
        </table>

        {/* Needed for floated image(s) */}
        <div className="clearfix" role="presentation" aria-hidden="true" />
      </Section>

      <AllSpectrumMaps
        locationName="UK post-merger"
        countryCode="GB"
        bandsData={MergerAllBands}
        hideLicenseInfo
        hideHighlighter
        customColors={{ '#c42b1e': ['VHUK', 'Vodafone Hutchison UK'] }}
      />
    </Layout>
  )
}

export default VHUKMergerPage
