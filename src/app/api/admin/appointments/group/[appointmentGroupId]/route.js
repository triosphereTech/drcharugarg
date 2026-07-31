import { connectDB } from "@/lib/db";
import { requireAdminAuth, unauthorizedAdminResponse } from "@/lib/adminAuth";
import Appointment from "@/models/Appointment";

export async function GET(_request, { params }) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  try {
    await connectDB();
    const { appointmentGroupId } = await params;
    if (!appointmentGroupId?.trim()) {
      return Response.json({ success: false, message: "Appointment group id is required." }, { status: 400 });
    }

    const data = await Appointment.find({ appointmentGroupId })
      .populate({ path: "patient", select: "patientId name email mobileNumber conversation" })
      .sort({ date: 1, createdAt: 1 })
      .lean();

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, message: error.message || "Unable to load appointment group." }, { status: 500 });
  }
}
