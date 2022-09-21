import React from 'react'

import Section from '@components/Design/Section'
import DateSelect from '@components/Inputs/DateSelect'
import { StreetworksMapPersistentSettingsAtom, StreetworksMapSettingsAtom } from '@atoms'
import Breakpoints from '@data/breakpoints'

import { makeStyles } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import dayjs from 'dayjs'
import MinorAlert, { IMinorAlertProps } from '@components/Design/MinorAlert'
import SelectDropdown from '@components/Inputs/SelectDropdown'

const useStyles = makeStyles({
  dateRangeContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 16,

    [Breakpoints.upTo.bigPhone]: {
      gridTemplateColumns: '1fr',
    },
  },
  dateRangeWarning: {
    gridColumn: '1 / -1',
  },
})

function getStreetworksAlertMessage(
  startTime: number,
  endTime: number,
): undefined | { heading: string; message: string; color: IMinorAlertProps['color'] } {
  const isEndBeforeStart = endTime < startTime

  if (isEndBeforeStart) {
    return {
      heading: 'Invalid date range',
      message: 'The end date must be after the start date.',
      color: 'primaryRed',
    }
  }

  const includesPast = dayjs(startTime).isBefore(dayjs().startOf('day'))

  if (includesPast) {
    return {
      color: 'cautioningAmber',
      heading: 'Warning',
      message: 'Not all streetworks show for historical dates.',
    }
  }

  const timeFrameDays = dayjs(startTime).diff(endTime, 'day')

  if (timeFrameDays > 120) {
    return {
      color: 'cautioningAmber',
      heading: 'Warning',
      message: 'Larger time frames mean you must zoom in further to see streetworks.',
    }
  }
}

export function StreetworksMapSettings() {
  const classes = useStyles()

  const [settings, setSettings] = useRecoilState(StreetworksMapSettingsAtom)
  const [persistentSettings, setPersistentSettings] = useRecoilState(StreetworksMapPersistentSettingsAtom)

  const alertMessage = getStreetworksAlertMessage(settings.streetworksStartDate, settings.streetworksEndDate)

  return (
    <Section darker>
      <h2 className="text-loud">Filter options</h2>

      <fieldset>
        <div className={classes.dateRangeContainer}>
          <DateSelect
            label="Start date"
            value={dayjs(settings.streetworksStartDate).toDate()}
            onInput={e => {
              const newStart = dayjs(e).endOf('day').valueOf()

              setSettings(prev => ({
                ...prev,
                streetworksStartDate: newStart,
              }))
            }}
          />

          <DateSelect
            label="End date"
            value={dayjs(settings.streetworksEndDate).toDate()}
            onInput={e => {
              const newEnd = dayjs(e).endOf('day').valueOf()

              setSettings(prev => ({
                ...prev,
                streetworksEndDate: newEnd,
              }))
            }}
          />

          <SelectDropdown
            label="Timeframe presets"
            onChange={val => {
              const now = dayjs().startOf('day').valueOf()
              const then = dayjs().add(parseInt(val), 'day').endOf('day').valueOf()

              const start = Math.min(now, then)
              const end = Math.max(now, then)

              setSettings(prev => ({
                ...prev,
                streetworksStartDate: start,
                streetworksEndDate: end,
              }))
            }}
            value=""
            options={[
              { label: 'Choose a preset...', value: '' },
              {
                label: 'Since records began',
                value: '-365',
              },
              {
                label: 'Previous 2 weeks',
                value: '-14',
              },
              {
                label: 'Next 7 days',
                value: '7',
              },
              {
                label: 'Next 14 days',
                value: '14',
              },
              {
                label: 'Next 28 days',
                value: '28',
              },
              {
                label: 'Next 2 months',
                value: '60',
              },
              {
                label: 'Next 3 months',
                value: '90',
              },
              {
                label: 'Next 6 months',
                value: '120',
              },
              {
                label: 'Next 12 months',
                value: '365',
              },
            ]}
          />

          {alertMessage && (
            <MinorAlert coloredBackground className={classes.dateRangeWarning} color={alertMessage.color} heading={alertMessage.heading}>
              {alertMessage.message}
            </MinorAlert>
          )}
        </div>
      </fieldset>
    </Section>
  )
}
