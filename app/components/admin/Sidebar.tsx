// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   ListTodo,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   Menu,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { useState } from "react";

// export function AdminSidebar() {
//   const [isCollapsed, setIsCollapsed] = useState(true);
//   const pathname = usePathname();

//   return (
//     <div
//       className={cn(
//         "fixed left-0 top-0 h-screen border-r bg-white dark:bg-black z-30",
//         "transition-all duration-300 ease-in-out",
//         isCollapsed ? "w-16" : "w-56"
//       )}
//     >
//       <div className="flex h-full flex-col gap-2">
//         <div className="flex items-center justify-between p-2">
//           {!isCollapsed && <h2 className="px-2 font-semibold">Admin Panel</h2>}
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="h-8 w-8 p-0"
//           >
//             {isCollapsed ? <Menu size={18} /> : <ChevronLeft size={16} />}
//           </Button>
//         </div>

//         <nav className="flex-1 px-2 py-4 space-y-1">
//           <SidebarLink
//             href="/admin"
//             icon={<LayoutDashboard size={18} />}
//             isCollapsed={isCollapsed}
//             isActive={pathname === "/admin"}
//           >
//             Dashboard
//           </SidebarLink>
//           <SidebarLink
//             href="/admin/users"
//             icon={<Users size={18} />}
//             isCollapsed={isCollapsed}
//             isActive={pathname?.startsWith("/admin/users")}
//           >
//             Users
//           </SidebarLink>
//           <SidebarLink
//             href="/admin/todos"
//             icon={<ListTodo size={18} />}
//             isCollapsed={isCollapsed}
//             isActive={pathname?.startsWith("/admin/todos")}
//           >
//             Todos
//           </SidebarLink>
//           {/* <SidebarLink
//             href="/admin/settings"
//             icon={<Settings size={18} />}
//             isCollapsed={isCollapsed}
//             isActive={pathname?.startsWith("/admin/settings")}
//           >
//             Settings
//           </SidebarLink> */}
//         </nav>

//         <div className="px-2 py-2">
//           <Separator className="my-2" />
//           <form action="/api/auth/signout">
//             <Button
//               variant="ghost"
//               className={cn(
//                 "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
//                 isCollapsed ? "justify-center" : "justify-start"
//               )}
//               type="submit"
//             >
//               <LogOut size={18} />
//               {!isCollapsed && "Sign Out"}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface SidebarLinkProps {
//   href: string;
//   icon: React.ReactNode;
//   children: React.ReactNode;
//   isCollapsed: boolean;
//   isActive: boolean;
// }

// function SidebarLink({
//   href,
//   icon,
//   children,
//   isCollapsed,
//   isActive,
// }: SidebarLinkProps) {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
//         isActive
//           ? "bg-emerald-100 text-primary"
//           : "text-muted-foreground hover:bg-emerald-50 hover:text-accent-foreground",
//         isCollapsed ? "justify-center" : "justify-start"
//       )}
//       title={isCollapsed ? String(children) : undefined}
//     >
//       <span className={cn(isActive ? "text-primary" : "text-muted-foreground")}>
//         {icon}
//       </span>
//       {!isCollapsed && children}
//     </Link>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle";

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen border-r bg-white dark:bg-gray-900 z-30",
        "transition-all duration-300 ease-in-out shadow-sm",
        isCollapsed ? "w-16" : "w-56" // Adjusted to your original widths
      )}
    >
      <div className="flex h-full flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between p-2">
          {!isCollapsed && (
            <h2 className="px-2 font-semibold text-purple-800 dark:text-purple-300">
              Admin Panel
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "h-8 w-8 p-0 rounded-full",
              "hover:bg-purple-100 dark:hover:bg-purple-900",
              "text-purple-700 dark:text-purple-300"
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <Menu size={18} className="shrink-0" />
            ) : (
              <ChevronLeft size={18} className="shrink-0" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          <SidebarLink
            href="/admin"
            icon={<LayoutDashboard size={18} />}
            isCollapsed={isCollapsed}
            isActive={pathname === "/admin"}
          >
            Dashboard
          </SidebarLink>
          <SidebarLink
            href="/admin/users"
            icon={<Users size={18} />}
            isCollapsed={isCollapsed}
            isActive={pathname?.startsWith("/admin/users")}
          >
            Users
          </SidebarLink>
          <SidebarLink
            href="/admin/todos"
            icon={<ListTodo size={18} />}
            isCollapsed={isCollapsed}
            isActive={pathname?.startsWith("/admin/todos")}
          >
            Todos
          </SidebarLink>
        </nav>

        {/* Footer */}
        <div className="px-2 py-2 mt-auto">
          <div className={cn("flex",
            isCollapsed ? "justify-center" : "justify-start"
          )}><ModeToggle/></div>
          <Separator className="my-2" />
          <form action="/api/auth/signout">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
                "hover:bg-purple-100 dark:hover:bg-purple-900",
                isCollapsed ? "justify-center p-0" : "justify-start px-3"
              )}
              type="submit"
              size={isCollapsed ? "icon" : "default"}
            >
              <LogOut size={18} className="shrink-0" />
              {!isCollapsed && "Sign Out"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isCollapsed: boolean;
  isActive: boolean;
}

function SidebarLink({
  href,
  icon,
  children,
  isCollapsed,
  isActive,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
        "hover:bg-purple-50 dark:hover:bg-purple-900/50",
        isActive
          ? "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-200"
          : "text-muted-foreground hover:text-accent-foreground",
        isCollapsed ? "justify-center px-0" : "justify-start"
      )}
      title={isCollapsed ? String(children) : undefined}
    >
      <span
        className={cn(
          "flex items-center justify-center",
          isActive
            ? "text-purple-700 dark:text-purple-300"
            : "text-muted-foreground"
        )}
      >
        {icon}
      </span>
      {!isCollapsed && (
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {children}
        </span>
      )}
    </Link>
  );
}