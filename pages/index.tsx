import Head from 'next/head'
import Link from 'next/link'
import {
  Layout,
  HoverTestCard,
  CustomForm,
  DropDownCard,
  ResponsiveCard,
  ThemedCard,
  CustomBlockQuote,
  TodoCard,
  CustomSearch,
  PostCard,
} from '../components'

import { siteTitle } from '../components/Layout'

import { ExpenseTracker } from '../components/ExpenseTracker'
import { getSortedPostsData } from '../lib/posts'
import { GlobalProvider } from '../lib/context/GlobalState'

import { GetStaticProps } from 'next'
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
}

// Remember each page function exports one of these, I've input code here because I need it to fetch the posts data to build the page
export const getStaticProps: GetStaticProps = async () => {
  // Fetch the posts using the function I defined in my library
  const posts = getSortedPostsData()

  // Return those posts, these posts will now be passed to the `Home` component as a prop
  return {
    props: {
      posts,
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

const HomePage = ({ posts }: HomeProps) => {
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
    <GlobalProvider>
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
            <PostCard id={id} date={date} title={title} keyId={keyId} />
          ))}
        </ul>
      </section>
      <section>
        <h2 className="m-4 text-center text-2xl font-bold">Expense Tracker</h2>
        <Link href="/test">
          <button className="bg-purple-100 hover:bg-purple-200">
            Go to test
          </button>
        </Link>
        <ExpenseTracker />
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
    </GlobalProvider>
  )
}

export default HomePage
