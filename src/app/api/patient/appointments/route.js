import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function GET(request) {
  try {
    const auth = await requireAuth(request);

    if (!auth.success) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const appointments = await Appointment.find({
      patient: auth.user.id,
    }).sort({ date: -1 });

    return Response.json({
      success: true,
      appointments,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}