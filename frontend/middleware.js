import { NextResponse } from 'next/server'

export function middleware(request) {

    const path = request.nextUrl.pathname
    const isPublicPath = path === '/signin' || path === '/signup'
    const token = request.cookies.get('zgAuth')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}

export const config = {
    matcher: ['/', '/signin', '/profile', '/signup', '/share/:path*'],
}