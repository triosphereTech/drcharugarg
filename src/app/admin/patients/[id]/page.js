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
        title={patient.name}
        subtitle="Patient detail & appointment history"
      />

      <div className="flex-1 p-7 space-y-5">
        {/* Back */}
        <Link
          href="/patients"
          className="inline-flex items-center gap-1.5 text-[13px] text-zinc-400 hover:text-[--primary-accent] transition-colors"
        >
          <svg
            width="14"
            height="14"
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

          Back to patients
        </Link>

        {/* Patient header card */}
        <div className="bg-white border border-[#D4E9F2] rounded-2xl px-6 py-5 flex items-center gap-5">
          <Avatar
            name={patient.name}
            size="lg"
            className="w-14 h-14 text-xl"
          />

          <div>
            <h2 className="text-[20px] font-bold text-[--primary-dark]">
              {patient.name}
            </h2>

            <p className="text-[13px] text-zinc-400 mt-1">
              {patient.email} ·{" "}
              {patient.mobileNumber}
            </p>
          </div>

          <div className="ml-auto flex gap-8 text-center">
            <StatPill
              label="Total"
              value={statCounts.total}
              color="text-[--primary-dark]"
            />

            <StatPill
              label="Pending"
              value={statCounts.pending}
              color="text-amber-500"
            />

            <StatPill
              label="Attended"
              value={statCounts.attended}
              color="text-emerald-500"
            />
          </div>
        </div>

        {/* Appointment history */}
        <div className="bg-white border border-[#D4E9F2] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#D4E9F2] flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-[--primary-dark]">
              Appointment History
            </h3>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border border-[#D4E9F2] rounded-lg px-3 py-1.5 text-[12.5px] text-zinc-600 bg-white outline-none focus:border-[--primary-accent] transition-colors font-[inherit]"
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

          <div className="px-2 py-2 max-h-[480px] overflow-y-auto">
            {appointments.length === 0 ? (
              <p className="text-center text-zinc-400 text-[13px] py-12">
                No appointments found
              </p>
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