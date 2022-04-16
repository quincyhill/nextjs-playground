// these are helpful wrapper around node stuff
import { NextApiRequest, NextApiResponse } from 'next'
import type { Todo } from '../../../lib/types'
import path from 'path'

// Switching over to sqlite3 database instead of just json file
import sqlite3 from 'sqlite3'

// will be kept for a clean slate when I chose to wipe the db
export const initialState: Todo[] = [
  { id: 0, text: 'Use Redux', completed: false, color: 'red' },
  { id: 1, text: 'Use TypeScript', completed: false, color: 'blue' },
  { id: 2, text: 'Use Next.js', completed: false, color: 'yellow' },
  { id: 3, text: 'what is this', completed: true, color: 'green' },
]

export default (req: NextApiRequest, res: NextApiResponse) => {
  // could read from query to check if a reset value is sent and if it true then wipe the db and set the state to initialState
  // setup database paths, one just a json file and the other a sqlite file
  // For now just doing the simple json file setup for the sake of the example
  // we are now serving todos from this endpoint

  const databasePath = path.join(
    __dirname,
    '../../../../..',
    'data',
    'todos.sqlite3'
  )

  const db = new sqlite3.Database(databasePath)

  const resetQueryValue = req.query.reset

  if (req.method === 'GET') {
    // we are making external calls here so there could be failure / delay
    try {
      if (resetQueryValue !== undefined && resetQueryValue === 'true') {
        res.status(200).json({ thing: 'reset' })
      } else {
        db.serialize(() => {
          // Here the logic goes
          db.run('CREATE TABLE lorem (info TEXT)')
          // prevent copies of the same data
          const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
          for (let i = 0; i < 10; i++) {
            stmt.run('Ipsum ' + i)
          }
          stmt.finalize()

          db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
            console.log(`${row.id}: ${row.info}`)
            if (err) {
              console.error(err)
            }
          })
        })
        // Dont forget to close the database
        db.close()
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
