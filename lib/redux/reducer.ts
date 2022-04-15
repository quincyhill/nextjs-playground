import { combineReducers } from 'redux'
import type { CombinedState, Reducer } from 'redux'
import todosReducer from './todos/todosSlice'
import filterReducer from './filter/filterSlice'
import type { RootAction, Todo, Filter } from '../types'

// I think this is making it too strict
const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
})

export default rootReducer
