// 'use client';
// import { usePathname } from "next/navigation";
// import React from "react";

// const Footer = () => {
//   const pathname = usePathname();
  
//   // Hide on these routes
//   if (["/signin", "/signup"].includes(pathname)) {
//     return null;
//   }
//   return (
//     <footer className="text-center py-2 text-sm text-black border-t bg-white dark:bg-black dark:text-white dark:border-t-white">
//       &copy; {new Date().getFullYear()} MyTodoApp. All rights reserved.
//     </footer>
//   );
// };

// export default Footer;

'use client';
import { COLOR_THEME } from "@/lib/theme";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  
  // Hide on these routes
  if (["/signin", "/signup", "/admin", "/admin/users", "/admin/todos"].includes(pathname)) {
    return null;
  }

  return (
    <footer className={`border-t ${COLOR_THEME.primary.border} dark:border-gray-700 bg-white dark:bg-gray-900 py-2`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className={`text-sm ${COLOR_THEME.primary.text}`}>
          &copy; {new Date().getFullYear()} MyTodoApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;