import React from 'react'

const CustomBlockQuote = () => {
  return (
    <blockquote className="text-2xl font-semibold italic text-center text-gray-900">
      When you look
      <span className="relative mx-2">
        <span
          className="block absolute -inset-1 -skew-y-3 bg-pink-500"
          aria-hidden="true"
        ></span>
        <span className="relative text-white">annoyed</span>
      </span>
      all the time, people think that you're busy.
    </blockquote>
  )
}

export default CustomBlockQuote
