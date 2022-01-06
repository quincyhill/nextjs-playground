import { FC, Component } from 'react'
import cn from 'classnames'
import s from './TodoButton.module.css'

interface TodoButtonProps {
  done: boolean
  className?: string
  handleDone: () => void
}

const TodoButton: FC<TodoButtonProps> = ({
  done,
  className,
  handleDone,
}: TodoButtonProps) => {
  return (
    <div className={className}>
      <button
        onClick={handleDone}
        className={`${s.btn} ${cn({
          'text-white font-bold py-2 px-4 rounded': true,
          'text-gray-300': done,
        })}`}
      >
        {done ? 'Done' : 'Not done'}
      </button>
    </div>
  )
}

export default TodoButton
