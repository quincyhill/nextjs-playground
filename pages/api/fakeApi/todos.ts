// these are helpful wrapper around node stuff
import { NextApiRequest, NextApiResponse } from 'next'
import type { ColorChoice, Todo } from '../../../lib/types'
import path from 'path'
import Cors from 'cors'

// Switching over to sqlite3 database instead of just json file
import sqlite3 from 'sqlite3'

// will be kept for a clean slate when I chose to wipe the db
export const initialState: Todo[] = [
  { id: 0, text: 'Use Redux', completed: false, color: 'red' },
  { id: 1, text: 'Use TypeScript', completed: false, color: 'blue' },
  { id: 2, text: 'Use Next.js', completed: false, color: 'yellow' },
  { id: 3, text: 'what is this', completed: true, color: 'green' },
]

// Here i'll setup cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

// Helper function to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // could read from query to check if a reset value is sent and if it true then wipe the db and set the state to initialState
  // setup database paths, one just a json file and the other a sqlite file
  // For now just doing the simple json file setup for the sake of the example
  // we are now serving todos from this endpoint
  //

  // Run the middleware to enable CORS
  await runMiddleware(req, res, cors)

  // Lets see if this works

  const DATABASE_PATH = path.join(
    __dirname,
    '../../../../..',
    'data',
    'todos.sqlite3'
  )

  // work on this later
  const db = new sqlite3.Database(DATABASE_PATH)

  const resetQueryValue = req.query.reset

  if (req.method === 'GET') {
    // we are making external calls here so there could be failure / delay
    // Lets just ignore this this for now and just return in mem values for now
    try {
      /*
      let rowStuff: any[] = []

      if (resetQueryValue !== undefined && resetQueryValue === 'true') {
        // Since im making a call to the database here I need to use a promise or async await
        db.serialize(() => {
          // First drop table
          let someVal: null | string = null
          db.run('DROP TABLE IF EXISTS todos')

          // Then create table
          db.run(
            'CREATE TABLE todos (id PRIMARY KEY, text TEXT, completed INTEGER, color TEXT)'
          )

          // lets see if this works
          const stmt = db.prepare('INSERT INTO todos VALUES (?, ?, ?, ?)')

          initialState.forEach((todo) => {
            // do stuff
            stmt.run(todo.id, todo.text, todo.completed, todo.color)
          })

          // Guess this runs the insert statement
          stmt.finalize()

          // now lets get the data each row
          db.each(
            'SELECT rowid as id, text, completed, color FROM todos',
            (
              err,
              row: {
                id: number
                text: string
                completed: number
                color: string
              }
            ) => {
              const { id, text } = row
              const completed: boolean = row.completed === 1 ? true : false
              // Might be some weird type conversion if null but will see
              const color: ColorChoice = row.color as ColorChoice

              const todo: Todo = { id, text, completed, color }

              someVal = 'hey'
            }
          )
          console.log(someVal)
        })

        // Close the database
        db.close()
        res.status(200).json({ thing: 'reset' })
      } else {
        db.serialize(() => {
          // Here the logic goes
          db.run('CREATE TABLE lorem (info TEXT)')

          const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
          for (let i = 0; i < 10; i++) {
            stmt.run('Ipsum ' + i)
          }
          stmt.finalize()

          db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
            console.log(`${row.id}: ${row.info}`)
            rowStuff.push(row.info)
            if (err) {
              console.error(err)
            }
          })
          console.log('End of looping stuff')

          console.log('Row stuff', rowStuff)
        })
        // Dont forget to close the database
        db.close()
        res.status(200).json(rowStuff)
      }
      */

      // This right here is now valid
      res.status(200).json(initialState)
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

export default handler
