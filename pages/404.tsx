import Head from 'next/head'
const Custom404 = () => {
  return (
    <div className="flex justify-center">
      <Head>
        <title>404 Page Not Found</title>
      </Head>
      <h1 className="">
        <strong className="text-red-600">404</strong> - Page Not Found
      </h1>
    </div>
  )
}

export default Custom404
