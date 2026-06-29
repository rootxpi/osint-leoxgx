import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');
  
  // Vercel Environment Variables me tum SITE_PASSWORD set karoge. 
  // Agar set nahi kiya, toh default password 'Ravi@2026' rahega.
  const validPassword = process.env.SITE_PASSWORD || "Ravi@2026"; 

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    
    if (pwd === validPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Unauthorized Access: Contact @Ravi for Password', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure 𝖫Ξ𝖮⟁𝗘𝗬Ξ Hub"' },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
