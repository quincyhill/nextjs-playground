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
  payload: {
    text: string
  }
}

export interface TodoToggledAction {
  type: 'todos/todoToggled'
  payload: {
    id: number
  }
}

export interface TodoColorSelectedAction {
  type: 'todos/todoColorSelected'
  payload: {
    id: number
    color: ColorChoice
  }
}

export interface TodoDeletedAction {
  type: 'todos/todoDeleted'
  payload: {
    id: number
  }
}

export interface TodoAllCompletedAction {
  type: 'todos/todoAllCompleted'
}

export interface TodoCompletedClearedAction {
  type: 'todos/todoCompletedCleared'
}

export interface FilterStatusChangedAction {
  type: 'filter/filterStatusChanged'
  payload: {
    status: StatusChoice
  }
}

export interface FilterColorChangedAction {
  type: 'filter/filterColorChanged'
  payload: {
    colors: ColorChoice[]
  }
}

export type TodoAction =
  | TodoAddedAction
  | TodoToggledAction
  | TodoColorSelectedAction
  | TodoDeletedAction
  | TodoAllCompletedAction
  | TodoCompletedClearedAction

export type FilterAction = FilterStatusChangedAction | FilterColorChangedAction

// All action types
export type RootAction = TodoAction | FilterAction
