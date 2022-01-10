import React from 'react'
import Link from 'next/link'
import { GlobalProvider } from '../lib/context/GlobalState'

const TestPage = () => {
  return (
    <GlobalProvider>
      <div>
        <h1>Hi There</h1>
        <p>This is a test page to see if context is still valid here</p>
        <Link href="/">
          <button className="bg-purple-100 hover:bg-purple-200">Go home</button>
        </Link>
      </div>
    </GlobalProvider>
  )
}

export default TestPage
