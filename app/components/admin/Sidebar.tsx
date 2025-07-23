// // components/admin/Sidebar.tsx
// import Link from "next/link";
// import {
//   LayoutDashboard,
//   Users,
//   ListTodo,
//   Settings,
//   LogOut
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

// export function AdminSidebar() {
//   return (
//     <div className="hidden border-r bg-muted/40 md:block w-56">
//       <div className="flex h-full flex-col gap-2">
//         <div className="flex h-14 items-center border-b px-4">
//           <h2 className="font-semibold">Admin Panel</h2>
//         </div>

//         <nav className="flex-1 p-2 space-y-1">
//           <SidebarLink href="/admin" icon={<LayoutDashboard size={16} />}>
//             Dashboard
//           </SidebarLink>
//           <SidebarLink href="/admin/users" icon={<Users size={16} />}>
//             Users
//           </SidebarLink>
//           <SidebarLink href="/admin/todos" icon={<ListTodo size={16} />}>
//             Todos
//           </SidebarLink>
//           <SidebarLink href="/admin/settings" icon={<Settings size={16} />}>
//             Settings
//           </SidebarLink>
//         </nav>

//         <div className="p-2">
//           <Separator className="my-2" />
//           <form action="/api/auth/signout">
//             <Button
//               variant="ghost"
//               className="w-full justify-start gap-2"
//               type="submit"
//             >
//               <LogOut size={16} />
//               Sign Out
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SidebarLink({
//   href,
//   icon,
//   children
// }: {
//   href: string;
//   icon: React.ReactNode;
//   children: React.ReactNode;
// }) {
//   return (
//     <Link
//       href={href}
//       className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted"
//     >
//       {icon}
//       {children}
//     </Link>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ListTodo,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen border-r bg-white dark:bg-black z-30",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center justify-between p-2">
          {!isCollapsed && <h2 className="px-2 font-semibold">Admin Panel</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

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
          <SidebarLink
            href="/admin/settings"
            icon={<Settings size={18} />}
            isCollapsed={isCollapsed}
            isActive={pathname?.startsWith("/admin/settings")}
          >
            Settings
          </SidebarLink>
        </nav>

        <div className="px-2 py-2">
          <Separator className="my-2" />
          <form action="/api/auth/signout">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
                isCollapsed ? "justify-center" : "justify-start"
              )}
              type="submit"
            >
              <LogOut size={18} />
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
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isCollapsed ? "justify-center" : "justify-start"
      )}
      title={isCollapsed ? String(children) : undefined}
    >
      <span className={cn(isActive ? "text-primary" : "text-muted-foreground")}>
        {icon}
      </span>
      {!isCollapsed && children}
    </Link>
  );
}
