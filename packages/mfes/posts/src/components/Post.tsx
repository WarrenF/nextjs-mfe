import React from 'react'
import { Post } from './types'

type Props = {
  post: Post
}

const Page = ({ post }: Props) => {
    const PostsList = Object.keys(post).map(key => <li key={key}>{key}: {post[key]}</li>)
  
    return (
      <>
        <h1>{post.title}</h1>
        <ul>{PostsList}</ul>
      </>
    )
  }
  
  export default Page