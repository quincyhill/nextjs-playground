import React, { useContext } from 'react'
import { GlobalContext } from '../../lib/context/GlobalState'
import TransactionItem from './TransactionItem'

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext)

  return (
    <div className="m-2 p-2 flex flex-col content-center ">
      {/* This right here is simply a place holder example*/}
      <p className="font-bold my-2">History</p>
      <hr />
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem transaction={transaction} />
        ))}
      </ul>
    </div>
  )
}

export default TransactionList
