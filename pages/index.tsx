import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout/Layout'
import { HoverTestCard } from '../components/HoverTestCard'
import { CustomForm } from '../components/CustomForm'
import { DropDownCard } from '../components/DropDownCard'
import { ResponsiveCard } from '../components/ResponsiveCard'
import { ThemedCard } from '../components/ThemedCard'
import { CustomBlockQuote } from '../components/CustomBlockQuote'
import { TodoCard } from '../components/TodoCard'
import { CustomSearch } from '../components/CustomSearch'
import { getSortedPostsData } from '../lib/posts'
import { getTodosFromJsonPlaceHolder } from '../lib/todos'
import Date from '../components/Date/Date'
import { GetStaticProps } from 'next'
import { Todo } from '../lib/todos'
import { Post } from '../lib/posts'
import {
  useEffect,
  useState,
  useRef,
  useReducer,
  useMemo,
  useCallback,
  useImperativeHandle,
  RefObject,
  useLayoutEffect,
} from 'react'
import { useDisplayName } from '../lib/hooks/useDisplayName'

// Home Props
interface HomeProps {
  posts: Post[]
  todos: Todo[]
}

// Remember each page function exports one of these, I've input code here because I need it to fetch the posts data to build the page
export const getStaticProps: GetStaticProps = async () => {
  // Fetch the posts using the function I defined in my library
  const posts = getSortedPostsData()

  // Fetch the todos using the function I defined in my library
  const todos = await getTodosFromJsonPlaceHolder()

  // Return those posts, these posts will now be passed to the `Home` component as a prop
  return {
    props: {
      posts,
      todos,
    },
  }
}

interface CoolButtonProps {
  ref: RefObject<HTMLElement | void>
}

let CoolButton = ({ ref }: CoolButtonProps) => {
  const myBtn = useRef<HTMLButtonElement>(null)

  const displayName = useDisplayName({ userId: 4 })

  useImperativeHandle(ref, () => {
    console.log('Clicking button!')
    myBtn.current?.click()
  })
  return <button ref={myBtn}>ImCool:{displayName}</button>
}

const HomePage = ({ posts, todos }: HomeProps) => {
  // Also notice how utilstyles are going to be used in a similar fashion to tailwind.
  //
  const testTodo: Todo = { title: 'test', completed: false }

  // User generated todos
  const [myTodos, setMyTodos] = useState<Todo[]>([testTodo])

  // Test count dealing with state withing a component
  const [count, setCount] = useState(0)

  // Use effect to run on mount
  useEffect(() => {
    console.log('useState called')
  }, [])

  // Using use ref to allow the button to reference the input on click
  const inputEl = useRef<HTMLInputElement>(null)

  const onButtonClick = () => {
    // `current` points to the element you're in
    inputEl.current?.focus()
  }

  // Using useReducer

  const reducer = (state: number, action: { type: string }) => {
    switch (action.type) {
      case 'increment':
        return state + 1
      case 'decrement':
        return state - 1
      default:
        throw new Error()
    }
  }

  // State i'm affecting
  const [someState, dispatch] = useReducer(reducer, 0)

  // Next up is memoization, which is a way to cache the result of return values
  const [anotherCount, setAnotherCount] = useState(60)

  const expensiveCount = useMemo(() => {
    return count ** 2
  }, [anotherCount])

  // This is to memoize functions
  // This can be applied when I pass this function down to multiple child components
  // It will prevent unnecessary re-renders

  const showAnotherCount = useCallback(() => {
    alert(`Count ${anotherCount}`)
  }, [anotherCount])

  // Lets do another ref
  const anotherRef = useRef<HTMLInputElement>(null)

  // Testing out useLayoutEffect

  const andAgainAnotherRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const rect = andAgainAnotherRef.current?.getBoundingClientRect()
    console.log('Rect height for Full Send: ', rect?.height)
  })

  // Finally useDebugValue

  // Another thing to note is the use of the api thing
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Just a testing next js project working on SEO"
          key="desc"
        />
      </Head>
      <section className="">
        <p>
          Hello, I'm{' '}
          <strong className="bg-red-200 rounded-md p-1">Quincy</strong>. I need
          to finish my projects and apply to more jobs Also I changed a few
          things here
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <br />
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Click me {count}</button>
        <br />
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <p>Value of Some State: {someState}</p>
        <br />
        <CoolButton ref={anotherRef} />
        <br />
        <button ref={andAgainAnotherRef}>Full send</button>
        <br />
      </section>
      <section className="p-1">
        <h2 className="text-2xl p-6 font-bold">Blog</h2>
        <ul className="list-none">
          {posts.map(({ id, date, title }, keyId) => (
            <li className="m-2 p-4" key={keyId}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="text-gray-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="m-4 text-center text-2xl font-bold">Testing form</h2>
        <CustomForm />
      </section>
      <section>
        <h2 className="m-4 ktext-center text-2xl font-bold">Some words</h2>
        <CustomBlockQuote />
      </section>
      <section>
        <h2 className="m-4 text-center text-2xl font-bold">Search Input</h2>
        <CustomSearch />
      </section>
      <section>
        <h2 className="m-4 text-center text-2xl font-bold">Group Test Card</h2>
        <HoverTestCard />
        <br />
        <DropDownCard />
      </section>
      <section>
        <h2 className="m-4 text-center font-bold text-2xl">
          Responsive Design
        </h2>
        <ResponsiveCard />
        <br />
        <ThemedCard />
      </section>
      <section>
        <h2 className="m-4 text-center text-2xl font-bold">Nice Login</h2>
      </section>
      <section className="p-1">
        <h2 className="m-4 text-center text-2xl font-bold">Todos</h2>
        <ul className="list-none">
          {myTodos.map((todo, id) => (
            <TodoCard todo={todo} id={id} />
          ))}
          <hr />
          {todos.map((todo, id) => (
            <TodoCard todo={todo} id={id} />
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default HomePage
