import React from 'react'
import { Post } from './types'
import { updatePage } from '@nextjs-mfe/utils'

type Props = {
  areaUrl: string,
  posts: Post[]
}

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json()

  return {
    props: {
      areaUrl: 'posts',
      posts
    }
  }
}

export const getServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  return { 
    props: {
      areaUrl: 'posts-ssr',
      posts
    }
  }
}

export default ({ areaUrl, posts }: Props) => {
  const PostsList = posts.map(({ id, title }) => {
    const url = `/${areaUrl}/${id}`
    return <li key={id}><a href={url} onClick={updatePage}>{title}</a></li>
  })

  return (
    <>
      <h1>Posts</h1>
      <ul>{PostsList}</ul>
    </>
  )
}