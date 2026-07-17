import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import {
  requireAdminAuth,
  unauthorizedAdminResponse,
} from "@/lib/adminAuth";
import Appointment from "@/models/Appointment";

export async function POST(request) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  try {

    // CONNECT DATABASE
    await connectDB();


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
          uploadedBy: "patient",
          uploadedAt: new Date(),
        });

      }

      // PDF FILES
      else if (file.type === "application/pdf") {

        const fileName = `${timestamp}-${random}.pdf`;

        const filePath = path.join(uploadDir, fileName);

        await fs.writeFile(filePath, buffer);

        attachments.push({
          url: `/uploads/appointments/${fileName}`,
          uploadedBy: "patient",
          uploadedAt: new Date(),
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

export async function GET(req) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");

    const startDate = searchParams.get("startDate");

    const endDate = searchParams.get("endDate");

    const timeSlots = searchParams.get("timeSlots");

    const services = searchParams.get("services");

    const patientId = searchParams.get("patientId");

    const countOnly = searchParams.get("countOnly") === "true";

    const hasPagination =
      searchParams.has("page") || searchParams.has("limit");

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const limit = Math.max(Number(searchParams.get("limit")) || 10, 1);

    const query = {};

    // STATUS FILTER
    if (status) {
      query.status = status;
    }

    // PATIENT FILTER
    if (patientId) {
      if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return Response.json(
          {
            success: false,
            message: "Invalid patient id",
          },
          { status: 400 }
        );
      }

      query.patient = patientId;
    }

    // DATE RANGE FILTER
    if (startDate || endDate) {
      query.date = {};

      if (startDate) {
        query.date.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);

        // INCLUDE FULL DAY
        end.setHours(23, 59, 59, 999);

        query.date.$lte = end;
      }
    }

    // TIMESLOT FILTER
    if (timeSlots) {
      const slotsArray = timeSlots
        .split(",")
        .map((slot) => slot.trim());

      query.timeSlot = {
        $in: slotsArray,
      };
    }

    // SERVICE FILTER
    if (services) {
      const servicesArray = services
        .split(",")
        .map((service) => service.trim());

      query.service = {
        $in: servicesArray,
      };
    }

    if (countOnly) {
      const statusCounts = await Appointment.aggregate([
        { $match: query },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      const counts = {
        total: 0,
        pending: 0,
        attended: 0,
        cancelled: 0,
      };

      for (const item of statusCounts) {
        counts.total += item.count;

        if (Object.hasOwn(counts, item._id)) {
          counts[item._id] = item.count;
        }
      }

      return Response.json(
        {
          success: true,
          countOnly: true,
          counts,
        },
        { status: 200 }
      );
    }

    // PAGINATION
    const skip = (page - 1) * limit;

    const appointmentsQuery = Appointment.find(query)
        .populate({
          path: "patient",
          select: "name email mobileNumber",
        })
        .sort({
          date: -1,
          createdAt: -1,
        })
        .lean();

    if (hasPagination) {
      appointmentsQuery.skip(skip).limit(limit);
    }

    const [appointments, total] = await Promise.all([
      appointmentsQuery,

      Appointment.countDocuments(query),
    ]);

    return Response.json(
      {
        success: true,
        total,
        page: hasPagination ? page : null,
        limit: hasPagination ? limit : null,
        totalPages: hasPagination ? Math.ceil(total / limit) : 1,
        count: appointments.length,
        data: appointments,
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
