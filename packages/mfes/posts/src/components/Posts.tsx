import React from 'react'
import { Post } from './types'

type Props = {
  areaUrl: string,
  posts: Post[]
}

const Page = ({ areaUrl, posts }: Props) => {
  const updatePage = (e: React.MouseEvent<HTMLElement>, url: string) => {
    e.preventDefault()
    window.ee.emit('navigate', url)
  }

  const PostsList = posts.map(({ id, title }) => {
    const url = `/${areaUrl}/${id}`
    return (
      <li key={id}>
        <a href={url} onClick={(e) => updatePage(e, url)}>{title}</a>
      </li>
    )
  })

  return (
    <>
      <h1>Posts</h1>
      <ul>{PostsList}</ul>
    </>
  )
}

export default Page