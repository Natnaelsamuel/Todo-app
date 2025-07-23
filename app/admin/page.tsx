'use client';
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <main className={cn(
        "pt-16 transition-all duration-300",
        "lg:ml-16 xl:ml-56", // Desktop margins
        sidebarOpen ? "ml-56" : "ml-0" // Mobile margin when sidebar is open
      )}>
        hello
      </main>
    </>
  );
}