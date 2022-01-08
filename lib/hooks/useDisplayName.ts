import { useState, useEffect, useDebugValue } from 'react'

const fetchFromDatabase = (idEntry: number) => {
  // Just junk data to simulate a database call
  return {
    displayName: `John Doe ${idEntry}`,
  }
}

export const useDisplayName = (props: { userId: number }) => {
  const [displayName, setDisplayName] = useState<string>('')

  useEffect(() => {
    const data = fetchFromDatabase(props.userId)
    setDisplayName(data.displayName)
  }, [])

  useDebugValue(displayName ?? 'loading...')
  return displayName
}
