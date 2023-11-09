import { Dialog as MuiDialog, DialogTitle, Button, Stack } from '@mui/material'

import type { FC, ReactNode } from 'react'

interface Prop {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  ziped: string | undefined
  origin: string | undefined
}

const Dialog: FC<Prop> = ({
  onClose,
  ziped,
  origin,
  open,
  title,
  children,
}) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <MuiDialog maxWidth={false} onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <Stack direction="row" spacing={2}>
        <img
          alt="origin img"
          className="preview-img"
          height="400"
          src={origin}
        />
        <img alt="ziped img" className="preview-img" height="400" src={ziped} />
      </Stack>
      {children}
    </MuiDialog>
  )
}

export default Dialog
