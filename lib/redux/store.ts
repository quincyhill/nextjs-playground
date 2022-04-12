import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from 'redux'
import type { EnhancedStore, CombinedState } from '@reduxjs/toolkit'
import type { Todo, Filter, RootAction, AppState } from '../types'
import { initialState as filterState } from './filter/filterSlice'
import { initialState as todosState } from './todos/todosSlice'
import rootReducer from './reducer'

// Dont know how to do this part, skip it for now
// No enhancers or middlewares for now
import {
  sayHiOnDispatch,
  monitorReducerEnhancer,
} from './exampleAddons/enhancers'

import { print1, print2, print3 } from './exampleAddons/middleware'

const middlewareEnhancer = applyMiddleware(print1, print2, print3)

// configure store is another way of this
// export const store = configureStore({ reducer: rootReducer })
export const store = createStore(rootReducer, {
  todos: todosState,
  filters: filterState,
})
