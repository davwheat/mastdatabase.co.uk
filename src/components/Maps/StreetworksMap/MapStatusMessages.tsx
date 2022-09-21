import React from 'react'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

import LoadingSpinner from '@components/LoadingSpinner'
import Colors from '@data/colors.json'
import { useRecoilValue } from 'recoil'
import { StreetworksMapStatusMessagesAtom } from '@atoms'

export const StatusMessagesText = {
  loading: (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <LoadingSpinner inline size="1.1em" style={{ marginRight: 12, flexShrink: 0 }} /> Loading streetworks data...
    </span>
  ),
  fetchFail: 'Failed to load streetworks. Check your internet connection.',
  upstreamError: 'An error occurred with the one.network API. Please try again later.',
  tooManyPoints: 'Too many streetworks in this area. Please zoom in.',
  settingsError: 'Invalid settings. Please check the area above for errors.',
} as const

const InfoStatusKeys: StatusMessageKey[] = ['loading']
const ErrorStatusKeys: StatusMessageKey[] = ['fetchFail', 'tooManyPoints', 'settingsError', 'upstreamError']

type StatusMessageKey = keyof typeof StatusMessagesText
export type StatusMessages = Record<StatusMessageKey, boolean>

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16,
    fontSize: '1rem',
    placeItems: 'center',
    fontFamily: "'Jost', system-ui, sans-serif",

    position: 'absolute',
    zIndex: 1001,
    top: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    maxWidth: 'calc(100% - 56px)',

    textAlign: 'center',
  },
  message: {
    backgroundColor: 'white',
    padding: '8px 16px',
    borderTop: `4px solid ${Colors.blueDark}`,
  },
  messageInfo: {
    borderTopColor: Colors.primaryBlue,
  },
  messageError: {
    borderTopColor: Colors.primaryRed,
  },
})

export function MapStatusMessages() {
  const classes = useStyles()
  const messages = useRecoilValue(StreetworksMapStatusMessagesAtom)

  return (
    <div role="status" aria-live="polite" className={classes.root}>
      {Object.entries(StatusMessagesText)
        .filter(([messageKey]) => messages[messageKey as StatusMessageKey])
        .map(([messageKey, message]) => {
          return (
            <p
              key={messageKey}
              className={clsx(classes.message, {
                [classes.messageInfo]: InfoStatusKeys.includes(messageKey as StatusMessageKey),
                [classes.messageError]: ErrorStatusKeys.includes(messageKey as StatusMessageKey),
              })}
            >
              {message}
            </p>
          )
        })}
    </div>
  )
}
