import { cookies } from "next/headers";
import { createAccessToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Patient from "@/models/Patient";

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

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return Response.json(
        {
          success: false,
          message: "Patient not found with this email.",
        },
        { status: 404 }
      );
    }

    if (patient.otp !== otp) {
      return Response.json(
        {
          success: false,
          message: "Invalid OTP.",
        },
        { status: 401 }
      );
    }

    if (!patient.otpExpiresAt || patient.otpExpiresAt < new Date()) {
      return Response.json(
        {
          success: false,
          message: "OTP has expired. Please request a new OTP.",
        },
        { status: 401 }
      );
    }

    const accessToken = createAccessToken(patient);
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    patient.otp = undefined;
    patient.otpExpiresAt = undefined;
    await patient.save();

    return Response.json({
      success: true,
      message: "Patient login successful.",
      
      patient: { 
        name: patient.name,
        email: patient.email,
        mobileNumber: patient.mobileNumber,
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong while logging in patient.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
