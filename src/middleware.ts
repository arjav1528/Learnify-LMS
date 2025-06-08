import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Routes that don't require authentication
const publicRoutes = ['/', '/api/user/update'];
const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  try {
    const { userId } = await auth();
    const path = req.nextUrl.pathname;
    
    // Handle public routes
    if (isPublicRoute(req)) {
      if (!userId) return NextResponse.next();
      // Continue to role-based routing for authenticated users
    }
    
    // Handle unauthenticated users
    if (!userId) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    // Handle authenticated users
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    
    // Special case: Allow user update API even if profile is incomplete
    if (path === '/api/user/update') {
      return NextResponse.next();
    }

    console.log(user.unsafeMetadata.role);
    
    // Handle users with incomplete profiles
    if (!user.unsafeMetadata?.role) {
      if (path !== '/complete-profile') {
        return NextResponse.redirect(new URL('/complete-profile', req.url));
      }
      return NextResponse.next();
    }
    
    // Handle role-based access and redirects
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
        
        // Prevent instructors from accessing student routes
        if (!path.startsWith('/instructor') && !path.startsWith('/api/')) {
          return NextResponse.redirect(new URL('/instructor/dashboard', req.url));
        }
        return NextResponse.next();
        
      default:
        // Handle unknown roles
        return NextResponse.next();
    }
    
  } catch (error) {
    console.error("Middleware error:", error);
    // Fail safely by redirecting to home page
    return NextResponse.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};