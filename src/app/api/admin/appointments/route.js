import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import { requireAdminAuth, unauthorizedAdminResponse } from "@/lib/adminAuth";
import Appointment from "@/models/Appointment";
import Patient from "@/models/Patient";

export async function GET(req) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  try {
    

    await connectDB();    

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");

    const startDate = searchParams.get("startDate");

    const endDate = searchParams.get("endDate");

    const services = searchParams.get("services");

    const patientId = searchParams.get("patientId");

    const countOnly = searchParams.get("countOnly") === "true";

    const hasPagination = searchParams.has("page") || searchParams.has("limit");

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
          { status: 400 },
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
        { status: 200 },
      );
    }

    // PAGINATION
    const skip = (page - 1) * limit;

    const appointmentsQuery = Appointment.find(query)
    .populate("patient", "name patientId email mobileNumber")
      .sort({
        date: -1,
        createdAt: -1,
      })
      .lean();

    if (hasPagination) {
      appointmentsQuery.skip(skip).limit(limit);
    }

    const promises = [
  appointmentsQuery,
  Appointment.countDocuments(query),
];

if (patientId) {
  promises.push(
    Patient.findById(patientId)
      .select("patientId name email mobileNumber dob gender bloodGroup address")
      .lean()
  );
}

const [appointments, total, patient = null] = await Promise.all(promises);

    return Response.json(
  {
    success: true,
    patient,
    appointments,

    total,
    page: hasPagination ? page : null,
    limit: hasPagination ? limit : null,
    totalPages: hasPagination ? Math.ceil(total / limit) : 1,
    count: appointments.length,
  },
  { status: 200 },
);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
