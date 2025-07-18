import React from 'react'
import { ModeToggle } from './ModeToggle'

const NavBar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-10 shadow-xl dark:shadow-white dark:shadow-md">
        <p>Logo</p>
        <ul>
          <li>Home</li>
        </ul>
        <ModeToggle />
    </div>
  )
}

export default NavBar