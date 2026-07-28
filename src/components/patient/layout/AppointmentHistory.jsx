"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import {
  formatDateLong,
  formatDateShort,
  currency,
} from "../data/Temppatientdata";
import { PatientModal } from "../layout/Patientmodal";

const STATUS_STYLES = {
  pending: "bg-blue-50 text-blue-600",
  attended: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-500",
};

const TITLES = {
  all: "All Appointments",
  pending: "Upcoming Appointments",
  attended: "Completed Appointments",
  cancelled: "Cancelled Appointments",
};
const FILTER_OPTIONS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Upcoming" },
  { key: "attended", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export const AppointmentHistory = ({
  appointments,
  filter = "all",
  onNavigate,
}) => {
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const list =
      filter === "all"
        ? appointments
        : appointments.filter((a) => a.status === filter);

    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [appointments, filter]);
  console.log("this is apppp",appointments);
  
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          {TITLES[filter] || TITLES.all}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {filter === "all"
            ? "Your all consultations in one place."
            : `Showing your ${filter} consultations.`}
        </p>
      </div>

      {/* Mobile-only filter button group (desktop uses the sidebar dropdown) */}
      <div
        className="lg:hidden grid grid-cols-4 gap-1 bg-white border border-gray-100 rounded-xl p-1 mb-6"
        role="radiogroup"
        aria-label="Filter appointments"
      >
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={filter === opt.key}
            onClick={() => onNavigate(`apt-${opt.key}`)}
            className={`px-2 py-2 rounded-lg text-xs font-semibold cursor-pointer active:scale-95 transition-all duration-150 ${
              filter === opt.key
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-2xl py-16 text-center text-gray-400 text-sm bg-white">
          No {filter !== "all" ? filter : ""} appointments found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((apt) => (            
            <button
              key={apt._id}
              type="button"
              onClick={() => setSelected(apt)}
              className="w-full flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left cursor-pointer active:scale-[0.99] transition-all duration-150 hover:border-gray-200"
            >
              {/* Icon */}
              <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white shrink-0">
                <Stethoscope size={20} />
              </span>

              {/* Appointment details */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{apt.service}</p>

                <p className="text-sm text-gray-500 mt-0.5">Dr. Charu Garg</p>

                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={13} />
                    {formatDateLong(apt.date)}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {apt.timeSlot}
                  </span>
                </div>
              </div>

              {/* Status + actions */}
<div className="flex items-center gap-3 shrink-0">
  <span
    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
      STATUS_STYLES[apt.status]
    }`}
  >
    {apt.status}
  </span>

  {apt.status === "attended" && (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onNavigate("book");
      }}
      className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-3 py-2 rounded-xl cursor-pointer active:scale-95 transition-all duration-150"
    >
      <RefreshCcw size={13} />
      Follow-up
    </button>
  )}

  <ChevronRight size={16} className="text-gray-300" />
</div>
            </button>
          ))}
        </div>
      )}

      {/* Details modal */}
      {selected && (
        <PatientModal
          title={`${selected.service} — ${selected.type}`}
          subtitle={formatDateLong(selected.date)}
          onClose={() => setSelected(null)}
          footer={
            selected.status === "attended" && (
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  onNavigate("book");
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-95 transition-all duration-150"
              >
                <RefreshCcw size={15} /> Book Follow-up
              </button>
            )
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="Doctor" value="Dr. Charu Garg" />
            <DetailRow label="Time" value={selected.timeSlot} />
            <DetailRow label="Status" value={selected.status} capitalize />
            <DetailRow
              label="Consultation Fee"
              value={currency(selected.fee)}
            />
          </div>
        </PatientModal>
      )}
    </div>
  );
};

const DetailRow = ({ label, value, capitalize }) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
      {label}
    </p>
    <p
      className={`text-sm font-semibold text-gray-800 mt-0.5 ${capitalize ? "capitalize" : ""}`}
    >
      {value}
    </p>
  </div>
);
