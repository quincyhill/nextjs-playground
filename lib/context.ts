import { createContext } from 'react'
import { Todo } from './todos'

export const TodoContext = createContext(<Todo[]>[])
