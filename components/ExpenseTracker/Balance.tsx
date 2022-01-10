import React, { useContext } from 'react'
import { GlobalContext } from '../../lib/context/GlobalState'

export const Balance = () => {
  const { state } = useContext(GlobalContext)
  const { transactions } = state

  const total = transactions.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)

  const sign = total < 0 ? '-' : '+'

  return (
    <div className="p-2 m-2">
      <h4>Your Balance</h4>
      <p className="font-bold text-2xl">{`${sign} \$${Math.abs(total)}`}</p>
    </div>
  )
}

export default Balance
