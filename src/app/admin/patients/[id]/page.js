"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Topbar } from "@/components/admin/layout/Topbar";
import { Avatar } from "@/components/admin/ui/Avatar";
import { AppointmentItem } from "@/components/admin/appointments/AppointmentItem";
import { AppointmentModal } from "@/components/admin/appointments/AppointmentModal";
import { Pagination } from "@/components/admin/ui/Pagination";

const STATUS_OPTIONS = [
  { label: "All statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Attended", value: "attended" },
  { label: "Cancelled", value: "cancelled" },
];

export default function PatientDetailPage() {
  const params = useParams();
  const id = params.id;

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statCounts, setStatCounts] = useState({
    total: 0,
    pending: 0,
    attended: 0,
  });

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        patientId: id,
        page: String(page),
        limit: "10",
      });

      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      const response = await fetch(`/api/admin/appointments?${params.toString()}`);
      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Unable to load appointment history.");
      }

      const data = res.data || [];
      setAppointments(data);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);

      if (data[0]?.patient) {
        setPatient(data[0].patient);
      }
    } catch (err) {
      setAppointments([]);
      setTotal(0);
      setTotalPages(1);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id, page, statusFilter]);

  const loadStats = useCallback(async () => {
    const makeParams = (status) => {
      const params = new URLSearchParams({
        patientId: id,
        page: "1",
        limit: "1",
      });

      if (status) params.set("status", status);
      return params;
    };

    try {
      const [allResponse, pendingResponse, attendedResponse] = await Promise.all([
        fetch(`/api/admin/appointments?${makeParams().toString()}`),
        fetch(`/api/admin/appointments?${makeParams("pending").toString()}`),
        fetch(`/api/admin/appointments?${makeParams("attended").toString()}`),
      ]);

      const [all, pending, attended] = await Promise.all([
        allResponse.json(),
        pendingResponse.json(),
        attendedResponse.json(),
      ]);

      setStatCounts({
        total: allResponse.ok ? all.total || 0 : 0,
        pending: pendingResponse.ok ? pending.total || 0 : 0,
        attended: attendedResponse.ok ? attended.total || 0 : 0,
      });
    } catch {
      setStatCounts({
        total: 0,
        pending: 0,
        attended: 0,
      });
    }
  }, [id]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  function handleStatusChange(apptId, status, prescription, updatedAppointment) {
    setAppointments((prev) =>
      prev.map((a) =>
        a._id === apptId
          ? { ...a, ...(updatedAppointment || {}), status, ...(prescription ? { prescription } : {}) }
          : a
      )
    );

    if (selectedAppt?._id === apptId) {
      setSelectedAppt((prev) =>
        prev
          ? { ...prev, ...(updatedAppointment || {}), status, ...(prescription ? { prescription } : {}) }
          : prev
      );
    }

    loadStats();
  }

  return (
    <>
      <Topbar />

      <div className="flex-1 p-6 bg-[#EEF7FB] overflow-y-auto overflow-hidden">
        <Link
          href="/admin/patients"
          className="inline-flex items-center gap-2 text-[13px] text-zinc-500 hover:text-[#058FD2] transition-colors mb-5"
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Patients
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-6">
          <div className="md:sticky top-6 bg-white border border-[#DDEAF2] rounded-[28px] p-6 h-fit">
            {patient ? (
              <>
                <div className="flex flex-col items-center text-center">
                  <Avatar name={patient.name} size="lg" className="w-24 h-24 text-[32px]" />
                  <h2 className="mt-4 text-[24px] font-bold text-[#131C15]">
                    {patient.name}
                  </h2>
                  <p className="text-[13px] text-zinc-500 mt-1">Patient Profile</p>
                </div>

                <div className="mt-8 space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                        Email Address
                      </p>
                      <p className="text-[14px] font-medium text-[#131C15] mt-1 break-all">
                        {patient.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                        Mobile Number
                      </p>
                      <p className="text-[14px] font-medium text-[#131C15] mt-1">
                        {patient.mobileNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-16 text-center">
                <p className="text-[13px] text-zinc-400">
                  {loading ? "Loading patient..." : "Patient profile is available after an appointment is created."}
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 mt-8">
              <StatBox label="Total" value={statCounts.total} className="bg-[#EEF7FB] text-[#131C15]" />
              <StatBox label="Pending" value={statCounts.pending} className="bg-amber-50 text-amber-600" />
              <StatBox label="Attended" value={statCounts.attended} className="bg-emerald-50 text-emerald-600" />
            </div>
          </div>

          <div className="bg-white border border-[#DDEAF2] rounded-[28px] overflow-hidden shadow-sm flex flex-col">
            <div className="px-6 py-5 border-b border-[#DDEAF2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-[18px] font-semibold text-[#131C15]">
                  Appointment History
                </h3>
                <p className="text-[13px] text-zinc-500 mt-1">
                  View consultation records and appointment activity
                </p>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="h-11 border border-[#DDEAF2] rounded-xl px-4 text-[13px] bg-white outline-none focus:border-[#058FD2]"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 px-3 py-3 max-h-[650px] overflow-y-auto">
              {loading ? (
                <div className="py-20 text-center">
                  <p className="text-zinc-400 text-[14px]">Loading appointments...</p>
                </div>
              ) : error ? (
                <div className="py-20 text-center">
                  <p className="text-red-500 text-[14px]">{error}</p>
                </div>
              ) : appointments.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-zinc-400 text-[14px]">No appointments found</p>
                </div>
              ) : (
                appointments.map((appt, index) => (
                  <AppointmentItem
                    key={appt._id}
                    appointment={appt}
                    onClick={setSelectedAppt}
                    showDate
                    prevDate={index > 0 ? appointments[index - 1].date : undefined}
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
      </div>

      <AppointmentModal
        appointment={selectedAppt}
        onClose={() => setSelectedAppt(null)}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}

function StatBox({ label, value, className }) {
  return (
    <div className={`${className} rounded-2xl p-3 text-center`}>
      <p className="text-[24px] font-bold">{value}</p>
      <p className="text-[11px] text-zinc-500 mt-1">{label}</p>
    </div>
  );
}