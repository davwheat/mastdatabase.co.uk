import React from 'react'

import { makeStyles } from '@material-ui/styles'

import TickIcon from '@assets/icons/tick.svg'

interface IBenefit {
  text: string
  description?: string[]
}

export interface IBenefitsTableProps {
  /**
   * Array of column headings
   */
  columnHeadings: [string, string]
  /**
   *
   */
  children: () => [IBenefit[], IBenefit[]]
}

const useStyles = makeStyles({
  table: {
    margin: '1em auto !important',
  },
  tableCell: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: 8,

    '&::before': {
      content: '""',
      display: 'block',

      background: `url(${TickIcon}) no-repeat bottom`,
      width: '1em',
      height: '1.1em',
    },

    '& .list': {
      paddingLeft: 4,
      marginTop: 8,
      marginBottom: '0 !important',
    },
  },
})

export function BenefitsTable({ columnHeadings, children }: IBenefitsTableProps) {
  const classes = useStyles()
  const data = children()

  const childrenByRow: [IBenefit, IBenefit][] = Array.from(Array(Math.max(data[0].length, data[1].length)), () => [null, null])

  data[0].forEach((c, i) => {
    childrenByRow[i][0] = c
  })
  data[1].forEach((c, i) => {
    childrenByRow[i][1] = c
  })

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {columnHeadings?.map(heading => (
            <th key={heading}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {childrenByRow.map(benefits => (
          <tr key={benefits?.[0]?.text + benefits?.[1]?.text}>
            {benefits?.map((benefit, i) => {
              if (!benefit) return <td key={`${i}__empty`} />

              return (
                <td key={benefit.text}>
                  <div className={classes.tableCell}>
                    <div>
                      <span className="text-speak-up">{benefit.text}</span>

                      {benefit.description && (
                        <ul className="list">
                          {benefit.description?.map(item => (
                            <li className="text-whisper-up" key={item}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
