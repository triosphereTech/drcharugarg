import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import AppointmentAvailability from "@/models/AppointmentAvailability";
import AppointmentSlotTemplate from "@/models/AppointmentSlotTemplate";

const DATE_KEY_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

export function formatDateKey(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateString) {
  const match = DATE_KEY_REGEX.exec(dateString);
  if (!match) {
    throw new Error("Invalid date format. Expected YYYY-MM-DD.");
  }
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function getDayRange(date) {
  const from = new Date(date);
  from.setUTCHours(0, 0, 0, 0);
  const to = new Date(date);
  to.setUTCHours(23, 59, 59, 999);
  return { from, to };
}

export async function getAvailabilityForDate(dateString) {
  await connectDB();

  const date = parseDateKey(dateString);
  const availability = await AppointmentAvailability.findOne({ date }).lean();

  if (!availability) {
    return {
      success: true,
      date: dateString,
      status: "unconfigured",
      slots: [],
      templateId: null,
      isOff: false,
    };
  }

  if (availability.isOff) {
    return {
      success: true,
      date: dateString,
      status: "off",
      slots: [],
      templateId: null,
      isOff: true,
    };
  }

  const template = await AppointmentSlotTemplate.findById(
    availability.templateId
  ).lean();

  if (!template) {
    return {
      success: true,
      date: dateString,
      status: "unconfigured",
      slots: [],
      templateId: null,
      isOff: false,
    };
  }

  const { from, to } = getDayRange(date);
  const bookings = await Appointment.find(
    {
      date: { $gte: from, $lte: to },
      status: { $ne: "cancelled" },
    },
    {
      slotStartTime: 1,
      slotEndTime: 1,
    }
  ).lean();

  const bookedMap = new Map();
  for (const booking of bookings) {
    const key = `${booking.slotStartTime}-${booking.slotEndTime}`;
    bookedMap.set(key, (bookedMap.get(key) || 0) + 1);
  }

  const slots = template.slots.map((slot) => {
    const key = `${slot.startTime}-${slot.endTime}`;
    return {
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: (bookedMap.get(key) || 0) > 0,
    };
  });

  return {
    success: true,
    date: dateString,
    status: "available",
    templateId: template._id.toString(),
    isOff: false,
    slots,
    allFull: slots.every((slot) => slot.isBooked),
    templateName: template.name,
    templateColor: template.color,
  };
}

export async function getAvailabilityRange(startDateString, endDateString) {
  await connectDB();

  const start = parseDateKey(startDateString);
  const end = parseDateKey(endDateString);

  if (end < start) {
    throw new Error("endDate must be the same or after startDate.");
  }

  const docs = await AppointmentAvailability.find({
    date: { $gte: start, $lte: end },
  }).lean();

  const docMap = new Map();
  for (const doc of docs) {
    docMap.set(formatDateKey(doc.date), doc);
  }

  const dates = [];
  const current = new Date(start);
  while (current <= end) {
    const key = formatDateKey(current);
    const info = docMap.get(key);

    if (!info) {
      dates.push({
        date: key,
        status: "unconfigured",
        templateId: null,
        isOff: false,
      });
    } else if (info.isOff) {
      dates.push({
        date: key,
        status: "off",
        templateId: null,
        isOff: true,
      });
    } else {
      dates.push({
        date: key,
        status: "assigned",
        templateId: info.templateId?.toString() || null,
        isOff: false,
      });
    }

    current.setUTCDate(current.getUTCDate() + 1);
  }

  return {
    success: true,
    startDate: startDateString,
    endDate: endDateString,
    dates,
  };
}

export async function getCalendarAvailability(year, month) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error("year and month must be valid calendar values (month is 1-12).");
  }

  await connectDB();

  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
  const availabilityDocs = await AppointmentAvailability.find({ date: { $gte: start, $lte: end } }).lean();
  const templateIds = availabilityDocs.filter((doc) => !doc.isOff && doc.templateId).map((doc) => doc.templateId);
  const [templates, bookings] = await Promise.all([
    AppointmentSlotTemplate.find({ _id: { $in: templateIds } }).lean(),
    Appointment.find(
      { date: { $gte: start, $lte: end }, status: { $ne: "cancelled" } },
      { date: 1, slotStartTime: 1, slotEndTime: 1 }
    ).lean(),
  ]);

  const availabilityByDate = new Map(availabilityDocs.map((doc) => [formatDateKey(doc.date), doc]));
  const templateById = new Map(templates.map((template) => [template._id.toString(), template]));
  const bookedSlotsByDate = new Map();
  for (const booking of bookings) {
    if (!booking.slotStartTime || !booking.slotEndTime) continue;
    const dateKey = formatDateKey(booking.date);
    const slots = bookedSlotsByDate.get(dateKey) || new Set();
    slots.add(`${booking.slotStartTime}-${booking.slotEndTime}`);
    bookedSlotsByDate.set(dateKey, slots);
  }

  const dates = [];
  for (let day = 1; day <= end.getUTCDate(); day += 1) {
    const date = new Date(Date.UTC(year, month - 1, day));
    const dateKey = formatDateKey(date);
    const availability = availabilityByDate.get(dateKey);
    let status = "unconfigured";

    if (availability?.isOff) {
      status = "off";
    } else if (availability?.templateId) {
      const template = templateById.get(availability.templateId.toString());
      if (template?.slots?.length) {
        const bookedSlots = bookedSlotsByDate.get(dateKey) || new Set();
        const allBooked = template.slots.every((slot) => bookedSlots.has(`${slot.startTime}-${slot.endTime}`));
        status = allBooked ? "full" : "available";
      }
    }
    dates.push({ date: dateKey, status });
  }

  return { success: true, year, month, dates };
}

export async function validateBookingSlot({ date, slotStartTime, slotEndTime, session = null }) {
  await connectDB();

  const selectedDate = parseDateKey(date);
  const availability = await AppointmentAvailability.findOne({ date: selectedDate }).lean();

  if (!availability) {
    return {
      valid: false,
      status: 409,
      message: "Selected date does not have configured availability.",
    };
  }

  if (availability.isOff) {
    return {
      valid: false,
      status: 409,
      message: "Selected date is marked as a day off.",
    };
  }

  const template = await AppointmentSlotTemplate.findById(
    availability.templateId
  ).lean();
  if (!template) {
    return {
      valid: false,
      status: 409,
      message: "Selected date availability has been removed. Please choose another date.",
    };
  }

  const matchingSlot = template.slots.find(
    (slot) => slot.startTime === slotStartTime && slot.endTime === slotEndTime
  );
  if (!matchingSlot) {
    return {
      valid: false,
      status: 400,
      message: "Selected slot does not exist for the assigned schedule.",
    };
  }

  const { from, to } = getDayRange(selectedDate);
  const existing = await Appointment.findOne(
    {
      date: { $gte: from, $lte: to },
      slotStartTime,
      slotEndTime,
      status: { $ne: "cancelled" },
    },
    null,
    { session }
  ).lean();

  if (existing) {
    return {
      valid: false,
      status: 409,
      message: "Selected slot is already booked.",
    };
  }

  return {
    valid: true,
    template,
  };
}
