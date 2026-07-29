import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { parseDateKey, getAvailabilityRange } from "@/lib/availability";
import { requireAdminAuth, unauthorizedAdminResponse } from "@/lib/adminAuth";
import AppointmentAvailability from "@/models/AppointmentAvailability";
import AppointmentSlotTemplate from "@/models/AppointmentSlotTemplate";

export async function GET(request) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    if (!startDate || !endDate) return Response.json({ success: false, message: "startDate and endDate are required." }, { status: 400 });
    return Response.json(await getAvailabilityRange(startDate, endDate));
  } catch (error) {
    return Response.json({ success: false, message: error.message || "Failed to load availability." }, { status: 400 });
  }
}

export async function PUT(request) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();
  try {
    await connectDB();
    const body = await request.json();
    const date = parseDateKey(body?.date);
    const isOff = body?.isOff === true;
    const templateId = body?.templateId || null;
    if (!isOff && !mongoose.Types.ObjectId.isValid(templateId)) return Response.json({ success: false, message: "Choose a valid slot template or reset this date." }, { status: 400 });
    if (!isOff && !(await AppointmentSlotTemplate.exists({ _id: templateId }))) return Response.json({ success: false, message: "Selected slot template no longer exists." }, { status: 404 });
    const availability = await AppointmentAvailability.findOneAndUpdate({ date }, { date, isOff, templateId: isOff ? null : templateId }, { upsert: true, new: true, runValidators: true });
    return Response.json({ success: true, availability });
  } catch (error) {
    return Response.json({ success: false, message: error.message || "Failed to save availability." }, { status: 400 });
  }
}

export async function DELETE(request) {
  const auth = await requireAdminAuth();
  if (!auth.success) return unauthorizedAdminResponse();
  try {
    await connectDB();
    const date = parseDateKey(new URL(request.url).searchParams.get("date"));
    await AppointmentAvailability.deleteOne({ date });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, message: error.message || "Failed to reset availability." }, { status: 400 });
  }
}
