"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const appointments = [
  {
    id: 1,
    patient: "Riya Sharma",
    date: "2025-05-02",
    time: "10:00 AM",
    treatment: "Skin Consultation",
  },
  {
    id: 2,
    patient: "Amit Patel",
    date: "2025-05-05",
    time: "11:30 AM",
    treatment: "Hair Treatment",
  },
  {
    id: 3,
    patient: "Neha Shah",
    date: "2025-05-08",
    time: "02:00 PM",
    treatment: "Laser Session",
  },
  {
    id: 4,
    patient: "Priya Mehta",
    date: "2025-05-12",
    time: "04:15 PM",
    treatment: "Follow Up",
  },
  {
    id: 5,
    patient: "Jay Desai",
    date: "2025-05-15",
    time: "12:00 PM",
    treatment: "Acne Treatment",
  },
  {
    id: 6,
    patient: "Khushi Patel",
    date: "2025-05-19",
    time: "05:00 PM",
    treatment: "PRP Therapy",
  },
  {
    id: 7,
    patient: "Harsh Shah",
    date: "2025-05-22",
    time: "09:30 AM",
    treatment: "Skin Consultation",
  },
  {
    id: 8,
    patient: "Mihir Joshi",
    date: "2025-05-25",
    time: "01:00 PM",
    treatment: "Hair Fall Treatment",
  },
  {
    id: 9,
    patient: "Nidhi Trivedi",
    date: "2025-05-27",
    time: "03:30 PM",
    treatment: "Chemical Peel",
  },
  {
    id: 10,
    patient: "Anjali Shah",
    date: "2025-05-30",
    time: "06:00 PM",
    treatment: "Laser Session",
  },
];

const APPT_DAYS = new Set(
  appointments.map((item) => new Date(item.date).getDate())
);

export function MiniCalendar() {
  const today = new Date("2025-05-30");

  const [viewing, setViewing] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const firstDay = new Date(viewing.year, viewing.month, 1).getDay();

  const daysInMonth = new Date(
    viewing.year,
    viewing.month + 1,
    0
  ).getDate();

  const prev = () =>
    setViewing((v) => {
      const m = v.month === 0 ? 11 : v.month - 1;
      const y = v.month === 0 ? v.year - 1 : v.year;

      return {
        month: m,
        year: y,
      };
    });

  const next = () =>
    setViewing((v) => {
      const m = v.month === 11 ? 0 : v.month + 1;
      const y = v.month === 11 ? v.year + 1 : v.year;

      return {
        month: m,
        year: y,
      };
    });

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      viewing.year,
      viewing.month,
      day
    );

    clickedDate.setHours(0, 0, 0, 0);

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      return;
    }

    if (clickedDate < startDate) {
      setEndDate(startDate);
      setStartDate(clickedDate);
    } else {
      setEndDate(clickedDate);
    }
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;

    return (
      date.getTime() > startDate.getTime() &&
      date.getTime() < endDate.getTime()
    );
  };

  const filteredAppointments =
    startDate && endDate
      ? appointments.filter((appt) => {
          const d = new Date(appt.date);
          d.setHours(0, 0, 0, 0);

          return d >= startDate && d <= endDate;
        })
      : [];

  const appointmentCount =
  filteredAppointments.length;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prev}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-[--soft-bg] hover:text-[--primary-dark] transition"
        >
          ‹
        </button>

        <span className="text-sm font-semibold text-[--primary-dark]">
          {MONTH_NAMES[viewing.month]} {viewing.year}
        </span>

        <button
          onClick={next}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-[--soft-bg] hover:text-[--primary-dark] transition"
        >
          ›
        </button>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="text-[11px] text-zinc-400 font-medium text-center py-1"
          >
            {d}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={i} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
          (day) => {
            const currentDate = new Date(
              viewing.year,
              viewing.month,
              day
            );

            const isToday =
              day === today.getDate() &&
              viewing.month === today.getMonth() &&
              viewing.year === today.getFullYear();

            const isStart = isSameDay(
              currentDate,
              startDate
            );

            const isEnd = isSameDay(
              currentDate,
              endDate
            );

            const isRange = isInRange(currentDate);

            const hasAppt = APPT_DAYS.has(day);

            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={cn(
                  "relative h-9 flex items-center justify-center text-[13px] cursor-pointer transition-all duration-200",

                  isStart
  ? " text-white bg-primary-accent border font-semibold rounded-l-xl rounded-r-md shadow-sm z-10"
  : isEnd
  ? " text-white bg-primary-accent border font-semibold rounded-r-xl rounded-l-md shadow-sm z-10"
  : isRange
  ? "bg-primary-accent/10 text-blue-700 rounded-md"
                    : isToday
                    ? "bg-emerald-500 text-white rounded-lg"
                    : "text-zinc-600 rounded-lg hover:bg-[--soft-bg] hover:text-[--primary-dark]"
                )}
              >
                {day}

                {hasAppt && (
                  <span
                    className={cn(
                      "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                      isStart || isEnd || isToday
                        ? "bg-white"
                        : "bg-amber-400"
                    )}
                  />
                )}
              </div>
            );
          }
        )}
      </div>

      {/* Selected Range */}
     {/* Selected Range */}
{startDate && endDate && (
  <div className="mt-5 space-y-3">
    <div className="grid grid-rows-3 gap-2">
      <div className="rounded-xl border border-[#DDECF4] bg-[#F8FBFD] p-3">
        <p className="text-[11px] text-zinc-400 mb-1">
          Start
        </p>

        <p className="text-sm font-semibold text-[--primary-dark]">
          {startDate.toLocaleDateString("en-GB")}
        </p>
      </div>

      <div className="rounded-xl border border-[#DDECF4] bg-[#F8FBFD] p-3">
        <p className="text-[11px] text-zinc-400 mb-1">
          End
        </p>

        <p className="text-sm font-semibold text-[--primary-dark]">
          {endDate.toLocaleDateString("en-GB")}
        </p>
      </div>

      <div className="rounded-xl border border-[#DDECF4] bg-[#F8FBFD] p-3">
        <p className="text-[11px] text-zinc-400 mb-1">
          Appointments
        </p>

        <p className="text-lg font-bold text-blue-600">
          {appointmentCount}
        </p>
      </div>
    </div>

    {/* <div className="rounded-xl border border-[#DDECF4] bg-gradient-to-r from-blue-50 to-white px-4 py-3">
      <p className="text-xs text-zinc-500 mb-1">
        Selected Range
      </p>

      <p className="text-sm font-medium text-[--primary-dark]">
        {startDate.toLocaleDateString("en-GB")} →{" "}
        {endDate.toLocaleDateString("en-GB")}
      </p>
    </div> */}
  </div>
)}
    </div>
  );
}