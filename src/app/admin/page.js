"use client";

import { useEffect, useState, useCallback } from "react";
import { Topbar } from "@/components/admin/layout/Topbar";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import { MiniCalendar } from "@/components/admin/dashboard/MiniCalendar";
import { AppointmentItem } from "@/components/admin/appointments/AppointmentItem";
import { AppointmentModal } from "@/components/admin/appointments/AppointmentModal";
import { Pagination } from "@/components/admin/ui/Pagination";
import MainTable from '@/components/admin/appointments/MainTable'
import {
  fetchAppointments,
  fetchDashboardStats,
  getServiceBreakdown,
} from "@/lib/data";

const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Attended", value: "attended" },
  { label: "Cancelled", value: "cancelled" },
];

const TODAY = "2025-05-30";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    attended: 0,
    cancelled: 0,
  });

  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [serviceBreakdown, setServiceBreakdown] = useState({});

  const loadStats = useCallback(async () => {
    const s = await fetchDashboardStats(TODAY);
    setStats(s);
    setServiceBreakdown(getServiceBreakdown(TODAY));
  }, []);

  const loadAppointments = useCallback(async () => {
    const res = await fetchAppointments({
      date: TODAY,
      status: statusFilter === "all" ? undefined : statusFilter,
      page,
      limit: 10,
    });

    setAppointments(res.data);
    setTotal(res.pagination.total);
  }, [statusFilter, page]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

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

    loadStats();
  }

  return (
    <>
      <Topbar
        title="Appointment Dashboard"
        subtitle={`Friday, 30 May 2025 — ${stats.total} appointments today`}
        actions={
          <>
            <button className="px-3.5 py-2 rounded-lg border border-[#D4E9F2] text-[13px] text-zinc-600 hover:bg-[--soft-bg] transition-colors">
              Export CSV
            </button>

            <button className="px-3.5 py-2 rounded-lg bg-[--primary-accent] text-white text-[13px] font-medium hover:opacity-90 transition-opacity">
              + New Appointment
            </button>
          </>
        }
      />

      <div className="flex-1 p-7 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3.5">
          <StatCard
            label="Total Patients"
            value="1,248"
            note="+18 this month"
            accentColor="#058FD2"
            icon="patients"
          />

          <StatCard
            label="Appointments"
            value="42"
            note="12 scheduled today"
            accentColor="#22C55E"
            icon="appointments"
          />

          <StatCard
            label="Messages"
            value="16"
            note="4 unread inquiries"
            accentColor="#F59E0B"
            icon="messages"
          />

          <StatCard
            label="Revenue"
            value="₹84K"
            note="+12% from last month"
            accentColor="#8B5CF6"
            icon="analytics"
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-[1fr_300px] gap-5 items-start">
          {/* Timeline */}
          {/* <div className="bg-white border border-[#D4E9F2] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#D4E9F2] flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-[14px] font-semibold text-[--primary-dark]">
                Today&apos;s Timeline
              </h2>

              <div className="flex gap-1.5 flex-wrap">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setStatusFilter(tab.value);
                      setPage(1);
                    }}
                    className={`px-3 py-1 rounded-full text-[12.5px] font-medium border transition-colors ${statusFilter === tab.value
                        ? "bg-[--primary-accent] text-white border-[--primary-accent]"
                        : "bg-[--soft-bg] text-zinc-500 border-[#D4E9F2] hover:text-[--primary-dark]"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-2 py-2 max-h-[480px] overflow-y-auto">
              {appointments.length === 0 ? (
                <p className="text-center text-zinc-400 text-[13px] py-12">
                  No appointments found
                </p>
              ) : (
                appointments.map((appt) => (
                  <AppointmentItem
                    key={appt._id}
                    appointment={appt}
                    onClick={setSelectedAppt}
                  />
                ))
              )}
            </div>

            <Pagination
              currentPage={page}
              totalPages={Math.ceil(total / 10)}
              onPageChange={setPage}
              totalItems={total}
              itemsPerPage={10}
            />
          </div> */}
          <div>
            <MainTable/>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Mini calendar */}
            <div className="bg-white border border-[#D4E9F2] rounded-2xl overflow-hidden">
              <MiniCalendar />
            </div>

            {/* Services breakdown */}
            {/* <div className="bg-white border border-[#D4E9F2] rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[#D4E9F2]">
                <h3 className="text-[14px] font-semibold text-[--primary-dark]">
                  Services today
                </h3>
              </div>

              <div className="divide-y divide-[#D4E9F2]">
                {Object.entries(serviceBreakdown).map(([service, count]) => (
                  <div
                    key={service}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <span className="text-[13px] text-[--primary-dark]">
                      {service}
                    </span>

                    <span className="text-[13px] font-semibold text-[--primary-accent]">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AppointmentModal
        appointment={selectedAppt}
        onClose={() => setSelectedAppt(null)}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}