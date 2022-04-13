import { combineReducers } from 'redux'
import type { CombinedState, Reducer } from 'redux'
import todosReducer from './todos/todosSlice'
import filterReducer from './filter/filterSlice'
import type { RootAction, Todo, Filter } from '../types'

const rootReducer: Reducer<
  CombinedState<{
    todos: Todo[]
    // bug fix name
    filter: Filter
  }>,
  RootAction
> = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
})

export default rootReducer
