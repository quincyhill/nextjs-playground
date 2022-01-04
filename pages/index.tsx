import Head from 'next/head'
import Link from 'next/link'
import { FC } from 'react'
import Layout, { siteTitle } from '../components/layout/layout'
import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { getTodosFromJsonPlaceHolder } from '../lib/todos'
import Date from '../components/date/date'
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next'
import { Todo } from '../lib/todos'
import { Post } from '../lib/posts'

// Home Props
interface HomeProps {
  allPostsData: Post[]
  todos20: Todo[]
}

const Home = ({ allPostsData, todos20 }: HomeProps) => {
  // Also notice how utilstyles are going to be used in a similar fashion to tailwind.

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
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I'm <strong className="bg-red-200">Quincy</strong>. I need to
          finish my projects and apply to more jobs Also I changed a few things
          here
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ date, title }, id) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={`${utilStyles.headingMd}`}>Todos</h2>
        <ul className={utilStyles.list}>
          {todos20.map(({ userId, title, completed }, id) => (
            <li
              className={`${utilStyles.listItem} ${utilStyles.bgSecondaryColor} ${utilStyles.roundedCorner}`}
              key={id}
            >
              {title}
              <br />
              {String(completed)}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className="flex font-sans bg-yellow-200 rounded-md overflow-hidden">
          <div className="flex-none w-48 relative">
            <Image
              src="/images/profile.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              width={400}
              height={400}
            />
          </div>
          <form className="flex-auto p-6">
            <div className="flex flex-wrap">
              <h1 className="flex-auto text-lg font-semibold text-gray-900">
                Standard Utility Item
              </h1>
              <div className="text-lg font-semibold text-gray-500">$110.00</div>
              <div className="w-full flex-none text-sm font-medium text-gray-700 mt-2">
                In stock
              </div>
            </div>
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-gray-200">
              <div className="space-x-2 flex text-sm">
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="xs"
                    checked
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-900 peer-checked:text-white">
                    XS
                  </div>
                </label>
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="s"
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-900 peer-checked:text-white">
                    S
                  </div>
                </label>
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="m"
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-900 peer-checked:text-white">
                    M
                  </div>
                </label>
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="l"
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-900 peer-checked:text-white">
                    L
                  </div>
                </label>
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="xl"
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-900 peer-checked:text-white">
                    XL
                  </div>
                </label>
              </div>
            </div>
            <div className="flex space-x-4 mb-6 text-sm font-medium">
              <div className="flex-auto flex space-x-4">
                <button
                  className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                  type="submit"
                >
                  Buy now
                </button>
                <button
                  className="h-10 px-6 font-semibold rounded-md border border-gray-200 text-gray-900"
                  type="button"
                >
                  Add to bag
                </button>
              </div>
              <button
                className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-300 border border-gray-200"
                type="button"
                aria-label="Like"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-700">
              Free shipping on all continental US orders.
            </p>
          </form>
        </div>
      </section>
    </Layout>
  )
}

// Remember each page function exports one of these, I've input code here because I need it to fetch the posts data to build the page
export const getStaticProps: GetStaticProps = async () => {
  // Fetch the posts using the function I defined in my library
  const allPostsData = getSortedPostsData()

  // Fetch the todos using the function I defined in my library
  const todos20 = await getTodosFromJsonPlaceHolder()

  // Return those posts, these posts will now be passed to the `Home` component as a prop
  return {
    props: {
      allPostsData,
      todos20,
    },
  }
}

export default Home
