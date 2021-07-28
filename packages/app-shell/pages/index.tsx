import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href='/posts'>SSG Posts</Link>
      <br />
      <Link href='/posts-ssr'>SSR Posts</Link>
    </>
  )
}
