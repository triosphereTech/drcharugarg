"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import { formatDateLong, currency } from "../data/Temppatientdata";
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
  onFollowUp,
}) => {
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const list =
      filter === "all"
        ? appointments
        : appointments.filter((a) => a.status === filter);

    const grouped = list.reduce((acc, apt) => {
      const groupKey = apt.appointmentGroupId || apt._id;
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(apt);
      return acc;
    }, {});

    return Object.values(grouped)
      .map((group) => group.sort((a, b) => new Date(b.date) - new Date(a.date)))
      .sort((a, b) => new Date(b[0].date) - new Date(a[0].date));
  }, [appointments, filter]);

  const modalGroupId = selected?.[0]?.appointmentGroupId || selected?.[0]?._id;

  const modalHasPendingAppointment = appointments.some(
    (apt) =>
      (apt.appointmentGroupId || apt._id) === modalGroupId &&
      apt.status === "pending",
  );

  const modalLatestCompleted =
    selected?.[selected.length - 1]?.status === "attended";

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
          {filtered.map((group) => {
            console.log("ffff", filtered);

            const latest = group[0];
            const latestStatus = latest?.status || "pending";
            const isCompleted = latestStatus === "attended";
            const groupId = latest.appointmentGroupId || latest._id;

            const allGroupAppointments = appointments.filter(
              (apt) => (apt.appointmentGroupId || apt._id) === groupId,
            );

            const hasPendingAppointment = allGroupAppointments.some(
              (apt) => apt.status === "pending",
            );

            const canBookFollowUp =
              latestStatus === "attended" && !hasPendingAppointment;

            return (
              <div
                key={latest._id}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(group)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(group);
                  }
                }}
                className="w-full flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left cursor-pointer active:scale-[0.99] transition-all duration-150 hover:border-gray-200"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white shrink-0">
                  <Stethoscope size={20} />
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-900 text-sm">
                      {latest.service}
                    </p>
                    {group.length > 1 && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                        {group.length} visits
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-0.5">Dr. Charu Garg</p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={13} />
                      {formatDateLong(latest.date)}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {latest.slotStartTime && latest.slotEndTime
                        ? `${latest.slotStartTime} - ${latest.slotEndTime}`
                        : latest.timeSlot}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[latestStatus]}`}
                  >
                    {latestStatus}
                  </span>

                  {isCompleted && (
                    <button
                      type="button"
                      disabled={!canBookFollowUp}
                      title={
                        hasPendingAppointment
                          ? "A follow-up appointment is already scheduled."
                          : ""
                      }
                      onClick={(e) => {
                        e.stopPropagation();

                        if (!canBookFollowUp) return;

                        onFollowUp(latest);
                      }}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-150 ${
                        canBookFollowUp
                          ? "bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-95"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <RefreshCcw size={13} />
                      {hasPendingAppointment
                        ? "Follow-up Scheduled"
                        : "Follow-up"}
                    </button>
                  )}

                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details modal */}
      {selected && (
        <PatientModal
          title={`${selected[0].service} consultation history`}
          subtitle={`${selected.length} visit${selected.length > 1 ? "s" : ""}`}
          onClose={() => setSelected(null)}
          footer={
            modalLatestCompleted && (
              <button
                type="button"
                disabled={modalHasPendingAppointment}
                onClick={() => {
                  if (modalHasPendingAppointment) return;

                  setSelected(null);
                  onFollowUp(selected[selected.length - 1]);
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  modalHasPendingAppointment
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-gray-800 text-white cursor-pointer"
                }`}
              >
                <RefreshCcw size={15} />
                {modalHasPendingAppointment
                  ? "Follow-up Already Scheduled"
                  : "Book Follow-up"}
              </button>
            )
          }
        >
          <div className="space-y-4">
            {selected.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.service}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDateLong(item.date)} • {item.slotStartTime && item.slotEndTime ? `${item.slotStartTime} - ${item.slotEndTime}` : item.timeSlot}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <DetailRow
                    label="Type"
                    value={
                      item.appointmentType === "followup"
                        ? "Follow-up"
                        : "Initial"
                    }
                  />
                  <DetailRow
                    label="Consultation Fee"
                    value={currency(item.fee || 0)}
                  />
                </div>
              </div>
            ))}
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
