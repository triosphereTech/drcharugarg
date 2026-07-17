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
    today: { total: 0, pending: 0, attended: 0, cancelled: 0 },
    allTime: { total: 0, pending: 0, attended: 0, cancelled: 0 },
  });

  const loadStats = useCallback(async () => {
    const today = getTodayDate();
    const params = new URLSearchParams({
      startDate: today,
      endDate: today,
      countOnly: "true",
    });

    try {
      const [todayResponse, allTimeResponse] = await Promise.all([
        fetch(`/api/admin/appointments?${params.toString()}`),
        fetch("/api/admin/appointments?countOnly=true"),
      ]);

      const [todayResult, allTimeResult] = await Promise.all([
        todayResponse.json(),
        allTimeResponse.json(),
      ]);

      if (!todayResponse.ok || !allTimeResponse.ok) return;

      setStats({
        today: todayResult.counts,
        allTime: allTimeResult.counts,
      });
    } catch {
      setStats({
        today: { total: 0, pending: 0, attended: 0, cancelled: 0 },
        allTime: { total: 0, pending: 0, attended: 0, cancelled: 0 },
      });
    }
  }, []);
  return (
    <>
      <Topbar
        title="Appointment Dashboard"
        subtitle={`${stats.today.total} appointments today`}
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
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Today's Scheduled"
            value={stats.today.total}
            note="Appointments scheduled today"
            accentColor="#058FD2"
            icon="appointments"
          />

          <StatCard
            label="Today's Pending"
            value={stats.today.pending}
            note="Awaiting consultation"
            accentColor="#F59E0B"
            icon="messages"
          />

          <StatCard
            label="Today's Attended"
            value={stats.today.attended}
            note="Consultations completed"
            accentColor="#22C55E"
            icon="patients"
          />

          <StatCard
            label="Today's Cancelled"
            value={stats.today.cancelled}
            note="Appointments cancelled"
            accentColor="#EF4444"
            icon="analytics"
          />

          <StatCard
            label="All-time Scheduled"
            value={stats.allTime.total}
            note="All appointments scheduled"
            accentColor="#2563EB"
            icon="appointments"
          />

          <StatCard
            label="All-time Pending"
            value={stats.allTime.pending}
            note="All awaiting consultations"
            accentColor="#D97706"
            icon="messages"
          />

          <StatCard
            label="All-time Attended"
            value={stats.allTime.attended}
            note="All completed consultations"
            accentColor="#16A34A"
            icon="patients"
          />

          <StatCard
            label="All-time Cancelled"
            value={stats.allTime.cancelled}
            note="All cancelled appointments"
            accentColor="#DC2626"
            icon="analytics"
          />
        </div>

        <div className=" items-start">
          <MainTable onDataChange={loadStats} />

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