import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Redirect admin users from home to admin dashboard
  if (pathname === '/' && token?.role === 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*']
}