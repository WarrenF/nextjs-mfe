// @ts-ignore
const Post = await import('postsLib/Post')

export default Post.default

export async function getStaticPaths() {
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
