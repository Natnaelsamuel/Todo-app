import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  const publicRoutes = ['/signin', '/signup', '/', '/api/auth']
  
  // If no token and trying to access protected route, redirect to signin
  if (!token && !publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // If user is logged in
  if (token) {
    // Check if user is trying to access admin routes
    if (pathname.startsWith('/admin')) {
      // Check if user has admin role in the token
      const userRole = (token as any).role || (token as any).user?.role
      
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/home', request.url))
      }
    }

    // Redirect admin users from home to admin dashboard
    if (pathname === '/home' && ((token as any).role === 'admin' || (token as any).user?.role === 'admin')) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ]
}