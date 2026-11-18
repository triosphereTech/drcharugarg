
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";

export async function POST(request) {
  try {
    console.log("🔍 Payment verification started");

    await connectDB();

    const auth = await requireAuth();

    if (!auth.success) {
      console.log("❌ Unauthorized payment verification");

      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      appointmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    if (
      !appointmentId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return Response.json(
        { success: false, message: "Missing required payment fields." },
        { status: 400 }
      );
    }

    // 1. Verify Razorpay checkout signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "hex"),
        Buffer.from(razorpay_signature, "hex")
      )
    ) {
      console.error("❌ Invalid Razorpay checkout signature");

      return Response.json(
        { success: false, message: "Payment verification failed." },
        { status: 400 }
      );
    }

    console.log("✅ Checkout signature verified");

    // 2. Verify appointment ownership and order ID
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patient: auth.user.id,
      razorpayOrderId: razorpay_order_id,
    });

    if (!appointment) {
      console.error("❌ Appointment not found or order mismatch");

      return Response.json(
        { success: false, message: "Appointment not found." },
        { status: 404 }
      );
    }

    console.log("✅ Appointment ownership verified");
    console.log("Appointment ID:", appointment._id);

    // 3. Do not independently mark appointment as paid here.
    // The webhook is responsible for authoritative payment confirmation.

    if (appointment.paymentStatus === "paid") {
      console.log("✅ Appointment already marked as paid");

      return Response.json({
        success: true,
        paid: true,
        message: "Payment already confirmed.",
      });
    }

    console.log("⏳ Checkout signature valid; waiting for payment capture webhook");

    return Response.json({
      success: true,
      paid: false,
      message: "Payment signature verified. Awaiting payment confirmation.",
    });

  } catch (error) {
    console.error("❌ Payment verification error:", error);

    return Response.json(
      {
        success: false,
        message: "Verification error.",
      },
      { status: 500 }
    );
  }
}
