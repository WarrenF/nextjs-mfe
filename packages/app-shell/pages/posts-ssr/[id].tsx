// @ts-ignore
const Posts = await import("postsLib/Post")

export default Posts.default

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const post = await res.json()

  return { props: { post } }
}
