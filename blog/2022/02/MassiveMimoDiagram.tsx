import React from 'react'

import { makeStyles } from '@material-ui/core'
// import { graphql, useStaticQuery } from 'gatsby'

import diagram from './massive mimo.png'

const useStyles = makeStyles({
  root: {
    border: '2px solid #000',
    padding: 16,
    marginTop: '1em',
    marginBottom: '1em',

    '& p:last-child': {
      marginBottom: '0 !important',
    },
  },

  image: {
    width: '100% !important',
    margin: '16px 0 !important',
  },
})

export default function MassiveMimoDiagram() {
  const classes = useStyles()

  // const data = useStaticQuery(graphql`
  //   query {
  //     file(relativePath: { eq: "2021/12/31/massive mimo.png" }) {
  //       childImageSharp {
  //         fixed(width: 500) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <figure className={classes.root}>
      <figcaption className="text-loud text-center">Massive MIMO beamforming</figcaption>

      <img
        className={classes.image}
        src={diagram}
        draggable="false"
        alt="Image of four data streams to four UEs, each stream visualised in a different panel of the image."
      />

      <p>
        In this diagram, we can see visualisations of <strong>four separate beams transmitting to four different UEs</strong>. The colour
        represents signal strength, where red is very strong, and dark blue is very weak. The panels are labelled a, b, c, and d.
      </p>
      <p>
        It's important to remember that{' '}
        <strong>
          a beam can target a UE specifically, but its radiation pattern means that it also ends up transmitting to other areas too
        </strong>
        . This can be seen in the first panel, labelled 'a', where the beam is obviously targeting UE1, but signal is detected in other areas
        away from the UE as well.
      </p>
      <p>
        While signal is detected in other regions, this is not a real issue, due to the other critical factor in massive MIMO: null zones. Null
        zones are areas of weak or no signal. <strong>The antenna ensures that all other UEs other than the target are in 'null zones'</strong>.
        In all four panels, you can see that the target UE has strong signal, while all other UEs are located in null zones.
      </p>
      <p>
        These <strong>null zones prevent UEs from hearing two conflicting and interfering streams</strong>, which would cause an error and
        require the data to be retransmitted, reducing overall throughput capability.
      </p>

      <p className="text-whisper">
        Image credit: Keysight Technologies, <a href="https://www.keysight.com/">keysight.com</a>
      </p>
    </figure>
  )
}
