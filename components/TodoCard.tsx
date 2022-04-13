import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { X } from 'react-bootstrap-icons'
import type {
  Todo,
  AppState,
  Filter,
  ColorChoice,
  StatusChoice,
} from '../lib/types'

// These are to have some dummy state
import { initialState as initialTodos } from '../lib/redux/todos/todosSlice'
import { initialState as initialFilter } from '../lib/redux/filter/filterSlice'

// Could also use type instead of extends but this is fine
interface FormInput extends Filter {}

interface TodoListItemProps {
  todo: Todo
}

const TodoListItem = (props: TodoListItemProps) => {
  const { todo } = props
  return (
    <li className="flex flex-row">
      <span>{todo.text}</span>
      <button>
        <X />
      </button>
    </li>
  )
}

const colorList: ColorChoice[] = [
  null,
  'red',
  'blue',
  'yellow',
  'green',
  'orange',
  'purple',
]

const statusList: StatusChoice[] = ['all', 'active', 'completed']

const TodoCard = () => {
  const todos = initialTodos
  const filter = initialFilter

  const { register, handleSubmit, watch } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const { colors, status } = data

    console.log('colors', colors)
    console.log('staus', status)
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="p-2 shadow-lg rounded-md flex flex-col">
      <input className="border-b-2" placeholder="What needs to be done?" />
      <ul id="my-todo-list">
        {todos.map((todo, index) => (
          <TodoListItem todo={todo} />
        ))}
      </ul>
      <hr />
      <div className="flex flex-col items-center">
        <span>Actions</span>
        <button className="p-2 bg-blue-500 rounded-md text-white m-2">
          Mark All Completed
        </button>
        <button className="p-2 bg-blue-500 rounded-md text-white m-2">
          Mark All Completed
        </button>
        <span>Remaining Todos</span>
        <span>
          <strong>1</strong>
          <span>Item left</span>
        </span>
        <span>Filter by status</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {statusList.map((status, index) => {
              return (
                <div>
                  <input
                    type="radio"
                    id={`${status}-radio`}
                    value={status}
                    {...register('status')}
                  />
                  <label>{capitalizeFirstLetter(status)}</label>
                </div>
              )
            })}
          </div>
          <span>Filter by Color</span>
          <div>
            {colorList.map((color, index) => {
              // could also maybe use a filter to only show non null colors but this works for now
              if (color !== null) {
                return (
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${color}-input`}
                      value={color}
                      {...register('colors')}
                    />
                    <canvas
                      width={20}
                      height={20}
                      style={{
                        backgroundColor: color,
                      }}
                    />
                    <span>{color}</span>
                  </div>
                )
              }
            })}
          </div>
          <div>
            <button className="bg-green-200 rounded-md p-2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoCard
