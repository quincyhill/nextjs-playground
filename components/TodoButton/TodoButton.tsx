import cn from 'classnames'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'

interface TodoButtonProps {
  done: boolean
  className?: string
  handleDone: () => void
}

const TodoButton = ({ done, className, handleDone }: TodoButtonProps) => {
  return (
    <button
      onClick={handleDone}
      className={`${className} ${cn({
        'text-white py-2 px-2 rounded': true,
        'text-green-300': done,
        'text-red-500': !done,
      })}`}
    >
      {done ? (
        <BiCheckCircle className="w-6 h-6" />
      ) : (
        <BiXCircle className="w-6 h-6" />
      )}
    </button>
  )
}

export default TodoButton
