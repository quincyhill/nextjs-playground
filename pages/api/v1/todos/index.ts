// these are helpful wrapper around node stuff
import { NextApiRequest, NextApiResponse } from 'next'
import type { ColorChoice, Todo } from '../../../../lib/types'
import Cors from 'cors'
import { db, query } from '../../../../lib/api/utilities'

// SQL query for creating a todos table if it doesnt already exist.
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed INTEGER NOT NULL,
    color TEXT
  )
`

// I already have my list set
// Run an INSERT query on some given table and insert the given object
const createTodo = async (table: string, obj: Todo) => {
  const keys = Object.keys(obj).join(',')
  const values = Object.values(obj)
    .map((v) => `'${v}'`)
    .join(',')
  const res = await query(`INSERT INTO ${table} (${keys}) VALUES (${values})`)
  return res
}

// Update a todo in the table
const updateTodo = async (table: string, id: number, obj: Todo) => {
  const keys = Object.keys(obj).join(',')
  const values = Object.values(obj)
    .map((v) => `'${v}'`)
    .join(',')
  const res = await query(
    `UPDATE ${table} SET (${keys}) = (${values}) WHERE id = ${id}`
  )
  return res
}

// A clean default state to work with
export const initialState: Todo[] = [
  { id: 0, text: 'Use Redux', completed: false, color: 'red' },
  { id: 1, text: 'Use TypeScript', completed: false, color: 'blue' },
  { id: 2, text: 'Use Next.js', completed: false, color: 'yellow' },
  { id: 3, text: 'what is this', completed: true, color: 'green' },
]

// Read all records and all their columns from some given table
const readAllTodos = async (table: string): Promise<any> => {
  // This could be specified better again using any but again fine for now
  const res = await query(`SELECT * FROM ${table}`)
  // Since this may fail I should wrap this in a try catch but for now its just to get it working
  return res
}

// Main controller of the sql script. This is inside an async function so we can use the promist pattern

// Valid Cors
const cors = Cors({
  methods: ['GET', 'POST'],
})

// Helper function to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// Function is too general but works for now
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

  if (req.method === 'GET') {
    // we are making external calls here so there could be failure / delay
    // Lets just ignore this this for now and just return in mem values for now
    try {
      // This right here is now valid

      // Create todos table if it doesnt already exist, may not make sense here but ok
      const sqlTodos: {
        id: number
        text: string
        completed: string
        color: string
      }[] = await readAllTodos('todos')

      // Map each todo to a new object with the correct types
      const todos: Todo[] = sqlTodos.map((todo) => ({
        id: todo.id as number,
        text: todo.text as string,
        completed: todo.completed === 'true',
        color: todo.color as ColorChoice,
      }))
      console.log(todos)

      // Read all todos
      // Afterwards just return the predetermined todos
      res.status(200).json(todos)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  } else if (req.method === 'POST') {
    try {
      // Creating a new Todo
      // Print out the body of the request

      // Not really doing any checks for now just assume its only coming in from todo list

      const reqBody: { text: string } = JSON.parse(req.body)

      // We will write a new todo to the database, now we want id to autoincrement
      await createTodo('todos', <Todo>{
        id: 1,
        text: reqBody.text,
        completed: false,
        color: null,
      })

      res.status(200).json({ message: 'success' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error })
    }
  }
}

export default handler
