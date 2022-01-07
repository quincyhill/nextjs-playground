import cn from 'classnames'

interface AlertProps {
  children: React.ReactNode
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error'
}

const Alert = ({ children, type }: AlertProps) => {
  return (
    <div
      className={cn({
        ['text-green-500']: type === 'success',
        ['text-red-500']: type === 'error',
      })}
    >
      {children}
    </div>
  )
}

export default Alert
