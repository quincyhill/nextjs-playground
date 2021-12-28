import Layout from '../../components/layout/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date/date'
import utilStyles from '../../styles/utils.module.css'

// Again using object unpacking / destructuring to get postData
export default function Post({ postData }) {
  return (
    <Layout>
      {/* Adds the head tag*/}
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

// Both of these functions below run SERVER SIDE ONLY AND WONT BE INCLUDED ON THE BUILD just a note
export async function getStaticPaths() {
  // Return a list of possible values for id, in this case its the title names of the markdown files
  const paths = getAllPostIds()
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  // Await needed since getPostData is an async function
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
