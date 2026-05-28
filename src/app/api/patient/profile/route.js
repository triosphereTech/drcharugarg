import { requireAuth } from "@/lib/authMiddleware";
import { connectDB } from "@/lib/db";
import Patient from "@/models/Patient";

export async function GET(request) {
  try {
    const auth = requireAuth(request);

    if (auth.error) {
      return auth.error;
    }

    await connectDB();

    const patient = await Patient.findById(auth.user.id).select("-otp");

    if (!patient) {
      return Response.json(
        {
          success: false,
          message: "Patient not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      patient,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong while fetching patient profile.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
