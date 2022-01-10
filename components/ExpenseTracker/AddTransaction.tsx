import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface Inputs {
  example: string
  exampleRequired: string
}

export const AddTransaction = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onFormSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch('example'))
  console.log(watch('exampleRequired'))

  return (
    /* "handleSubmit" will validate the inputs before invoking "onFormSubmit" */
    <div>
      <p>Add new transaction</p>
      <form className="m-4 max-w-4xl" onSubmit={handleSubmit(onFormSubmit)}>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700">Test</span>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            {...register('example')}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700">
            Another
          </span>
          <input
            {...register('exampleRequired', { required: true })}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        </label>
        {errors.exampleRequired && (
          <span className="text-red-600">This field is required </span>
        )}
        <button
          type="submit"
          className="my-2 p-2 rounded bg-orange-300 hover:bg-orange-200 active:bg-orange-600 focus:outline-none focus:ring focus:ring-violet-300"
        >
          Add transaction
        </button>
      </form>
    </div>
  )
}

export default AddTransaction
