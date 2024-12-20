import React, { useEffect, useRef, useState } from 'react'

import { FrequencyBand, IFrequencyBand, IOperator, ITechnology, Operator, Technology } from '@components/Maps/MasteDatabasenMap/JsonApi/Models'
import SelectDropdown from '@components/Inputs/SelectDropdown'
import { MasteDatabasenMapOptionsAtom } from './MasteDatabasenMapOptionsAtom'

import { useRecoilState } from 'recoil'
import { makeStyles } from '@material-ui/core'
import Checkbox from '@components/Inputs/Checkbox'
import { formatFrequency } from 'mobile-spectrum-data/utils'

const useStyles = makeStyles({
  root: {
    '& h2 ~ h2': {
      marginTop: 32,
    },
  },
  input: {
    marginTop: 16,
  },
})

export default function MasteDatabasenMapSettings() {
  const [loadingModels, setLoadingModels] = useState<boolean | null>(null)
  const [mapOptions, setMapOptions] = useRecoilState(MasteDatabasenMapOptionsAtom)

  const classes = useStyles()

  const models = useRef({
    operators: [] as IOperator[],
    technologies: [] as ITechnology[],
    frequencyBands: [] as IFrequencyBand[],
  })

  useEffect(() => {
    const modelCount = 3

    if (loadingModels === null) {
      setLoadingModels(true)

      let finishedCount = 0

      Operator.all().then(operators => {
        models.current.operators = operators.toArray()
        finishedCount++

        if (finishedCount === modelCount) {
          setLoadingModels(false)
        }
      })

      Technology.all().then(technologies => {
        models.current.technologies = technologies.toArray()
        finishedCount++

        if (finishedCount === modelCount) {
          setLoadingModels(false)
        }
      })

      FrequencyBand.all().then(freq => {
        models.current.frequencyBands = freq.toArray()
        finishedCount++

        if (finishedCount === modelCount) {
          setLoadingModels(false)
        }
      })
    }
  })

  return (
    <div className={classes.root}>
      <h2 className="text-loud">Filter sites</h2>

      <SelectDropdown
        className={classes.input}
        label="Filter by operator"
        value={mapOptions.operatorId || 'all'}
        onChange={value => {
          setMapOptions(f => ({ ...f, operatorId: value === 'all' ? null : value }))
        }}
        options={[{ label: 'All', value: 'all' }, ...models.current.operators.map(m => ({ label: m.operatorName, value: m.id }))]}
      />

      <SelectDropdown
        className={classes.input}
        label="Filter by technology"
        value={mapOptions.technologyId || 'all'}
        onChange={value => {
          setMapOptions(f => ({ ...f, technologyId: value === 'all' ? null : value }))
        }}
        options={[{ label: 'All', value: 'all' }, ...models.current.technologies.map(m => ({ label: m.technologyName, value: m.id }))]}
      />

      <SelectDropdown
        className={classes.input}
        label="Filter by frequency"
        value={mapOptions.frequencyBand || 'all'}
        onChange={value => {
          setMapOptions(f => ({ ...f, frequencyBand: value === 'all' ? null : value }))
        }}
        options={[
          { label: 'All', value: 'all' },
          ...models.current.frequencyBands.map(m => ({ label: formatFrequency(m.frequencyBand), value: m.id })),
        ]}
      />

      <h2 className="text-loud">Settings</h2>

      <Checkbox
        label="Show predicted eNBs on labels (3 DK)"
        checked={mapOptions.showEnbOnLabel}
        onChange={x => {
          setMapOptions(f => ({ ...f, showEnbOnLabel: x.currentTarget.checked }))
        }}
      />
    </div>
  )
}
