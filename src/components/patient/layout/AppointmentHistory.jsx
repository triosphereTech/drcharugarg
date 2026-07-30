// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   CalendarDays,
//   Clock,
//   Stethoscope,
//   ChevronRight,
//   RefreshCcw,
// } from "lucide-react";
// import { formatDateLong, currency } from "../data/Temppatientdata";
// import { PatientModal } from "../layout/Patientmodal";

// const STATUS_STYLES = {
//   pending: "bg-blue-50 text-blue-600",
//   attended: "bg-green-50 text-green-600",
//   cancelled: "bg-red-50 text-red-500",
// };

// const TITLES = {
//   all: "All Appointments",
//   pending: "Upcoming Appointments",
//   attended: "Completed Appointments",
//   cancelled: "Cancelled Appointments",
// };
// const FILTER_OPTIONS = [
//   { key: "all", label: "All" },
//   { key: "pending", label: "Upcoming" },
//   { key: "attended", label: "Completed" },
//   { key: "cancelled", label: "Cancelled" },
// ];

// export const AppointmentHistory = ({
//   appointments,
//   filter = "all",
//   onNavigate,
//   onFollowUp,
// }) => {
//   const [selected, setSelected] = useState(null);

//   const filtered = useMemo(() => {
//     const list =
//       filter === "all"
//         ? appointments
//         : appointments.filter((a) => a.status === filter);

//     const grouped = list.reduce((acc, apt) => {
//       const groupKey = apt.appointmentGroupId || apt._id;
//       if (!acc[groupKey]) {
//         acc[groupKey] = [];
//       }
//       acc[groupKey].push(apt);
//       return acc;
//     }, {});

//     return Object.values(grouped)
//       .map((group) => group.sort((a, b) => new Date(b.date) - new Date(a.date)))
//       .sort((a, b) => new Date(b[0].date) - new Date(a[0].date));
//   }, [appointments, filter]);

//   const modalGroupId = selected?.[0]?.appointmentGroupId || selected?.[0]?._id;

//   const modalHasPendingAppointment = appointments.some(
//     (apt) =>
//       (apt.appointmentGroupId || apt._id) === modalGroupId &&
//       apt.status === "pending",
//   );

//   const modalLatestCompleted =
//     selected?.[selected.length - 1]?.status === "attended";

//   return (
//     <div>
//       <div className="mb-5">
//         <h2 className="text-xl font-bold text-gray-900">
//           {TITLES[filter] || TITLES.all}
//         </h2>
//         <p className="text-sm text-gray-400 mt-1">
//           {filter === "all"
//             ? "Your all consultations in one place."
//             : `Showing your ${filter} consultations.`}
//         </p>
//       </div>

//       {/* Mobile-only filter button group (desktop uses the sidebar dropdown) */}
//       <div
//         className="lg:hidden grid grid-cols-4 gap-1 bg-white border border-gray-100 rounded-xl p-1 mb-6"
//         role="radiogroup"
//         aria-label="Filter appointments"
//       >
//         {FILTER_OPTIONS.map((opt) => (
//           <button
//             key={opt.key}
//             type="button"
//             role="radio"
//             aria-checked={filter === opt.key}
//             onClick={() => onNavigate(`apt-${opt.key}`)}
//             className={`px-2 py-2 rounded-lg text-xs font-semibold cursor-pointer active:scale-95 transition-all duration-150 ${
//               filter === opt.key
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-500 hover:bg-gray-50"
//             }`}
//           >
//             {opt.label}
//           </button>
//         ))}
//       </div>

//       {filtered.length === 0 ? (
//         <div className="border border-dashed border-gray-200 rounded-2xl py-16 text-center text-gray-400 text-sm bg-white">
//           No {filter !== "all" ? filter : ""} appointments found.
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {filtered.map((group) => {
//             console.log("ffff", filtered);

//             const latest = group[0];
//             const latestStatus = latest?.status || "pending";
//             const isCompleted = latestStatus === "attended";
//             const groupId = latest.appointmentGroupId || latest._id;

//             const allGroupAppointments = appointments.filter(
//               (apt) => (apt.appointmentGroupId || apt._id) === groupId,
//             );

//             const hasPendingAppointment = allGroupAppointments.some(
//               (apt) => apt.status === "pending",
//             );

//             const canBookFollowUp =
//               latestStatus === "attended" && !hasPendingAppointment;

//             return (
//               <div
//                 key={latest._id}
//                 role="button"
//                 tabIndex={0}
//                 onClick={() => setSelected(group)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     e.preventDefault();
//                     setSelected(group);
//                   }
//                 }}
//                 className="w-full flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left cursor-pointer active:scale-[0.99] transition-all duration-150 hover:border-gray-200"
//               >
//                 <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white shrink-0">
//                   <Stethoscope size={20} />
//                 </span>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <p className="font-bold text-gray-900 text-sm">
//                       {latest.service}
//                     </p>
//                     {group.length > 1 && (
//                       <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
//                         {group.length} visits
//                       </span>
//                     )}
//                   </div>

//                   <p className="text-sm text-gray-500 mt-0.5">Dr. Charu Garg</p>

//                   <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
//                     <span className="flex items-center gap-1">
//                       <CalendarDays size={13} />
//                       {formatDateLong(latest.date)}
//                     </span>

//                     <span className="flex items-center gap-1">
//                       <Clock size={13} />
//                       {latest.slotStartTime && latest.slotEndTime
//                         ? `${latest.slotStartTime} - ${latest.slotEndTime}`
//                         : latest.timeSlot}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 shrink-0">
//                   <span
//                     className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[latestStatus]}`}
//                   >
//                     {latestStatus}
//                   </span>

//                   {isCompleted && (
//                     <button
//                       type="button"
//                       disabled={!canBookFollowUp}
//                       title={
//                         hasPendingAppointment
//                           ? "A follow-up appointment is already scheduled."
//                           : ""
//                       }
//                       onClick={(e) => {
//                         e.stopPropagation();

//                         if (!canBookFollowUp) return;

//                         onFollowUp(latest);
//                       }}
//                       className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-150 ${
//                         canBookFollowUp
//                           ? "bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-95"
//                           : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                       }`}
//                     >
//                       <RefreshCcw size={13} />
//                       {hasPendingAppointment
//                         ? "Follow-up Scheduled"
//                         : "Follow-up"}
//                     </button>
//                   )}

//                   <ChevronRight size={16} className="text-gray-300" />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Details modal */}
//       {selected && (
//         <PatientModal
//           title={`${selected[0].service} consultation history`}
//           subtitle={`${selected.length} visit${selected.length > 1 ? "s" : ""}`}
//           onClose={() => setSelected(null)}
//           footer={
//             modalLatestCompleted && (
//               <button
//                 type="button"
//                 disabled={modalHasPendingAppointment}
//                 onClick={() => {
//                   if (modalHasPendingAppointment) return;

//                   setSelected(null);
//                   onFollowUp(selected[selected.length - 1]);
//                 }}
//                 className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold ${
//                   modalHasPendingAppointment
//                     ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                     : "bg-gray-900 hover:bg-gray-800 text-white cursor-pointer"
//                 }`}
//               >
//                 <RefreshCcw size={15} />
//                 {modalHasPendingAppointment
//                   ? "Follow-up Already Scheduled"
//                   : "Book Follow-up"}
//               </button>
//             )
//           }
//         >
//           <div className="space-y-4">
//             {selected.map((item) => (
//               <div
//                 key={item._id}
//                 className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
//               >
//                 <div className="flex items-center justify-between gap-3">
//                   <div>
//                     <p className="text-sm font-semibold text-gray-900">
//                       {item.service}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {formatDateLong(item.date)} • {item.slotStartTime && item.slotEndTime ? `${item.slotStartTime} - ${item.slotEndTime}` : item.timeSlot}
//                     </p>
//                   </div>
//                   <span
//                     className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[item.status]}`}
//                   >
//                     {item.status}
//                   </span>
//                 </div>
//                 <div className="mt-3 grid grid-cols-2 gap-4">
//                   <DetailRow
//                     label="Type"
//                     value={
//                       item.appointmentType === "followup"
//                         ? "Follow-up"
//                         : "Initial"
//                     }
//                   />
//                   <DetailRow
//                     label="Consultation Fee"
//                     value={currency(item.fee || 0)}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </PatientModal>
//       )}
//     </div>
//   );
// };

// const DetailRow = ({ label, value, capitalize }) => (
//   <div>
//     <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
//       {label}
//     </p>
//     <p
//       className={`text-sm font-semibold text-gray-800 mt-0.5 ${capitalize ? "capitalize" : ""}`}
//     >
//       {value}
//     </p>
//   </div>
// );

"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  ChevronRight,
  RefreshCcw,
  Download,
  FileText,
  ClipboardList,
  ClipboardCheck,
  User,
  UserCircle2,
  ImageIcon,
} from "lucide-react";
import { formatDateLong, currency } from "../data/Temppatientdata";
import { PatientModal } from "../layout/Patientmodal";

const STATUS_STYLES = {
  pending: "bg-blue-50 text-blue-600",
  attended: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-500",
};

const TITLES = {
  all: "All Appointments",
  pending: "Upcoming Appointments",
  attended: "Completed Appointments",
  cancelled: "Cancelled Appointments",
};

const FILTER_OPTIONS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Upcoming" },
  { key: "attended", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

/* ---------- helpers (mirrors admin AppointmentModal) ---------- */

function isImageUrl(url) {
  return /\.(png|jpe?g|webp|gif|avif)$/i.test(url || "");
}

function getAttachmentUrl(attachment) {
  return typeof attachment === "string" ? attachment : attachment?.url || "";
}

function getAttachmentOwner(attachment) {
  if (typeof attachment === "string") return "patient";
  return attachment?.uploadedBy === "doctor" ? "doctor" : "patient";
}

function buildConversation(appointment) {
  const items = [];
  const conversationItems =
    appointment?.patient?.conversation || appointment?.conversation || [];
  const attachments = appointment?.attachments || [];

  const patientAttachments = attachments.filter(
    (a) => getAttachmentOwner(a) === "patient",
  );
  const doctorAttachments = attachments.filter(
    (a) => getAttachmentOwner(a) === "doctor",
  );

  const patientNote = appointment?.patientNote?.trim();
  if (patientNote) {
    items.push({
      id: `${appointment._id}-patient-note`,
      sender: "patient",
      type: "patientNote",
      title: "Your Note",
      text: patientNote,
      createdAt: appointment.createdAt,
    });
  }

  if (patientAttachments.length > 0) {
    items.push({
      id: `${appointment._id}-patient-attachments`,
      sender: "patient",
      type: "attachments",
      title: "Your Attachments",
      attachments: patientAttachments,
      createdAt: patientAttachments[0]?.uploadedAt || appointment.createdAt,
    });
  }

  items.push(...conversationItems);

  if (appointment?.prescription) {
    items.push({
      id: `${appointment._id}-prescription`,
      sender: "doctor",
      type: "prescription",
      title: "Prescription",
      text: appointment.prescription,
      createdAt: appointment.updatedAt || appointment.createdAt,
    });
  }

  if (appointment?.prescriptionPdf) {
    items.push({
      id: `${appointment._id}-pdf`,
      sender: "doctor",
      type: "prescriptionPdf",
      url: appointment.prescriptionPdf,
      title: "Prescription PDF",
      createdAt: appointment.updatedAt || appointment.createdAt,
    });
  }

  if (doctorAttachments.length > 0) {
    items.push({
      id: `${appointment._id}-doctor-attachments`,
      sender: "doctor",
      type: "attachments",
      title: "Doctor Attachments",
      attachments: doctorAttachments,
      createdAt:
        doctorAttachments[0]?.uploadedAt ||
        appointment.updatedAt ||
        appointment.createdAt,
    });
  }

  return items;
}

async function downloadPdf(url, filename) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || "prescription.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    // Fallback: just open it in a new tab if fetch/blob download fails
    window.open(url, "_blank", "noreferrer");
  }
}

/* ---------- message bubble (simplified, read-only patient view) ---------- */

const ConversationMessage = ({ item, onImageClick }) => {
  if (item.type === "system") {
    return null;
  }

  const isPatient = item.sender === "patient";

  return (
    <div
      className={`flex items-end gap-2.5 ${isPatient ? "justify-end" : "justify-start"}`}
    >
      {!isPatient && (
        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
          <UserCircle2 className="w-5 h-5 text-emerald-600" />
        </div>
      )}

      <div className={`max-w-[75%] ${isPatient ? "flex flex-col items-end" : ""}`}>
        {item.type === "text" && (
          <div
            className={`rounded-[10px] px-4 py-3 shadow-sm ${
              isPatient
                ? "bg-gray-900 text-white rounded-br-md"
                : "bg-white border border-gray-100 rounded-bl-md"
            }`}
          >
            <div className="whitespace-pre-wrap text-sm leading-6">
              {item.text}
            </div>
            <p
              className={`text-[10px] mt-1.5 text-right ${
                isPatient ? "text-white/70" : "text-gray-400"
              }`}
            >
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}

        {item.type === "patientNote" && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm w-full max-w-[420px]">
            <div className="flex items-center gap-2 bg-gray-50 border-b border-gray-100 px-4 py-2.5">
              <ClipboardList className="w-4 h-4 text-gray-500" />
              <h4 className="text-xs font-semibold text-gray-600">
                {item.title}
              </h4>
            </div>
            <div className="p-4">
              <p className="whitespace-pre-wrap text-sm text-gray-700 leading-6">
                {item.text}
              </p>
            </div>
          </div>
        )}

        {item.type === "prescription" && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm w-full max-w-[420px]">
            <div className="flex items-center gap-2 bg-green-50 border-b border-green-100 px-4 py-2.5">
              <ClipboardCheck className="w-4 h-4 text-green-600" />
              <h4 className="text-xs font-semibold text-green-700">
                {item.title}
              </h4>
            </div>
            <div className="p-4">
              <p className="whitespace-pre-wrap text-sm text-gray-700 leading-6">
                {item.text}
              </p>
            </div>
          </div>
        )}

        {item.type === "prescriptionPdf" && (
          <button
            type="button"
            onClick={() => downloadPdf(item.url, `prescription-${item.id}.pdf`)}
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm hover:border-gray-300 transition-colors cursor-pointer"
          >
            <span className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <FileText size={16} />
            </span>
            <span className="text-left">
              <span className="block text-xs font-semibold text-gray-800">
                Prescription PDF
              </span>
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <Download size={11} /> Tap to download
              </span>
            </span>
          </button>
        )}

        {(item.type === "attachments" || item.type === "images") && (
          <div
            className={`rounded-2xl p-3 shadow-sm w-full max-w-[420px] ${
              isPatient
                ? "bg-gray-900"
                : "bg-white border border-gray-100"
            }`}
          >
            <p
              className={`text-xs font-semibold mb-2.5 ${
                isPatient ? "text-white" : "text-gray-600"
              }`}
            >
              {item.title}
            </p>
            <div className={`grid grid-cols-${item.attachments.length > 3 ? '3' : item.attachments.length } gap-2`}>
              {(item.attachments || item.images || []).map((attachment, idx) => {
                const url = getAttachmentUrl(attachment);
                return isImageUrl(url) ? (
                  <button
                    key={`${url}-${idx}`}
                    type="button"
                    onClick={() => onImageClick(url)}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </button>
                ) : (
                  <a
                    key={`${url}-${idx}`}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className={`h-20 rounded-xl border flex flex-col items-center justify-center gap-1 text-[10px] font-medium ${
                      isPatient
                        ? "border-white/20 text-white bg-white/10"
                        : "border-gray-100 text-gray-500 bg-gray-50"
                    }`}
                  >
                    <FileText size={16} />
                    View
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {isPatient && (
        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-gray-500" />
        </div>
      )}
    </div>
  );
};

/* ---------- main component ---------- */

export const AppointmentHistory = ({
  appointments,
  filter = "all",
  onNavigate,
  onFollowUp,
}) => {
  const [selected, setSelected] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
useEffect(() => {
  const handleEscape = (event) => {
    if (event.key !== "Escape") return;

    // Close image first
    if (selectedImage) {
      setSelectedImage(null);
      return;
    }

    // Then close modal
    if (selected) {
      setSelected(null);
    }
  };

  document.addEventListener("keydown", handleEscape);

  return () => {
    document.removeEventListener("keydown", handleEscape);
  };
}, [selected, selectedImage]);
  const filtered = useMemo(() => {
    const list =
      filter === "all"
        ? appointments
        : appointments.filter((a) => a.status === filter);

    const grouped = list.reduce((acc, apt) => {
      const groupKey = apt.appointmentGroupId || apt._id;
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(apt);
      return acc;
    }, {});

    return Object.values(grouped)
      .map((group) => group.sort((a, b) => new Date(b.date) - new Date(a.date)))
      .sort((a, b) => new Date(b[0].date) - new Date(a[0].date));
  }, [appointments, filter]);

  const modalGroupId = selected?.[0]?.appointmentGroupId || selected?.[0]?._id;

  const modalHasPendingAppointment = appointments.some(
    (apt) =>
      (apt.appointmentGroupId || apt._id) === modalGroupId &&
      apt.status === "pending",
  );

  const modalLatestPrescriptionPdf =
    selected?.[0]?.prescriptionPdf;

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          {TITLES[filter] || TITLES.all}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {filter === "all"
            ? "Your all consultations in one place."
            : `Showing your ${filter} consultations.`}
        </p>
      </div>

      {/* Mobile-only filter button group (desktop uses the sidebar dropdown) */}
      <div
        className="lg:hidden grid grid-cols-4 gap-1 bg-white border border-gray-100 rounded-xl p-1 mb-6"
        role="radiogroup"
        aria-label="Filter appointments"
      >
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={filter === opt.key}
            onClick={() => onNavigate(`apt-${opt.key}`)}
            className={`px-2 py-2 rounded-lg text-xs font-semibold cursor-pointer active:scale-95 transition-all duration-150 ${
              filter === opt.key
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-2xl py-16 text-center text-gray-400 text-sm bg-white">
          No {filter !== "all" ? filter : ""} appointments found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((group) => {
            const latest = group[0];
            const latestStatus = latest?.status || "pending";
            const isCompleted = latestStatus === "attended";
            const groupId = latest.appointmentGroupId || latest._id;

            const allGroupAppointments = appointments.filter(
              (apt) => (apt.appointmentGroupId || apt._id) === groupId,
            );

            const hasPendingAppointment = allGroupAppointments.some(
              (apt) => apt.status === "pending",
            );

            const canBookFollowUp =
              latestStatus === "attended" && !hasPendingAppointment;

            return (
              <div
                key={latest._id}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(group)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(group);
                  }
                }}
                className="w-full flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left cursor-pointer active:scale-[0.99] transition-all duration-150 hover:border-gray-200"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white shrink-0">
                  <Stethoscope size={20} />
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-900 text-sm">
                      {latest.service}
                    </p>
                    {group.length > 1 && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                        {group.length} visits
                      </span>
                    )}
                    {latest.prescriptionPdf && (
                      <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-500">
                        <FileText size={10} /> Prescription
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-0.5">Dr. Charu Garg</p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={13} />
                      {formatDateLong(latest.date)}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {latest.slotStartTime && latest.slotEndTime
                        ? `${latest.slotStartTime} - ${latest.slotEndTime}`
                        : latest.timeSlot}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[latestStatus]}`}
                  >
                    {latestStatus}
                  </span>

                  {latest.prescriptionPdf && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPdf(
                          latest.prescriptionPdf,
                          `prescription-${latest._id}.pdf`,
                        );
                      }}
                      title="Download latest prescription"
                      className="w-9 h-9 rounded-xl border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                      <Download size={15} />
                    </button>
                  )}

                  {isCompleted && (
                    <button
                      type="button"
                      disabled={!canBookFollowUp}
                      title={
                        hasPendingAppointment
                          ? "A follow-up appointment is already scheduled."
                          : ""
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!canBookFollowUp) return;
                        onFollowUp(latest);
                      }}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-150 ${
                        canBookFollowUp
                          ? "bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-95"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <RefreshCcw size={13} />
                      {hasPendingAppointment
                        ? "Follow-up Scheduled"
                        : "Follow-up"}
                    </button>
                  )}

                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details modal - conversation style, mirrors the admin view */}
      {selected && (
        <PatientModal
          title={`${selected[0].service} consultation history`}
          subtitle={`${selected.length} visit${selected.length > 1 ? "s" : ""}`}
          onClose={() => setSelected(null)}
          footer={
            <div className="flex items-center gap-3 flex-wrap">
              {modalLatestPrescriptionPdf && (
                <button
                  type="button"
                  onClick={() =>
                    downloadPdf(
                      modalLatestPrescriptionPdf,
                      `prescription-${selected[selected.length - 1]._id}.pdf`,
                    )
                  }
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <Download size={15} />
                  Download Latest Prescription
                </button>
              )}

                <button
                  type="button"
                  disabled={modalHasPendingAppointment}
                  onClick={() => {
                    if (modalHasPendingAppointment) return;
                    setSelected(null);
                    onFollowUp(selected[selected.length - 1]);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    modalHasPendingAppointment
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-gray-800 text-white cursor-pointer"
                  }`}
                >
                  <RefreshCcw size={15} />
                  {modalHasPendingAppointment
                    ? "Follow-up Already Scheduled"
                    : "Book Follow-up"}
                </button>
    
            </div>
          }
        >
          <div className="space-y-6">
            {selected.map((item) => {
              const conversation = buildConversation(item);

              return (
                <div
                  key={item._id}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.appointmentType === "followup"
                          ? "Follow-up"
                          : "Initial Consultation"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDateLong(item.date)} •{" "}
                        {item.slotStartTime && item.slotEndTime
                          ? `${item.slotStartTime} - ${item.slotEndTime}`
                          : item.timeSlot}
                        {" • "}
                        {currency(item.fee || 0)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {conversation.length > 0 ? (
                    <div className="space-y-3">
                      {conversation.map((msg) => (
                        <ConversationMessage
                          key={msg.id}
                          item={msg}
                          onImageClick={setSelectedImage}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-4">
                      No notes or prescription yet for this visit.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </PatientModal>
      )}

      {/* Fullscreen image preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/85 z-[80] flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-black text-lg cursor-pointer"
          >
            x
          </button>
          <img
            src={selectedImage}
            alt=""
            className="max-w-full max-h-full object-contain rounded-3xl"
          />
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value, capitalize }) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
      {label}
    </p>
    <p
      className={`text-sm font-semibold text-gray-800 mt-0.5 ${capitalize ? "capitalize" : ""}`}
    >
      {value}
    </p>
  </div>
);