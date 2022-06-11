import React from 'react'

import Section from '@components/Design/Section'

export default function ArfcnListIntro() {
  return (
    <Section>
      <h2 className="text-louder">Intro</h2>

      <p className="text-speak">
        An <strong>ARFCN</strong> is an acronym which stands for absolute radio frequency channel number. This is a unique number which can
        represent any valid radio frequency covered by the appropriate 3GPP radio access technology (RAT)&nbsp;specification.
      </p>

      <p className="text-speak">
        ARFCN can be prefixed with characters to show which RAT they are representing. NR ARFCNs are for 5G/
        <abbr data-tooltip aria-label="New Radio">
          NR
        </abbr>
        , EARFCNs are for EUTRA (4G/LTE), UARFCNs are for UMTS (3G) and ARFCNs are for GSM&nbsp;(2G).
      </p>

      <p className="text-speak">
        In 4G LTE and previous generations of RAT, ARFCNs represented the centre of a carrier band, but with 5G NR this changed to the NR ARFCN
        representing any frequency within the network's carrier, and the centre point is often determined using an offset sent in the&nbsp;SIB1.
      </p>
    </Section>
  )
}
