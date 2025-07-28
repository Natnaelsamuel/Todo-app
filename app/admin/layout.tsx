import { AdminSidebar } from "../components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-6 overflow-auto dark:bg-gray-900">{children}</main>
    </div>
  );
}
