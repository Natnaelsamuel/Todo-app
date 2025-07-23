"use client";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  if (["/signin", "/signup", "/admin", "/admin/users"].includes(pathname)) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-51 flex justify-between items-center py-4 px-10 shadow-xl dark:shadow-white dark:shadow-md">
      <p>Todos</p>
      <ul>
        {status === "authenticated" && <li>Hello, {session.user?.name}</li>}
      </ul>
      <ModeToggle />
    </div>
  );
};

export default NavBar;
