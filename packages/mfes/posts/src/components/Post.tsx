import React from 'react'
import { Post } from './types'

type Props = {
  post: Post
}

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
  const post = await res.json()

  return { props: { post } }
}

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const post = await res.json()

  return { props: { post } }
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