// 'use client';

// import { signOut } from 'next-auth/react';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SignOutPage() {
//   const router = useRouter();

//   useEffect(() => {
//     // Sign out and redirect to homepage
//     signOut({ 
//       redirect: false, // We handle redirect manually
//     }).then(() => {
//       router.push('/signin'); // Redirect after sign-out
//     });
//   }, [router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p>Signing out...</p>
//     </div>
//   );
// }

'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, ArrowLeft } from 'lucide-react'; // Directly import Lucide icons

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ 
      redirect: false,
    }).then(() => {
      router.push('/signin');
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <LogOut className="h-5 w-5 text-gray-600 animate-pulse" /> {/* Lucide icon */}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Signing Out</h1>
          <p className="text-sm text-muted-foreground">
            We’re securely logging you out...
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-primary"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {/* Lucide icon */}
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}