import { createStore, applyMiddleware } from 'redux'
import { initialState as filterState } from './filter/filterSlice'
import { initialState as todosState } from './todos/todosSlice'
import rootReducer from './reducer'
import { composeWithDevTools } from '@redux-devtools/extension'

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
} from './exampleAddons/middleware'

// Middlewares ARE intended to have side effects like API calls, console logs, event listeners to things like audio / video etc
// This keeps our reducers pure functions and only do things that are pure
const middlewareEnhancer = applyMiddleware(
  alwaysReturnHelloMiddleware,
  delayedMessageMiddlware
)

// Enables the redux dev tools
const composeEnhancer = composeWithDevTools(
  // Example: add whatever middleware you actually want to use here
  // other store enhancers if any
  {
    trace: true,
  }
)

// configure store is another way of this
// export const store = configureStore({ reducer: rootReducer })
export const store = createStore(
  rootReducer,
  {
    todos: todosState,
    // bug fix name
    filter: filterState,
  },
  composeEnhancer(middlewareEnhancer)
)
