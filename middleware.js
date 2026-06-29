import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');
  
  // Vercel me SITE_PASSWORD set karoge. Default: Ravi@2026
  const validPassword = process.env.SITE_PASSWORD || "Ravi@2026"; 

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Password match check
    if (pwd === validPassword) {
      return NextResponse.next();
    }
  }


  return new NextResponse('Unauthorized Access: Contact @Ravi for Password', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
