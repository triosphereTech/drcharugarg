
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { sendAppointmentConfirmationMail } from "@/lib/sendAppointmentConfirmationMail";

async function deleteAppointmentFiles(appointment) {
  console.log("🗑️ Starting appointment file deletion...");

  for (const attachment of appointment.attachments || []) {
    try {
      const filePath = path.join(process.cwd(), "public", attachment.url);
      await fs.unlink(filePath);
      console.log("✅ Deleted file:", attachment.url);
    } catch (error) {
      console.warn("⚠️ File deletion skipped:", attachment.url, error.message);
    }
  }
}

export async function POST(request) {
  console.log("\n======================================");
  console.log("🚀 RAZORPAY WEBHOOK RECEIVED");
  console.log("Time:", new Date().toISOString());
  console.log("======================================");

  try {
    // 1. Read raw request body
    const rawBody = await request.text();

    console.log("📩 Raw webhook body received");
    console.log("Body length:", rawBody.length);

    // 2. Verify webhook signature
    const receivedSignature = request.headers.get("x-razorpay-signature");

    if (!receivedSignature) {
      console.error("❌ Missing Razorpay signature header");

      return Response.json(
        { success: false, message: "No signature header." },
        { status: 400 }
      );
    }

    console.log("🔐 Signature header received");

    if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
      console.error("❌ RAZORPAY_WEBHOOK_SECRET is missing");

      return Response.json(
        { success: false, message: "Webhook secret not configured." },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (receivedSignature !== expectedSignature) {
      console.error("❌ INVALID WEBHOOK SIGNATURE");

      return Response.json(
        { success: false, message: "Invalid signature." },
        { status: 400 }
      );
    }

    console.log("✅ Webhook signature verified successfully");

    // 3. Parse webhook event
    let event;

    try {
      event = JSON.parse(rawBody);
    } catch (error) {
      console.error("❌ Invalid webhook JSON:", error.message);

      return Response.json(
        { success: false, message: "Invalid JSON." },
        { status: 400 }
      );
    }

    const eventType = event.event;

    console.log("📌 Razorpay Event:", eventType);

    // 4. Connect database
    console.log("🔄 Connecting to MongoDB...");

    await connectDB();

    console.log("✅ MongoDB connected");

    // 5. Handle successful payment
    if (
      eventType === "order.paid" ||
      eventType === "payment.captured"
    ) {
      const payment = event.payload?.payment?.entity;

      if (!payment) {
        console.error("❌ Payment entity missing from webhook");

        return Response.json(
          { success: false, message: "Payment entity missing." },
          { status: 400 }
        );
      }

      const orderId = payment.order_id;
      const paymentId = payment.id;

      console.log("💰 PAYMENT SUCCESS EVENT");
      console.log("Order ID:", orderId);
      console.log("Payment ID:", paymentId);
      console.log("Payment Status:", payment.status);

      if (!orderId) {
        console.warn("⚠️ No order ID found. Skipping event.");

        return Response.json({
          success: true,
          message: "No order ID, skipping."
        });
      }

      console.log("🔍 Searching appointment in MongoDB...");

      const appointment = await Appointment.findOne({
        razorpayOrderId: orderId
      }).populate("patient");

      if (!appointment) {
        console.error("❌ Appointment not found for order:", orderId);

        return Response.json({
          success: true,
          message: "Appointment not found, skipping."
        });
      }

      console.log("✅ Appointment found:", appointment._id);
      console.log("Current payment status:", appointment.paymentStatus);

      if (appointment.paymentStatus !== "paid") {
        console.log("🔄 Updating appointment payment status...");

        appointment.paymentStatus = "paid";
        appointment.razorpayPaymentId = paymentId;

        await appointment.save();

        console.log("✅ Appointment payment status updated to PAID");

        // Send confirmation email
        console.log("📧 Sending appointment confirmation email...");

        if (!appointment.patient) {
          throw new Error("Appointment patient reference not found");
        }

        await sendAppointmentConfirmationMail({
          to: appointment.patient.email,
          name: appointment.patient.name,
          service: appointment.service,
          date: appointment.date,
          time:
            appointment.slotStartTime && appointment.slotEndTime
              ? `${appointment.slotStartTime} - ${appointment.slotEndTime}`
              : appointment.timeSlot,
          fee: appointment.fee
        });

        console.log("✅ Confirmation email sent successfully");
      } else {
        console.log("ℹ️ Appointment already paid. Skipping duplicate processing.");
      }

      console.log("🎉 APPOINTMENT CONFIRMED SUCCESSFULLY");

      return Response.json({
        success: true,
        message: "Appointment confirmed."
      });
    }

    // 6. Handle failed payment
    if (eventType === "payment.failed") {
      const payment = event.payload?.payment?.entity;

      if (!payment) {
        console.error("❌ Payment entity missing");

        return Response.json(
          { success: false, message: "Payment entity missing." },
          { status: 400 }
        );
      }

      const orderId = payment.order_id;

      console.log("❌ PAYMENT FAILED EVENT");
      console.log("Order ID:", orderId);
      console.log("Payment ID:", payment.id);
      console.log("Failure reason:", payment.error_reason);
      console.log("Failure description:", payment.error_description);

      if (!orderId) {
        console.warn("⚠️ No order ID found. Skipping event.");

        return Response.json({
          success: true,
          message: "No order ID, skipping."
        });
      }

      console.log("🔍 Searching unpaid appointment...");

      const appointment = await Appointment.findOne({
        razorpayOrderId: orderId,
        paymentStatus: "unpaid"
      });

      if (!appointment) {
        console.warn("⚠️ Appointment not found or already paid");

        return Response.json({
          success: true,
          message: "Appointment not found or already paid, skipping."
        });
      }

      console.log("✅ Unpaid appointment found:", appointment._id);

      // WARNING: This preserves your original deletion behavior.
      await deleteAppointmentFiles(appointment);

      await appointment.deleteOne();

      console.log("🗑️ Appointment deleted successfully");

      return Response.json({
        success: true,
        message: "Appointment deleted."
      });
    }

    // 7. Other events
    console.log("ℹ️ Unhandled event:", eventType);

    return Response.json({
      success: true,
      message: `Event ${eventType} acknowledged.`
    });

  } catch (error) {
    console.error("\n❌ RAZORPAY WEBHOOK PROCESSING ERROR");
    console.error("Error message:", error.message);
    console.error("Stack:", error.stack);

    return Response.json(
      {
        success: false,
        message: "Webhook processing failed."
      },
      { status: 500 }
    );
  }
}
