import mongoose from "mongoose";


import Appointment from "@/models/Appointment";
import { connectDB } from "@/lib/db";

export async function PATCH(req, { params }) {
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

    const body = await req.json();

    const { status, prescription } = body;

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

    // UPDATE STATUS
    appointment.status = status;

    // SAVE PRESCRIPTION ONLY IF ATTENDED
    if (status === "attended") {
      appointment.prescription =
        prescription?.trim() || "";
    }

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