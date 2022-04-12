import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'react-bootstrap-icons'
import type { Todo, AppState, Filter, ColorChoice } from '../lib/types'

// These are to have some dummy state
import { initialState as initialTodos } from '../lib/redux/todos/todosSlice'
import { initialState as initialFilter } from '../lib/redux/filter/filterSlice'

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

const TodoCard = () => {
  const todos = initialTodos
  const filter = initialFilter

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
        <form>
          <div>
            <input
              type="radio"
              id="all-input"
              name="status_thing"
              value="all"
            />
            <label>All</label>
          </div>
          <div>
            <input
              type="radio"
              id="active-input"
              name="status_thing"
              value="active"
            />
            <label>Active</label>
          </div>
          <div>
            <input
              type="radio"
              id="completed-input"
              name="status_thing"
              value="completed"
            />
            <label>Completed</label>
          </div>
        </form>
        <span>Filter by Color</span>
        <form>
          {colorList.map((color, index) => {
            // could also maybe use a filter to only show non null colors but this works for now
            if (color !== null) {
              return (
                <div className="flex flex-row items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${color}-input`}
                    name="color_thing"
                    value={color}
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
        </form>
      </div>
    </div>
  )
}

export default TodoCard
