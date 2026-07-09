// api/appointments/route.js
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";

const TIME_SLOTS   = ["09:00 AM","10:00 AM","11:00 AM","02:00 PM","03:00 PM","04:00 PM"];
const MAX_PER_SLOT = 5;

export async function POST(request) {
  try {
    await connectDB();

    const auth = await requireAuth();
    if (!auth.success) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const service  = formData.get("service");
    const date     = formData.get("date");
    const timeSlot = formData.get("timeSlot");
    const patientNote = formData.get("patientNote") || "";

    if (!service || !date || !timeSlot) {
      return Response.json(
        { success: false, message: "Service, date, and time slot are required." },
        { status: 400 }
      );
    }

    if (!TIME_SLOTS.includes(timeSlot)) {
      return Response.json(
        { success: false, message: "Invalid time slot." },
        { status: 400 }
      );
    }

    // Final slot re-check right before creating (server-side guard)
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const slotCount = await Appointment.countDocuments({
      date:          { $gte: startOfDay, $lte: endOfDay },
      timeSlot,
      paymentStatus: { $ne: "failed" }, // count unpaid + paid, not failed/deleted
    });

    if (slotCount >= MAX_PER_SLOT) {
      return Response.json(
        { success: false, message: "This slot just filled up. Please choose another time." },
        { status: 409 }
      );
    }

    // Handle file uploads
    const files      = formData.getAll("attachments");
    const attachments = [];
    const uploadDir  = path.join(process.cwd(), "public/uploads/appointments");
    await fs.mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      if (!file || file.size === 0) continue;
      const bytes  = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const timestamp = Date.now();
      const random    = Math.round(Math.random() * 1e9);

      if (file.type.startsWith("image/")) {
        const fileName     = `${timestamp}-${random}.webp`;
        const outputBuffer = await sharp(buffer)
          .rotate()
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 78 })
          .toBuffer();
        await fs.writeFile(path.join(uploadDir, fileName), outputBuffer);
        attachments.push({
          url: `/uploads/appointments/${fileName}`,
          uploadedBy: "patient",
          uploadedAt: new Date(),
        });

      } else if (file.type === "application/pdf") {
        const fileName = `${timestamp}-${random}.pdf`;
        await fs.writeFile(path.join(uploadDir, fileName), buffer);
        attachments.push({
          url: `/uploads/appointments/${fileName}`,
          uploadedBy: "patient",
          uploadedAt: new Date(),
        });
      }
    }

    // Create appointment — paymentStatus starts as "unpaid"
    const appointment = await Appointment.create({
      patient:       auth.user.id,
      service,
      date:          new Date(date),
      timeSlot,
      patientNote:   patientNote.trim(),
      attachments,
      paymentStatus: "unpaid",
    });

    return Response.json(
      {
        success:       true,
        message:       "Appointment created. Proceed to payment.",
        appointmentId: appointment._id.toString(),
      },
      { status: 201 }
    );

  } catch (error) {
    return Response.json(
      { success: false, message: "Something went wrong.", error: error.message },
      { status: 500 }
    );
  }
}
