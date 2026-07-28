"use client"

import React, { useMemo, useState } from "react"
import { CalendarDays, Clock, Stethoscope, ChevronRight, RefreshCcw } from "lucide-react"
import { formatDateLong, formatDateShort, currency } from "../data/Temppatientdata"
import { PatientModal } from "../layout/Patientmodal"

const STATUS_STYLES = {
  upcoming: "bg-blue-50 text-blue-600",
  completed: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-500",
}

const TITLES = {
  all: "All Appointments",
  upcoming: "Upcoming Appointments",
  completed: "Completed Appointments",
  cancelled: "Cancelled Appointments",
}

const FILTER_OPTIONS = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
]

export const AppointmentHistory = ({ appointments, filter = "all", onNavigate }) => {
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const list = filter === "all" ? appointments : appointments.filter((a) => a.status === filter)
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [appointments, filter])

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">{TITLES[filter] || TITLES.all}</h2>
        <p className="text-sm text-gray-400 mt-1">
          {filter === "all"
            ? "Your all consultations in one place."
            : `Showing your ${filter} consultations.`}
        </p>
      </div>

      {/* Mobile-only filter button group (desktop uses the sidebar dropdown) */}
      <div className="lg:hidden grid grid-cols-4 gap-1 bg-white border border-gray-100 rounded-xl p-1 mb-6" role="radiogroup" aria-label="Filter appointments">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={filter === opt.key}
            onClick={() => onNavigate(`apt-${opt.key}`)}
            className={`px-2 py-2 rounded-lg text-xs font-semibold cursor-pointer active:scale-95 transition-all duration-150 ${
              filter === opt.key ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"
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
              key={apt.id}
              type="button"
              onClick={() => setSelected(apt)}
              className="w-full flex flex-col sm:flex-row sm:items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-left cursor-pointer active:scale-[0.99] transition-all duration-150 hover:border-gray-200"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gray-100 text-gray-700 shrink-0">
                <Stethoscope size={18} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{apt.service} — {apt.type}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} /> {formatDateShort(apt.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {apt.time}
                  </span>
                  <span>{apt.doctor}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[apt.status]}`}>
                  {apt.status}
                </span>
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
            selected.status === "completed" && (
              <button
                type="button"
                onClick={() => {
                  setSelected(null)
                  onNavigate("book")
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-95 transition-all duration-150"
              >
                <RefreshCcw size={15} /> Book Follow-up
              </button>
            )
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="Doctor" value={selected.doctor} />
            <DetailRow label="Time" value={selected.time} />
            <DetailRow label="Status" value={selected.status} capitalize />
            <DetailRow label="Consultation Fee" value={currency(selected.fee)} />
          </div>
        </PatientModal>
      )}
    </div>
  )
}

const DetailRow = ({ label, value, capitalize }) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
    <p className={`text-sm font-semibold text-gray-800 mt-0.5 ${capitalize ? "capitalize" : ""}`}>{value}</p>
  </div>
)