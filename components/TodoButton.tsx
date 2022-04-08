import { CheckCircle, XCircle } from 'react-bootstrap-icons'

interface TodoButtonProps {
  done: boolean
  handleDone: () => void
}

const TodoButton = ({ done, handleDone }: TodoButtonProps) => {
  return (
    <button
      onClick={handleDone}
      className={
        'p-2 rounded bg-orange-300 hover:bg-orange-200 active:bg-orange-600 focus:outline-none focus:ring focus:ring-violet-300'
      }
    >
      {done ? (
        <CheckCircle className="w-6 h-6 text-green-500 " />
      ) : (
        <XCircle className="w-6 h-6 text-red-500" />
      )}
    </button>
  )
}

export default TodoButton
