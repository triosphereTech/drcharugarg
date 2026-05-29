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

// Dates that have appointments (mock)
const APPT_DAYS = new Set([2, 5, 8, 12, 15, 19, 22, 25, 27, 30]);

export function MiniCalendar() {
  const today = new Date("2025-05-30");

  const [viewing, setViewing] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

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

  return (
    <div className="p-4">
      {/* Nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prev}
          className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-400 hover:bg-[--soft-bg] hover:text-[--primary-dark] transition-colors text-base"
        >
          ‹
        </button>

        <span className="text-[14px] font-semibold text-[--primary-dark]">
          {MONTH_NAMES[viewing.month]} {viewing.year}
        </span>

        <button
          onClick={next}
          className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-400 hover:bg-[--soft-bg] hover:text-[--primary-dark] transition-colors text-base"
        >
          ›
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="text-[11px] text-zinc-400 font-medium text-center py-1"
          >
            {d}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
          (day) => {
            const isToday =
              day === today.getDate() &&
              viewing.month === today.getMonth() &&
              viewing.year === today.getFullYear();

            const hasAppt = APPT_DAYS.has(day);

            return (
              <div
                key={day}
                className={cn(
                  "relative text-[12.5px] text-center py-1.5 rounded-md cursor-pointer transition-colors",
                  isToday
                    ? "bg-[--primary-accent] text-white font-semibold"
                    : "text-zinc-600 hover:bg-[--soft-bg] hover:text-[--primary-dark]"
                )}
              >
                {day}

                {hasAppt && (
                  <span
                    className={cn(
                      "absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                      isToday ? "bg-white" : "bg-amber-400"
                    )}
                  />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}