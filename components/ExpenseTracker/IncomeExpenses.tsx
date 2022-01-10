import React, { useContext } from 'react'
import { GlobalContext } from '../../lib/context/GlobalState'

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext)

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.amount > 0
  )

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.amount < 0
  )

  const totalIncome = incomeTransactions.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)

  const totalExpense = expenseTransactions.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)

  return (
    <div className="m-2 p-2 bg-white shadow-md flex flex-row items-center justify-evenly">
      <div className="p-2">
        <p>Income</p>
        <p className="text-green-600">{`+ \$${totalIncome}`}</p>
      </div>
      <div className="border-2 border-r-gray-300 h-12"></div>
      <div className="p-2">
        <p>Expense</p>
        <p className="text-red-600">{`- \$${Math.abs(totalExpense)}`}</p>
      </div>
    </div>
  )
}

export default IncomeExpenses
