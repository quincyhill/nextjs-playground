import React from 'react'
import { Search as BiSearch } from 'react-bootstrap-icons'

const CustomSearch = () => {
  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <BiSearch className="h-5 w-5 text-gray-300" />
      </span>
      <input
        className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search for anything"
      />
    </label>
  )
}

export default CustomSearch
