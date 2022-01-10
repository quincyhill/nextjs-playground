import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import Action from './AppReducer'

export interface Transaction {
  id: number
  text: string
  amount: number
}

export interface GlobalState {
  transactions: Transaction[]
  deleteTransaction: (id: number) => void
}

// Initial state

const initialState: GlobalState = {
  transactions: [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 },
  ],
  // This feels wrong but it works so I'm not going to change it for now...
  deleteTransaction: (id: number) => {},
}

// Create global context
export const GlobalContext = createContext<GlobalState>(initialState)

// Provider component

interface GlobalProviderProps {
  children: React.ReactNode
}

// Provider component
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const deleteTransaction = (id: number) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    })
  }

  return (
    <GlobalContext.Provider
      value={{ transactions: state.transactions, deleteTransaction }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
