'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    // Sign out and redirect to homepage
    signOut({ 
      redirect: false, // We handle redirect manually
    }).then(() => {
      router.push('/signin'); // Redirect after sign-out
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Signing out...</p>
    </div>
  );
}