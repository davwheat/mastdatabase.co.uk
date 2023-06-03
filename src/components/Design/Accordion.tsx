import React, { useId, useState } from 'react'

import PlusIcon from 'mdi-react/PlusIcon'
import MinusIcon from 'mdi-react/MinusIcon'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

export interface AccordionProps {
  heading: string
  children: React.ReactNode
  headingComponent?: React.ElementType
  className?: string
}

const useStyles = makeStyles({
  accordion: {
    border: '2px solid black',
    backgroundColor: 'white',

    '& + &': {
      borderTop: 'none',
    },
  },
  heading: {
    margin: 0,
  },
  toggleButton: {
    '&&': {
      margin: 0,
      backgroundColor: Colors.lightGrey,
      padding: '8px 16px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      cursor: 'pointer',
    },
  },
  icon: {
    display: 'flex',
    marginRight: 4,
  },
  content: {
    padding: 16,
    borderTop: '2px solid black',
  },
})

export default function Accordion({ heading, children, headingComponent: HeadingComponent = 'h2', className }: AccordionProps) {
  const rootId = useId()
  const classes = useStyles()

  const buttonId = `accordion-button-${rootId}`
  const panelId = `accordion-panel-${rootId}`

  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggleExpanded() {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return (
    <div className={clsx(classes.accordion, className)}>
      <HeadingComponent className={classes.heading}>
        <button
          type="button"
          className={clsx(classes.toggleButton, 'Button--ua-reset')}
          id={buttonId}
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={toggleExpanded}
        >
          <span className={classes.icon}>
            {!isOpen && <PlusIcon />}
            {isOpen && <MinusIcon />}
          </span>

          {heading}
        </button>
      </HeadingComponent>
      <div className="Accordion-panel" id={panelId} aria-labelledby={buttonId}>
        {isOpen && <div className={classes.content}>{children}</div>}
      </div>
    </div>
  )
}
