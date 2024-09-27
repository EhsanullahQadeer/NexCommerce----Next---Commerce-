import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cookie from "cookie"
export function middleware(req: NextRequest) {
const { access_token } = cookie.parse(req.headers.get('cookie') || '');
  if (access_token && req.nextUrl.pathname.startsWith('/auth')) {
    const url = req.nextUrl.clone();
    url.pathname = '/'; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}