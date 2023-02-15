import React from 'react'

import Colors from '@data/colors.json'
import { makeStyles } from '@material-ui/styles'

import dayjs, { Dayjs } from 'dayjs'
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat'
import clsx from 'clsx'

import SquiggleSvg from '@assets/images/squiggles/squiggle1.inline.svg'

dayjs.extend(dayjsLocalizedFormat)

export interface IPostPublishNoteBox {
  date: Date | Dayjs
  children: React.ReactNode
}

const useStyles = makeStyles({
  postPubNote: {
    padding: 16,

    '&:first-child': {
      paddingTop: 0,
    },
  },
  postPubTitle: {
    textAlign: 'center',
    marginBottom: '0 !important',
  },
  postPubSubtitle: {
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  factBody: {
    textAlign: 'center',
    '& p:last-child': {
      marginBottom: '0 !important',
    },
  },
  squiggle: {
    '&:first-child': {
      marginTop: 0,
    },

    display: 'block',
    margin: 'auto',
    color: Colors.primaryBlue,
    marginTop: '1.25em',
    marginBottom: '1.25em',
    height: '1.75em',
  },
})

export function PostPublishNote({ date, children }: IPostPublishNoteBox) {
  const classes = useStyles()

  return (
    <aside className={classes.postPubNote} role="note">
      <SquiggleSvg className={classes.squiggle} role="presentation" />

      <p className={clsx('text-louder', classes.postPubTitle)}>Post-publication note</p>
      <p className={clsx('text-whisper-loud', classes.postPubSubtitle)}>{dayjs(date).format('LLL')}</p>

      <div className={classes.factBody}>{children}</div>

      <SquiggleSvg className={classes.squiggle} role="presentation" />
    </aside>
  )
}
