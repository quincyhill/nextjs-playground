import React from 'react'
import Link from 'next/link'
import Date from '../Date/Date'

interface PostCardProps {
  keyId: number
  id: string | undefined
  date: string
  title: string
}
const PostCard = ({ id, title, keyId, date }: PostCardProps) => {
  return (
    <li className="m-2 p-4" key={keyId}>
      <Link href={`/posts/${id}`}>
        <a>{title}</a>
      </Link>
      <br />
      <small className="text-gray-500">
        <Date dateString={date} />
      </small>
    </li>
  )
}

export default PostCard
