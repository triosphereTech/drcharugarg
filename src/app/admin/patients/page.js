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

// ── Icons ──────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const ClockIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path d="M6.6 10.8A15.4 15.4 0 0 0 13.2 17.4l2.1-2.1a1 1 0 0 1 1.05-.25 11.5 11.5 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1.05L6.6 10.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ── Appointment badge colour scale ─────────────────────────────────────────
function apptBadge(count) {
  if (count === 0) return { bg: "#F1F5F9", text: "#64748B" };
  if (count <= 2)  return { bg: "#EFF6FF", text: "#2563EB" };
  if (count <= 5)  return { bg: "#F0FDF4", text: "#16A34A" };
  return              { bg: "#FFF7ED", text: "#EA580C" };
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function PatientsPage() {
  const router = useRouter();

  const [patients,        setPatients]        = useState([]);
  const [search,          setSearch]          = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page,            setPage]            = useState(1);
  const [total,           setTotal]           = useState(0);
  const [totalPages,      setTotalPages]      = useState(1);
  const [loading,         setLoading]         = useState(true);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const loadPatients = useCallback(async () => {
    setLoading(true);
    const res = await fetchPatients({ search: debouncedSearch, page, limit: 10 });
    setPatients(res.data);
    setTotal(res.pagination.total);
    setTotalPages(res.pagination.totalPages);
    setLoading(false);
  }, [debouncedSearch, page]);

  useEffect(() => { loadPatients(); }, [loadPatients]);
  useEffect(() => { setPage(1); }, [debouncedSearch]);

  // Shared pagination bar — used both above and below the table
  const PaginationBar = () =>
    !loading && patients.length > 0 ? (
      <div style={{
        padding: "11px 20px",
        background: "#FAFCFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 12.5, color: "#64748B" }}>
          Showing{" "}
          <strong style={{ color: "#1E293B" }}>
            {(page - 1) * 10 + 1}–{Math.min(page * 10, total)}
          </strong>{" "}
          of <strong style={{ color: "#1E293B" }}>{total}</strong> patients
        </span>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={total}
          itemsPerPage={10}
        />
      </div>
    ) : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

        .patients-wrap * { font-family: 'DM Sans', sans-serif; }

        /* ── row hover ── */
        .pt-row { transition: background 0.14s ease; }
        .pt-row:hover { background: #F4F9FF; }

        /* ── view button always visible, fills blue on row hover ── */
        .pt-view-btn {
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .pt-row:hover .pt-view-btn {
          background: #2563EB !important;
          color: #fff !important;
          border-color: #2563EB !important;
          box-shadow: 0 2px 8px rgba(37,99,235,0.28);
        }

        /* ── search clear ── */
        .search-clear { transition: background 0.12s ease; }
        .search-clear:hover { background: #CBD5E1 !important; }

        /* ── skeleton pulse ── */
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
        .skeleton { animation: pulse 1.4s ease-in-out infinite; background:#EFF6FF; border-radius:6px; }

        /* ── badge ── */
        .appt-badge { font-family: 'DM Mono', monospace; letter-spacing: -0.02em; }

        /* ── row entry ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .pt-row { animation: fadeUp 0.22s ease both; }
      `}</style>

      <Topbar
        title="Patients"
        subtitle={`${total} registered patient${total !== 1 ? "s" : ""}`}
      />

      <div className="patients-wrap flex-1 p-6">
        {/* ── Page header ─────────────────────────────────────── */}
        

        {/* ── Card ─────────────────────────────────────────────── */}
        <div style={{
          background: "#fff",
          border: "1px solid #E2EDF8",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(59,130,246,0.06)",
        }}>

          {/* Search bar */}
          <div style={{
            padding: "14px 20px",
            borderBottom: "1px solid #EFF6FF",
            background: "#FAFCFF",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
              <span style={{
                position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
                color: "#94A3B8", pointerEvents: "none", display: "flex",
              }}>
                <SearchIcon />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients by name…"
                style={{
                  width: "100%",
                  paddingLeft: 38, paddingRight: search ? 36 : 14,
                  paddingTop: 9, paddingBottom: 9,
                  borderRadius: 10,
                  border: "1.5px solid #E2EDF8",
                  fontSize: 13.5,
                  color: "#0F172A",
                  background: "#fff",
                  outline: "none",
                  transition: "border-color 0.15s",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
                onFocus={e => e.target.style.borderColor = "#93C5FD"}
                onBlur={e => e.target.style.borderColor = "#E2EDF8"}
              />
              {search && (
                <button
                  className="search-clear"
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    background: "#E2EDF8", border: "none", cursor: "pointer",
                    borderRadius: "50%", width: 20, height: 20,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#64748B",
                  }}
                >
                  <XIcon />
                </button>
              )}
            </div>

            {/* Result count pill */}
            {debouncedSearch && (
              <span style={{
                fontSize: 12, color: "#2563EB",
                background: "#EFF6FF", border: "1px solid #BFDBFE",
                borderRadius: 20, padding: "3px 10px", fontWeight: 500,
              }}>
                {total} result{total !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* ── TOP Pagination ─────────────────────────────── */}
          {!loading && patients.length > 0 && (
            <div style={{ borderBottom: "1px solid #EEF4FB" }}>
              <PaginationBar />
            </div>
          )}

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #EFF6FF", background: "#FAFCFF" }}>
                  {[
                    { label: "Patient",      width: "20%" },
                    { label: "Email",        width: "22%" },
                    { label: "Mobile",       width: "16%" },
                    { label: "Appointments", width: "13%" },
                    { label: "Last Visit",   width: "18%" },
                    { label: "",             width: "11%" },
                  ].map(({ label, width }) => (
                    <th key={label} style={{
                      width,
                      textAlign: "left",
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#232323",
                      padding: "11px 20px",
                    }}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Loading skeletons */}
                {loading && Array.from({ length: 7 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    {[20, 22, 16, 13, 18, 11].map((w, j) => (
                      <td key={j} style={{ padding: "15px 20px", width: `${w}%` }}>
                        <div className="skeleton" style={{ height: 14, width: j === 0 ? "70%" : j === 5 ? "55%" : "62%", borderRadius: 6 }} />
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Empty */}
                {!loading && patients.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "72px 20px" }}>
                      <div style={{
                        display: "inline-flex", flexDirection: "column",
                        alignItems: "center", gap: 12,
                      }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: 14,
                          background: "#EFF6FF",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#93C5FD",
                        }}>
                          <UsersIcon />
                        </div>
                        <p style={{ fontSize: 14.5, fontWeight: 500, color: "#475569", margin: 0 }}>
                          No patients found
                        </p>
                        {debouncedSearch && (
                          <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>
                            Try a different search term
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}

                {/* Rows */}
                {!loading && patients.map((patient, idx) => {
                  const count    = getAppointmentCountForPatient(patient._id);
                  const lastVisit = getLastVisitForPatient(patient._id);
                  const badge    = apptBadge(count);

                  return (
                    <tr
                      key={patient._id}
                      className="pt-row"
                      onClick={() => router.push(`/admin/patients/${patient._id}`)}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        cursor: "pointer",
                        animationDelay: `${idx * 0.04}s`,
                      }}
                    >
                      {/* Patient */}
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                          <Avatar name={patient.name} size="sm" />
                          <span style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>
                            {patient.name}
                          </span>
                        </div>
                      </td>

                      {/* Email — own column */}
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          fontSize: 13.5, color: "#334155",
                        }}>
                          <span style={{ color: "#94A3B8", display: "flex", flexShrink: 0 }}><MailIcon /></span>
                          {patient.email}
                        </span>
                      </td>

                      {/* Mobile — own column */}
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          fontSize: 13.5, color: "#334155",
                        }}>
                          <span style={{ color: "#94A3B8", display: "flex", flexShrink: 0 }}><PhoneIcon /></span>
                          {patient.mobileNumber}
                        </span>
                      </td>

                      {/* Appointments — number badge, no icon */}
                      <td style={{ padding: "14px 20px" }}>
                        <span
                          className="appt-badge"
                          style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            minWidth: 32, padding: "4px 12px",
                            borderRadius: 20,
                            fontSize: 13,
                            fontWeight: 700,
                            background: badge.bg,
                            color: badge.text,
                          }}
                        >
                          {count}
                        </span>
                      </td>

                      {/* Last Visit */}
                      <td style={{ padding: "14px 20px" }}>
                        {lastVisit ? (
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            fontSize: 13.5, color: "#334155",
                          }}>
                            <span style={{ color: "#94A3B8", display: "flex", flexShrink: 0 }}><ClockIcon /></span>
                            {formatDate(lastVisit)}
                          </span>
                        ) : (
                          <span style={{ fontSize: 13.5, color: "#CBD5E1" }}>—</span>
                        )}
                      </td>

                      {/* View — always visible, fills solid blue on row hover */}
                      <td style={{ padding: "14px 20px", textAlign: "right" }}>
                        <button
                          className="pt-view-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/patients/${patient._id}`);
                          }}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            padding: "7px 14px",
                            borderRadius: 40,
                            border: "1.5px solid #BFDBFE",
                            background: "#EFF6FF",
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: "#2563EB",
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          <EyeIcon />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── BOTTOM Pagination ─────────────────────────── */}
          {!loading && patients.length > 0 && (
            <div style={{ borderTop: "1px solid #EEF4FB" }}>
              <PaginationBar />
            </div>
          )}

        </div>
      </div>
    </>
  );
}