import { Todo } from '../lib/todos'
import { TodoButton } from '../components'
import { useState } from 'react'
import Image from 'next/image'
import { Draggable } from 'react-beautiful-dnd'

interface TodoProps {
  todo: Todo
  key: number
}

const TodoCard = ({ todo, key }: TodoProps) => {
  const [done, setDone] = useState(todo.completed)

  const handleDone = () => {
    setDone(!done)
  }

  return (
    <li
      className="m-2 p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg flex items-center "
      key={key}
    >
      <div className=" flex items-center space-x-4">
        <div className="shrink-0 ">
          <img
            src="/images/profile.jpg"
            alt="Generic Logo"
            width={48}
            height={48}
            className="rounded-md"
          />
        </div>
        <div>
          <div className="text-xl font-medium text-black">{todo.title}</div>
          <small className="text-gray-500">
            {done ? 'Completed' : 'Not Completed'}
          </small>
        </div>
      </div>
      <div className="flex-auto flex flex-row-reverse">
        <TodoButton done={done} handleDone={handleDone} />
      </div>
    </li>
  )
}

export default TodoCard
