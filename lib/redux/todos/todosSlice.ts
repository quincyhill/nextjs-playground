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
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
          color: null,
        },
      ]
    case 'todos/todoToggled':
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }
        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    default:
      return [...state]
  }
}
