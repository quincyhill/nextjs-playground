import { store } from './store'

console.log('My store is: ', store.getState())

const unsubscribe = store.subscribe(() => {
  console.log('State after dispatch: ', store.getState())
})

store.dispatch({
  type: 'todos/todoAdded',
  payload: { text: 'learn about actions' },
})

store.dispatch({
  type: 'todos/todoAdded',
  payload: { text: 'learn about redux' },
})

store.dispatch({
  type: 'todos/todoAdded',
  payload: { text: 'learn about stores' },
})

store.dispatch({
  type: 'todos/todoToggled',
  payload: { id: 0 },
})

store.dispatch({
  type: 'todos/todoToggled',
  payload: { id: 1 },
})

console.log('State before unsubscribe: ', store.getState())

// Stop listening to state updates
unsubscribe()

store.dispatch({
  type: 'todos/todoAdded',
  payload: { text: 'try creating a store' },
})

console.log('final state: ', store.getState())

const dispatchResult = store.dispatch({
  type: 'todos/todoToggled',
  payload: { id: 0 },
})

console.log(dispatchResult)
