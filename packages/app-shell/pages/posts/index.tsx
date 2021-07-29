const Posts = await import("posts/Posts")

export default Posts.default

export const getStaticProps = Posts.getStaticProps