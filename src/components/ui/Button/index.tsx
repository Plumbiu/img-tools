import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styles from './index.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  )
}

export default Button
