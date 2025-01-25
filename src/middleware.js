// src/middleware.js
import { NextResponse } from 'next/server'

const locales = ['ar', 'en']

export function middleware(request) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname doesn't start with our supported locales
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // Redirect to the Arabic version by default
    return NextResponse.redirect(
      new URL(`/ar${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}