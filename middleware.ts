import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const isProdSite =
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV === "production"
    
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: isProdSite,
      cookieName: isProdSite
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
    })

    // console.log("NODE_ENV:", process.env.NODE_ENV);
    // console.log("VERCEL_ENV:", process.env.VERCEL_ENV);
    
    // console.log("🔑 Token in middleware:", token);
    // console.log("🔑 Token role:", token?.role);
    
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
