import { createStore, applyMiddleware } from 'redux'
import { initialState as filterState } from './filter/filterSlice'
import { initialState as todosState } from './todos/todosSlice'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'
import { composeWithDevTools } from '@redux-devtools/extension'
import type { RootAction, Todo } from '../types'

// Still need to go back to these and figure them out better
import {
  sayHiOnDispatch,
  monitorReducerEnhancer,
} from './exampleAddons/enhancers'

import {
  print1,
  print2,
  print3,
  loggerMiddlware,
  alwaysReturnHelloMiddleware,
  delayedMessageMiddlware,
  asyncFunctionMiddleware,
} from './exampleAddons/middleware'

// Middlewares ARE intended to have side effects like API calls, console logs, event listeners to things like audio / video etc
// This keeps our reducers pure functions and only do things that are pure
const middlewareEnhancer = applyMiddleware(
  // alwaysReturnHelloMiddleware,
  // delayedMessageMiddlware,
  thunkMiddleware
)

const composedEnhancer = composeWithDevTools(
  // Example: add whatever middleware you actually want to use here
  // other store enhancers if any
  {
    trace: true,
    maxAge: 25,
  }
)

// configure store is another way of this
// export const store = configureStore({ reducer: rootReducer })
export const store = createStore(
  rootReducer,
  /*
  {
    todos: todosState,
    filter: filterState,
  },
  */
  composedEnhancer(middlewareEnhancer)
)

// Write a function that has `dispatch` and `getState` as arguments
// Giving this function some optional parameters, this should be working here
export const fetchSomeData = (
  dispatch: typeof store.dispatch,
  getState: typeof store.getState
): void => {
  // Make an async http request
  fetch('http://192.168.0.16:3000/api/fakeApi/todos', { method: 'GET' })
    .then((res) => res.json())
    .then((todos: Todo[]) => {
      dispatch({ type: 'todos/todosLoaded', payload: { todos: todos } })

      const allTodos = getState().todos
      console.log('Number of todos after loading', allTodos.length)
    })
    .catch((err) => {
      console.error('Something went wrong mayne')
      console.error(err)
    })
}
