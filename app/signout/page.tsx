// 'use client';

// import { signOut } from 'next-auth/react';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Skeleton } from '@/components/ui/skeleton';
// import { LogOut, ArrowLeft } from 'lucide-react'; // Directly import Lucide icons

// export default function SignOutPage() {
//   const router = useRouter();

//   useEffect(() => {
//     signOut({
//       redirect: false,
//     }).then(() => {
//       router.push('/signin');
//     });
//   }, [router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//       <Card className="w-full max-w-md shadow-sm">
//         <CardHeader className="space-y-2 text-center">
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
//             <LogOut className="h-5 w-5 text-gray-600 animate-pulse" /> {/* Lucide icon */}
//           </div>
//           <h1 className="text-2xl font-semibold tracking-tight">Signing Out</h1>
//           <p className="text-sm text-muted-foreground">
//             We’re securely logging you out...
//           </p>
//         </CardHeader>
//         <CardContent className="flex justify-center">
//           <div className="flex items-center space-x-2">
//             <Skeleton className="h-3 w-3 rounded-full" />
//             <Skeleton className="h-3 w-3 rounded-full" />
//             <Skeleton className="h-3 w-3 rounded-full" />
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <Button
//             variant="ghost"
//             className="text-muted-foreground hover:text-primary"
//             onClick={() => router.push('/')}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" /> {/* Lucide icon */}
//             Cancel
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { COLOR_THEME } from "@/lib/theme";
import { ArrowLeft, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut({ redirect: false });
        toast.success("You have been signed out successfully", {
          position: "top-center",
        });
        router.push("/signin");
      } catch {
        toast.error("Failed to sign out. Please try again.", {
          position: "top-center",
        });
        router.push("/");
      }
    };

    const timer = setTimeout(handleSignOut, 2000); // Delay for better UX

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <Card
        className={`w-full max-w-md shadow-lg border ${COLOR_THEME.primary.border} dark:border-gray-700 dark:bg-gray-900`}
      >
        <CardHeader className="space-y-4 text-center">
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${COLOR_THEME.primary[100]} dark:bg-gray-800`}
          >
            <LogOut className="h-6 w-6 text-purple-600 dark:text-purple-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Signing Out
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Securing your session...
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center py-6">
          <div className="flex items-center space-x-3 mb-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-3 w-3 rounded-full bg-purple-400 dark:bg-purple-600"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full animate-progress"
              style={{ width: "0%" }}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-0">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className={`flex items-center gap-2 ${COLOR_THEME.primary.border} hover:bg-purple-50 dark:hover:bg-gray-800`}
          >
            <ArrowLeft className="h-4 w-4" />
            Return to safety
          </Button>
        </CardFooter>
      </Card>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
