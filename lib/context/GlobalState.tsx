import React, { createContext, useReducer, Dispatch } from 'react'
export interface Transaction {
  id: number
  text: string
  amount: number
}

export interface GlobalState {
  transactions: Transaction[]
}

// Initial state

const initialState: GlobalState = {
  transactions: [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 },
  ],
}

export interface AddTransactionAction {
  type: 'ADD_TRANSACTION'
  payload: Transaction
}

export interface DeleteTransactionAction {
  type: 'DELETE_TRANSACTION'
  payload: number
}

type Actions = AddTransactionAction | DeleteTransactionAction

export const reducer = (state: GlobalState, action: Actions) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      }
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

// Create global context
// This was mainly the bug preventing the dispatch to be called
export const GlobalContext = createContext<{
  state: GlobalState
  dispatch: Dispatch<Actions>
}>({ state: initialState, dispatch: () => null })

// Provider component

interface GlobalProviderProps {
  children: React.ReactNode
}

// Provider component
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const deleteTransaction = (id: number) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    })
  }

  const addTransaction = (transaction: Transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction })
  }

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
