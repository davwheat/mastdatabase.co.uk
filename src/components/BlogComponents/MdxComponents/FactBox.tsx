import React from 'react'

import Colors from '@data/colors.json'
import { makeStyles } from '@material-ui/styles'

export interface IFactBoxProps {
  title?: string
  children: React.ReactNode
}

const useStyles = makeStyles({
  factBox: {
    padding: 16,
    borderLeft: `8px solid ${Colors.primaryRed}`,
    marginTop: '1em',
    marginBottom: '1em',
    background: Colors.lightGrey,
  },
  factBody: {
    '& p:last-child': {
      marginBottom: '0 !important',
    },
  },
})

export function FactBox({ title = 'Interesting fact', children }: IFactBoxProps) {
  const classes = useStyles()

  return (
    <aside className={classes.factBox} role="note">
      {title && <p className="text-speak-up">{title}</p>}
      <div className={classes.factBody}>{children}</div>
    </aside>
  )
}
