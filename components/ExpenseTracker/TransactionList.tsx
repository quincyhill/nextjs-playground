import React from 'react'

export const TransactionList = () => {
  return (
    <div className="m-2 p-2 flex flex-col content-center ">
      {/* This right here is simply a place holder example*/}
      <p className="font-bold my-2">History</p>
      <hr className="text-gray-200" />
      <ul>
        <li className="p-2 flex justify-between bg-white shadow-md">
          <p>Cash</p>
          <span className="text-red-600">
            -$400
            <button className="p-1 bg-gray-400 rounded-sm text-black">x</button>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default TransactionList
