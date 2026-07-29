import { connectDB } from "@/lib/db";
import { requireAdminAuth, unauthorizedAdminResponse } from "@/lib/adminAuth";
import Service from "@/models/Service";

export async function GET() {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  try {
    await connectDB();

    const services = await Service.find({}).sort({ name: 1 }).lean();

    return Response.json(
      {
        success: true,
        services,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to load services.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();

  try {
    await connectDB();

    const body = await request.json();
    const name = body?.name?.trim();
    const initialFee = Number(body?.initialFee);
    const followUpFee = Number(body?.followUpFee);
    const description = body?.description?.trim() || "";
    const isActive = typeof body?.isActive === "boolean" ? body.isActive : true;

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

    const service = await Service.create({
      name,
      initialFee,
      followUpFee,
      description,
      isActive,
    });

    return Response.json(
      {
        success: true,
        message: "Service created successfully.",
        service,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to create service.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
