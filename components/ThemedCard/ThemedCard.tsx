import React from 'react'
import { Pencil as BiPencil } from 'react-bootstrap-icons'

const ThemedCard = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
      <div>
        <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
          <BiPencil className="h-6 w-6 text-white" />
        </span>
      </div>
      <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight">
        Writes Upside-Down
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
        The Zero Gravity Pen can be used to write in any orientation, including
        upside-down. It even works in outer space.
      </p>
    </div>
  )
}

export default ThemedCard
