import React from 'react'
import Balance from './Balance'
import IncomeExpenses from './IncomeExpenses'
import TransactionList from './TransactionList'
import AddTransaction from './AddTransaction'

const ExpenseTracker = () => {
  return (
    <div className="flex flex-col">
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
    </div>
  )
}

export default ExpenseTracker
