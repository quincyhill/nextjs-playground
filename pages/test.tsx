import React from 'react'
import Link from 'next/link'
import { GlobalProvider } from '../lib/context/GlobalState'
import { ExpenseTracker } from '../components/ExpenseTracker'

const TestPage = () => {
  return (
    <GlobalProvider>
      <div className="flex justify-center bg-gray-100 ">
        <div className="w-10/12 sm:w-6/12 p-0 m-0">
          <h1>Hi There</h1>
          <p>This is a test page to see if context is still valid here</p>
          <ExpenseTracker />
          <Link href="/">
            <button className="bg-purple-100 hover:bg-purple-200">
              Go home
            </button>
          </Link>
        </div>
      </div>
    </GlobalProvider>
  )
}

export default TestPage
