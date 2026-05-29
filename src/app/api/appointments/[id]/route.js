// api/appointments/[id]/route.js
import fs from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";
// delete appointment 
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const auth = await requireAuth();
    if (!auth.success) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Only allow deleting own unpaid appointments
    const appointment = await Appointment.findOne({
      _id:           id,
      patient:       auth.user.id,
      paymentStatus: "unpaid", // can only delete if never paid
    });

    if (!appointment) {
      return Response.json(
        { success: false, message: "Appointment not found or already paid." },
        { status: 404 }
      );
    }

    // Delete uploaded files from disk
    for (const attachment of appointment.attachments) {
      try {
        const filePath = path.join(process.cwd(), "public", attachment.url);
        await fs.unlink(filePath);
      } catch {
        // File might not exist — don't crash, just continue
      }
    }

    // Delete the appointment document
    await appointment.deleteOne();

    return Response.json({
      success: true,
      message: "Appointment and uploaded files deleted.",
    });

  } catch (error) {
    return Response.json(
      { success: false, message: "Could not delete appointment.", error: error.message },
      { status: 500 }
    );
  }
}