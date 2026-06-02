"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Topbar } from "@/components/admin/layout/Topbar";
import { Avatar } from "@/components/admin/ui/Avatar";
import { AppointmentItem } from "@/components/admin/appointments/AppointmentItem";
import { AppointmentModal } from "@/components/admin/appointments/AppointmentModal";
import { Pagination } from "@/components/admin/ui/Pagination";

import {
  fetchPatientById,
  fetchAppointments,
  MOCK_APPOINTMENTS,
} from "@/lib/data";

const STATUS_OPTIONS = [
  { label: "All statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Attended", value: "attended" },
  { label: "Cancelled", value: "cancelled" },
];

export default function PatientDetailPage() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(1);

  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedAppt, setSelectedAppt] = useState(null);

  // Patient-level stats
  const allPatientAppts = MOCK_APPOINTMENTS.filter(
    (a) => a.patient._id === id
  );

  const statCounts = {
    total: allPatientAppts.length,

    pending: allPatientAppts.filter(
      (a) => a.status === "pending"
    ).length,

    attended: allPatientAppts.filter(
      (a) => a.status === "attended"
    ).length,
  };

  useEffect(() => {
    fetchPatientById(id).then((p) => {
      if (!p) {
        router.replace("/patients");
      } else {
        setPatient(p);
      }
    });
  }, [id, router]);

  const loadAppointments = useCallback(async () => {
    const res = await fetchAppointments({
      patientId: id,
      status:
        statusFilter === "all"
          ? undefined
          : statusFilter,
      page,
      limit: 10,
    });

    setAppointments(res.data);
    setTotal(res.pagination.total);
    setTotalPages(res.pagination.totalPages);
  }, [id, statusFilter, page]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  function handleStatusChange(
    apptId,
    status,
    prescription
  ) {
    setAppointments((prev) =>
      prev.map((a) =>
        a._id === apptId
          ? {
              ...a,
              status,
              ...(prescription
                ? { prescription }
                : {}),
            }
          : a
      )
    );
  }

  if (!patient) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-400 text-[13px]">
        Loading…
      </div>
    );
  }

  return (
    <>
      <Topbar
       
      />

<div className="flex-1 p-6 bg-[#EEF7FB] overflow-y-auto overflow-hidden">
  {/* Back */}
  <Link
    href="/admin/patients"
    className="inline-flex items-center gap-2 text-[13px] text-zinc-500 hover:text-[#058FD2] transition-colors mb-5"
  >
    <svg
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 24 24"
    >
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

    {/* ======================================================
        PATIENT PROFILE
    ====================================================== */}

   <div className="md:sticky top-6 bg-white border border-[#DDEAF2] rounded-[28px] p-6  h-fit">

      <div className="flex flex-col items-center text-center">
        <Avatar
          name={patient.name}
          size="lg"
          className="w-24 h-24 text-[32px]"
        />

        <h2 className="mt-4 text-[24px] font-bold text-[#131C15]">
          {patient.name}
        </h2>

        <p className="text-[13px] text-zinc-500 mt-1">
          Patient Profile
        </p>
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
<div className="grid grid-cols-2 gap-5">
<div>
          <p className="text-[11px] uppercase tracking-wider text-zinc-400">
            Patient Since
          </p>

          <p className="text-[14px] font-medium text-[#131C15] mt-1">
            {new Date(
              patient.createdAt
            ).toLocaleDateString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-zinc-400">
            Last Updated
          </p>

          <p className="text-[14px] font-medium text-[#131C15] mt-1">
            {new Date(
              patient.updatedAt
            ).toLocaleDateString("en-IN")}
          </p>
        </div>
</div>
        
      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-3 mt-8">

        <div className="bg-[#EEF7FB] rounded-2xl p-3 text-center">
          <p className="text-[24px] font-bold text-[#131C15]">
            {statCounts.total}
          </p>

          <p className="text-[11px] text-zinc-500 mt-1">
            Total
          </p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-3 text-center">
          <p className="text-[24px] font-bold text-amber-600">
            {statCounts.pending}
          </p>

          <p className="text-[11px] text-zinc-500 mt-1">
            Pending
          </p>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-3 text-center">
          <p className="text-[24px] font-bold text-emerald-600">
            {statCounts.attended}
          </p>

          <p className="text-[11px] text-zinc-500 mt-1">
            Attended
          </p>
        </div>

      </div>
    </div>

    {/* ======================================================
        APPOINTMENT HISTORY
    ====================================================== */}

    <div className="bg-white border border-[#DDEAF2] rounded-[28px] overflow-hidden shadow-sm flex flex-col">

      <div className="px-6 py-5 border-b border-[#DDEAF2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h3 className="text-[18px] font-semibold text-[#131C15]">
            Appointment History
          </h3>

          <p className="text-[13px] text-zinc-500 mt-1">
            View all consultation records and appointment activity
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="h-11 border border-[#DDEAF2] rounded-xl px-4 text-[13px] bg-white outline-none focus:border-[#058FD2]"
        >
          {STATUS_OPTIONS.map((o) => (
            <option
              key={o.value}
              value={o.value}
            >
              {o.label}
            </option>
          ))}
        </select>

      </div>

      <div className="flex-1 px-3 py-3 max-h-[650px] overflow-y-auto">

        {appointments.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-zinc-400 text-[14px]">
              No appointments found
            </p>
          </div>
        ) : (
          appointments.map((appt, i) => (
            <AppointmentItem
              key={appt._id}
              appointment={appt}
              onClick={setSelectedAppt}
              showDate
              prevDate={
                i > 0
                  ? appointments[i - 1].date
                  : undefined
              }
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

function StatPill({ label, value, color }) {
  return (
    <div>
      <p className={`text-[22px] font-bold ${color}`}>
        {value}
      </p>

      <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">
        {label}
      </p>
    </div>
  );
}