import { configureStore } from '@reduxjs/toolkit'

type ColorChoice =
  | 'red'
  | 'blue'
  | 'yellow'
  | 'green'
  | 'orange'
  | 'purple'
  | null

interface TodoItem {
  id: number
  text: string
  completed: boolean
  color: ColorChoice
}

type StatusType = 'all' | 'active' | 'completed'

interface TodoFilter {
  status: StatusType
  colors: ColorChoice[]
}

interface TodoAppState {
  todos: TodoItem[]
  filter: TodoFilter
}

// Could eventaully refactor the payload to have both the text and color but i'm just doing color for now
interface TodoAddedAction {
  type: 'todos/todoAdded'
  payload: string
}

interface TodoToggledAction {
  type: 'todos/todoToggled'
  payload: number
}

interface TodoColorSelectedAction {
  type: 'todos/todoColorSelected'
  payload: number
}

interface TodoDeletedAction {
  type: 'todos/todoDeleted'
  payload: number
}

interface TodoAllCompletedAction {
  type: 'todos/todoAllCompleted'
  payload: null
}

interface TodoCompletedClearedAction {
  type: 'todos/todoCompletedCleared'
  payload: null
}

interface TodoStatusFilterChangedAction {
  type: 'todos/todoStatusFilterChanged'
  payload: StatusType
}

interface TodoColorFilterChangedAction {
  type: 'todos/todoColorFilterChanged'
  // NOTE: this may need changing but run with this for now
  payload: ColorChoice[]
}

type Action =
  | TodoAddedAction
  | TodoToggledAction
  | TodoColorSelectedAction
  | TodoDeletedAction
  | TodoAllCompletedAction
  | TodoCompletedClearedAction
  | TodoStatusFilterChangedAction
  | TodoColorFilterChangedAction

const initialState: TodoAppState = {
  todos: [
    { id: 0, text: 'Use Redux', completed: false, color: 'red' },
    { id: 1, text: 'Use TypeScript', completed: false, color: 'blue' },
    { id: 2, text: 'Use Next.js', completed: false, color: 'yellow' },
  ],
  filter: {
    status: 'all',
    colors: [],
  },
}

function nextTodoId(todos: TodoItem[]): number {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

function appReducer(
  state: TodoAppState = initialState,
  action: Action
): TodoAppState {
  // Only immutable updates allowed
  // No side effects aka anything that is a change to a state that is not within the bounds of the state
  // from only state and action arguments
  // no saving files, logging to console http requests, generating random numbers, etc
  switch (action.type) {
    case 'todos/todoAdded':
      // All this logic could be in the return or outisde, just preference
      // We need to return a new state object
      // Make sure to make a copy of EVERY level of nesting that needs to be updated, aka alot of destructuring / spread operations
      return {
        // That has all the existing state data
        ...state,
        // But has a new arrow for the `todos` field
        todos: [
          // with all of the old todos
          ...state.todos,
          // and the new todo object
          {
            // Use an auto-incrementing numeric ID for this example
            id: nextTodoId(state.todos),
            text: action.payload,
            completed: false,
            color: null,
          },
        ],
      }
    case 'todos/todoToggled':
      return {
        // Again copy the entire state object
        ...state,
        // This time, we need to make a copy of the old todos array
        todos: state.todos.map((todo) => {
          // If this isn't the todo we're looking for, leave it alone
          if (todo.id !== action.payload) {
            return todo
          }
          // We've found the todo that has to change. Return a copy:
          return {
            ...todo,
            // Flip the completed value
            completed: !todo.completed,
          }
        }),
      }
    case 'todos/todoColorSelected':
      return {
        ...state,
      }
    case 'todos/todoDeleted':
      return {
        ...state,
      }
    case 'todos/todoAllCompleted':
      return {
        ...state,
      }
    case 'todos/todoCompletedCleared':
      return {
        ...state,
      }
    case 'todos/todoStatusFilterChanged':
      return {
        ...state,
      }
    case 'todos/todoColorFilterChanged':
      return {
        ...state,
      }
    default:
      return {
        ...state,
      }
  }
}

export const store = configureStore({ reducer: appReducer })
