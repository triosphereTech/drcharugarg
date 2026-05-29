// api/webhook/razorpay/route.js
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { sendAppointmentConfirmationMail } from "@/lib/sendAppointmentConfirmationMail";

async function deleteAppointmentFiles(appointment) {
  for (const attachment of appointment.attachments) {
    try {
      const filePath = path.join(process.cwd(), "public", attachment.url);
      await fs.unlink(filePath);
    } catch {
      // File already deleted or doesn't exist — ignore
    }
  }
}

export async function POST(request) {

  // ── Read raw body as text (simple, no helper function needed) ──
  const rawBody = await request.text();
    console.log("SECRET IN USE:", JSON.stringify(process.env.RAZORPAY_WEBHOOK_SECRET));

  console.log("Raw webhook body:", rawBody);

  // ── Verify signature ──
  const receivedSignature = request.headers.get("x-razorpay-signature");

  if (!receivedSignature) {
    return Response.json({ success: false, message: "No signature header." }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (receivedSignature !== expectedSignature) {
    console.error("Webhook signature mismatch — rejected");
    return Response.json({ success: false, message: "Invalid signature." }, { status: 400 });
  }

  // ── Parse event ──
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return Response.json({ success: false, message: "Invalid JSON." }, { status: 400 });
  }

  await connectDB();

  const eventType = event.event;
  console.log("Razorpay webhook received:", eventType);

  try {

    if (eventType === "order.paid" || eventType === "payment.captured") {
      const payment   = event.payload.payment.entity;
      const orderId   = payment.order_id;
      const paymentId = payment.id;

      if (!orderId) {
        return Response.json({ success: true, message: "No order ID, skipping." });
      }

      const appointment = await Appointment.findOne({ razorpayOrderId: orderId }).populate("patient");

      if (!appointment) {
        return Response.json({ success: true, message: "Appointment not found, skipping." });
      }

      if (appointment.paymentStatus !== "paid") {
        appointment.paymentStatus     = "paid";
        appointment.razorpayPaymentId = paymentId;
        await appointment.save();
        console.log("Appointment marked as paid via webhook:", appointment);
        
        await sendAppointmentConfirmationMail({
          to:      appointment.patient.email,
          name:    appointment.patient.name,
          service: appointment.service,
          date:    appointment.date,
          time:    appointment.timeSlot,
        });
        console.log("Appointment confirmed via webhook:", appointment._id);
      }

      return Response.json({ success: true, message: "Appointment confirmed." });
    }

    if (eventType === "payment.failed") {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;

      if (!orderId) {
        return Response.json({ success: true, message: "No order ID, skipping." });
      }

      const appointment = await Appointment.findOne({
        razorpayOrderId: orderId,
        paymentStatus:   "unpaid",
      });

      if (!appointment) {
        return Response.json({ success: true, message: "Appointment not found or already paid, skipping." });
      }

      await deleteAppointmentFiles(appointment);
      await appointment.deleteOne();
      console.log("Appointment deleted due to payment failure:", orderId);

      return Response.json({ success: true, message: "Appointment deleted." });
    }

    return Response.json({ success: true, message: `Event ${eventType} acknowledged.` });

  } catch (error) {
    console.error("Webhook handler error:", error);
    return Response.json({ success: true, message: "Handled with error." });
  }
}