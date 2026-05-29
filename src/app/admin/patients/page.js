"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/admin/layout/Topbar";
import { Avatar } from "@/components/admin/ui/Avatar";
import { Pagination } from "@/components/admin/ui/Pagination";
import {
  fetchPatients,
  getAppointmentCountForPatient,
  getLastVisitForPatient,
  formatDate,
} from "@/lib/data";

export default function PatientsPage() {
  const router = useRouter();

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);

    return () => clearTimeout(t);
  }, [search]);

  const loadPatients = useCallback(async () => {
    const res = await fetchPatients({
      search: debouncedSearch,
      page,
      limit: 10,
    });

    setPatients(res.data);
    setTotal(res.pagination.total);
    setTotalPages(res.pagination.totalPages);
  }, [debouncedSearch, page]);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  return (
    <>
      <Topbar
        title="Patients"
        subtitle={`${total} registered patients`}
      />

      <div className="flex-1 p-7">
        <div className="bg-white border border-[#D4E9F2] rounded-2xl overflow-hidden">
          {/* Search bar */}
          <div className="px-5 py-4 border-b border-[#D4E9F2]">
            <div className="relative max-w-md">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                width="15"
                height="15"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients by name…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4E9F2] text-[14px] text-[--primary-dark] placeholder:text-zinc-400 outline-none focus:border-[--primary-accent] transition-colors bg-[--soft-bg]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#D4E9F2]">
                  {[
                    "Patient",
                    "Email",
                    "Mobile",
                    "Appointments",
                    "Last Visit",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {patients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center text-zinc-400 text-[13px] py-14"
                    >
                      No patients found
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => {
                    const count = getAppointmentCountForPatient(patient._id);

                    const lastVisit = getLastVisitForPatient(
                      patient._id
                    );

                    return (
                      <tr
                        key={patient._id}
                        onClick={() =>
                          router.push(`/admin/patients/${patient._id}`)
                        }
                        className="border-b border-[#D4E9F2] last:border-b-0 hover:bg-[--soft-bg] cursor-pointer transition-colors"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <Avatar
                              name={patient.name}
                              size="sm"
                            />

                            <span className="text-[13.5px] font-medium text-[--primary-dark]">
                              {patient.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-3.5 text-[13px] text-zinc-500">
                          {patient.email}
                        </td>

                        <td className="px-5 py-3.5 text-[13px] text-zinc-500">
                          {patient.mobileNumber}
                        </td>

                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-[--soft-bg] text-[--primary-accent]">
                            {count}
                          </span>
                        </td>

                        <td className="px-5 py-3.5 text-[13px] text-zinc-500">
                          {lastVisit
                            ? formatDate(lastVisit)
                            : "—"}
                        </td>

                        <td className="px-5 py-3.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              router.push(
                                `/admin/patients/${patient._id}`
                              );
                            }}
                            className="px-3 py-1.5 rounded-lg border border-[#D4E9F2] text-[12px] text-zinc-500 hover:bg-white hover:text-[--primary-accent] hover:border-[--primary-accent] transition-colors"
                          >
                            View →
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
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
    </>
  );
}