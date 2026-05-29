"use client";

import { useEffect, useState, useCallback } from "react";
import { Topbar } from "@/components/admin/layout/Topbar";
import { AppointmentItem } from "@/components/admin/appointments/AppointmentItem";
import { AppointmentModal } from "@/components/admin/appointments/AppointmentModal";
import { Pagination } from "@/components/admin/ui/Pagination";
import { fetchAppointments, SERVICES, TIME_SLOTS } from "@/lib/data";

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Attended", value: "attended" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [showSlotPicker, setShowSlotPicker] = useState(false);

  const [selectedAppt, setSelectedAppt] = useState(null);

  const loadAppointments = useCallback(async () => {
    const res = await fetchAppointments({
      status: statusFilter === "all" ? undefined : statusFilter,
      services: serviceFilter ? [serviceFilter] : undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      timeSlots: selectedSlots.length ? selectedSlots : undefined,
      page,
      limit: 10,
    });

    setAppointments(res.data);
    setTotal(res.pagination.total);
    setTotalPages(res.pagination.totalPages);
  }, [statusFilter, serviceFilter, dateFrom, dateTo, selectedSlots, page]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, serviceFilter, dateFrom, dateTo, selectedSlots]);

  function handleStatusChange(id, status, prescription) {
    setAppointments((prev) =>
      prev.map((a) =>
        a._id === id
          ? {
              ...a,
              status,
              ...(prescription ? { prescription } : {}),
            }
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
    statusFilter !== "all" ||
    serviceFilter ||
    dateFrom ||
    dateTo ||
    selectedSlots.length;

  return (
    <>
      <Topbar
        title="All Appointments"
        subtitle={`${total} appointments matching current filters`}
        actions={
          <button className="px-3.5 py-2 rounded-lg border border-[#D4E9F2] text-[13px] text-zinc-600 hover:bg-[--soft-bg] transition-colors">
            Export CSV
          </button>
        }
      />

      <div className="flex-1 p-7">
        <div className="bg-white border border-[#D4E9F2] rounded-2xl overflow-hidden">
          {/* Filter bar */}
          <div className="px-5 py-4 border-b border-[#D4E9F2] space-y-3">
            {/* Status tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-colors ${
                    statusFilter === tab.value
                      ? "bg-[--primary-accent] text-white border-[--primary-accent]"
                      : "bg-[--soft-bg] text-zinc-500 border-[#D4E9F2] hover:text-[--primary-dark]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-auto px-3 py-1.5 rounded-full text-[12px] text-zinc-400 border border-[#D4E9F2] hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Secondary filters */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="border border-[#D4E9F2] rounded-lg px-3 py-2 text-[12.5px] text-zinc-600 bg-[--soft-bg] outline-none focus:border-[--primary-accent] transition-colors font-[inherit]"
              >
                <option value="">All services</option>

                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="border border-[#D4E9F2] rounded-lg px-3 py-2 text-[12.5px] text-zinc-600 bg-[--soft-bg] outline-none focus:border-[--primary-accent] transition-colors font-[inherit]"
                title="From date"
              />

              <span className="text-zinc-400 text-[12px]">to</span>

              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="border border-[#D4E9F2] rounded-lg px-3 py-2 text-[12.5px] text-zinc-600 bg-[--soft-bg] outline-none focus:border-[--primary-accent] transition-colors font-[inherit]"
                title="To date"
              />

              {/* Time slot multi-select */}
              <div className="relative">
                <button
                  onClick={() => setShowSlotPicker((v) => !v)}
                  className="border border-[#D4E9F2] rounded-lg px-3 py-2 text-[12.5px] text-zinc-600 bg-[--soft-bg] hover:border-[--primary-accent] transition-colors flex items-center gap-1.5"
                >
                  Time slots

                  {selectedSlots.length > 0 && (
                    <span className="bg-[--primary-accent] text-white text-[11px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                      {selectedSlots.length}
                    </span>
                  )}

                  <span className="text-zinc-400 text-[10px]">▾</span>
                </button>

                {showSlotPicker && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-[#D4E9F2] rounded-xl shadow-lg p-2 z-20 grid grid-cols-2 gap-1 w-52">
                    {TIME_SLOTS.map((slot) => (
                      <label
                        key={slot}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[--soft-bg] cursor-pointer text-[12px] text-zinc-600"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSlots.includes(slot)}
                          onChange={(e) => {
                            setSelectedSlots((prev) =>
                              e.target.checked
                                ? [...prev, slot]
                                : prev.filter((s) => s !== slot)
                            );
                          }}
                          className="accent-[#058FD2]"
                        />

                        {slot}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Appointment list */}
          <div
            className="px-2 py-2 max-h-[560px] overflow-y-auto"
            onClick={() => setShowSlotPicker(false)}
          >
            {appointments.length === 0 ? (
              <p className="text-center text-zinc-400 text-[13px] py-16">
                No appointments match the current filters
              </p>
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