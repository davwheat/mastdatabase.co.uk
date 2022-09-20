import React, { useRef } from 'react'
import Section from '@components/Design/Section'

import { useRecoilState } from 'recoil'
import { StreetworksMapPersistentSettingsAtom, StreetworksMapSettingsAtom } from '@atoms'
import { makeStyles } from '@material-ui/core'
import Breakpoints from '@data/breakpoints'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import DateSelect from '@components/Inputs/DateSelect'

const useStyles = makeStyles({
  dateRangeContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,

    [Breakpoints.upTo.bigPhone]: {
      gridTemplateColumns: '1fr',
    },
  },
})

export function StreetworksMapSettings() {
  const classes = useStyles()

  const { current: ids } = useRef({
    dateStart: nanoid(),
    dateEnd: nanoid(),
  })

  const [settings, setSettings] = useRecoilState(StreetworksMapSettingsAtom)
  const [persistentSettings, setPersistentSettings] = useRecoilState(StreetworksMapPersistentSettingsAtom)

  return (
    <Section darker>
      <h2 className="text-loud">Settings</h2>

      <div className={classes.dateRangeContainer}>
        <label htmlFor={ids.dateStart}>
          <input
            type="date"
            id={ids.dateStart}
            value={dayjs(settings.streetworksStartDate).format('YYYY-MM-DD')}
            onInput={e => {
              setSettings(prev => ({
                ...prev,
                dateStart: dayjs(e.currentTarget.value).startOf('day'),
              }))
            }}
          />
        </label>

        <DateSelect
          label="Start date"
          defaultValue={dayjs(settings.streetworksStartDate).toDate()}
          onInput={e => {
            setSettings(prev => ({
              ...prev,
              streetworksStartDate: dayjs(e).endOf('day').valueOf(),
            }))
          }}
        />

        <DateSelect
          label="End date"
          defaultValue={dayjs(settings.streetworksEndDate).toDate()}
          onInput={e => {
            setSettings(prev => ({
              ...prev,
              streetworksEndDate: dayjs(e).endOf('day').valueOf(),
            }))
          }}
        />

        <label htmlFor={ids.dateEnd}>
          <input type="date" id={ids.dateEnd} />
        </label>
      </div>
    </Section>
  )
}
