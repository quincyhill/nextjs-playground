import { createStore } from 'redux'
import rootReducer from './reducer'

// obviously we dont want this state but its just for example
let preloadedstate: any

const persistedTodoString = localStorage.getItem('todos')

if (persistedTodoString) {
  preloadedstate = {
    todos: JSON.parse(persistedTodoString),
  }
}

// brings in our root reducer and preloaded state
const store = createStore(rootReducer, preloadedstate)
