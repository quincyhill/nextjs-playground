import Layout from '../../components/Layout'
import { getAllPostIds, getPostData, Post, PostData } from '../../lib/posts'
import Head from 'next/head'
import { Date } from '../../components'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface PostPageProps {
  postData: PostData
}

interface Params extends ParsedUrlQuery {
  id: string
}

// Both of these functions below run SERVER SIDE ONLY AND WONT BE INCLUDED ON THE BUILD just a note
export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for id, in this case its the title names of the markdown files
  const paths = getAllPostIds()

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}

// Again using object unpacking / destructuring to get postData

const PostPage = ({ postData }: PostPageProps) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="text-4xl font-bold">{postData.title}</h1>
        <small className="text-gray-500">
          <Date dateString={postData.date} />
        </small>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
export default PostPage
