import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../lib/redux/store'
import {} from '../lib/redux/index'

const name = 'Quincy Hill'
export const siteTitle = "Quincy's fake Next.js blog"

interface LayoutProps {
  children: React.ReactNode
  home?: boolean
}

const Layout = ({ children, home }: LayoutProps) => {
  return (
    <Provider store={store}>
      <div className="flex justify-center">
        <div className="max-w-4xl p-0 m-0 ">
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="description"
              content="Learn how to build a personal website using Next.js"
            />

            <meta
              property="og:image"
              content={`https://og-image.vercel.app/${encodeURI(
                siteTitle
              )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>
          <header className="max-w-xl flex-col align-self-center border-b-2">
            {home ? (
              <>
                <Image
                  priority
                  src="/images/fb_profile.jpg"
                  className="rounded-full"
                  height={144}
                  width={144}
                  alt={name}
                />
                <h1 className="font-bold text-4xl">{name}</h1>
              </>
            ) : (
              <>
                <h2 className="font-bold text-2xl">
                  <Link href="/">
                    <a className="text-black">{name}</a>
                  </Link>
                </h2>
              </>
            )}
          </header>
          <main className="m-2">{children}</main>
          <div className="m-3 border-t-2">
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className="m-3 border-t-2">
            <Link href="/test">
              <a>← to test</a>
            </Link>
          </div>
          <footer id="main-footer" className={home ? 'border-t-2' : ''}>
            <h2 className="font-medium text-center">Made by me</h2>
          </footer>
        </div>
      </div>
    </Provider>
  )
}

export default Layout
