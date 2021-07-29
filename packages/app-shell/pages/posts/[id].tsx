const Post = await import('posts/Post')

export default Post.default

export const getStaticPaths = Post.getStaticPaths

export const getStaticProps = Post.getStaticProps
