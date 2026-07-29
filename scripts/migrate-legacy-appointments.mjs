/*
 * One-time, idempotent migration for appointments created before slotStartTime/
 * slotEndTime and appointment grouping were introduced.
 *
 * Run with: MONGODB_URI="..." node scripts/migrate-legacy-appointments.mjs
 */
import mongoose from "mongoose";

function to24Hour(value) {
  const match = String(value || "").trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  if (hours > 23 || minutes > 59) return null;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function parseLegacySlot(timeSlot) {
  const parts = String(timeSlot || "").split(/\s*(?:-|–|to)\s*/i);
  const start = to24Hour(parts[0]);
  let end = to24Hour(parts[1]);
  if (!start) return { start: "00:00", end: "00:30" };
  if (!end) {
    const [hours, minutes] = start.split(":").map(Number);
    const total = (hours * 60 + minutes + 30) % (24 * 60);
    end = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  }
  return { start, end };
}

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required.");

await mongoose.connect(uri);
const appointments = mongoose.connection.collection("appointments");
const legacy = await appointments.find({
  $or: [
    { slotStartTime: { $exists: false } },
    { slotEndTime: { $exists: false } },
    { appointmentGroupId: { $exists: false } },
  ],
}).toArray();

if (!legacy.length) {
  console.log("No legacy appointments found.");
} else {
  const operations = legacy.map((appointment) => {
    const slot = parseLegacySlot(appointment.timeSlot);
    return {
      updateOne: {
        filter: { _id: appointment._id },
        update: {
          $set: {
            slotStartTime: appointment.slotStartTime || slot.start,
            slotEndTime: appointment.slotEndTime || slot.end,
            appointmentGroupId: appointment.appointmentGroupId || `legacy-${appointment._id}`,
            appointmentType: appointment.appointmentType || "initial",
            fee: Number.isFinite(appointment.fee) ? appointment.fee : 0,
          },
        },
      },
    };
  });
  const result = await appointments.bulkWrite(operations);
  console.log(`Migrated ${result.modifiedCount} of ${legacy.length} legacy appointments.`);
}

await mongoose.disconnect();
