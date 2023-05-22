import React from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'

import Link from '@components/Links/Link'
import generateTransitions from '@functions/generateTransitions'

import dayjs from 'dayjs'
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(dayjsLocalizedFormat)

const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: 16,
    border: '2px solid #000',
    ...generateTransitions('box-shadow', 'short'),
    '&:hover, &:focus-within': {
      boxShadow: '0 0 0 2px black',
    },
  },
  subtitle: {
    textTransform: 'uppercase',
    marginBottom: 12,
    lineHeight: 1.2,
    color: '#666',
  },
  title: {
    marginBottom: 4,
    '& a::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
})

export interface IBlogCardProps {
  title: string
  date: string
  description: string
  slug: string
}

export const BlogCard = ({ title, date, description, slug }: IBlogCardProps) => {
  const classes = useStyles()

  return (
    <li className={classes.root}>
      <h2 className={clsx(classes.title, 'text-loud')}>
        <Link href={slug}>{title}</Link>
      </h2>

      <p className={clsx(classes.subtitle, 'text-whisper-loud')}>{dayjs(date).format('LL')}</p>
      <p>{description}</p>
    </li>
  )
}
