import React from 'react'

import { makeStyles } from '@material-ui/core'

import Twitter from 'mdi-react/TwitterIcon'
import LinkedIn from 'mdi-react/LinkedinIcon'
import GitHub from 'mdi-react/GithubIcon'
import Telegram from '@assets/icons/telegram.inline.svg'

const SOCIAL_MEDIA = [
  {
    name: 'Twitter',
    icon: <Twitter size={24} />,
    url: 'https://twitter.com/davwheat_',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedIn size={24} />,
    url: 'https://linkedin.com/in/davwheat',
  },
  {
    name: 'GitHub',
    icon: <GitHub />,
    url: 'https://github.com/davwheat',
  },
  {
    name: 'Telegram',
    icon: <Telegram />,
    url: 'https://t.me/davwheat',
  },
]

const useStyles = makeStyles({
  grid: {
    display: 'flex',
  },
  link: {
    width: 48,
    height: 48,
    border: '2px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:focus, &:active, &:hover': {
      background: '#fff',
      color: '#000',
    },

    '& + &': {
      marginLeft: 8,
    },
  },
  icon: {
    width: 24,
    height: 24,
  },
})

export default function SocialButtons() {
  const classes = useStyles()

  return (
    <aside>
      <p className="text-speak-up">Stalk me online</p>
      <div className={classes.grid}>
        {SOCIAL_MEDIA.map(({ name, icon, url }) => (
          <a href={url} key={name} target="_blank" className={classes.link} aria-label={name}>
            <span className={classes.icon}>{icon}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}
