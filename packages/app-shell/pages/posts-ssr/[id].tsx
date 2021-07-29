const Posts = await import("posts/Post")

export default Posts.default

export const getServerSideProps = Posts.getServerSideProps
