import React, { useState, useCallback } from 'react'

import { ModalDialog, ModalDialogContent, ModalDialogHeaderAndTitle } from '@components/ModalDialog'
import Checkbox from '@components/Inputs/Checkbox'
import ButtonLink from '@components/Links/ButtonLink'

import {
  getPromoterStates,
  IOneNetworkStreetworksPromoter,
  AllStreetworksPromoters,
  setPromoterState,
  setAllPromotersState,
} from '@functions/maps/streetworks/streetworksPromoterUtils'
import Breakpoints from '@data/breakpoints'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles({
  categoryHeader: {
    marginBottom: 8,
    paddingTop: 12,
    display: 'table',
  },
  checkbox: {
    '& + $checkbox': {
      marginTop: 4,
    },
  },
  enableDisableAllContainer: {
    display: 'grid',
    padding: 8,
    gap: 16,

    [Breakpoints.downTo.bigPhone]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
})

export function PromoterSettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const classes = useStyles()

  const [promoterStates, setPromoterStates] = useState(getPromoterStates())

  const promotersByCategory = AllStreetworksPromoters.reduce(
    (acc, promoter) => {
      acc[promoter.category] ||= []
      acc[promoter.category].push(promoter)
      return acc
    },
    {} as Record<string, IOneNetworkStreetworksPromoter[]>,
  )

  function refreshPromoterStates() {
    setPromoterStates(getPromoterStates())
  }

  const setAllPromoters = useCallback(
    (state: boolean) => {
      setAllPromotersState(state)
      refreshPromoterStates()
    },
    [setAllPromotersState, refreshPromoterStates],
  )

  return (
    <ModalDialog open={open} onClose={() => onClose()}>
      <ModalDialogHeaderAndTitle title="Promoter settings" />
      <ModalDialogContent>
        <p className="text-speak">Choose to show or hide specific promoters from the map.</p>
        <p className="text-whisper">These options are automatically saved in your browser for next time you visit this site.</p>

        <div className={classes.enableDisableAllContainer}>
          <ButtonLink onClick={() => setAllPromoters(true)}>Enable all</ButtonLink>
          <ButtonLink onClick={() => setAllPromoters(false)}>Disable all</ButtonLink>
        </div>

        <form onSubmit={e => e.preventDefault()}>
          {Object.entries(promotersByCategory).map(([category, promoters]) => {
            return (
              <fieldset key={category}>
                <legend className={clsx('text-speak-up', classes.categoryHeader)}>{category}</legend>

                {promoters.map(promoter => (
                  <Checkbox
                    label={`${promoter.name} (${promoter.icon.text.toUpperCase()})`}
                    onChange={() => {
                      setPromoterState(promoter.id, !promoterStates[promoter.id])
                      refreshPromoterStates()
                    }}
                    key={promoter.id}
                    checked={promoterStates[promoter.id]}
                    className={classes.checkbox}
                  />
                ))}
              </fieldset>
            )
          })}
        </form>
      </ModalDialogContent>
    </ModalDialog>
  )
}
