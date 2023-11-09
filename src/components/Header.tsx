import { Button } from '@mui/material'
import type { FC } from 'react'
import { GithubIcon } from './icons'

interface Props {}

const Header: FC<Props> = ({}) => {
  return (
    <header>
      <Button
        component="a"
        href="https://github.plumbiu.top"
        startIcon={<GithubIcon />}
        target="_blank"
      >
        API 使用
      </Button>
    </header>
  )
}

export default Header
