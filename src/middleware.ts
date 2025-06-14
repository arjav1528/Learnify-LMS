import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Routes that don't require authentication
const publicRoutes = ['/'];
const APIRoutes = ['/api/user/update','/api/webhook', '/api/db'];
const isPublicRoute = createRouteMatcher(publicRoutes);
const isAPIRoute = createRouteMatcher(APIRoutes);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  try {
    const { userId } = await auth();
    const path = req.nextUrl.pathname;

    if (isAPIRoute(req)) {
      return NextResponse.next();
    }
    
    if (isPublicRoute(req)) {
      if (!userId) return NextResponse.next();
    }
    
    if (!userId) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    
    

    console.log(user.unsafeMetadata.role);
    
    if (!user.unsafeMetadata?.role) {
      if (path !== '/complete-profile') {
        return NextResponse.redirect(new URL('/complete-profile', req.url));
      }
      return NextResponse.next();
    }
    
    const role = user.unsafeMetadata.role;
    
    switch (role) {
      case 'student':
        if (path === '/' || path === '/complete-profile') {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        return NextResponse.next();
        
      case 'instructor':
        if (path === '/' || path === '/complete-profile') {
          return NextResponse.redirect(new URL('/instructor/dashboard', req.url));
        }
        
        if (!path.startsWith('/instructor') && !path.startsWith('/api/')) {
          return NextResponse.redirect(new URL('/instructor/dashboard', req.url));
        }
        return NextResponse.next();
        
      default:
        return NextResponse.next();
    }
    
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};