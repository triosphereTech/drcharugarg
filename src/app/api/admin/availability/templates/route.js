import { connectDB } from "@/lib/db";
import { requireAdminAuth, unauthorizedAdminResponse } from "@/lib/adminAuth";
import AppointmentSlotTemplate from "@/models/AppointmentSlotTemplate";

function normalizeTemplate(body) {
  const name = body?.name?.trim();
  const color = body?.color?.trim() || "blue";
  const slots = Array.isArray(body?.slots)
    ? body.slots.map((slot) => ({
        startTime: slot?.startTime?.trim(),
        endTime: slot?.endTime?.trim(),
      }))
    : [];
  return { name, color, slots };
}

export async function GET() {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();
  try {
    await connectDB();
    const templates = await AppointmentSlotTemplate.find({}).sort({ name: 1 }).lean();
    return Response.json({ success: true, templates });
  } catch (error) {
    return Response.json({ success: false, message: error.message || "Failed to load templates." }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();
  try {
    await connectDB();
    const template = await AppointmentSlotTemplate.create(normalizeTemplate(await request.json()));
    return Response.json({ success: true, template }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, message: error.message || "Failed to create template." }, { status: 400 });
  }
}
