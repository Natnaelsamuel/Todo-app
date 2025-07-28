// "use client";
// import React from "react";
// import { ModeToggle } from "./ModeToggle";
// import { usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { LogOut } from "lucide-react";

// const NavBar = () => {
//   const pathname = usePathname();
//   const { status, data: session } = useSession();

//   if (
//     [
//       "/signin",
//       "/signup",
//       "/signout",
//       "/admin",
//       "/admin/users",
//       "/admin/todos",
//     ].includes(pathname)
//   ) {
//     return null;
//   }
//   return (
//     <div className="flex justify-between items-center py-4 px-10 shadow-xl dark:shadow-white dark:shadow-md">
//       <p>Todos</p>
//       <ul>
//         {status === "authenticated" && <li>Hello, {session.user?.name}</li>}
//       </ul>
//       <div className="flex items-center gap-1">
//         <form action="api/auth/signout">
//           <Button variant="light" type="submit">
//             <LogOut size={1} />
//           </Button>
//         </form>
//         <ModeToggle />
//       </div>
//     </div>
//   );
// };

// export default NavBar;


"use client";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { COLOR_THEME } from "@/lib/theme";

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  if ([
    "/signin",
    "/signup",
    "/signout",
    "/admin",
    "/admin/users",
    "/admin/todos",
  ].includes(pathname)) {
    return null;
  }

  return (
    <nav className={`sticky top-0 z-50 bg-white dark:bg-gray-900 border-b ${COLOR_THEME.primary.border} dark:border-gray-700`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <p className={`text-xl font-semibold ${COLOR_THEME.primary.text}`}>
              TodoApp
            </p>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {status === "authenticated" && (
              <span className="text-gray-700 dark:text-gray-300">
                Welcome, <span className="font-medium">{session.user?.name}</span>
              </span>
            )}

            {/* Sign Out Button */}
            {status === "authenticated" && (
              <form action="/api/auth/signout">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-gray-600 hover:${COLOR_THEME.primary[100]} dark:text-gray-400 dark:hover:bg-gray-800`}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </form>
            )}

            {/* Theme Toggle */}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;