// lib/confirmAppointment.js
import Appointment from "@/models/Appointment";
import Patient from "@/models/Patient"; // your patient model
import { sendAppointmentConfirmationMail } from "@/lib/sendAppointmentConfirmationMail";

export async function confirmAppointment(orderId, paymentId) {

  const appointment = await Appointment.findOne({
    razorpayOrderId: orderId,
  }).populate("patient"); // get patient email + name

  if (!appointment) {
    return { success: false, message: "Appointment not found." };
  }

  // Already paid — don't send mail again
  if (appointment.paymentStatus === "paid") {
    return { success: true, message: "Already confirmed." };
  }

  // Update to paid
  appointment.paymentStatus     = "paid";
  appointment.razorpayPaymentId = paymentId;
  await appointment.save();
  console.log("Appointment confirmed:", appointment);   
  // Send confirmation email
  try {
    await sendAppointmentConfirmationMail({
      to:      appointment.patient.email,
      name:    appointment.patient.name,
      service: appointment.service,
      date:    appointment.date,
      time:    appointment.timeSlot,
    });
    console.log("Confirmation email sent to:", appointment.patient.email);
  } catch (err) {
    // Don't crash if mail fails — appointment is already confirmed
    console.error("Mail send failed:", err.message);
  }

  return { success: true, message: "Appointment confirmed and mail sent." };
}