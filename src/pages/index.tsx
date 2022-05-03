import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Design/Hero'

import Colors from '../data/colors.json'
import Section from '../components/Design/Section'
import Tech from '../components/PageComponents/Tech'
import Link from '../components/Links/Link'
import { makeStyles } from '@material-ui/core'
import Breakpoints from '../data/breakpoints'
import generateTransitions from '../functions/generateTransitions'
import Experience from '../components/Experience/Experience'
import QualificationsTable from '../components/Education/QualificationsTable'

const useStyles = makeStyles({
  projectsHero: {
    display: 'grid',
    gap: 16,
    [Breakpoints.downTo.tablet]: {
      alignItems: 'center',
      gridTemplateColumns: '1fr auto',
    },
    [Breakpoints.upTo.tablet]: {
      justifyItems: 'center',
      gridTemplateColumns: '1fr',
      textAlign: 'center',
    },
  },
  projectsLinkContainer: {},
  projectsLink: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 18px',
    paddingRight: 20,
    border: '1px solid currentColor',
    borderRadius: 0,
    gap: 8,
    transformOrigin: 'center',
    '&::after': {
      content: '""',
      display: 'inline-block',
      width: '0.75em',
      height: '0.75em',
      borderTop: '2px solid currentColor',
      borderRight: '2px solid currentColor',
      transform: 'rotate(45deg)',
      ...generateTransitions('transform'),
    },
    '&:hover, &:focus, &:active': {
      '&::after': {
        transform: 'translateX(3px) scaleY(0.92) scaleX(1.05) rotate(45deg)',
      },
    },
  },
  eduTable: {
    marginTop: 24,
  },
})

const IndexPage = ({ location }) => {
  const classes = useStyles()

  return (
    <Layout location={location} title="Home">
      <Hero firstElement size="huge" color={Colors.primaryBlue}>
        <h1 className="text-shout">David Wheatley</h1>
        <p role="doc-subtitle" className="text-loud">
          A front-end web developer from West Sussex,&nbsp;UK
        </p>
      </Hero>

      <Section>
        <h2 className="text-louder">Hello!</h2>
        <p className="text-speak">
          Usually, people's portfolio websites are super fancy, well-crafted, but also bloated and heavy. Not mine. This site is statically
          generated from fully-fledged React into simple, performant, and powerful HTML, CSS and Javascript with&nbsp;
          <a rel="noreferrer noopener" target="_blank" href="https://gatsbyjs.com/">
            Gatsby.js
          </a>
          .
        </p>
        <p className="text-speak">
          I prefer <strong>simple websites</strong>. Websites which are responsive and perform well on all devices, no matter how old and slow.
          Websites are for everyone, so everyone should be able to use them, no matter their device or internet&nbsp;connection.
        </p>
      </Section>

      <Hero innerClassName={classes.projectsHero} color={Colors.primaryRed}>
        <div>
          <h2 className="text-loud">Take a peek at some projects that I've worked on over the&nbsp;years.</h2>
        </div>
        <div className={classes.projectsLinkContainer}>
          <Link className={classes.projectsLink} href="/my-projects">
            My projects
          </Link>
        </div>
      </Hero>

      <Section>
        <h2 className="text-louder">Experience</h2>
        <p className="text-speak">
          I've worked on several projects for multiple organisations, on top of contributing to the wider open source&nbsp;community.
        </p>

        <Experience />
      </Section>

      <Section darker>
        <h2 className="text-louder">What do I know?</h2>
        <p className="text-speak">
          I've got experience with quite a lot of technologies, which is always handy. Over the years, I've experimented with lots of different
          frameworks and languages, both new and old, allowing me to quickly and easily adapt to new technologies when&nbsp;needed.
        </p>

        <Tech />
      </Section>

      <Section>
        <h2 className="text-louder">Qualifications</h2>
        <p className="text-speak">
          As a current student, I haven't completed all of my qualifications at the moment, so some of the courses below show my current
          (predicted) grades as opposed to my actual&nbsp;grades.
        </p>
        <QualificationsTable className={classes.eduTable} />
      </Section>
    </Layout>
  )
}

export default IndexPage
