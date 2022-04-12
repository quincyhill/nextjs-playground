import type { Todo, TodoAction } from '../../types'

const initialState: Todo[] = [
  { id: 0, text: 'Use Redux', completed: false, color: 'red' },
  { id: 1, text: 'Use TypeScript', completed: false, color: 'blue' },
  { id: 2, text: 'Use Next.js', completed: false, color: 'yellow' },
]

function nextTodoId(todos: Todo[]): number {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

// This is known as reducer composition, fundamental for building with redux
export default function todosReducer(
  state: Todo[] = initialState,
  action: TodoAction
): Todo[] {
  // All actions are related to todos and as such just return the state of todos array
  switch (action.type) {
    case 'todos/todoAdded':
      // Payload is the text we want to add to use to create the new todo
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload.text,
          completed: false,
          color: null,
        },
      ]
    case 'todos/todoToggled':
      // Payload is the todo id and then we toggle the completed property
      return state.map((todo) => {
        // this simply returns the entire list that isnt selected
        if (todo.id !== action.payload.id) {
          return todo
        }

        // this returns the selected todo with the completed property toggled
        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    case 'todos/todoColorSelected':
      // Payload is the todo id and the color we want to set in order to target and change that todo's color
      return state.map((todo) => {
        // returns the entire list that isnt selected
        if (todo.id !== action.payload.id) {
          return todo
        }

        // returns the selected todo with the color property set to the color we want
        return {
          ...todo,
          color: action.payload.color,
        }
      })
    case 'todos/todoDeleted':
      // Payload is the todo id and then we dont include it in the list returned
      return state.filter((todo) => todo.id !== action.payload.id)
    case 'todos/todoAllCompleted':
      // Map through all my toods and set the completed property to true and return the new list
      return state.map((todo) => {
        return {
          ...todo,
          completed: true,
        }
      })
    case 'todos/todoCompletedCleared':
      // Filter through all my todos and remove all the todos that are completed
      return state.filter((todo) => !todo.completed)
    default:
      return [...state]
  }
}
