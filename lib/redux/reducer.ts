import { combineReducers } from 'redux'
import type { CombinedState, Reducer } from 'redux'
import todosReducer from './todos/todosSlice'
import filterReducer from './filter/filterSlice'
import type { RootAction, Todo, Filter } from '../types'

const rootReducer: Reducer<
  CombinedState<{
    todos: Todo[]
    filters: Filter
  }>,
  RootAction
> = combineReducers({
  todos: todosReducer,
  filters: filterReducer,
})

export default rootReducer
