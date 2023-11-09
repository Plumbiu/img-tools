import { Snackbar, Alert } from '@mui/material'
import type { FC } from 'react'

interface Props {
  open: boolean
}

const Toast: FC<Props> = ({ open }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
      open={open}
    >
      <Alert severity="success" sx={{ width: '100%' }} variant="filled">
        压缩成功
      </Alert>
    </Snackbar>
  )
}

export default Toast
