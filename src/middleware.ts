import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Aplica apenas a rotas sob /admin
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('jojo_admin_session')?.value;
    const isLoginPage = pathname === '/admin/login';

    // Se estiver deslogado e tentar acessar qualquer área do admin exceto login
    if (!sessionToken && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Se já estiver logado e tentar acessar o login, manda para o dashboard
    if (sessionToken && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

