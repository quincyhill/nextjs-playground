import { useState } from 'react'
import { Counter } from '../components'

export default function OtherPage() {
  const [otherValue, setOtherValue] = useState(0)
  const incrementOtherValue = () => {
    setOtherValue(otherValue + 1)
  }

  return (
    <div>
      <h1>Stuff</h1>
      <Counter handleOtherValue={incrementOtherValue} />
      <div>
        <span>Other value: {otherValue}</span>
      </div>
    </div>
  )
}
