import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminAccessToken,
} from "@/lib/adminAuth";

const PUBLIC_ADMIN_PAGES = new Set(["/admin/login", "/admin/otp"]);
const PUBLIC_ADMIN_APIS = new Set([
  "/api/admin/login",
  "/api/admin/send-otp",
]);

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_PAGES.has(pathname) || PUBLIC_ADMIN_APIS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  try {
    if (!token) throw new Error("Missing admin token");
    verifyAdminAccessToken(token);
    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api/admin/")) {
      return NextResponse.json(
        { success: false, message: "Admin authentication required." },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
