import { Todo } from '../../lib/todos'
import { TodoButton } from '../TodoButton'
import { useState } from 'react'
import s from './TodoCard.module.css'

interface TodoProps {
  todo: Todo
  id: number
}

const TodoCard = ({ todo, id }: TodoProps) => {
  const [done, setDone] = useState(todo.completed)

  const handleDone = () => {
    setDone(!done)
  }

  return (
    <li className="bg-blue-300 rounded-lg p-2 m-1 shadow-sm" key={id}>
      <div className="flex justify-center font-bold">{todo.title}</div>
      <br />
      <div className="flex justify-center">{String(done)}</div>
      <TodoButton
        className="flex justify-center p-3"
        done={done}
        handleDone={handleDone}
      />
    </li>
  )
}

export default TodoCard
