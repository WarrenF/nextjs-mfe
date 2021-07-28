import React from 'react'
import Nav from './Nav'

const Layout = ({ children }) => (
  <>
    <Nav />

    <main>
      <div className="py-5 container">
        {children}
      </div>
    </main>
  </>
)

export default Layout