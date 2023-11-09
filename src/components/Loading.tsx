import { CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(1px)',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      <CircularProgress
        sx={{
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </div>
  )
}
