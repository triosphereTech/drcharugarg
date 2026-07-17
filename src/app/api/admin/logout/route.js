import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  requireAdminAuth,
  unauthorizedAdminResponse,
} from "@/lib/adminAuth";

export async function POST() {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  return Response.json({
    success: true,
    message: "Admin logged out successfully.",
  });
}
