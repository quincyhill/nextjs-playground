import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { X } from 'react-bootstrap-icons'
import type {
  Todo,
  AppState,
  Filter,
  ColorChoice,
  StatusChoice,
} from '../lib/types'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { store } from '../lib/redux/store'

// Could also use type instead of extends but this is fine
interface FormInput extends Filter {}

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

const selectTodoIds = (state: AppState): number[] =>
  state.todos.map((todo) => todo.id)

// its possible no todo is found thats why it does undefined
const selectTodoById = (state: AppState, todoId: number): Todo | undefined => {
  return state.todos.find((todo) => todo.id === todoId)
}

const TodoListItem = ({ id }: { id: number }) => {
  const todo = useSelector((state: AppState) => selectTodoById(state, id))
  if (todo !== undefined) {
    const { text, completed, color } = todo
    const dispatch = useDispatch<typeof store.dispatch>()

    const handleCompletedChanged = () => {
      dispatch({ type: 'todos/todoToggled', payload: { id: todo.id } })
    }

    return (
      <li className="flex flex-row p-1 m-1 border rounded-md justify-between">
        <span>{text}</span>
        <button
          className="p-1 bg-red-400 hover:bg-red-600 rounded-full"
          onClick={() => {
            // stuff here
            dispatch({
              type: 'todos/todoDeleted',
              payload: { id: todo.id },
            })
          }}
        >
          <X className="w-4 h-4" />
        </button>
      </li>
    )
  } else {
    return null
  }
}

const TodoList = () => {
  // Again we're returning a new id array
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  const renderedListItems = todoIds.map((todoId, key) => {
    return <TodoListItem key={key} id={todoId} />
  })

  return <ul>{renderedListItems}</ul>
}

const TodoCard = () => {
  const [textInput, setTextInput] = useState('')
  const { register, handleSubmit, watch } = useForm<FormInput>()
  const [someState, setSomeState] = useState(0)

  const todosRemaining = useSelector((state: AppState) => {
    const uncompletedTodos = state.todos.filter((todo) => !todo.completed)
    return uncompletedTodos.length
  })

  const { status, colors } = useSelector((state: AppState) => state.filter)

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const { colors, status } = data

    console.log('colors', colors)
    console.log('staus', status)
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const test = () => {
    return <div>This is a test</div>
  }

  // This returns just the todos from the store
  const selectTodos = (state: AppState): Todo[] => state.todos

  // This returns how many todos are marked as completed
  const selectTotalCompletedTodos = (state: AppState): number => {
    return state.todos.filter((todo) => todo.completed).length
  }

  // Bad: always returning a new reference. Dont do this
  const selectTodoTexts = (state: AppState): string[] => {
    // This creates a new array reference!
    return state.todos.map((todo) => todo.text)
  }

  const todos = useSelector(selectTodos)

  // Useful case of typeof
  const dispatch = useDispatch<typeof store.dispatch>()

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleTextInputChange', e.target.value)
    setTextInput(e.target.value)
  }

  const handleTextInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // lets sett
    const trimmedText = textInput.trim()
    if (e.key === 'Enter' && trimmedText) {
      // Dispatch the "todo added" action with this text
      dispatch({ type: 'todos/todoAdded', payload: { text: trimmedText } })
      // And clear the text input
      setTextInput('')
    }
  }

  return (
    <div className="p-2 shadow-lg rounded-md flex flex-col">
      <input
        className="border-b-2"
        placeholder="What needs to be done?"
        value={textInput}
        onChange={handleTextInputChange}
        onKeyDown={handleTextInputKeyDown}
      />
      {/* getting rid of the old version*/}
      {/* 
      <ul id="my-todo-list">
        {todos.map((todo, index) => (
          <li className="flex flex-row p-1 m-1 border rounded-md justify-between">
            <span>{todo.text}</span>
            <button
              className="p-1 bg-red-400 hover:bg-red-600 rounded-full"
              onClick={() => {
                // stuff here
                dispatch({
                  type: 'todos/todoDeleted',
                  payload: { id: todo.id },
                })
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
            */}
      <TodoList />
      <hr />
      <div>
        <button
          className="bg-green-200 rounded-md p-2"
          onClick={() => {
            dispatch({ type: 'todos/todoAdded', payload: { text: 'New Todo' } })
          }}
        >
          Test
        </button>
      </div>
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
          <strong>{String(todosRemaining)}</strong>
          {todosRemaining === 1 ? (
            <span>Item left</span>
          ) : (
            <span>Items left</span>
          )}
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
