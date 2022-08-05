import React, { useEffect } from 'react'
import { Post } from './types'

type Props = {
  post: Post
}

const eeReady = () => typeof window !== 'undefined' && typeof window.ee !== 'undefined'
const PAGE_VIEW = 'pageView'

export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  return {
    paths: posts.map(item => ({
      params: { id: item.id.toString() }
    })),
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const post: Post = await res.json()

  return {
    props: {
      page: {
        title: post.title
      },
      post,
    }
  }
}

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const post: Post = await res.json()

  return {
    props: {
      page: {
        title: post.title
      },
      post
    }
  }
}

export default ({ post }: Props) => {
  const PostsList = Object.keys(post).map(key => <li key={key}>{key}: {post[key]}</li>)

  return (
    <>
      <h1>{post.title}</h1>
      <ul>{PostsList}</ul>
    </>
  )
}