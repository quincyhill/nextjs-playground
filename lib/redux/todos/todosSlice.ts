import type { Todo, TodoAction } from '../../types'
import { store } from '../store'

export const initialState: Todo[] = []

function nextTodoId(todos: Todo[]): number {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

// Standard reducer keep it a pure function
// This is known as reducer composition, fundamental for building with redux
export default function todosReducer(
  state: Todo[] = initialState,
  action: TodoAction
): Todo[] {
  // All actions are related to todos and as such just return the state of todos array
  switch (action.type) {
    case 'todos/todoAdded':
      // Payload is the text we want to add to use to create the new todo
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload.text,
          completed: false,
          color: null,
        },
      ]
    case 'todos/todoToggled':
      // Payload is the todo id and then we toggle the completed property
      return state.map((todo) => {
        // this simply returns the entire list that isnt selected
        if (todo.id !== action.payload.id) {
          return todo
        }

        // this returns the selected todo with the completed property toggled
        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    case 'todos/todoColorSelected':
      // Payload is the todo id and the color we want to set in order to target and change that todo's color
      return state.map((todo) => {
        // returns the entire list that isnt selected
        if (todo.id !== action.payload.id) {
          return todo
        }

        // returns the selected todo with the color property set to the color we want
        return {
          ...todo,
          color: action.payload.color,
        }
      })
    case 'todos/todoDeleted':
      // Payload is the todo id and then we dont include it in the list returned
      return state.filter((todo) => todo.id !== action.payload.id)
    case 'todos/todoAllCompleted':
      // Map through all my toods and set the completed property to true and return the new list
      return state.map((todo) => {
        return {
          ...todo,
          completed: true,
        }
      })
    case 'todos/todoCompletedCleared':
      // Filter through all my todos and remove all the todos that are completed
      return state.filter((todo) => !todo.completed)
    case 'todos/todosLoaded':
      // Replace the existing state entirely by returning the payload always do copies to ensure immutability
      return [...action.payload.todos]
    default:
      return [...state]
  }
}

const TODOURL = 'http://192.168.0.16:3000/api/fakeApi/todos'

// Thunk function allows for side effects
export async function fetchTodos(
  dispatch: typeof store.dispatch,
  getState: typeof store.getState
) {
  const response = await fetch(TODOURL, {
    method: 'GET',
  })

  const todos: Todo[] = await response.json()

  // somewhere I have the default of 3 todos somewhere
  const stateBefore = getState()
  console.log('Todos before dispatch', stateBefore.todos.length)

  dispatch({ type: 'todos/todosLoaded', payload: { todos: todos } })

  const stateAfter = getState()
  console.log('Number of todos after loading', stateAfter.todos.length)
}

// Write a synchronous outer function that receives the `text` parameter:
export function saveNewTodo(text: string) {
  // And then creates and returns the async thunk function:
  return async function saveNewTodoThunk(
    dispatch: typeof store.dispatch,
    getState: typeof store.getState
  ) {
    // Now we can use the text value and send it to the server
    // could change this around
    const todoText = { text }
    const response = await fetch(TODOURL, {
      method: 'POST',
      body: JSON.stringify(todoText),
    })
    dispatch({ type: 'todos/todoAdded', payload: todoText })
  }
}
