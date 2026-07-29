// // api/appointments/create-order/route.js
// import Razorpay from "razorpay";
// import { connectDB } from "@/lib/db";
// import Appointment from "@/models/Appointment";
// import { requireAuth } from "@/lib/auth";

// const razorpay = new Razorpay({
//   key_id:     process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(request) {
//   try {
//     await connectDB();

//     const auth = await requireAuth();
//     if (!auth.success) {
//       return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const { appointmentId } = await request.json();
//     if (!appointmentId) {
//       return Response.json({ success: false, message: "appointmentId is required." }, { status: 400 });
//     }

//     // Make sure this appointment belongs to this patient and is unpaid
//     const appointment = await Appointment.findOne({
//       _id:           appointmentId,
//       patient:       auth.user.id,
//       paymentStatus: "unpaid",
//     });

//     if (!appointment) {
//       return Response.json(
//         { success: false, message: "Appointment not found or already paid." },
//         { status: 404 }
//       );
//     }

//     const amountInPaise = Math.max(1, Math.round((appointment.fee || 0) * 100));

//     const order = await razorpay.orders.create({
//       amount:   amountInPaise,
//       currency: "INR",
//       receipt:  `appt_${appointmentId}`,
//       notes:    { appointmentId, patientId: auth.user.id },
//     });

//     // Save orderId on appointment
//     appointment.razorpayOrderId = order.id;
//     await appointment.save();

//     return Response.json({
//       success:       true,
//       orderId:       order.id,
//       amount:        order.amount,
//       currency:      order.currency,
//       keyId:         process.env.RAZORPAY_KEY_ID,
//       appointmentId,
//     });

//   } catch (error) {
//     return Response.json(
//       { success: false, message: "Could not create payment order.", error: error.message },
//       { status: 500 }
//     );
//   }
// }


// api/appointments/create-order/route.js

import Razorpay from "razorpay";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { requireAuth } from "@/lib/auth";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    await connectDB();

    const auth = await requireAuth();

    if (!auth.success) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { appointmentId } = await request.json();

    console.log("appointmentId =", appointmentId);
    console.log("patientId =", auth.user.id);

    if (!appointmentId) {
      return Response.json(
        {
          success: false,
          message: "appointmentId is required.",
        },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patient: auth.user.id,
      paymentStatus: "unpaid",
    });

    console.log(
      "appointment found =",
      appointment ? appointment._id : null
    );

    console.log(
      "appointment data =",
      appointment
        ? JSON.stringify(appointment.toObject(), null, 2)
        : null
    );

    if (!appointment) {
      return Response.json(
        {
          success: false,
          message: "Appointment not found or already paid.",
        },
        { status: 404 }
      );
    }

    const amountInPaise = Math.max(
      1,
      Math.round((appointment.fee || 0) * 100)
    );

    console.log("fee =", appointment.fee);
    console.log("amountInPaise =", amountInPaise);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `appt_${appointmentId}`,
      notes: {
        appointmentId,
        patientId: auth.user.id,
      },
    });

    console.log("razorpay order =", order);

    appointment.razorpayOrderId = order.id;

    await appointment.save();

    return Response.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      appointmentId,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR");
    console.error(error);

    return Response.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "development"
          ? error.stack
          : undefined,
      },
      { status: 500 }
    );
  }
}