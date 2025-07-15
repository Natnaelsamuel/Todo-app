import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-2 text-sm text-white border-t bg-black dark:bg-gray-900 dark:text-gray-400">
      &copy; {new Date().getFullYear()} MyTodoApp. All rights reserved.
    </footer>
  );
};

export default Footer;
