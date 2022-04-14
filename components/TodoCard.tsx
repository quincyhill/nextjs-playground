import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import { X, Check, Dash } from 'react-bootstrap-icons'
import type {
  Todo,
  AppState,
  Filter,
  ColorChoice,
  StatusChoice,
} from '../lib/types'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { store } from '../lib/redux/store'

// React hook form doesnt make sense here because each change will update the global state and thus return a new array of todos

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
    const [selectedColor, setSelectedColor] = useState<ColorChoice>(color)

    const handleCompletedChanged = () => {
      dispatch({ type: 'todos/todoToggled', payload: { id: todo.id } })
    }

    const handleColorSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      let colorSelected = e.target.value as ColorChoice
      if (e.target.value === 'none') {
        colorSelected = null
      }

      setSelectedColor(colorSelected)
      dispatch({
        type: 'todos/todoColorSelected',
        payload: { id: todo.id, color: colorSelected },
      })
      console.log('Color', colorSelected)
    }

    return (
      <li
        className="flex flex-row p-1 m-1 border-2 rounded-md justify-between"
        style={{ borderColor: color !== null ? color : 'lightgray' }}
      >
        <span>{text}</span>
        <div className="flex space-x-1 items-center">
          <form>
            <select
              id={`color-select-${id}`}
              name={`color-dropdown-${id}`}
              onChange={handleColorSelectChange}
              value={selectedColor as string}
            >
              <option className="bg-white" value="none">
                no color
              </option>
              {colorList
                .filter((color) => color !== null)
                .map((color) => (
                  <option value={color as string} className="bg-white">
                    {color}
                  </option>
                ))}
            </select>
          </form>
          {completed ? (
            <button
              className="p-1 bg-green-400 hover:bg-green-600 rounded-full"
              onClick={handleCompletedChanged}
            >
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button
              className="p-1 bg-orange-400 hover:bg-orange-600 rounded-full"
              onClick={handleCompletedChanged}
            >
              <Dash className="w-4 h-4" />
            </button>
          )}
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
        </div>
      </li>
    )
  } else {
    return null
  }
}

const TodoList = () => {
  // Again we're returning a new id array
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem id={todoId} />
  })

  return <ul>{renderedListItems}</ul>
}

const TodoCard = () => {
  const { status, colors } = useSelector((state: AppState) => state.filter)

  const [textInput, setTextInput] = useState('')

  // Initailize the color list to what is in the store, IDK this feel redundant... but it works
  const [colorsInput, setColorsInput] = useState<ColorChoice[]>(colors)

  const todosRemaining = useSelector((state: AppState) => {
    const uncompletedTodos = state.todos.filter((todo) => !todo.completed)
    return uncompletedTodos.length
  })

  const todosFiltered = useSelector((state: AppState): Todo[] => {
    // Lets see if this works, need to go over todos Remaining as it seems to work...
    // will filter the todos based on the status and colors
    const filteredTodos: Todo[] = state.todos
      .filter((todo) => {
        if (status === 'all') {
          return true
        } else if (status === 'active') {
          return todo.completed
        } else if (status === 'completed') {
          return !todo.completed
        }
      })
      .filter((todo) => {
        if (colors.length === 0) {
          return true
        } else {
          return colors.includes(todo.color)
        }
      })

    return filteredTodos
  })

  // This is what will be visually shown initailize it will the filtered list which includes everything
  const [todos, setTodos] = useState<Todo[]>(todosFiltered)

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
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

  // Useful case of typeof
  const dispatch = useDispatch<typeof store.dispatch>()

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSetAllTodosComplete = () => {
    dispatch({ type: 'todos/todoAllCompleted' })
    // update the visible todos
    setTodos(todosFiltered)
  }

  const handleClearCompleted = () => {
    dispatch({ type: 'todos/todoCompletedCleared' })
    // update the visible todos
    setTodos(todosFiltered)
  }

  const handleColorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const colorInput = e.target.value as ColorChoice
    // make sure to check status each time
    const isChecked = e.target.checked

    // Copy the colors array
    let colorList = [...colorsInput]

    if (isChecked) {
      // Add the color to the list
      colorList.push(colorInput)
    } else {
      // Filter out the color and only return the remaining colors
      colorList = colorList.filter((color) => color !== colorInput)
    }

    // Set the overall color list
    setColorsInput(colorList)

    // update the visible todos
    setTodos(todosFiltered)

    // Since we know this works now dispatch the color change
    dispatch({
      type: 'filter/filterColorChanged',
      payload: { colors: colorList },
    })
  }

  const handleStatusInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Convert value to status choice
    const pickedStatus = e.target.value as StatusChoice
    dispatch({
      type: 'filter/filterStatusChanged',
      payload: { status: pickedStatus },
    })

    // update the visible todos
    setTodos(todosFiltered)
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
      <TodoList />
      <hr />
      <div className="flex flex-col items-center">
        <span>Actions</span>
        <div>
          <span>{JSON.stringify(todos)}</span>
        </div>
        <button
          className="p-2 bg-blue-500 rounded-md text-white m-2"
          onClick={handleSetAllTodosComplete}
        >
          Mark All Completed
        </button>
        <button
          className="p-2 bg-blue-500 rounded-md text-white m-2"
          onClick={handleClearCompleted}
        >
          Clear Completed
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
        <form>
          <div>
            {statusList.map((statusChoice) => {
              // I can check to make sure the status choice is the current status
              if (statusChoice === status) {
                return (
                  <div>
                    <input
                      type="radio"
                      id={`${statusChoice}-radio`}
                      value={statusChoice}
                      onChange={handleStatusInputChange}
                      name="status-thing"
                      checked
                    />
                    <label>{capitalizeFirstLetter(statusChoice)}</label>
                  </div>
                )
              } else {
                return (
                  <div>
                    <input
                      type="radio"
                      id={`${statusChoice}-radio`}
                      value={statusChoice}
                      onChange={handleStatusInputChange}
                      name="status-thing"
                    />
                    <label>{capitalizeFirstLetter(statusChoice)}</label>
                  </div>
                )
              }
            })}
          </div>
          <span>Filter by Color</span>
          <div>
            {colorList.map((colorChoice) => {
              // Make sure the color choice is the current color
              if (colorChoice !== null) {
                return (
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${colorChoice}-input`}
                      value={colorChoice}
                      onChange={handleColorInputChange}
                      name="color-thing"
                    />
                    <canvas
                      width={20}
                      height={20}
                      style={{
                        backgroundColor: colorChoice,
                      }}
                    />
                    <label>{colorChoice}</label>
                  </div>
                )
              }
            })}
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoCard
