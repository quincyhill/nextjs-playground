import React from 'react'

export const IncomeExpenses = () => {
  return (
    <div className="m-2 p-2 bg-white shadow-md flex flex-row items-center justify-evenly">
      <div className="p-2">
        <p>Income</p>
        <p className="text-green-600">+$0.00</p>
      </div>
      <div className="border-2 border-r-gray-300 h-12"></div>
      <div className="p-2">
        <p>Expense</p>
        <p className="text-red-600">-$0.00</p>
      </div>
    </div>
  )
}

export default IncomeExpenses
