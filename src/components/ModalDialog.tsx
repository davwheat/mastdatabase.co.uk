import React, { useContext, useRef } from 'react'

import { Backdrop, makeStyles, Modal, ModalProps, Fade } from '@material-ui/core'
import { nanoid } from 'nanoid'
import CrossIcon from 'mdi-react/CloseIcon'
import clsx from 'clsx'

const useDialogStyles = makeStyles({
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100vw',
    maxHeight: '100vh',
  },
  modalRoot: {
    maxWidth: '100vw',
    maxHeight: '100vh',
    overflow: 'auto',
    background: '#fff',
    border: '2px solid black',
    display: 'block',

    outline: 'none',
  },
})

interface ModalDialogIds {
  title: string
  body: string
}

const ModalIdContext = React.createContext<ModalDialogIds | null>(null)
const ModalStateContext = React.createContext<{ closeModal: () => void }>(null)

/**
 * React hook which can be used inside the component hierarchy of a modal
 * to close it using the `onClose` prop passed to the Modal.
 */
export function useCloseModal() {
  return React.useContext(ModalStateContext).closeModal
}

export function ModalDialog({ children, open, className, ...props }: ModalProps) {
  const classes = useDialogStyles()

  const { current: ids } = useRef<ModalDialogIds>({
    title: nanoid(),
    body: nanoid(),
  })

  return (
    <Modal
      open={open}
      {...props}
      className={clsx(classes.modalContainer, className)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div role="dialog" aria-modal="true" aria-labelledby={ids.title} aria-describedby={ids.body} className={classes.modalRoot}>
          <ModalStateContext.Provider value={{ closeModal: () => props.onClose({}, 'backdropClick') }}>
            <ModalIdContext.Provider value={ids}>{children}</ModalIdContext.Provider>
          </ModalStateContext.Provider>
        </div>
      </Fade>
    </Modal>
  )
}

const useDialogContentStyles = makeStyles({
  modalContent: {
    padding: '28px 24px',
    '& :last-child': {
      marginBottom: 0,
    },
  },
})

export function ModalDialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const classes = useDialogContentStyles()

  const { body: id } = useContext(ModalIdContext)

  return (
    <main className={clsx(classes.modalContent, className)} id={id}>
      {children}
    </main>
  )
}

const useDialogHeaderStyles = makeStyles({
  modalHeader: {
    padding: '8px 24px',
    background: 'black',
    color: 'white',
  },
})

export function ModalDialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  const classes = useDialogHeaderStyles()

  const { title: id } = useContext(ModalIdContext)

  return (
    <header className={clsx(classes.modalHeader, className)} id={id}>
      {children}
    </header>
  )
}

const useDialogHeaderAndTitleStyles = makeStyles({
  modalHeaderAndTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
  },
  modalTitle: {
    margin: 0,
  },
})

export function ModalDialogHeaderAndTitle({ title, className }: { title: React.ReactNode; className?: string }) {
  const classes = useDialogHeaderAndTitleStyles()

  return (
    <ModalDialogHeader className={clsx(classes.modalHeaderAndTitle, className)}>
      <h2 className={clsx('text-loud', classes.modalTitle)}>{title}</h2>
      <ModalDialogCloseButton />
    </ModalDialogHeader>
  )
}

const useDialogCloseButtonStyles = makeStyles({
  modalCloseButton: {
    all: 'unset',
    cursor: 'pointer',
    display: 'inline-flex',
    padding: 8,
    marginLeft: 16,

    '&:focus-visible': {
      outline: `5px auto Highlight`,
      webkitOutline: `5px auto -webkit-focus-ring-color`,
    },
  },
})

export function ModalDialogCloseButton({ className }: { className?: string }) {
  const classes = useDialogCloseButtonStyles()
  const closeModal = useCloseModal()

  return (
    <button className={clsx(classes.modalCloseButton, className)} aria-label="Close modal dialog" onClick={closeModal}>
      <CrossIcon />
    </button>
  )
}
