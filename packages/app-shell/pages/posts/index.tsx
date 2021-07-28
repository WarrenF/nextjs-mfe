// @ts-ignore
const Posts = await import("postsLib/Posts")

export default Posts.default

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
