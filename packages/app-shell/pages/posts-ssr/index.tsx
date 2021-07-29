const Posts = await import("posts/Posts")

export default Posts.default

export const getServerSideProps = Posts.getServerSideProps