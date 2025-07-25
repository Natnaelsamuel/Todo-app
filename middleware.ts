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

  const publicRoutes = ['/signin', '/signup', '/']
  
  if (!token && !publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (token) {
    if (pathname === '/home' && token.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

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