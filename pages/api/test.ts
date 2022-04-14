import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

interface Todo {
  text: string
  completed: boolean
}

interface ExampleStruct {
  todos: Todo[]
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    setTimeout(() => {
      // gotta type this query object
      const queryObject = req.query

      const textQuery: () => string = () => {
        return queryObject.text as string
      }

      const completedQuery: () => boolean = () => {
        if (queryObject.completed === 'true') {
          return true
        } else if (queryObject.completed === 'false') {
          return false
        } else {
          return false
        }
      }

      const html = `
      <html>
        <h1>Hello world</h1>
        <p>Key: ${textQuery()}, Value: ${String(completedQuery())}</p>
      </html>
      `

      const testFile = path.join(__dirname, '../../../..', 'data', 'test.txt')

      const exampleJSONfile = path.join(
        __dirname,
        '../../../..',
        'data',
        'example.json'
      )

      try {
        // Collect the data as a buffer
        const buffer = fs.readFileSync(exampleJSONfile)

        // Convert that buffer into a string and parse it as JSON
        const jsonData: ExampleStruct = JSON.parse(buffer.toString())

        jsonData.todos.push({ text: textQuery(), completed: completedQuery() })

        console.log(jsonData)

        fs.writeFileSync(exampleJSONfile, JSON.stringify(jsonData))
        // will just keep appending data to the file
      } catch (error) {
        console.error(error)
      }

      res.send(html)
    }, 200)
  }
}
