"use client";

import { useEffect, useState, useCallback } from "react";
import { Topbar } from "@/components/admin/layout/Topbar";
import { AppointmentItem } from "@/components/admin/appointments/AppointmentItem";
import { AppointmentModal } from "@/components/admin/appointments/AppointmentModal";
import { Pagination } from "@/components/admin/ui/Pagination";
import { fetchAppointments, SERVICES, TIME_SLOTS } from "@/lib/data";

const STATUS_TABS = [
  { label: "All",       value: "all",       dot: null         },
  { label: "Pending",   value: "pending",   dot: "bg-amber-400" },
  { label: "Attended",  value: "attended",  dot: "bg-emerald-400" },
  { label: "Cancelled", value: "cancelled", dot: "bg-red-400"  },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal]               = useState(0);
  const [totalPages, setTotalPages]     = useState(1);
  const [page, setPage]                 = useState(1);

  // Filters
  const [statusFilter,   setStatusFilter]   = useState("all");
  const [serviceFilter,  setServiceFilter]  = useState("");
  const [dateFrom,       setDateFrom]       = useState("");
  const [dateTo,         setDateTo]         = useState("");
  const [selectedSlots,  setSelectedSlots]  = useState([]);
  const [showSlotPicker, setShowSlotPicker] = useState(false);

  const [selectedAppt, setSelectedAppt] = useState(null);

  const loadAppointments = useCallback(async () => {
    const res = await fetchAppointments({
      status:    statusFilter === "all" ? undefined : statusFilter,
      services:  serviceFilter ? [serviceFilter] : undefined,
      dateFrom:  dateFrom || undefined,
      dateTo:    dateTo   || undefined,
      timeSlots: selectedSlots.length ? selectedSlots : undefined,
      page,
      limit: 10,
    });
    setAppointments(res.data);
    setTotal(res.pagination.total);
    setTotalPages(res.pagination.totalPages);
  }, [statusFilter, serviceFilter, dateFrom, dateTo, selectedSlots, page]);

  useEffect(() => { loadAppointments(); }, [loadAppointments]);
  useEffect(() => { setPage(1); }, [statusFilter, serviceFilter, dateFrom, dateTo, selectedSlots]);

  function handleStatusChange(id, status, prescription) {
    setAppointments((prev) =>
      prev.map((a) =>
        a._id === id
          ? { ...a, status, ...(prescription ? { prescription } : {}) }
          : a
      )
    );
  }

  function clearFilters() {
    setStatusFilter("all");
    setServiceFilter("");
    setDateFrom("");
    setDateTo("");
    setSelectedSlots([]);
  }

  const hasActiveFilters =
    statusFilter !== "all" || serviceFilter || dateFrom || dateTo || selectedSlots.length;

  return (
    <>
      

      <div className="flex-1">
        <div className="bg-white border border-[#D4E9F2] rounded-2xl overflow-hidden shadow-sm">

          {/* ── Table header: tabs left · filters right ── */}
          <div className="px-5 py-3.5 border-b border-[#D4E9F2] flex items-center justify-between gap-4 flex-wrap">

            {/* Left — status tab group */}
            <nav
              className="flex items-center gap-0.5 bg-[--soft-bg] p-1 rounded-xl border border-[#D4E9F2]"
              aria-label="Filter by status"
            >
              {STATUS_TABS.map((tab) => {
                const active = statusFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setStatusFilter(tab.value)}
                    className={`
                      relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
                      text-[12.5px] font-medium transition-all duration-150 select-none
                      ${active
                        ? "bg-white text-[--primary-dark] shadow-sm border border-[#D4E9F2]"
                        : "text-zinc-400 hover:text-zinc-600 border border-transparent"
                      }
                    `}
                  >
                    {tab.dot && (
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tab.dot}`} />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Right — secondary filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Service select */}
              <div className="relative">
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="
                    appearance-none border border-[#D4E9F2] rounded-lg pl-3 pr-7 py-2
                    text-[12.5px] text-zinc-600 bg-[--soft-bg] outline-none
                    focus:border-[--primary-accent] hover:border-[--primary-accent]/60
                    transition-colors font-[inherit] cursor-pointer
                  "
                >
                  <option value="">All services</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {/* Custom chevron */}
                <svg
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400"
                  fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3 4.5 3 3 3-3" />
                </svg>
              </div>

              {/* Date range */}
              <div className="flex items-center gap-1.5">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  title="From date"
                  className="
                    border border-[#D4E9F2] rounded-lg px-3 py-2 text-[12.5px] text-zinc-600
                    bg-[--soft-bg] outline-none focus:border-[--primary-accent]
                    hover:border-[--primary-accent]/60 transition-colors font-[inherit]
                  "
                />
                <span className="text-zinc-300 text-[11px] font-medium select-none">→</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  title="To date"
                  className="
                    border border-[#D4E9F2] rounded-lg px-3 py-2 text-[12.5px] text-zinc-600
                    bg-[--soft-bg] outline-none focus:border-[--primary-accent]
                    hover:border-[--primary-accent]/60 transition-colors font-[inherit]
                  "
                />
              </div>

              {/* Time slot multi-select */}
              <div className="relative">
                <button
                  onClick={() => setShowSlotPicker((v) => !v)}
                  className={`
                    inline-flex items-center gap-1.5 border rounded-lg px-3 py-2
                    text-[12.5px] text-zinc-600 bg-[--soft-bg] transition-all duration-150
                    ${showSlotPicker
                      ? "border-[--primary-accent] text-[--primary-dark]"
                      : "border-[#D4E9F2] hover:border-[--primary-accent]/60"
                    }
                  `}
                >
                  <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.8}>
                    <circle cx="8" cy="8" r="6" /><path strokeLinecap="round" d="M8 5v3l2 2" />
                  </svg>
                  Time slots
                  {selectedSlots.length > 0 && (
                    <span className="bg-[--primary-accent] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                      {selectedSlots.length}
                    </span>
                  )}
                  <svg
                    className={`w-2.5 h-2.5 text-zinc-400 transition-transform duration-150 ${showSlotPicker ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2 3.5 3 3 3-3" />
                  </svg>
                </button>

                {showSlotPicker && (
                  <div className="absolute top-full right-0 mt-1.5 bg-white border border-[#D4E9F2] rounded-xl shadow-lg shadow-zinc-100 p-2 z-20 grid grid-cols-2 gap-0.5 w-56">
                    {TIME_SLOTS.map((slot) => (
                      <label
                        key={slot}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[--soft-bg] cursor-pointer text-[12px] text-zinc-600 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSlots.includes(slot)}
                          onChange={(e) =>
                            setSelectedSlots((prev) =>
                              e.target.checked ? [...prev, slot] : prev.filter((s) => s !== slot)
                            )
                          }
                          className="accent-[#058FD2] w-3.5 h-3.5"
                        />
                        {slot}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="
                    inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] font-medium
                    text-zinc-400 border border-[#D4E9F2] hover:text-red-500 hover:border-red-200
                    hover:bg-red-50 transition-all duration-150
                  "
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="m3 3 6 6M9 3l-6 6" />
                  </svg>
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ── Appointment list ── */}
          <div
            className="px-2 py-2 max-h-[560px] overflow-y-auto"
            onClick={() => setShowSlotPicker(false)}
          >
            {appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <span className="text-3xl select-none">🗓️</span>
                <p className="text-zinc-400 text-[13px]">No appointments match the current filters</p>
              </div>
            ) : (
              appointments.map((appt, i) => (
                <AppointmentItem
                  key={appt._id}
                  appointment={appt}
                  onClick={setSelectedAppt}
                  showDate
                  prevDate={i > 0 ? appointments[i - 1].date : undefined}
                />
              ))
            )}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={total}
            itemsPerPage={10}
          />
        </div>
      </div>

      <AppointmentModal
        appointment={selectedAppt}
        onClose={() => setSelectedAppt(null)}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}