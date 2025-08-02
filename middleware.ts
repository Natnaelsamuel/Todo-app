import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  const publicRoutes = ['/signin', '/signup', '/']
  
  // If no token and trying to access protected route, redirect to signin
  if (!token && !publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // If user is logged in
  if (token) {
    // Check if user is trying to access admin routes
    if (pathname.startsWith('/admin')) {
      // Check if user has admin role in the token
      const userRole = token.role || token.user?.role
      
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/home', request.url))
      }
    }

    // Redirect admin users from home to admin dashboard
    if (pathname === '/home' && (token.role === 'admin' || token.user?.role === 'admin')) {
      return NextResponse.redirect(new URL('/admin', request.url))
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