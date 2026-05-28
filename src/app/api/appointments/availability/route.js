import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const MAX_PER_SLOT = 5;

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date"); // expects YYYY-MM-DD

    if (!date) {
      return Response.json(
        { success: false, message: "Date is required." },
        { status: 400 }
      );
    }

    // Build start and end of the selected day in UTC
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Count bookings grouped by timeSlot for that day
    const counts = await Appointment.aggregate([
      {
        $match: {
          date: { $gte: startOfDay, $lte: endOfDay },
          status: { $ne: "cancelled" }, // don't count cancelled ones
        },
      },
      {
        $group: {
          _id: "$timeSlot",
          count: { $sum: 1 },
        },
      },
    ]);

    // Build a map: { "09:00 AM": 3, "10:00 AM": 5, ... }
    const countMap = {};
    counts.forEach(({ _id, count }) => {
      countMap[_id] = count;
    });

    // Build the availability response for each slot
    const slots = TIME_SLOTS.map((slot) => ({
      slot,
      available: (countMap[slot] ?? 0) < MAX_PER_SLOT,
      booked: countMap[slot] ?? 0,
    }));

    const allFull = slots.every((s) => !s.available);

    return Response.json({
      success: true,
      date,
      slots,
      allFull,
    });

  } catch (error) {
    return Response.json(
      { success: false, message: "Something went wrong.", error: error.message },
      { status: 500 }
    );
  }
}