"use client";

import { useEffect, useState, useCallback } from "react";
import { AppointmentItem } from "@/components/admin/appointments/AppointmentItem";
import { AppointmentModal } from "@/components/admin/appointments/AppointmentModal";
import { Pagination } from "@/components/admin/ui/Pagination";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CancelAppointmentDialog from "./CancelAppointmentDialog";

const STATUS_TABS = [
  { label: "All", value: "all", dot: null },
  { label: "Pending", value: "pending", dot: "bg-amber-400" },
  { label: "Attended", value: "attended", dot: "bg-emerald-400" },
  { label: "Cancelled", value: "cancelled", dot: "bg-red-400" },
];

export default function AppointmentsPage({ onDataChange }) {
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [selectedAppt, setSelectedAppt] = useState(null);
  const [groupAppointments, setGroupAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dialog box
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  // dynamic service
  const [servicesList, setServicesList] = useState([]);
  // Fetch dynamic services for the filter dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/admin/services");
        const data = await response.json();
        
        if (response.ok && data.success) {
          setServicesList(data.services || []);
        } else {
          console.error("Failed to fetch services:", data.message);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);
  const confirmCancelAppointment = async () => {
    if (!appointmentToCancel) return;

    try {
      const res = await fetch(
        `/api/admin/appointments/${appointmentToCancel._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "cancelled",
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      loadAppointments();
    

      setShowCancelDialog(false);
      setAppointmentToCancel(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
      });

      if (statusFilter !== "all") params.set("status", statusFilter);
      if (serviceFilter) params.set("services", serviceFilter);
      if (dateFrom) params.set("startDate", dateFrom);
      if (dateTo) params.set("endDate", dateTo);
      const response = await fetch(
        `/api/admin/appointments?${params.toString()}`,
      );
      const res = await response.json();      
      if (!response.ok) {
        throw new Error(res.message || "Unable to load appointments.");
      }

      setAppointments(res.appointments || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
      await onDataChange?.();
    } catch (err) {
      setError(err.message);
      setAppointments([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, serviceFilter, dateFrom, dateTo, page]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);
  useEffect(() => {
    setPage(1);
  }, [statusFilter, serviceFilter, dateFrom, dateTo]);

  function handleStatusChange(id, status, prescription, updatedAppointment) {
    setAppointments((prev) =>
      prev.map((a) =>
        a._id === id
          ? {
              ...a,
              ...(updatedAppointment || {}),
              status,
              ...(prescription ? { prescription } : {}),
            }
          : a,
      ),
    );

    if (selectedAppt?._id === id) {
      setSelectedAppt((prev) =>
        prev
          ? {
              ...prev,
              ...(updatedAppointment || {}),
              status,
              ...(prescription ? { prescription } : {}),
            }
          : prev,
      );
    }
    setGroupAppointments((prev) =>
      prev.map((appointment) => appointment._id === id ? { ...appointment, ...(updatedAppointment || {}), status, ...(prescription ? { prescription } : {}) } : appointment),
    );
    loadAppointments();
  }

  const handleViewAppointment = useCallback(async (appointment) => {
    setError("");
    try {
      if (!appointment.appointmentGroupId) {
        setSelectedAppt(appointment);
        setGroupAppointments([appointment]);
        return;
      }
      const response = await fetch(`/api/admin/appointments/group/${encodeURIComponent(appointment.appointmentGroupId)}`);
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to load appointment history.");
      const group = data.data || [];
      setGroupAppointments(group);
      setSelectedAppt(group.find((item) => item._id === appointment._id) || appointment);
    } catch (err) {
      setError(err.message || "Unable to load appointment history.");
    }
  }, []);
  function clearFilters() {
    setStatusFilter("all");
    setServiceFilter("");
    setDateFrom("");
    setDateTo("");
  }

  const hasActiveFilters =
    statusFilter !== "all" || serviceFilter || dateFrom || dateTo || false;
  const handleCancelAppointment = async (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelDialog(true);
    return;
  };

  return (
    <>
      <div className="flex-1">
        <div className="pb-3 px-2">
          <p className="text-[22px] font-semibold text-[--primary-dark]">
            All Appointments
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
          {/* ── Table header: tabs left · filters right ── */}

          <div className="px-5 py-3.5 border-b border-[#D4E9F2] flex items-center justify-between gap-4 flex-wrap">
            {/* Left — status tab group */}
            <nav
              className="flex items-center gap-0.5 bg-[--soft-bg] p-1 px-1.5 rounded-full border border-[#D4E9F2]"
              aria-label="Filter by status"
            >
              {STATUS_TABS.map((tab) => {
                const active = statusFilter === tab.value;

                return (
                  <button
                    key={tab.value}
                    onClick={() => setStatusFilter(tab.value)}
                    className="relative cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium select-none"
                  >
                    {active && (
                      <motion.span
                        layoutId="status-pill"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                          mass: 0.7,
                        }}
                        className="absolute inset-0 rounded-full bg-black text-white border border-[#D4E9F2] shadow-sm"
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      {tab.dot && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${tab.dot}`}
                        />
                      )}

                      <span
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-white"
                            : "text-zinc-400 hover:text-zinc-600"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </span>
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
                  {servicesList.map((s) => (
                    <option key={s._id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <svg
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400"
                  fill="none"
                  viewBox="0 0 12 12"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m3 4.5 3 3 3-3"
                  />
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
                <span className="text-zinc-300 text-[11px] font-medium select-none">
                  →
                </span>
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

              {/* Clear filters */}
              {hasActiveFilters ? (
                <button
                  onClick={clearFilters}
                  className="
                    inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] font-medium
                    text-zinc-400 border border-[#D4E9F2] hover:text-red-500 hover:border-red-200
                    hover:bg-red-50 transition-all duration-150
                  "
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 12 12"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" d="m3 3 6 6M9 3l-6 6" />
                  </svg>
                  Clear
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* ── Appointment list ── */}
          <div className=" max-h-[43vh] min-h-[50vh] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <p className="text-zinc-400 text-[13px]">
                  Loading appointments...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <p className="text-red-500 text-[13px]">{error}</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="">
                  <DotLottieReact
                    src="https://lottie.host/a835a2d1-d4a0-427e-b2fe-aa244ab03374/632or4NZbG.lottie"
                    autoplay
                  />
                </div>

                <p className="text-zinc-400 text-[13px]">
                  No appointments match the current filters
                </p>
              </div>
            ) : (
              appointments.map((appt, i) => (
                <AppointmentItem
                  key={appt._id}
                  appointment={appt}
                  onClick={handleViewAppointment}
                  onCancel={handleCancelAppointment}
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
        appointments={groupAppointments}
        onClose={() => { setSelectedAppt(null); setGroupAppointments([]); }}
        onStatusChange={handleStatusChange}
      />
    <CancelAppointmentDialog
  open={showCancelDialog}
  onClose={() => {
    setShowCancelDialog(false);
    setAppointmentToCancel(null);
  }}
  onConfirm={confirmCancelAppointment}
/>
    </>
  );
}
