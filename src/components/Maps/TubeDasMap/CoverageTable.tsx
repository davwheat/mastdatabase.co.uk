import React from 'react'

import { Networks, OperatorConnectivity } from '@components/Maps/TubeDasMap/MapData/CoveredSections'
import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import { NetworkToLogo } from './TubeDasMap'

const useTableStyles = makeStyles({
  root: {
    '& td, th': {
      textAlign: 'center !important',
      verticalAlign: 'middle',
      padding: '6px 6px',
      minWidth: 40,
    },
  },
  networkCell: {
    lineHeight: 1,
  },
  networkLogo: {
    height: '1.75em',
  },
  bandChip: {
    display: 'inline-block',
    padding: '4px 6px',
    borderRadius: 4,
    backgroundColor: Colors.success,
    color: 'black',
    margin: 2,
  },
  yesCoverage: {
    fontWeight: 'bold',
    color: Colors.darkGreen,
  },
  unknownCoverage: {
    fontWeight: 'bold',
    color: Colors.darkGrey,
  },
  noCoverage: {
    color: Colors.error,
  },
})

interface CoverageTableProps {
  coverage: OperatorConnectivity
}

export function CoverageTable({ coverage }: CoverageTableProps): React.ReactNode {
  const classes = useTableStyles()

  function bandsToHtml(bands?: string[] | null) {
    if (bands === null) {
      return (
        <span className={classes.noCoverage} aria-label="No coverage" data-tooltip>
          ╳
        </span>
      )
    }

    if (bands === undefined) {
      return (
        <span className={classes.unknownCoverage} aria-label="Coverage unknown" data-tooltip>
          ?
        </span>
      )
    }

    if (bands.length === 0) {
      return (
        <span className={classes.yesCoverage} aria-label="Coverage, but bands unknown" data-tooltip>
          ✔
        </span>
      )
    }

    return bands.map((band, i) => (
      <span key={`${band}__${i}`} className={classes.bandChip}>
        {band}
      </span>
    ))
  }

  return (
    <table className={classes.root}>
      <thead>
        <tr>
          <th>Network</th>
          <th>2G</th>
          <th>3G</th>
          <th>4G</th>
          <th>5G</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(coverage).map(([network, networkCoverage]) => {
          return (
            <tr key={network}>
              <td className={classes.networkCell}>
                <img alt={network} className={classes.networkLogo} src={NetworkToLogo[network as Networks]} />
              </td>
              <td>{bandsToHtml(networkCoverage?.['2G'])}</td>
              <td>{bandsToHtml(networkCoverage?.['3G'])}</td>
              <td>{bandsToHtml(networkCoverage?.['4G'])}</td>
              <td>{bandsToHtml(networkCoverage?.['5G'])}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
