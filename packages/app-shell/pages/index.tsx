const updatePage = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  e.preventDefault()
  const url = e.currentTarget?.href
  if (url) window.ee.emit('navigate', url)
}

export default function Home() {
  return (
    <>
      <a onClick={updatePage} href='/posts'>SSG Posts</a>
      <br />
      <a onClick={updatePage} href='/posts-ssr'>SSR Posts</a>
    </>
  )
}
