import { cookies } from "next/headers";

import {
  ADMIN_COOKIE_NAME,
  createAdminAccessToken,
} from "@/lib/adminAuth";

import { connectDB } from "@/lib/db";

import Admin from "@/models/Admin";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, otp } = body;

    if (!email || !otp) {
      return Response.json(
        {
          success: false,
          message: "Email and OTP are required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return Response.json(
        {
          success: false,
          message: "Admin not found with this email.",
        },
        { status: 404 }
      );
    }

    if (admin.otp !== otp) {
      return Response.json(
        {
          success: false,
          message: "Invalid OTP.",
        },
        { status: 401 }
      );
    }

    if (
      !admin.otpExpiresAt ||
      admin.otpExpiresAt < new Date()
    ) {
      return Response.json(
        {
          success: false,
          message:
            "OTP has expired. Please request a new OTP.",
        },
        { status: 401 }
      );
    }

    const accessToken = createAdminAccessToken(admin);

    const cookieStore = await cookies();

    cookieStore.set(ADMIN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    admin.otp = undefined;

    admin.otpExpiresAt = undefined;

    await admin.save();

    return Response.json({
      success: true,
      message: "Admin login successful.",

      admin: {
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message:
          "Something went wrong while logging in admin.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
