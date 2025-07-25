"use client";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  if (
    [
      "/signin",
      "/signup",
      "/signout",
      "/admin",
      "/admin/users",
      "/admin/todos",
    ].includes(pathname)
  ) {
    return null;
  }
  return (
    <div className="flex justify-between items-center py-4 px-10 shadow-xl dark:shadow-white dark:shadow-md">
      <p>Todos</p>
      <ul>
        {status === "authenticated" && <li>Hello, {session.user?.name}</li>}
      </ul>
      <div className="flex items-center gap-1">
        <form action="api/auth/signout">
          <Button variant="light" type="submit">
            <LogOut size={1} />
          </Button>
        </form>
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
