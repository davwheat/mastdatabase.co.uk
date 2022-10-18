import React from 'react'

import Layout from '@components/Layout'
import Hero from '@components/Design/Hero'
import Section from '@components/Design/Section'
import ButtonLink from '@components/Links/ButtonLink'
import Link from '@components/Links/Link'

import Colors from '@data/colors.json'

import type { PageProps } from 'gatsby'

const Links = [
  { text: 'Home', url: '/' },
  { text: 'Networking-related maps', url: '/maps' },
]

export default function NotFoundPage({ location }: PageProps) {
  return (
    <Layout location={location} title="Not Found" description="This page couldn't be found.">
      <Hero firstElement color={Colors.primaryBlue}>
        <h1 className="text-shout">Lost?</h1>
        <p role="doc-subtitle" className="text-loud">
          Error 404 - This page doesn't exist
        </p>
      </Hero>
      <Section>
        <p className="text-speak">It looks like you've stumbled across a link to a page that doesn't exist.</p>
        <p className="text-speak">
          Try one of these pages, or <ButtonLink onClick={() => history.back()}>go back</ButtonLink>.
        </p>
        <nav>
          <ul className="list">
            {Links.map(link => (
              <li key={`${link.url}--${link.text}`}>
                <Link href={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>
    </Layout>
  )
}
