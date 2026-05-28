import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";

export async function POST(request) {
  try {

    // CONNECT DATABASE
    await connectDB();

    // AUTH USER
    const auth = await requireAuth();
      console.log("auth", auth);  
    if (!auth.success) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // GET FORM DATA
    const formData = await request.formData();

    const service = formData.get("service");
    const date = formData.get("date");
    const timeSlot = formData.get("timeSlot");

    // VALIDATION
    if (!service || !date || !timeSlot) {
      return Response.json(
        {
          success: false,
          message: "Service, date, and time slot are required.",
        },
        { status: 400 }
      );
    }

    // GET FILES
    const files = formData.getAll("attachments");

    const attachments = [];

    // UPLOAD FOLDER
    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/appointments"
    );

    await fs.mkdir(uploadDir, { recursive: true });

    // LOOP FILES
    for (const file of files) {

      if (!file || file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const random = Math.round(Math.random() * 1e9);

      // IMAGE FILES
      if (file.type.startsWith("image/")) {

        const fileName = `${timestamp}-${random}.webp`;

        const filePath = path.join(uploadDir, fileName);

        const outputBuffer = await sharp(buffer)
          .rotate()
          .resize({
            width: 1600,
            withoutEnlargement: true,
          })
          .webp({
            quality: 78,
          })
          .toBuffer();

        await fs.writeFile(filePath, outputBuffer);

        attachments.push({
          url: `/uploads/appointments/${fileName}`,
        });

      }

      // PDF FILES
      else if (file.type === "application/pdf") {

        const fileName = `${timestamp}-${random}.pdf`;

        const filePath = path.join(uploadDir, fileName);

        await fs.writeFile(filePath, buffer);

        attachments.push({
          url: `/uploads/appointments/${fileName}`,
        });
      }
    }

    // CREATE APPOINTMENT
    const appointment = await Appointment.create({
      patient: auth.user.id,
      service,
      date: new Date(date),
      timeSlot,
      attachments,
    });

    return Response.json(
      {
        success: true,
        message: "Appointment booked successfully.",
        appointment,
      },
      { status: 201 }
    );

  } catch (error) {

    return Response.json(
      {
        success: false,
        message: "Something went wrong.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}