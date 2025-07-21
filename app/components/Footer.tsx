'use client';
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  
  // Hide on these routes
  if (["/signin", "/signup"].includes(pathname)) {
    return null;
  }
  return (
    <footer className="text-center py-2 text-sm text-black border-t bg-white dark:bg-black dark:text-white dark:border-t-white">
      &copy; {new Date().getFullYear()} MyTodoApp. All rights reserved.
    </footer>
  );
};

export default Footer;
