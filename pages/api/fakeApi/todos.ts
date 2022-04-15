// these are helpful wrapper around node stuff
import { NextApiRequest, NextApiResponse } from 'next'
import type { Todo } from '../../../lib/types'
import fs from 'fs'
import path from 'path'
import sqlite3 from 'sqlite3'

// will be kept for a clean slate when I chose to wipe the db
export const initialState: Todo[] = [
  { id: 0, text: 'Use Redux', completed: false, color: 'red' },
  { id: 1, text: 'Use TypeScript', completed: false, color: 'blue' },
  { id: 2, text: 'Use Next.js', completed: false, color: 'yellow' },
  { id: 3, text: 'what is this', completed: true, color: 'green' },
]

// how our json database will be structured
interface DatabaseSchema {
  todos: Todo[]
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  // could read from query to check if a reset value is sent and if it true then wipe the db and set the state to initialState
  // setup database paths, one just a json file and the other a sqlite file
  // For now just doing the simple json file setup for the sake of the example
  // we are now serving todos from this endpoint

  const jsonDatabasePath = path.join(
    __dirname,
    '../../../../..',
    'data',
    'todos.json'
  )

  const sqliteDatabasePath = path.join(
    __dirname,
    '../../../../..',
    'data',
    'todos.sqlite3'
  )

  const resetQueryValue = req.query.reset

  if (req.method === 'GET') {
    // we are making external calls here so there could be failure / delay
    try {
      if (resetQueryValue !== undefined && resetQueryValue === 'true') {
        // reset the database to initail state
        fs.writeFileSync(jsonDatabasePath, JSON.stringify(initialState))

        // read our json file in a buffer
        const fileBuffer = fs.readFileSync(jsonDatabasePath)

        // convert the buffer into a string and parse it as JSON
        const jsonData: Todo[] = JSON.parse(fileBuffer.toString())
        res.status(200).json(jsonData)
      } else {
        // read our json file in a buffer
        const fileBuffer = fs.readFileSync(jsonDatabasePath)

        // convert the buffer into a string and parse it as JSON
        const jsonData: Todo[] = JSON.parse(fileBuffer.toString())

        res.status(200).json(jsonData)
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
  } else if (req.method === 'POST') {
    try {
      //
    } catch (error) {
      console.error(error)
    }
  } else if (req.method === 'PUT') {
    try {
      //
    } catch (error) {
      console.error(error)
    }
  } else if (req.method === 'DELETE') {
    try {
      //
    } catch (error) {
      console.error(error)
    }
  }
}
