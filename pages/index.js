import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { getTodosFromJsonPlaceHolder } from '../lib/todos'

// Remember each page function exports one of these, I've input code here because I need it to fetch the posts data to build the page
export async function getStaticProps() {
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

// Using the {} Syntax for object destructuring
export default function Home({ allPostsData, todos20 }) {
  // Also notice how utilstyles are going to be used in a similar fashion to tailwind.

  // Another thing to note is the use of the api thing
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I'm <strong>Quincy</strong>. I need to finish my projects and
          apply to more jobs
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <Link href="/posts/first-post">
        <button
          className={`${utilStyles.roundedCorner} ${utilStyles.noBorder} ${utilStyles.bgPrimaryColor} ${utilStyles.btnWidth} ${utilStyles.btnHeight}`}
        >
          Click here
        </button>
      </Link>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li
              className={`${utilStyles.listItem} ${utilStyles.bgSecondaryColor} ${utilStyles.roundedCorner}`}
              key={id}
            >
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={`${utilStyles.headingMd}`}>Todos</h2>
        <ul className={utilStyles.list}>
          {todos20.map(({ id, userId, title, completed }) => (
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
    </Layout>
  )
}
