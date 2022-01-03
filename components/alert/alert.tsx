import styles from './alert.module.css'
import cn from 'classnames'

interface AlertProps {
  children: React.ReactNode
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error'
}

const Alert = ({ children, type }: AlertProps) => {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {children}
    </div>
  )
}

export default Alert
