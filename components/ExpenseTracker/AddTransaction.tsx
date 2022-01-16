import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { GlobalContext, Transaction } from '../../lib/context/GlobalState'

export const AddTransaction = () => {
  const { state, dispatch } = useContext(GlobalContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Transaction>()

  const onFormSubmit: SubmitHandler<Transaction> = (data: Transaction) => {
    // I shouldnt have to do this since I'm passing in the correct Transaction type
    // Amount should be a number but I'm getting a string, need to check up on docs

    const amountStr: string = data.amount.toString()
    const myAmount: number = parseInt(amountStr)

    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        amount: myAmount,
        text: data.text,
        id: state.numCreatedTransactions + 1,
      },
    })
  }

  // watch allows us to watch the form state of the inputs
  console.log(watch('text'))
  console.log(watch('amount'))

  return (
    /* "handleSubmit" will validate the inputs before invoking "onFormSubmit" */
    <div className="block">
      <p className="font-bold mx-2">Add new transaction</p>
      <hr />
      <form className="m-4 max-w-4xl" onSubmit={handleSubmit(onFormSubmit)}>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700">Text</span>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            {...register('text')}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 block w-full sm:text-sm focus:ring-1"
            type="text"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700">
            Amount
            <br />
            (negative - expense, positive - income)
          </span>
          <input
            {...register('amount', { required: true })}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 block w-full sm:text-sm focus:ring-1"
            type="number"
          />
        </label>
        {errors.amount && (
          <span className="text-red-600">This field is required</span>
        )}
        <button
          type="submit"
          className="my-2 p-2 bg-orange-300 hover:bg-orange-200 active:bg-orange-600 focus:outline-none focus:ring focus:ring-violet-300"
        >
          Add transaction
        </button>
      </form>
    </div>
  )
}

export default AddTransaction
