'use client';
import React from 'react'
import { ModeToggle } from './ModeToggle'
import { varelaRound } from '@/lib/fonts'
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  
  if (["/signin", "/signup"].includes(pathname)) {
    return null;
  }
  return (
    <div className="flex justify-between items-center py-4 px-10 shadow-xl dark:shadow-white dark:shadow-md">
        <p className={`${varelaRound.className}`}>Todos</p>
        <ul>
          <li>Home</li>
        </ul>
        <ModeToggle />
    </div>
  )
}

export default NavBar