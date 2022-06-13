import { promisify } from 'util'
import sqlite3 from 'sqlite3'
import path from 'path'
// Set up dotenv file
require('dotenv').config()

// Get the aboslute path of the database, this is syncronous so I know it will resutl in a valid value so just cast it
const DATABASE_PATH: string = String(process.env.DATABASE_PATH)

// The database
export const db = new sqlite3.Database(DATABASE_PATH)

// Use the promise pattern for sqlite3 we we dont have to worry about callback hell
export const query = promisify(db.all).bind(db)
