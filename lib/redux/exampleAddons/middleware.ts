// middleware written as ES5 functions
// NOTE: eventually figure out how to deal with types for these but for now just use any
import type { AppState, RootAction, Todo, Filter } from '../../types'
import { store } from '../store'
import type { Store, EmptyObject, Dispatch } from 'redux'

// outer function: this outter funciton is the middleware itself, it will be called by applyMiddleware
// and receive a storeAPI object containing the store's dispatch and getState functions
// these are the same dispatch and get state functions that are actually part of the store
// // it will send the ation to the start of the middlware pipeline. This is only called once
export function print1(storeAPI: any) {
  // This middle function receives a function called next as its argument.
  // this function is actually the next middlware in the pipeline
  // If this middleware is the last one int he sequence, then next is actually the original
  // store.dispatch function instead.
  // Calling next(action) passes the action to the next middlware in the pipeline.
  // This is only called once
  return function wrapDispatch(next: any) {
    // Finally handleAction is the inner function that receives the current action as its argument.
    // It will be called every time an action is dispatched.
    return function handleAction(action: any) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() to get the current state here
      console.log('print1: ', action)
      return next(action)
    }
  }
}

export function print2(storeAPI: any) {
  return function wrapDispatch(next: any) {
    return function handleAction(action: any) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() to get the current state here
      console.log('print2: ', action)
      return next(action)
    }
  }
}

export function print3(storeAPI: any) {
  return function wrapDispatch(next: any) {
    return function handleAction(action: any) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() to get the current state here
      console.log('print3: ', action)
      return next(action)
    }
  }
}

// Same as ES5 functions just written as ES6 arrow functions
export const loggerMiddlware =
  (storeAPI: any) => (next: any) => (action: any) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', storeAPI.getState())
    return result
  }

export const alwaysReturnHelloMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    const originalResult = next(action)
    // Ignore the original result, return something else
    return 'Hello!'
  }

// lets see how this goes... sometimes the typing can go over board
type StoreType = Store<
  EmptyObject & {
    todos: Todo[]
    filter: Filter
  },
  RootAction
>

export const delayedMessageMiddlware: (
  storeAPI: any
) => (next: any) => (action: RootAction) => RootAction =
  (storeAPI: typeof store) =>
  (next: typeof store.dispatch) =>
  (action: RootAction) => {
    if (action.type === 'todos/todoAdded') {
      setTimeout(() => {
        console.log('Added a new todo: ', action.payload)
      }, 1000)
    }
    return next(action)
  }

export function delayedActionMiddleWare(storeAPI: typeof store) {
  return function wrapDispatch(next: typeof store.dispatch) {
    return function handleAction(action: RootAction) {
      if (action.type === 'todos/todoAdded') {
        setTimeout(() => {
          // waits 1 second logs the payload and creates the action
          console.log('Added a new todo: ', action.payload)
          next(action)
        }, 1000)
        // does this need to be here?
        return
      }
      return next(action)
    }
  }
}

// This middleware is dedicated to fetching todos from the server
export function fetchTodosMiddlware(storeAPI: typeof store) {
  return function wrapDispatch(next: typeof store.dispatch) {
    return function handleAction(action: RootAction) {
      if (action.type === 'todos/todosFetched') {
        // make an api call to fetch todos from the server aka my nextjs api
        // I'll use fetch to make the api call since I'm trying to minimize use of axios
        fetch('http://192.168.0.16:3000/api/fakeApi/todos', {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((todos: Todo[]) => {
            // lets see what this returns but first I must fix up the server
            console.log(todos)
            // lol for now its not todos but ill make it work
            // NOTE: Dispatch the todos, but again need to make sure they are valid so i'm going to comment them out for now

            /*
            storeAPI.dispatch({
              type: 'todos/todosLoaded',
              payload: { todos: todos },
            })
            */
          })
      }
      return next(action)
    }
  }
}

// Writing an async function middleware
// writting a middleware that lets us pass a function to dispatch intead of an action object
// We could have our middlware check to see if the "action" is actually a function instead, and if its a function
// and call the function right away.
// This would let me write async logic in separate functions and then call them from the middleware definition.
export const asyncFunctionMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    // If the "action" is a actually a funciton instead...
    if (typeof action === 'function') {
      // then call the funciton and pass `dispatch` and `getState` as arguments
      return action(storeAPI.dispatch, storeAPI.getState)
    }

    // Otherwise, it's a normal action - send it onwards
    return next(action)
  }
