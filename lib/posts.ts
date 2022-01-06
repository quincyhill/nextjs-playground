import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { GetStaticPathsResult, GetStaticPropsResult } from 'next'

// Post type
export interface Post {
  title: string
  date: string
  id?: string
}

export interface PostData extends Post {
  contentHtml: string
}

// This library file in the library folder is for fetching posts

// Uses get filesystem directory to posts
const postsDirectory = path.join(process.cwd(), 'posts')

// Returns the posts data
// For now this is only run at the index page
export function getSortedPostsData(): Post[] {
  // NOTE: Consider using async await since i'm making calls out to the file system so there will be latency
  // But since this is just an example here it should work
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    // Up my regex game lol
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id, converts the matterResult.data into a Post type then destructures it and all is returned as a post
    return {
      id,
      ...(matterResult.data as Post),
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'dog-water'
  //     }
  //   }
  // ]
  // Just like the json place holder example on the other I can call external API's here

  return fileNames.map((fileName) => {
    // Need to up my regex game lol
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id: string): Promise<PostData> {
  // Path of the markdown file
  const fullPath = path.join(postsDirectory, `${id}.md`)

  // Actual mark down content
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...(matterResult.data as Post),
  }
}
