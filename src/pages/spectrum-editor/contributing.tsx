import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Breadcrumbs from '@components/Design/Breadcrumbs'
import Section from '@components/Design/Section'
import Link from '@components/Links/Link'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import { PageProps } from 'gatsby'
import clsx from 'clsx'
import CardLink from '@components/Links/CardLink'

const useStyles = makeStyles({
  list: {
    marginTop: 4,
    marginBottom: 16,
    paddingLeft: 16,
  },
})

export default function SpectrumEditorPage({ location }: PageProps) {
  const classes = useStyles()

  return (
    <Layout
      location={location}
      title="Contributing spectrum data"
      description="Information about how to contribute spectrum data from the GUI editor for this site."
    >
      <Hero firstElement size="large" color={Colors.primaryRed}>
        <h1 className="text-shout">Contributing spectrum data</h1>
        <p role="doc-subtitle" className="text-loud">
          How to contribute spectrum data to this site.
        </p>
      </Hero>

      <Breadcrumbs
        data={[
          { t: 'Home', url: '/' },
          { t: 'Spectrum editor', url: '/spectrum-editor' },
          { t: 'Contributing', url: '/spectrum-editor/contributing' },
        ]}
      />

      <Section>
        <h2 className="text-louder">Before you contribute</h2>

        <p className="text-speak">
          This site utilises a package called <code className="code">mobile-spectrum-data</code> for its per-country spectrum allocation
          information, as well as various spectrum/RAT related functions. This package is maintained by myself, and is{' '}
          <Link href="https://github.com/davwheat/mobile-spectrum-data/blob/main/LICENSE">licensed under the LGPL-3.0</Link>.
        </p>

        <p className="text-speak">
          <strong>
            By contributing to the package, you state that you have read and understood the conditions of the LGPL-3.0 license, and are happy for
            your contributions to be included in the package under this license.
          </strong>
        </p>
      </Section>

      <Section>
        <h2 className="text-louder">Mapping spectrum</h2>

        <p className="text-speak">
          You should always start by finding an official source for frequency allocations in your region or country. Typically, these will be
          government agencies, such as Ofcom in the UK. Please attach this source to your blocks in the editor wherever possible (preferably by
          URL, but a named source is ok).
        </p>

        <p className="text-speak">
          The GUI editor will automatically idenitfy some inconsistencies in your entries, such as:
          <ul className={clsx('list', classes.list)}>
            <li>overlapping blocks</li>
            <li>mismatched spectrum for paired blocks</li>
          </ul>
        </p>

        <p className="text-speak">
          Just because no errors show in the editor, doesn't guarantee that there are no issues. For example, the editor does not check that:
          <ul className={clsx('list', classes.list)}>
            <li>ARFCNs are valid for the defined block</li>
            <li>start and end frequencies match the band name(s)</li>
            <li>you have entered the correct owner names</li>
          </ul>
        </p>

        <p className="text-speak">
          While all contributions are welcome, high quality ones are appreciated much more. People who have done all the research and back up
          their spectrum claims with sources will see the most accepted changes compared to those who are relying on "trust me bro".
        </p>
      </Section>

      <Section>
        <h2 className="text-louder">Sending your changes</h2>

        <p className="text-speak">
          When your spectrum edits are complete, and you're ready to contribute them, hit the "Export JSON to file" button on the page. Save this
          file somewhere on your device.
        </p>

        <p className="text-speak">
          You'll need to upload this file to a new GitHub issue for the JSON to be processed and added to the package and website. Make sure you
          choose the correct option depending on whether your country or region is already in the package and you're editing it, or you're adding
          a new country or region.
        </p>

        <div style={{ marginTop: 16 }}>
          <CardLink
            url="https://github.com/davwheat/mobile-spectrum-data/issues/new/choose"
            title="Submit your changes"
            description="Open an issue on the GitHub repository"
          />
        </div>
      </Section>
    </Layout>
  )
}
