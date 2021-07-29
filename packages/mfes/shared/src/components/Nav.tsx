import React from 'react'
import { updatePage } from '@nextjs-mfe/utils'

const Nav = () => (
  <header>
    <div className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a href='/' className="navbar-brand d-flex align-items-center" onClick={updatePage} >NextJS MFE</a>
      </div>
    </div>
  </header>
)

export default Nav