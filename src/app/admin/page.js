"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useCallback, useEffect, useState } from "react";
import { Topbar } from "@/components/admin/layout/Topbar";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import { MiniCalendar } from "@/components/admin/dashboard/MiniCalendar";
import MainTable from "@/components/admin/appointments/MainTable";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    attended: 0,
    cancelled: 0,
  });

  const loadStats = useCallback(async () => {
    const today = getTodayDate();
    const params = new URLSearchParams({
      startDate: today,
      endDate: today,
      page: "1",
      limit: "100",
    });

    try {
      const response = await fetch(`/api/admin/appointments?${params.toString()}`);
      const res = await response.json();

      if (!response.ok) return;

      const data = res.data || [];

      setStats({
        total: res.total || data.length,
        pending: data.filter((a) => a.status === "pending").length,
        attended: data.filter((a) => a.status === "attended").length,
        cancelled: data.filter((a) => a.status === "cancelled").length,
      });
    } catch {
      setStats({
        total: 0,
        pending: 0,
        attended: 0,
        cancelled: 0,
      });
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <>
      <Topbar
        title="Appointment Dashboard"
        subtitle={`${stats.total} appointments today`}
        actions={
          <>
            {/* <button className="px-3.5 py-2 rounded-lg border border-[#D4E9F2] text-[13px] text-zinc-600 hover:bg-[--soft-bg] transition-colors">
              Export CSV
            </button>

            <button className="px-3.5 py-2 rounded-lg bg-[--primary-accent] text-white text-[13px] font-medium hover:opacity-90 transition-opacity">
              + New Appointment
            </button> */}
          </>
        }
      />

      <div className="flex-1 p-7 space-y-6">
        {/* <div className="grid grid-cols-4 gap-3.5">
          <StatCard
            label="Today"
            value={stats.total}
            note="Appointments scheduled"
            accentColor="#058FD2"
            icon="appointments"
          />

          <StatCard
            label="Pending"
            value={stats.pending}
            note="Awaiting consultation"
            accentColor="#F59E0B"
            icon="messages"
          />

          <StatCard
            label="Attended"
            value={stats.attended}
            note="Consultations completed"
            accentColor="#22C55E"
            icon="patients"
          />

          <StatCard
            label="Cancelled"
            value={stats.cancelled}
            note="Appointments cancelled"
            accentColor="#EF4444"
            icon="analytics"
          />
        </div> */}

        <div className=" items-start">
          <MainTable />

          {/* <div className="space-y-4">
            <div className="bg-white border border-[#D4E9F2] rounded-2xl overflow-hidden">
              <MiniCalendar />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}