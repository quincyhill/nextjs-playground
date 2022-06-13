import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { query } from '../../../../lib/api/utilities'

// Delete a todo from the table
const deleteTodo = async (table: string, id: number) => {
  const res = await query(`DELETE FROM ${table} WHERE id = ${id}`)
  return res
}

// Valid CORS origins
const cors = Cors({
  methods: ['GET', 'PUT', 'DELETE'],
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
  // Make sure the middlwares are run
  await runMiddleware(req, res, cors)

  switch (req.method) {
    case 'GET':
      // Get stuff
      res.status(200).json({ text: 'hello there' })
    case 'PUT':
    // Put stuff
    case 'DELETE':
    // Delete stuff
    default:
    // Not valid method
  }
}

export default handler
