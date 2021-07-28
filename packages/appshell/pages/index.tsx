import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <Link href='/posts'>SSG Posts</Link>
      <br />
      <Link href='/posts-ssr'>SSR Posts</Link>
    </Layout>
  )
}
