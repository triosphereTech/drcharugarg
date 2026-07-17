import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "adminAccessToken";

function getAdminTokenSecret() {
  const secret =
    process.env.ADMIN_ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    throw new Error(
      "Please add ADMIN_ACCESS_TOKEN_SECRET or ACCESS_TOKEN_SECRET to .env.local"
    );
  }

  return secret;
}

export function createAdminAccessToken(admin) {
  return jwt.sign(
    {
      id: admin._id.toString(),
      email: admin.email,
      role: "admin",
    },
    getAdminTokenSecret(),
    { expiresIn: "7d" }
  );
}

export function verifyAdminAccessToken(token) {
  const decoded = jwt.verify(token, getAdminTokenSecret());

  if (decoded.role !== "admin") {
    throw new Error("Invalid admin token");
  }

  return decoded;
}

export async function requireAdminAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) return { success: false };

    return {
      success: true,
      admin: verifyAdminAccessToken(token),
    };
  } catch {
    return { success: false };
  }
}

export function unauthorizedAdminResponse() {
  return Response.json(
    { success: false, message: "Admin authentication required." },
    { status: 401 }
  );
}
