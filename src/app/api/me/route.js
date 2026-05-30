import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import Patient from "@/models/Patient";

export async function GET() {

  try {

    await connectDB();
    const auth = await requireAuth();
    
    if (!auth.success) {

      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const patient = await Patient.findById(auth.user.id);

    if (!patient) {

      return Response.json(
        {
          success: false,
          message: "Patient not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,

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
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}