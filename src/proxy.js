import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminAccessToken,
} from "@/lib/adminAuth";

import { verifyAccessToken } from "@/lib/auth";
import { decryptFilename } from "@/lib/protectedUpload";

const PUBLIC_ADMIN_PAGES = new Set(["/admin/login", "/admin/otp"]);
const PUBLIC_ADMIN_APIS = new Set([
  "/api/admin/login",
  "/api/admin/send-otp",
]);


// --------------------
// PATIENT PUBLIC ROUTES
// --------------------
const PUBLIC_PATIENT_PAGES = new Set([
  "/login",
  "/signup",
  "/otp",
]);

const PUBLIC_PATIENT_APIS = new Set([
  "/api/patient/login",
  "/api/patient/send-otp",
  "/api/patient/signup",
]);


export async function proxy(request) {
 const { pathname } = request.nextUrl;

  // =========================
  // ADMIN PUBLIC ROUTES
  // =========================
  if (
    PUBLIC_ADMIN_PAGES.has(pathname) ||
    PUBLIC_ADMIN_APIS.has(pathname)
  ) {
    return NextResponse.next();
  }

  // =========================
  // PATIENT PUBLIC ROUTES
  // =========================
  if (
    PUBLIC_PATIENT_PAGES.has(pathname) ||
    PUBLIC_PATIENT_APIS.has(pathname)
  ) {
    return NextResponse.next();
  }

  // =========================
  // ADMIN PROTECTION
  // =========================
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin")
  ) {
    const adminToken =
      request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    try {
      if (!adminToken)
        throw new Error("Missing admin token");

      verifyAdminAccessToken(adminToken);

      return NextResponse.next();
    } catch {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json(
          {
            success: false,
            message: "Admin authentication required.",
          },
          { status: 401 }
        );
      }

      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  // =========================
  // PATIENT DASHBOARD PROTECTION
  // =========================
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api/patient")
  ) {
    const token =
      request.cookies.get("accessToken")?.value;

    try {
      if (!token)
        throw new Error("Missing patient token");

      verifyAccessToken(token);

      return NextResponse.next();
    } catch {
      if (pathname.startsWith("/api/patient")) {
        return NextResponse.json(
          {
            success: false,
            message: "Patient authentication required.",
          },
          { status: 401 }
        );
      }

      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  //Uploads Protection
  if(pathname.startsWith("/uploads")){
    const patientToken = request.cookies.get("accessToken")?.value;
    const adminToken = request.cookies.get("adminAccessToken")?.value;
    const encryptedFilename = pathname.split("/").pop();
    try {
      let decoded;

      if (patientToken)
        decoded = verifyAccessToken(patientToken);

      else if(adminToken)
        decoded = verifyAdminAccessToken(adminToken)
      
      else
        throw new Error("Missing patient token");

      if(decoded.role === "patient")
      {
        const plainText = await decryptFilename(encryptedFilename)
        const decryptedId = plainText.split("_").pop();
        if(decryptedId !== decoded.id)
          throw new Error("Invalid token");
      }

      const response = new NextResponse(null, {status: 200});

      response.headers.set(
        "X-Accel-Redirect",
        `/_protected_uploads/appointments/${encryptedFilename}`
      );

      response.headers.set(
        "Cache-Control",
        "private, no-store"
      );

      return response;
    } catch {
        return NextResponse.json(
          {
            success: false,
            message: "Authentication required.",
          },
          { status: 401 }
        );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/dashboard/:path*",
    "/api/patient/:path*",
    "/uploads/:path*"
  ],
};
