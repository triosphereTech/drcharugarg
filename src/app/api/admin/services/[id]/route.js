import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import { requireAdminAuth, unauthorizedAdminResponse } from "@/lib/adminAuth";
import Service from "@/models/Service";

export async function PUT(request, { params }) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  try {
    await connectDB();

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid service id.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const name = body?.name?.trim();
    const initialFee = Number(body?.initialFee);
    const followUpFee = Number(body?.followUpFee);
    const description = body?.description?.trim() || "";
    const isActive = typeof body?.isActive === "boolean" ? body.isActive : undefined;

    if (!name) {
      return Response.json(
        {
          success: false,
          message: "Service name is required.",
        },
        { status: 400 }
      );
    }

    if (Number.isNaN(initialFee) || Number.isNaN(followUpFee)) {
      return Response.json(
        {
          success: false,
          message: "Initial and follow-up fees must be valid numbers.",
        },
        { status: 400 }
      );
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        initialFee,
        followUpFee,
        description,
        ...(typeof isActive === "boolean" ? { isActive } : {}),
      },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return Response.json(
        {
          success: false,
          message: "Service not found.",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Service updated successfully.",
        service: updatedService,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to update service.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  try {
    await connectDB();

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid service id.",
        },
        { status: 400 }
      );
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return Response.json(
        {
          success: false,
          message: "Service not found.",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Service deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to delete service.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
