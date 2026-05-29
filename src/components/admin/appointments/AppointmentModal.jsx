"use client";

import { useEffect, useRef, useState } from "react";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Avatar } from "@/components/admin/ui/Avatar";
import { updateAppointmentStatus, formatDate } from "@/lib/data";

export function AppointmentModal({
  appointment,
  onClose,
  onStatusChange,
}) {
  const [prescription, setPrescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const textareaRef = useRef(null);

  useEffect(() => {
    setPrescription(appointment?.prescription ?? "");
    setError("");
  }, [appointment]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  if (!appointment) return null;

  const isPending = appointment.status === "pending";

  async function handleAction(status) {
    if (!appointment) return;

    if (status === "attended" && !prescription.trim()) {
      setError("Prescription is required to mark as attended.");
      textareaRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      await updateAppointmentStatus(
        appointment._id,
        status,
        prescription.trim() || undefined
      );

      onStatusChange(
        appointment._id,
        status,
        prescription.trim() || undefined
      );

      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-[#0D1F2D]/45 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-[460px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
        {/* Head */}
        <div className="px-6 py-5 border-b border-[#D4E9F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              name={appointment.patient.name}
              size="md"
            />

            <div>
              <h2 className="text-[15px] font-semibold text-[--primary-dark]">
                {appointment.patient.name}
              </h2>

              <p className="text-[12px] text-zinc-400">
                {appointment.patient.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-[--soft-bg] hover:text-[--primary-dark] transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3.5">
          <DetailRow
            label="Service"
            value={appointment.service}
          />

          <DetailRow
            label="Date"
            value={formatDate(appointment.date)}
          />

          <DetailRow
            label="Time slot"
            value={appointment.timeSlot}
          />

          <DetailRow
            label="Mobile"
            value={appointment.patient.mobileNumber}
          />

          <div className="flex gap-2">
            <span className="text-[12px] text-zinc-400 w-24 flex-shrink-0 pt-0.5">
              Status
            </span>

            <StatusBadge status={appointment.status} />
          </div>

          {/* Existing prescription */}
          {appointment.prescription && !isPending && (
            <div>
              <p className="text-[12px] text-zinc-400 mb-1">
                Prescription
              </p>

              <p className="text-[13px] text-[--primary-dark] bg-[--soft-bg] rounded-lg px-3 py-2.5 whitespace-pre-wrap leading-relaxed">
                {appointment.prescription}
              </p>
            </div>
          )}

          {/* Prescription input for pending */}
          {isPending && (
            <div className="pt-2 border-t border-[#D4E9F2]">
              <label className="block text-[12px] text-zinc-500 mb-1.5">
                Prescription{" "}
                <span className="text-zinc-400">
                  (required to mark attended)
                </span>
              </label>

              <textarea
                ref={textareaRef}
                value={prescription}
                onChange={(e) => {
                  setPrescription(e.target.value);
                  setError("");
                }}
                placeholder="Enter prescription details…"
                rows={3}
                className={`w-full border rounded-xl px-3 py-2.5 text-[13px] text-[--primary-dark] resize-none font-[inherit] outline-none transition-colors ${
                  error
                    ? "border-red-300 focus:border-red-400"
                    : "border-[#D4E9F2] focus:border-[--primary-accent]"
                }`}
              />

              {error && (
                <p className="text-[12px] text-red-500 mt-1">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#D4E9F2] flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#D4E9F2] text-[13px] text-zinc-600 hover:bg-[--soft-bg] transition-colors"
          >
            Close
          </button>

          {isPending && (
            <>
              <button
                onClick={() => handleAction("cancelled")}
                disabled={loading}
                className="px-4 py-2 rounded-lg text-[13px] font-medium bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                Mark Cancelled
              </button>

              <button
                onClick={() => handleAction("attended")}
                disabled={loading}
                className="px-4 py-2 rounded-lg text-[13px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50"
              >
                {loading ? "Saving…" : "Mark Attended"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex gap-2 items-start">
      <span className="text-[12px] text-zinc-400 w-24 flex-shrink-0 pt-0.5">
        {label}
      </span>

      <span className="text-[13.5px] text-[--primary-dark] font-medium">
        {value}
      </span>
    </div>
  );
}