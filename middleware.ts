import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Redirecionar a raiz para /espera
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/espera', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
