import { connectDB } from "@/lib/db";
import { generateOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/sendOtpEmail";
import Patient from "@/models/Patient";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json(
        {
          success: false,
          message: "Email is required.",
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

    const otp = generateOtp();

    patient.otp = otp;
    patient.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await patient.save();

    await sendOtpEmail({ email, otp });

    return Response.json({
      success: true,
      message: "OTP sent successfully to your email.",
      email,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong while generating OTP.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
