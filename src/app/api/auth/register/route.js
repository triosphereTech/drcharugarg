import { connectDB } from "@/lib/db";
import { generateOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/sendOtpEmail";
import Patient from "@/models/Patient";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, mobileNumber } = body;

    if (!name || !email || !mobileNumber) {
      return Response.json(
        {
          success: false,
          message: "Name, email, and mobile number are required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
      return Response.json(
        {
          success: false,
          message: "Patient already exists with this email.",
        },
        { status: 409 }
      );
    }

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const patient = await Patient.create({
      name,
      email,
      mobileNumber,
      otp,
      otpExpiresAt,
    });

    await sendOtpEmail({ email, otp });

    console.log(`Register OTP for ${email}: ${otp}`);

    return Response.json(
      {
        success: true,
        message: "Patient registered successfully. OTP generated for verification.",
        patient: {
          email: patient.email,
          otpExpiresAt: patient.otpExpiresAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong while registering patient.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
