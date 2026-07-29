import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectDB();

    const services = await Service.find({ isActive: true }).sort({ name: 1 }).lean();

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
