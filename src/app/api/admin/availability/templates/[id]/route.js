import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { requireAdminAuth, unauthorizedAdminResponse } from "@/lib/adminAuth";
import AppointmentAvailability from "@/models/AppointmentAvailability";
import AppointmentSlotTemplate from "@/models/AppointmentSlotTemplate";

const validId = (id) => mongoose.Types.ObjectId.isValid(id);
const normalize = (body) => ({
  name: body?.name?.trim(),
  color: body?.color?.trim() || "blue",
  slots: Array.isArray(body?.slots) ? body.slots.map((slot) => ({ startTime: slot?.startTime?.trim(), endTime: slot?.endTime?.trim() })) : [],
});

export async function PUT(request, { params }) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();
  const { id } = await params;
  if (!validId(id)) return Response.json({ success: false, message: "Invalid template id." }, { status: 400 });
  try {
    await connectDB();
    const template = await AppointmentSlotTemplate.findByIdAndUpdate(id, normalize(await request.json()), { new: true, runValidators: true });
    if (!template) return Response.json({ success: false, message: "Template not found." }, { status: 404 });
    return Response.json({ success: true, template });
  } catch (error) {
    return Response.json({ success: false, message: error.message || "Failed to update template." }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();
  const { id } = await params;
  if (!validId(id)) return Response.json({ success: false, message: "Invalid template id." }, { status: 400 });
  try {
    await connectDB();
    const assignments = await AppointmentAvailability.countDocuments({ templateId: id });
    if (assignments) return Response.json({ success: false, message: "This template is assigned to one or more dates. Reset those dates before deleting it." }, { status: 409 });
    const template = await AppointmentSlotTemplate.findByIdAndDelete(id);
    if (!template) return Response.json({ success: false, message: "Template not found." }, { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, message: error.message || "Failed to delete template." }, { status: 500 });
  }
}
