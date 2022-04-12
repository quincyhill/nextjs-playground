// yea these are all wronge but whatever
export const sayHiOnDispatch =
  (createStore: any) => (reducer: any, initialState: any, enhancer: any) => {
    createStore.dispatch = (action: any) => {
      console.log('dispatching', action)
      return createStore.dispatch(action)
    }
  }

export function includeMeaningOfLife(store: any) {
  store.getState = () => {
    const state = store.getState()
    return {
      ...state,
      meaningOfLife: 42,
    }
  }
}

const round = (num: number) => Math.round(num * 100) / 100

export const monitorReducerEnhancer =
  (createStore: any) => (reducer: any, initialState: any, enhancer: any) => {
    const monitoredReducer = (state: any, action: any) => {
      const start = performance.now()
      const newState = reducer(state, action)
      const end = performance.now()
      const diff = round(end - start)

      console.log('reducer process time:', diff)

      return newState
    }

    return createStore(monitoredReducer, initialState, enhancer)
  }
