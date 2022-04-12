export type ColorChoice =
  | 'red'
  | 'blue'
  | 'yellow'
  | 'green'
  | 'orange'
  | 'purple'
  | null

export interface Todo {
  id: number
  text: string
  completed: boolean
  color: ColorChoice
}

export type StatusChoice = 'all' | 'active' | 'completed'

export interface Filter {
  status: StatusChoice
  colors: ColorChoice[]
}

export interface AppState {
  todos: Todo[]
  filter: Filter
}

export interface TodoAddedAction {
  type: 'todos/todoAdded'
  payload: string
}

export interface TodoToggledAction {
  type: 'todos/todoToggled'
  payload: number
}

export interface TodoColorSelectedAction {
  type: 'todos/todoColorSelected'
  payload: number
}

export interface TodoDeletedAction {
  type: 'todos/todoDeleted'
  payload: number
}

export interface TodoAllCompletedAction {
  type: 'todos/todoAllCompleted'
  payload: null
}

export interface TodoCompletedClearedAction {
  type: 'todos/todoCompletedCleared'
  payload: null
}

export interface StatusFilterChangedAction {
  type: 'filter/statusFilterChanged'
  payload: StatusChoice
}

export interface ColorFilterChangedAction {
  type: 'filter/colorFilterChanged'
  // NOTE: this may need changing but run with this for now
  payload: ColorChoice[]
}

export type TodoAction =
  | TodoAddedAction
  | TodoToggledAction
  | TodoColorSelectedAction
  | TodoDeletedAction
  | TodoAllCompletedAction
  | TodoCompletedClearedAction

export type FilterAction = StatusFilterChangedAction | ColorFilterChangedAction

// All action types
export type RootAction = TodoAction | FilterAction
