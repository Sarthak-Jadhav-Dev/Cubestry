// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Protecting the route of main window
  if (pathname.startsWith("/space")) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname); 
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Match only /space route (and its children)
export const config = {
  matcher: ["/space/:path*"],
};
