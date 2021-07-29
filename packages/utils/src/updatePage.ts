export const updatePage = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  e.preventDefault()
  const url = e.currentTarget?.href
  if (url) window.ee.emit('navigate', url)
}