import React, { useContext } from 'react'
import { Transaction } from '../../lib/context/GlobalState'
import { GlobalContext } from '../../lib/context/GlobalState'
import cn from 'classnames'
import { X as BiX } from 'react-bootstrap-icons'

interface TransactionItemProps {
  transaction: Transaction
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { deleteTransaction } = useContext(GlobalContext)
  const { text, amount, id } = transaction
  const sign = amount < 0 ? '-' : '+'

  return (
    <div>
      <li className="p-2 flex justify-between bg-white shadow-md">
        <p>{text}</p>
        <span
          className={cn({
            'text-green-600': amount > 0,
            'text-red-600': amount <= 0,
          })}
        >
          {sign} {`\$${Math.abs(amount)}`}
          <button
            onClick={() => {
              deleteTransaction(id)
            }}
            className="p-1 bg-red-500 rounded-sm text-black "
          >
            <BiX className="text-white" />
          </button>
        </span>
      </li>
    </div>
  )
}

export default TransactionItem
