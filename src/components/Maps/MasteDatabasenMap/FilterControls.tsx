import React, { useEffect, useRef, useState } from 'react'

import { IOperator, ITechnology, Operator, Technology } from '@components/Maps/MasteDatabasenMap/JsonApi/Models'
import SelectDropdown from '@components/Inputs/SelectDropdown'
import { MasteDatabasenFilterAtom } from './MasteDatabasenFilterAtom'

import { useRecoilState } from 'recoil'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {},
  input: {
    marginTop: 16,
  },
})

export default function MasteDatabasenFilterControls() {
  const [loadingModels, setLoadingModels] = useState<boolean | null>(null)
  const [filterState, setFilterState] = useRecoilState(MasteDatabasenFilterAtom)

  const classes = useStyles()

  const models = useRef({
    operators: [] as IOperator[],
    technologies: [] as ITechnology[],
  })

  useEffect(() => {
    if (loadingModels === null) {
      setLoadingModels(true)

      let finishedCount = 0

      Operator.all().then(operators => {
        models.current.operators = operators.toArray()
        finishedCount++

        if (finishedCount === 2) {
          setLoadingModels(false)
        }
      })
      Technology.all().then(technologies => {
        models.current.technologies = technologies.toArray()
        finishedCount++

        if (finishedCount === 2) {
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
        value={filterState.operatorId || 'all'}
        onChange={value => {
          setFilterState(f => ({ ...f, operatorId: value === 'all' ? null : value }))
        }}
        options={[{ label: 'All', value: 'all' }, ...models.current.operators.map(m => ({ label: m.operatorName, value: m.id }))]}
      />

      <SelectDropdown
        className={classes.input}
        label="Filter by technology"
        value={filterState.technologyId || 'all'}
        onChange={value => {
          setFilterState(f => ({ ...f, technologyId: value === 'all' ? null : value }))
        }}
        options={[{ label: 'All', value: 'all' }, ...models.current.technologies.map(m => ({ label: m.technologyName, value: m.id }))]}
      />
    </div>
  )
}
