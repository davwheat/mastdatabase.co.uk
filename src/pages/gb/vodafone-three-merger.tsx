import React from 'react'

import Hero from '@components/Design/Hero'
import Layout from '@components/Layout'
import Section from '@components/Design/Section'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import AllSpectrumMaps from '@components/MobileNetworking/AllSpectrumMaps'

import MergerAllBands from '@data/spectrum/VHUK-merger/base'

import type { PageProps } from 'gatsby'

function VHUKMergerPage({ location }: PageProps) {
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
          Ireland, Austria, Denmark, Italy (WindTre) and more. Hutchison are deeply ingrained within the history of UK mobile networks, with
          Three UK being their third UK mobile network since they entered the market.
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
          Orange UK later merged with T-Mobile UK in 2010 to form the new company still in operation today, EE. The Orange brand was phased out
          completely by mid-2015, and EE was purchased by BT Group in 2016 following unconditional approval by the UK's Competition and Markets
          Authority.
        </p>
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
