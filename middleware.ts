// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt'

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request })
//   const { pathname } = request.nextUrl

//   // Redirect admin users from home to admin dashboard
//   if (pathname === '/home' && token?.role === 'admin') {
//     return NextResponse.redirect(new URL('/admin', request.url))
//   }

//   // Protect admin routes
//   if (pathname.startsWith('/admin') && token?.role !== 'admin') {
//     return NextResponse.redirect(new URL('/home', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/home', '/admin/:path*']
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/signin', '/signup', '/']
  
  // 1. Redirect unauthenticated users to sign-in (except for public routes)
  if (!token && !publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // 2. Admin-specific routing (only runs if user is authenticated)
  if (token) {
    // Redirect admin users from home to admin dashboard
    if (pathname === '/home' && token.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    // Protect admin routes from non-admins
    if (pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/home',
    '/admin/:path*',
  ]
}