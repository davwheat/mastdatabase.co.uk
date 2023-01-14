import React, { useCallback, useState } from 'react'

import Colors from '@data/colors.json'
import Breakpoints from '@data/breakpoints'

import Section from '@components/Design/Section'
import TextBox from '@components/Inputs/TextBox'
import Checkbox from '@components/Inputs/Checkbox'

import { makeStyles } from '@material-ui/styles'
import { atom, selectorFamily, useRecoilValue, useRecoilState } from 'recoil'

import {
  AvailableSortColumns,
  filterAndSortData,
  getArfcnName,
  getBandPrefix,
  getSortButton as _getSortButton,
  ISort,
} from '@functions/arfcnListHelpers'

import type { ArfcnDataItem } from 'mobile-spectrum-data/@types'

const useStyles = makeStyles({
  table: {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    display: 'block',
    margin: 'auto',
    maxWidth: '100%',
    width: 'max-content',

    '&::-webkit-scrollbar': {
      width: 16,
      height: 16,
    },
    '&::-webkit-scrollbar-button': {
      width: 0,
      height: 0,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#fff',
      borderTop: '2px solid #000',
      borderRadius: 0,
      '&:hover': {
        background: '#fff',
      },
      '&:active': {
        background: Colors.lightGrey,
      },
    },
    '&::-webkit-scrollbar-track': {
      background: '#000',
      borderTop: '2px solid #000',
      borderRadius: 0,
      '&:hover': {
        background: '#000',
      },
      '&:active': {
        background: '#000',
      },
    },
    '&::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
  },
  tableHeader: {
    '& th span': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  filter: {
    padding: 24,
    // Makes the padding look more even
    paddingTop: 20,
    background: Colors.lightGrey,
  },
  sortFilterRelevanceCheckbox: {
    marginTop: 8,
  },
  arfcnTypeButtonContainer: {
    display: 'grid',
    margin: 0,
    marginBottom: 16,

    gridTemplateColumns: 'repeat(auto-fit, minmax(10px, 1fr))',

    [Breakpoints.between.phone.and.bigPhone]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(10px, 1fr))',
    },

    [Breakpoints.upTo.phone]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(10px, 1fr))',
    },
  },
  arfcnTypeButton: {
    padding: 16,
    color: '#000',
    textAlign: 'center',
    font: 'inherit',
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'relative',
    appearance: 'none',
    border: 'none',
    background: 'none',

    [Breakpoints.upTo.phone]: {
      padding: 12,
    },

    '& .sr-only': {
      display: 'none',
    },

    '&[data-selected]:not([data-selected="false"])': {
      background: '#000',
      color: '#fff',

      '& .sr-only': {
        display: 'inline',
      },
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    '&:hover::after': {
      border: `2px solid #000`,
    },

    '&:focus': {
      outline: `4px solid ${Colors.primaryBlue}`,

      '&:not(:focus-visible)': {
        outline: 'none',
      },
    },
  },
})

export type SupportedArfcnListRats = 'lte' | 'nr'

export interface IArfcnListProps {
  heading: string
  ratData: Partial<Record<SupportedArfcnListRats, ArfcnDataItem[]>>
}

const filterAtom = atom<{ query: string; sortByRelevance: boolean; sortCol: ISort['column']; sortDirection: ISort['direction'] }>({
  key: 'arfcnList_filterSortQueryAtom',
  default: {
    query: '',
    sortByRelevance: true,
    sortCol: 'arfcn',
    sortDirection: 'asc',
  },
})

type SerializableArfcnDataItem = Omit<ArfcnDataItem, 'bandwidth'> | (Omit<ArfcnDataItem, 'bandwidth'> & { bandwidth: number | number[] })

const ArfcnListFilteredDataSelector = selectorFamily({
  key: 'arfcnList_filteredDataSelector',

  get:
    (dataset: SerializableArfcnDataItem[] | false) =>
    ({ get }): ArfcnDataItem[] => {
      if (!dataset) {
        return []
      }

      const { query: filterQuery, sortByRelevance: sortByFilterRelevance, sortCol, sortDirection } = get(filterAtom)

      const sort: ISort = {
        column: sortCol,
        direction: sortDirection,
      }

      return filterAndSortData(dataset, filterQuery, sortByFilterRelevance, sort)
    },
})

function ArfcnList({ heading, ratData }: IArfcnListProps) {
  const classes = useStyles()
  const ratButtonsToShow = Object.keys(ratData) as unknown as SupportedArfcnListRats[]

  const [{ query: filterQuery, sortByRelevance: sortByFilterRelevance }, setFilter] = useRecoilState(filterAtom)

  const [selectedRat, setSelectedRat] = useState<SupportedArfcnListRats>(ratButtonsToShow.includes('lte') ? 'lte' : ratButtonsToShow[0])

  return (
    <>
      <Section width="normal">
        <h2 className="text-louder">{heading}</h2>

        <h3 className="text-loud">Radio access technology (RAT)</h3>
        <nav className={classes.arfcnTypeButtonContainer}>
          {ratButtonsToShow.includes('lte') && (
            <button className={classes.arfcnTypeButton} onClick={() => setSelectedRat('lte')} data-selected={selectedRat === 'lte'}>
              4G LTE
              <span className="sr-only">(Selected)</span>
            </button>
          )}
          {ratButtonsToShow.includes('nr') && (
            <button className={classes.arfcnTypeButton} onClick={() => setSelectedRat('nr')} data-selected={selectedRat === 'nr'}>
              5G NR
              <span className="sr-only">(Selected)</span>
            </button>
          )}
        </nav>

        <h3 className="text-loud">Filtering</h3>
        <div className={classes.filter}>
          <TextBox
            label="Filter list"
            value={filterQuery}
            onInput={val => setFilter(filter => ({ ...filter, query: val }))}
            placeholder="Filter by any field..."
          />

          <Checkbox
            className={classes.sortFilterRelevanceCheckbox}
            disabled={filterQuery.trim() === ''}
            label="Sort by filter relevance"
            checked={sortByFilterRelevance}
            onChange={() => setFilter(filter => ({ ...filter, sortByRelevance: !filter.sortByRelevance }))}
          />
        </div>
      </Section>

      <ArfcnListTable selectedRat={selectedRat} ratData={ratData} />
    </>
  )
}

const useTableStyles = makeStyles({
  table: {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    display: 'block',
    margin: 'auto',
    maxWidth: '100%',
    width: 'max-content',

    '&::-webkit-scrollbar': {
      width: 16,
      height: 16,
    },
    '&::-webkit-scrollbar-button': {
      width: 0,
      height: 0,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#fff',
      borderTop: '2px solid #000',
      borderRadius: 0,
      '&:hover': {
        background: '#fff',
      },
      '&:active': {
        background: Colors.lightGrey,
      },
    },
    '&::-webkit-scrollbar-track': {
      background: '#000',
      borderTop: '2px solid #000',
      borderRadius: 0,
      '&:hover': {
        background: '#000',
      },
      '&:active': {
        background: '#000',
      },
    },
    '&::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
  },
  tableHeader: {
    '& th span': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  arfcnTypeButtonContainer: {
    display: 'grid',
    margin: 0,
    marginBottom: 16,

    gridTemplateColumns: 'repeat(auto-fit, minmax(10px, 1fr))',

    [Breakpoints.between.phone.and.bigPhone]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(10px, 1fr))',
    },

    [Breakpoints.upTo.phone]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(auto-fit, minmax(10px, 1fr))',
    },
  },
  arfcnTypeButton: {
    padding: 16,
    color: '#000',
    textAlign: 'center',
    font: 'inherit',
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'relative',
    appearance: 'none',
    border: 'none',
    background: 'none',

    [Breakpoints.upTo.phone]: {
      padding: 12,
    },

    '& .sr-only': {
      display: 'none',
    },

    '&[data-selected]:not([data-selected="false"])': {
      background: '#000',
      color: '#fff',

      '& .sr-only': {
        display: 'inline',
      },
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    '&:hover::after': {
      border: `2px solid #000`,
    },

    '&:focus': {
      outline: `4px solid ${Colors.primaryBlue}`,

      '&:not(:focus-visible)': {
        outline: 'none',
      },
    },
  },
})

interface ArfcnListTableProps {
  selectedRat: SupportedArfcnListRats
  ratData: IArfcnListProps['ratData']
}

function ArfcnListTable({ selectedRat, ratData }: ArfcnListTableProps) {
  const filteredData = useRecoilValue(ArfcnListFilteredDataSelector(ratData[selectedRat] ?? false))

  const [{ query: filterQuery, sortByRelevance: sortByFilterRelevance, sortCol, sortDirection }, setFilter] = useRecoilState(filterAtom)

  const sort: ISort = {
    column: sortCol,
    direction: sortDirection,
  }

  const getSortButton = useCallback(
    (col: AvailableSortColumns, type: 'num' | 'alpha') => {
      return _getSortButton(col, type, sort, filterQuery, sortByFilterRelevance, (sort: ISort | ((sort: ISort) => ISort)) => {
        setFilter(prev => {
          if (typeof sort === 'function') {
            const newSort = sort({ column: prev.sortCol, direction: prev.sortDirection })
            return { ...prev, sortCol: newSort.column, sortDirection: newSort.direction }
          }

          return {
            ...prev,
            sortCol: sort.column,
            sortDirection: sort.direction,
          }
        })
      })
    },
    [_getSortButton, setFilter, sort.column, sort.direction, filterQuery, sortByFilterRelevance],
  )

  const classes = useTableStyles()

  return (
    <Section width="full">
      <table className={classes.table}>
        <thead className={classes.tableHeader}>
          <tr>
            <th>
              <span>
                {getArfcnName(selectedRat)} {getSortButton('arfcn', 'num')}
              </span>
            </th>
            <th>
              <span>Bandwidth {getSortButton('bandwidth', 'num')}</span>
            </th>
            <th>
              <span>Band {getSortButton('band', 'num')}</span>
            </th>
            <th>
              <span>Operator {getSortButton('operator', 'alpha')}</span>
            </th>
            <th>
              <span>Description</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map?.(earfcn => (
            <tr key={earfcn.arfcn}>
              <td>{earfcn.arfcn}</td>
              <td>{earfcn.bandwidth ? `${Array.isArray(earfcn.bandwidth) ? earfcn.bandwidth.join(', ') : earfcn.bandwidth} MHz` : 'Unknown'}</td>
              <td>
                {getBandPrefix(selectedRat)}
                {earfcn.band}
              </td>
              <td>{earfcn.operator}</td>
              <td>{earfcn.description}</td>
            </tr>
          ))}
          {filteredData?.length === 0 && (
            <tr key="__noresults">
              <td colSpan={5}>No results match your filter</td>
            </tr>
          )}
        </tbody>
      </table>
    </Section>
  )
}

export default ArfcnList
