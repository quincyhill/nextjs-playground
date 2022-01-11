import React from 'react'
import Link from 'next/link'
import { TodoCard } from '../components/TodoCard'
import { GetStaticProps } from 'next'
import { getTodosFromJsonPlaceHolder } from '../lib/todos'
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd'
import { Todo } from '../lib/todos'

interface TestPageProps {
  todos: Todo[]
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch the todos using the function I defined in my library
  const todos = await getTodosFromJsonPlaceHolder()

  // Return those posts, these posts will now be passed to the `Home` component as a prop
  return {
    props: {
      todos,
    },
  }
}

const TestPage = ({ todos }: TestPageProps) => {
  const handleOnDragEnd = (result: DropResult) => {
    // TODO: Handle drag and drop
  }

  return (
    <div className="flex justify-center bg-gray-100 ">
      <div className="w-10/12 sm:w-6/12 p-0 m-0">
        <section className="p-1">
          {/* This here is effectively my column */}
          <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
            <h2 className="m-4 text-center text-2xl font-bold">Todos</h2>
            {/* My todo list */}
            <Droppable droppableId="myDroppable">
              {(provided) => (
                <ul
                  className="list-none"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todos.map((todo, keyId) => (
                    <Draggable
                      key={todo.id}
                      draggableId={String(todo.id)}
                      index={keyId}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoCard todo={todo} key={keyId} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </section>
        <Link href="/">
          <button className="bg-purple-100 hover:bg-purple-200">Go home</button>
        </Link>
      </div>
    </div>
  )
}

export default TestPage
