// api/appointments/create-order/route.js
import Razorpay from "razorpay";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// Change this to your actual consultation fee in paise (₹500 = 50000)
const APPOINTMENT_FEE_PAISE = 50000;

export async function POST(request) {
  try {
    await connectDB();

    const auth = await requireAuth();
    if (!auth.success) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { appointmentId } = await request.json();
    if (!appointmentId) {
      return Response.json({ success: false, message: "appointmentId is required." }, { status: 400 });
    }

    // Make sure this appointment belongs to this patient and is unpaid
    const appointment = await Appointment.findOne({
      _id:           appointmentId,
      patient:       auth.user.id,
      paymentStatus: "unpaid",
    });

    if (!appointment) {
      return Response.json(
        { success: false, message: "Appointment not found or already paid." },
        { status: 404 }
      );
    }

    const order = await razorpay.orders.create({
      amount:   APPOINTMENT_FEE_PAISE,
      currency: "INR",
      receipt:  `appt_${appointmentId}`,
      notes:    { appointmentId, patientId: auth.user.id },
    });

    // Save orderId on appointment
    appointment.razorpayOrderId = order.id;
    await appointment.save();

    return Response.json({
      success:       true,
      orderId:       order.id,
      amount:        order.amount,
      currency:      order.currency,
      keyId:         process.env.RAZORPAY_KEY_ID,
      appointmentId,
    });

  } catch (error) {
    return Response.json(
      { success: false, message: "Could not create payment order.", error: error.message },
      { status: 500 }
    );
  }
}