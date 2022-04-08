import { configureStore } from '@reduxjs/toolkit'

type ColorType = 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'purple'

interface TodoItem {
  id: number
  text: string
  completed: boolean
  color: ColorType
}

type StatusType = 'all' | 'active' | 'completed'

interface TodoFilter {
  status: StatusType
  colors: ColorType[]
}

interface TodoAppState {
  todos: TodoItem[]
  filter: TodoFilter
}

interface TodoAddedAction {
  type: 'todos/todoAdded'
  payload: string
}

interface TodoToggledAction {
  type: 'todos/todoToggled'
  payload: number
}

interface TodoColorSelectedAction {
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
  // this may need changing but run with this for now
  payload: ColorType[]
}

type Action =
  | TodoAddedAction
  | TodoToggledAction
  | TodoColorSelectedAction
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

function appReducer(
  state: TodoAppState = initialState,
  action: Action
): TodoAppState {
  switch (action.type) {
    case 'todos/todoAdded':
      return state
    case 'todos/todoToggled':
      return state
    case 'todos/todoDeleted':
      return state
    case 'todos/todoAllCompleted':
      return state
    case 'todos/todoCompletedCleared':
      return state
    case 'todos/todoStatusFilterChanged':
      return state
    case 'todos/todoColorFilterChanged':
      return state
    default:
      return state
  }
}

export const store = configureStore({ reducer: appReducer })
