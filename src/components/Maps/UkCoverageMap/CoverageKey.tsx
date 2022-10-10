import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { ICoverageLayerKey } from './Providers/CoverageProvider'

const useStyles = makeStyles({
  root: {
    padding: 12,
    marginTop: 16,
    border: '2px solid black',
    display: 'flex',
    flexDirection: 'column',
  },
  keyItem: {
    display: 'flex',
    alignItems: 'center',

    '& + &': {
      marginTop: 8,
    },
  },
  keyColor: {
    '--size': '1em',
    width: 'var(--size)',
    height: 'var(--size)',
    marginRight: 8,
    backgroundColor: 'var(--color)',
  },
  keyLabel: {
    margin: 0,
  },
})

interface ICoverageKeyProps {
  keyData: ICoverageLayerKey
}

export default function CoverageKey({ keyData }: ICoverageKeyProps) {
  const classes = useStyles()

  return (
    <div className={classes.root} aria-hidden="true">
      <h3 className="text-speak-up">Coverage key</h3>

      {keyData.key.map((keyItem, index) => (
        <div key={`${keyItem.color}__${keyItem.label}`} className={classes.keyItem}>
          <span className={classes.keyColor} style={{ '--color': keyItem.color } as any} />

          <p className={clsx('text-whisper-up', classes.keyLabel)}>{keyItem.label}</p>
        </div>
      ))}
    </div>
  )
}
