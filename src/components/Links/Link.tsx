import React from 'react'

import { Link as GatsbyLink } from 'gatsby'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles({
  link: {
    fontWeight: 700,
    textDecoration: 'underline',
  },
})

export interface ILinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  /**
   * If present, will force as internal/external. Otherwise will auto-detect.
   */
  internal?: boolean
}

function isExternalLink(url: string): boolean {
  const regex = /^(https?:\/\/|mailto:)/

  return !!url?.match(regex)
}

const Link = ({ href, children, className, internal, ...props }: ILinkProps) => {
  const classes = useStyles()

  const linkProps = {
    className: clsx(classes.link, className),
    ...props,
  }

  if (internal === false || (internal !== true && isExternalLink(href))) {
    return (
      <a href={href} rel="noopener" {...linkProps}>
        {children}
      </a>
    )
  }

  return (
    <GatsbyLink to={href} {...linkProps}>
      {children}
    </GatsbyLink>
  )
}

export default Link
