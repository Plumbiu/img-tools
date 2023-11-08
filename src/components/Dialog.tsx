import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material'

import type { FC, ReactNode } from 'react'

interface Prop {
  open: boolean
  children: ReactNode
  title: string
  onClose: () => void
}

const Dialog: FC<Prop> = ({ onClose, children, open, title }) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <MuiDialog maxWidth={false} onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </MuiDialog>
  )
}

export default Dialog
