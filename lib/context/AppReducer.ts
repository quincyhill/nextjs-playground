import { GlobalState } from './GlobalState'

export interface Action {
  type: string
  payload: number
}

export default (state: GlobalState, action: Action) => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      }
    default:
      return state
  }
}
