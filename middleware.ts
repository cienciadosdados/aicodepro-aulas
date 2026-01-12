import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Rotas que NÃO devem ser redirecionadas
  const allowedPaths = [
    '/espera',
    '/api',
    '/_next',
    '/favicon.ico',
    '/manifest.json',
    '/robots.txt',
    '/sitemap.xml',
  ];
  
  // Verificar se é uma rota permitida
  const isAllowed = allowedPaths.some(path => pathname.startsWith(path));
  
  // Se não for rota permitida, redirecionar para /espera
  if (!isAllowed) {
    return NextResponse.redirect(new URL('/espera', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
