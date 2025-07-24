// import { cn } from "@/lib/utils";

// export default function AdminPage() {

//   return (
//     <div className="flex">
//       <main
//         className={cn(
//           "min-h-screen pt-4 transition-[margin] duration-300 ml-16"
//         )}
//       >
//         hello
//       </main>
//     </div>
//   );
// }
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/admin/users');
}