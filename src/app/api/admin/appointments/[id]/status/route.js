import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";


import Appointment from "@/models/Appointment";
import { connectDB } from "@/lib/db";
import {
  requireAdminAuth,
  unauthorizedAdminResponse,
} from "@/lib/adminAuth";

export async function PATCH(req, { params }) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  try {
    await connectDB();

    const { id } = await params;

    // VALIDATE OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid appointment id",
        },
        { status: 400 }
      );
    }

     const contentType = req.headers.get("content-type") || "";
    let status;
    let prescription = "";
    let files = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      status = formData.get("status");
      prescription = formData.get("prescription") || "";
      files = formData.getAll("attachments");
    } else {
      const body = await req.json();
      status = body.status;
      prescription = body.prescription || "";
    }

    // VALIDATE STATUS
    if (!["attended", "cancelled"].includes(status)) {
      return Response.json(
        {
          success: false,
          message: "Invalid status",
        },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return Response.json(
        {
          success: false,
          message: "Appointment not found",
        },
        { status: 404 }
      );
    }

    // ONLY PENDING CAN CHANGE
    if (appointment.status !== "pending") {
      return Response.json(
        {
          success: false,
          message:
            "Only pending appointments can be updated",
        },
        { status: 400 }
      );
    }

 const attachments = [];

    if (files.length > 0) {
      const uploadDir = path.join(
        process.cwd(),
        "public/uploads/appointments"
      );

      await fs.mkdir(uploadDir, { recursive: true });

      for (const file of files) {
        if (!file || file.size === 0) continue;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const timestamp = Date.now();
        const random = Math.round(Math.random() * 1e9);

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
            uploadedBy: "doctor",
            uploadedAt: new Date(),
          });
        } else if (file.type === "application/pdf") {
          const fileName = `${timestamp}-${random}.pdf`;
          const filePath = path.join(uploadDir, fileName);

          await fs.writeFile(filePath, buffer);

          attachments.push({
            url: `/uploads/appointments/${fileName}`,
            uploadedBy: "doctor",
            uploadedAt: new Date(),
          });
        }
      }
    }

    // UPDATE STATUS
    appointment.status = status;

    // SAVE PRESCRIPTION ONLY IF ATTENDED
    if (status === "attended") {
      appointment.prescription =
        prescription?.trim() || "";
    }

    if (attachments.length > 0) {
      appointment.attachments.push(...attachments);
    }

    console.log(appointment)

    await appointment.save();


    return Response.json(
      {
        success: true,
        message: `Appointment marked as ${status}`,
        data: appointment,
      },
      { status: 200 }
    );
  } catch (error) {

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
