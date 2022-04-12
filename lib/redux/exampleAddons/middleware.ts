// middleware written as ES5 functions
// NOTE: eventually figure out how to deal with types for these but for now just use any

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

export const delayedMessageMiddlware =
  (storeAPI: any) => (next: any) => (action: any) => {
    if (action.type === 'todos/todoAdded') {
      setTimeout(() => {
        console.log('Added a new todo: ', action.payload)
      }, 1000)
    }
    return next(action)
  }
