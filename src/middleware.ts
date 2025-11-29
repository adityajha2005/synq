import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/protected')) {
    console.log('Protected route accessed:', pathname)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/protected/:path*'],
}

