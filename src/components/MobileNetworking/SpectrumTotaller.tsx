import React from 'react'

import { formatFrequency } from 'mobile-spectrum-data/utils'
import { makeStyles } from '@material-ui/core'
import { getOperatorInfoByNameOrAlias } from 'mobile-spectrum-data/OperatorInfo'

import type { SpectrumBlock, SpectrumData } from 'mobile-spectrum-data/@types'

export interface SpectrumTotallerProps {
  bandsData: SpectrumData[]
  countryCode: string
  style?: React.CSSProperties
  hideMmwave?: boolean
}

const useStyles = makeStyles({
  table: {
    marginTop: '24px !important',
    fontVariantNumeric: 'tabular-nums',
    overflowX: 'auto',
    maxWidth: '100%',
    width: 'max-content',
    display: 'block',
    whiteSpace: 'nowrap',
  },
  boldCell: {
    fontWeight: 'bold',
  },
})

function aggregateBandsData(country: string, bandsData: SpectrumData[]): Record<string, Record<number, number>> {
  function getFreqCategory(freq: number): number {
    if (freq < 1000) {
      return 0
    } else if (freq < 3000) {
      return 1
    } else if (freq < 6000) {
      return 2
    } else {
      return 3
    }
  }

  const blocksByOperator = bandsData.reduce(
    (acc, band) => {
      if (band.extraInfo?.excludeFromSpectrumTotal) {
        return acc
      }

      band.spectrumData.forEach(block => {
        let accArr: SpectrumBlock[] = []

        const operatorInfo =
          getOperatorInfoByNameOrAlias(country, block.ownerLongName ?? '') ?? getOperatorInfoByNameOrAlias(country, block.owner ?? '')

        if (operatorInfo === null) return

        const name = operatorInfo.name

        acc[name] ||= accArr

        acc[name].push(block)
      })

      return acc
    },
    {} as Record<string, SpectrumBlock[]>,
  )

  const total = Object.entries(blocksByOperator).reduce(
    (acc, [operator, blocks]) => {
      const total = blocks.reduce(
        (acc, block) => {
          const category = getFreqCategory(block.startFreq)

          acc[category] ||= 0

          acc[category] += block.endFreq - block.startFreq

          return acc
        },
        {} as Record<number, number>,
      )

      acc[operator] = total

      return acc
    },
    {} as Record<string, Record<number, number>>,
  )

  return total
}

export default function SpectrumTotaller({ bandsData, countryCode, style, hideMmwave = false }: SpectrumTotallerProps) {
  const classes = useStyles()

  const data = Object.entries(aggregateBandsData(countryCode, bandsData))

  // sort by total
  data.sort((a, b) => {
    const aTotal = Object.values(a[1]).reduce((acc, val) => acc + val, 0)
    const bTotal = Object.values(b[1]).reduce((acc, val) => acc + val, 0)

    return bTotal - aTotal
  })

  return (
    <table className={classes.table} style={style}>
      <thead>
        <tr>
          <th>Operator</th>
          <th>&lt;1 GHz</th>
          <th>1&ndash;3 GHz</th>
          <th>3&ndash;6 GHz</th>
          {!hideMmwave && <th>&gt;6 GHz</th>}
          <th>Total</th>
          {!hideMmwave && <th>Total (Sub-6)</th>}
        </tr>
      </thead>
      <tbody>
        {data.map(([operator, totals]) => (
          <tr key={operator}>
            <td className={classes.boldCell}>{operator}</td>
            <td>{formatFrequency(totals[0] ?? 0)}</td>
            <td>{formatFrequency(totals[1] ?? 0)}</td>
            <td>{formatFrequency(totals[2] ?? 0)}</td>
            {!hideMmwave && <td>{formatFrequency(totals[3] ?? 0)}</td>}
            <td className={classes.boldCell}>{formatFrequency(Object.values(totals).reduce((acc, val) => acc + val, 0))}</td>
            {!hideMmwave && (
              <td className={classes.boldCell}>
                {formatFrequency(
                  Object.entries(totals)
                    .filter(([key, data]) => key !== '3')
                    .map(([key, data]) => data)
                    .reduce((acc, val) => acc + val, 0),
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
