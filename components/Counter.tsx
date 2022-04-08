import { useState } from 'react'

interface Props {
  handleOtherValue: () => void
}

const Counter = ({ handleOtherValue }: Props) => {
  // State: a counter value
  const [counter, setCounter] = useState(0)

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1)
  }

  // View: the UI definition
  return (
    <div>
      <span className="m-2">Value: {counter}</span>
      <button className="bg-blue-200 rounded-md p-2" onClick={increment}>
        Increment
      </button>
      <button
        className="bg-green-200 rounded-md p-2"
        onClick={handleOtherValue}
      >
        Increment Other Value
      </button>
    </div>
  )
}

export default Counter
