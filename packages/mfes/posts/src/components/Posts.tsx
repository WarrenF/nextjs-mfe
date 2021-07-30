import React from 'react'
import { Post } from './types'
import { updatePage } from '@nextjs-mfe/utils'

type Props = {
  areaUrl: string,
  posts: Post[],
  page: {
    title: string
  }
}

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json()

  return {
    props: {
      areaUrl: 'posts',
      page: {
        title: 'Posts'
      },
      posts,
    }
  }
}

export const getServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  return { 
    props: {
      areaUrl: 'posts-ssr',
      page: {
        title: 'Posts SSR'
      },
      posts
    }
  }
}

export default ({ areaUrl, page, posts }: Props) => {
  const PostsList = posts.map(({ id, title }) => (
    <li key={id}>
      <a href={`/${areaUrl}/${id}`} onClick={updatePage}>{title}</a>
    </li>
  ))

  return (
    <>
      <h1>{page.title}</h1>
      <ul>{PostsList}</ul>
    </>
  )
}