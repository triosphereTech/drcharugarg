"use client";

import { StatusBadge } from "@/components/admin/ui/StatusBadge";

export function AppointmentItem({
  appointment,
  onClick,
  showDate,
  prevDate,
}) {
  const showDateHeader =
    showDate && appointment.date !== prevDate;

  return (
    <>
      {showDateHeader && (
        <div className="sticky top-0 z-10 bg-[#ffffff]/80 backdrop-blur-xs border-y border-[#E7EEF3] px-5 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500">
            {new Date(
              appointment.date
            ).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      )}

      <button
        onClick={() => onClick(appointment)}
        className="
          w-full
          text-left
          group
          border-b
          border-[#EEF3F6]
          hover:bg-[#FAFCFD]
          transition-colors
        "
      >
        <div className="grid grid-cols-[1.8fr_120px_140px_120px] items-center gap-4 px-5 py-4">

          {/* Service */}

          <div className="min-w-0">
            <h4 className="text-[14px] font-semibold text-[#131C15] truncate group-hover:text-[#058FD2] transition-colors">
              {appointment.service}
            </h4>

            <p className="text-[12px] text-zinc-500 mt-1">
              Consultation
            </p>
          </div>

          {/* Time */}

          <div>
            <p className="text-[11px] uppercase tracking-wider text-zinc-400">
              Time
            </p>

            <p className="text-[13px] font-medium text-[#131C15] mt-1">
              {appointment.timeSlot}
            </p>
          </div>

          {/* Status */}

          <div>
            <StatusBadge
              status={appointment.status}
            />
          </div>

          {/* Action */}

          <div className="flex justify-end">
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#058FD2]">
              View

              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </button>
    </>
  );
}