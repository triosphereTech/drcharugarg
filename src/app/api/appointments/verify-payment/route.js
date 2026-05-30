// api/appointments/verify-payment/route.js
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";
import { confirmAppointment } from "@/lib/confirmAppointment";

export async function POST(request) {
  try {
    await connectDB();

    const auth = await requireAuth();
    if (!auth.success) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const {
      appointmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    if (!appointmentId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json(
        { success: false, message: "Missing required payment fields." },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      // Signature mismatch = tampered payment, mark as failed
      await Appointment.findOneAndUpdate(
        { _id: appointmentId, patient: auth.user.id },
        { paymentStatus: "failed" }
      );
      return Response.json(
        { success: false, message: "Payment verification failed." },
        { status: 400 }
      );
    }
      
        const result = await confirmAppointment(razorpay_order_id, razorpay_payment_id);

    // Signature valid — mark as paid
    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, patient: auth.user.id, razorpayOrderId: razorpay_order_id },
      { paymentStatus: "paid", razorpayPaymentId: razorpay_payment_id },
      { new: true }
    );

    if (!appointment) {
      return Response.json({ success: false, message: "Appointment not found." }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: "Payment verified. Appointment confirmed!",
    });

  } catch (error) {    return Response.json(
      { success: false, message: "Verification error.", error: error.message },
      { status: 500 }
    );
  }
}