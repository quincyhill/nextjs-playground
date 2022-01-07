import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout/Layout'
import { TodoCard } from '../components/TodoCard'
import { getSortedPostsData } from '../lib/posts'
import { getTodosFromJsonPlaceHolder } from '../lib/todos'
import Date from '../components/Date/Date'
import { GetStaticProps } from 'next'
import { Todo } from '../lib/todos'
import { Post } from '../lib/posts'
import { useState } from 'react'
import { TodoContext } from '../lib/context'
import { BiFolderPlus } from 'react-icons/bi'

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

const HomePage = ({ posts, todos }: HomeProps) => {
  // Also notice how utilstyles are going to be used in a similar fashion to tailwind.
  //
  const testTodo: Todo = { title: 'test', completed: false }

  // User generated todos
  const [myTodos, setMyTodos] = useState<Todo[]>([testTodo])

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
      </section>
      <section className="p-1">
        <h2 className="text-2xl p-6">Blog</h2>
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
        <h2 className="text-center text-2xl">Testing form</h2>
        <form className="m-4 max-w-4xl">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Username
            </span>
            <input
              type="text"
              value="stuff"
              disabled
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
            />
          </label>
        </form>
      </section>
      <section>
        <h2 className="text-center text-2xl">Group Test Card</h2>
        <a
          href="#main-footer"
          className="group block max-w-xs mx-auto rounded-lg p-6 bg-whitering-1 ring-gray-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
        >
          <div className="flex items-center space-x-3">
            <BiFolderPlus className="h-6 w-6 text-sky-500 group-hover:text-white" />
            <h3 className="text-gray-900 group-hover:text-white text-sm font-semibold">
              New project
            </h3>
          </div>
          <p className="text-gray-500 group-hover:text-white text-sm">
            Create a new project from a variety of starting templates.
          </p>
        </a>
      </section>
      <section className="p-1">
        <h2 className="text-center text-2xl">Todos</h2>
        <TodoContext.Provider value={myTodos}>
          <ul className="list-none">
            {myTodos.map((todo, id) => (
              <TodoCard todo={todo} id={id} />
            ))}
            <hr />
            {todos.map((todo, id) => (
              <TodoCard todo={todo} id={id} />
            ))}
          </ul>
        </TodoContext.Provider>
      </section>
    </Layout>
  )
}

export default HomePage
