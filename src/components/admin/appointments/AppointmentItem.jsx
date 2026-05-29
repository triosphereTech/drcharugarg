"use client";

import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { cn } from "@/lib/utils";

const BAR_COLOR = {
  pending: "bg-amber-400",
  attended: "bg-emerald-400",
  cancelled: "bg-zinc-300",
};

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
        <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest py-2.5 border-t border-[#D4E9F2] mt-1 first:border-t-0 first:mt-0">
          {new Date(appointment.date).toLocaleDateString(
            "en-IN",
            {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )}
        </div>
      )}

      <button
        onClick={() => onClick(appointment)}
        className="w-full flex items-stretch gap-3 px-3 py-2.5 rounded-lg hover:bg-[--soft-bg] transition-colors text-left group"
      >
        <span className="text-[12px] text-zinc-400 w-14 flex-shrink-0 pt-0.5 text-right">
          {appointment.timeSlot}
        </span>

        <span
          className={cn(
            "w-0.5 rounded-full flex-shrink-0",
            BAR_COLOR[appointment.status]
          )}
        />

        <span className="flex-1 min-w-0">
          <span className="block text-[13.5px] font-medium text-[--primary-dark] truncate group-hover:text-[--primary-accent] transition-colors">
            {appointment.patient.name}
          </span>

          <span className="block text-[12px] text-zinc-400 mt-0.5">
            {appointment.service}
          </span>
        </span>

        <StatusBadge
          status={appointment.status}
          className="self-center flex-shrink-0"
        />
      </button>
    </>
  );
}