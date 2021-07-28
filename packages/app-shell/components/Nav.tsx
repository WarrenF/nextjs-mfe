import React from 'react'
import Link from 'next/link'

const Nav = () => (
  <header>
    <div className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand d-flex align-items-center">NextJS MFE</a>
        </Link>
      </div>
    </div>
  </header>
)

export default Nav