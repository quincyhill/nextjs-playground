// Simple example of a working redux store
// Could throw in some generics here for practice
function createStore(
  reducer: (state: any, action: string) => any,
  preloadedState: any
) {
  let state = preloadedState
  const listeners: any[] = []

  function getState() {
    return state
  }

  function subscribe(listener: any) {
    listeners.push(listener)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  function dispatch(action: any) {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  dispatch({ type: '@@redux/INIT' })

  return { dispatch, subscribe, getState }
}

export default {}
