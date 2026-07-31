"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "@/components/admin/ui/Avatar";
import { formatDate } from "@/lib/data";
import { GrAttachment } from "react-icons/gr";
import { LuSendHorizontal } from "react-icons/lu";
import { BiExpandAlt } from "react-icons/bi";
import { BsArrowsAngleContract } from "react-icons/bs";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineCheckCircle,
  HiOutlineXMark,
  HiPlus,
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCalendarDays,
  HiCheckBadge,
  HiUserCircle,
  HiOutlineUserCircle,
  HiDocumentText,
  HiArrowTopRightOnSquare,
  HiArrowDownTray,
  HiClipboardDocumentList,
  HiClipboardDocumentCheck,
  HiPhoto,
} from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";
import { X } from "lucide-react";

function isImageUrl(url) {
  return /\.(png|jpe?g|webp|gif|avif)$/i.test(url || "");
}

function getAttachmentUrl(attachment) {
  return typeof attachment === "string" ? attachment : attachment?.url || "";
}

function getAttachmentOwner(attachment) {
  if (typeof attachment === "string") {
    return "patient";
  }

  return attachment?.uploadedBy === "doctor" ? "doctor" : "patient";
}

function getDownloadFileName(url) {
  const fallback = "appointment-image";

  try {
    const pathname = new URL(url, window.location.href).pathname;
    return (
      decodeURIComponent(pathname.split("/").filter(Boolean).pop()) || fallback
    );
  } catch {
    return fallback;
  }
}

function createDraftFileId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  if (typeof globalThis.crypto?.getRandomValues === "function") {
    const bytes = new Uint32Array(2);
    globalThis.crypto.getRandomValues(bytes);
    return `draft-${bytes[0].toString(36)}-${bytes[1].toString(36)}`;
  }

  return `draft-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function AppointmentModal({
  appointment: selectedAppointment,
  appointments = [],
  onClose,
  onStatusChange,
}) {
  const [activeAppointment, setActiveAppointment] =
    useState(selectedAppointment);
  const appointment = activeAppointment || selectedAppointment;
  const [message, setMessage] = useState("");
  const [prescriptionData, setPrescriptionData] = useState({
    primaryConcern: "",
    clinicalFindings: "",
    diagnosis: "",
    treatmentPlan: "",
    medications: "",
    instructions: "",
    followUpDays: "",
    notes: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [draftFiles, setDraftFiles] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const chatRef = useRef(null);
  const prescriptionFormRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const requestClose = useCallback(() => {
    if (showPrescription) {
      setShowCloseConfirm(true);
      return;
    }

    onClose();
  }, [onClose, showPrescription]);

  // const groupHistory = useMemo(() => {
  //   return [...appointments].sort(
  //     (a, b) =>
  //       new Date(a.date) - new Date(b.date) ||
  //       new Date(a.createdAt) - new Date(b.createdAt),
  //   );
  // }, [appointments]);
  const groupHistory = useMemo(() => {
    if (appointments?.length > 0) {
      return [...appointments].sort(
        (a, b) =>
          new Date(a.date) - new Date(b.date) ||
          new Date(a.createdAt) - new Date(b.createdAt),
      );
    }

    return appointment ? [appointment] : [];
  }, [appointments, appointment]);

  const appointmentClosed =
    appointment?.status === "attended" || appointment?.status === "cancelled";

  const conversation = useMemo(() => {
    const items = appointment?.patient?.conversation || [];
    const attachments = appointment?.attachments || [];
    const patientAttachments = attachments.filter(
      (attachment) => getAttachmentOwner(attachment) === "patient",
    );
    const doctorAttachments = attachments.filter(
      (attachment) => getAttachmentOwner(attachment) === "doctor",
    );
    const messages = [];

    const patientNote = appointment?.patientNote?.trim();

    if (patientNote) {
      messages.push({
        id: `${appointment._id}-patient-note`,
        sender: "patient",
        type: "patientNote",
        title: "Patient Note",
        text: patientNote,
        createdAt: appointment.createdAt,
      });
    }

    if (patientAttachments.length > 0) {
      messages.push({
        id: `${appointment._id}-patient-attachments`,
        sender: "patient",
        type: "attachments",
        title: "Patient Attachments",
        attachments: patientAttachments,
        createdAt: patientAttachments[0]?.uploadedAt || appointment.createdAt,
      });
    }

    messages.push(...items);

    if (appointment?.prescription) {
      messages.push({
        id: `${appointment._id}-prescription`,
        sender: "doctor",
        type: "prescription",
        title: "Prescription Note",
        text: appointment.prescription,
        createdAt: appointment.updatedAt || appointment.createdAt,
      });
    }
    console.log("thsi issi", appointment);

    if (appointment?.prescriptionPdf) {
      messages.push({
        id: `${appointment._id}-pdf`,
        sender: "doctor",
        type: "prescriptionPdf",
        url: appointment.prescriptionPdf,
        title: "Prescription PDF",
        createdAt: appointment.updatedAt || appointment.createdAt,
      });
    }
    if (doctorAttachments.length > 0) {
      messages.push({
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

    return messages;
  }, [appointment]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
          return;
        }

        if (showCloseConfirm) {
          setShowCloseConfirm(false);
          return;
        }

        requestClose();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [requestClose, selectedImage, showCloseConfirm]);

  useEffect(() => {
    // Only reset when the parent explicitly opens a different appointment;
    // group refreshes should not interrupt sidebar navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setActiveAppointment(selectedAppointment);
  }, [selectedAppointment?._id]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, draftFiles]);

  useEffect(() => {
    setMessage("");
    setDraftFiles([]);
    setError("");
    setExpanded(false);
    setShowPrescription(false);
    setShowCloseConfirm(false);
  }, [appointment?._id]);

  useEffect(() => {
    if (!showPrescription) return;

    requestAnimationFrame(() => {
      prescriptionFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [showPrescription]);

  if (!appointment) return null;

  async function submitConsultation() {
    setError("");
    // Check if any prescription field actually has a value
    const hasPrescriptionData = Object.values(prescriptionData).some(
      (val) => val !== "" && val !== null && val !== undefined,
    );

    if (!message.trim() && draftFiles.length === 0 && !hasPrescriptionData) {
      toast.error(
        "Add prescription notes or an attachment before submitting.",
        {
          position: "top-right",
          autoClose: 3000,
        },
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("status", "attended");
      formData.append("prescription", message.trim());
      formData.append("prescriptionData", JSON.stringify(prescriptionData));

      draftFiles.forEach((item) => {
        formData.append("attachments", item.file);
      });

      const response = await fetch(
        `/api/admin/appointments/${appointment._id}/status`,
        {
          method: "PATCH",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update appointment.");
      }

      // Notify parent
      onStatusChange?.(appointment._id, "attended", message.trim(), data.data);
      setActiveAppointment((previous) => ({
        ...previous,
        ...data.data,
        status: data.data?.status || "attended",
        patient: previous?.patient || data.data.patient,
      }));

      // Cleanup preview URLs
      draftFiles.forEach((item) => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });

      // Reset form
      setMessage("");
      setPrescriptionData({
        primaryConcern: "",
        clinicalFindings: "",
        diagnosis: "",
        treatmentPlan: "",
        medications: "",
        instructions: "",
        followUpDays: "",
        notes: "",
      });
      setDraftFiles([]);
      setError("");
      setExpanded(false);
      setShowPrescription(false);
      setShowCloseConfirm(false);

      // Show success toast ONCE
      toast.success("Appointment updated successfully.", {
        position: "top-right",
        autoClose: 2500,
      });
    } catch (err) {
      setError(err.message);

      toast.error(err.message || "Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const patient = appointment.patient || {};

  return (
    <>
      <div
        className="fixed inset-0 bg-[#0D1F2D]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            requestClose();
          }
        }}
      >
        <div className="bg-white w-full max-w-[1150px] h-[90vh] rounded-[20px] shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-white border-b border-[#DDEAF2] px-6 py-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <Avatar name={patient.name || "Patient"} size="md" />

              <div>
                <h2 className="text-[18px] font-semibold text-[#131C15]">
                  {patient.name || "Patient"}
                </h2>

                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <a
                    href={patient.email ? `mailto:${patient.email}` : undefined}
                    className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-[#058FD2] transition-colors"
                  >
                    <HiOutlineEnvelope className="w-4 h-4" />
                    {patient.email || "No email"}
                  </a>

                  <span className="w-1 h-1 bg-zinc-300 rounded-full" />

                  <a
                    href={
                      patient.mobileNumber
                        ? `tel:${patient.mobileNumber}`
                        : undefined
                    }
                    className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-[#058FD2] transition-colors"
                  >
                    <HiOutlinePhone className="w-4 h-4" />
                    {patient.mobileNumber || "No mobile"}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-2 font-semibold border border-[#bbebff] rounded-xl bg-[#EEF7FB] text-[#058FD2] text-[12px]">
                  <HiOutlineTag className="w-3.5 h-3.5" />
                  {appointment.service}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-2 font-semibold border border-zinc-200 rounded-xl bg-zinc-100 text-zinc-600 text-[12px]">
                  <HiOutlineCalendarDays className="w-3.5 h-3.5" />
                  {formatDate(appointment.date)}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-2 font-semibold border border-zinc-200 rounded-xl bg-zinc-100 text-zinc-600 text-[12px]">
                  <HiOutlineClock className="w-3.5 h-3.5" />
                  {appointment.slotStartTime && appointment.slotEndTime
                    ? `${appointment.slotStartTime} - ${appointment.slotEndTime}`
                    : appointment.timeSlot}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-2 font-semibold border border-[#bbebff] rounded-xl bg-[#EEF7FB] text-[#058FD2] text-[12px] capitalize">
                  <HiOutlineTag className="w-3.5 h-3.5" />
                  {appointment.appointmentType === "followup"
                    ? "Follow-up"
                    : "Initial"}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-2 font-semibold border border-zinc-200 rounded-xl bg-zinc-50 text-zinc-600 text-[12px] capitalize">
                  <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                  {appointment.status}
                </span>
              </div>

              <button
                onClick={requestClose}
                className="w-10 h-10 cursor-pointer rounded-xl border border-[#DDEAF2] text-zinc-500 hover:bg-[#F8FBFD] hover:text-red-500 transition-all duration-200 flex items-center justify-center"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex bg-gradient-to-b from-[#F8FBFD] via-[#F5FAFD] to-[#F0F8FC]">
            <aside className="w-72 shrink-0 border-r border-[#DDEAF2] bg-white/95 overflow-y-auto">
              <div className="px-4 py-4 border-b border-[#EEF4F8]">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                  Appointment journey
                </p>
              </div>
              <div>
                {groupHistory.map((appt) => {
                  const isActive = appt._id === appointment._id;
                  return (
                    <button
                      key={appt._id}
                      type="button"
                      onClick={() => setActiveAppointment(appt)}
                      className={`w-full border-b border-[#EEF4F8] px-4 py-4 text-left transition-colors ${isActive ? "bg-[#EEF7FB]" : "hover:bg-[#F8FBFD]"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold text-[#131C15]">
                            {appt.appointmentType === "followup"
                              ? "Follow-up"
                              : "Initial Consultation"}
                          </p>
                          <p className="mt-1 text-[12px] text-zinc-500">
                            {formatDate(appt.date)}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${appt.status === "attended" ? "bg-emerald-50 text-emerald-700" : appt.status === "cancelled" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}
                        >
                          {appt.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div
              ref={chatRef}
              className="min-w-0 flex-1 overflow-y-auto px-6 py-6"
            >
              <div className="max-w-[820px] mx-auto space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center"
                >
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur border border-[#DDEAF2] rounded-2xl px-5 py-3 text-center shadow-md shadow-[#058FD2]/5">
                    {/* <HiCalendarDays className="w-4 h-4 text-[#058FD2] shrink-0" /> */}
                    <div>
                      <p className="text-[12px] font-semibold text-zinc-700 tracking-wide">
                        Appointment Created
                      </p>
                      <p className="text-[12px] text-zinc-500 mt-0.5">
                        {appointment.service} | {formatDate(appointment.date)} |{" "}
                        {appointment.slotStartTime && appointment.slotEndTime
                          ? `${appointment.slotStartTime} - ${appointment.slotEndTime}`
                          : appointment.timeSlot}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <AnimatePresence initial={false}>
                  {conversation.map((item) => {
                    if (item.type === "system") {
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.95, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="flex justify-center"
                        >
                          <div className="flex items-center gap-2 bg-emerald-50/90 backdrop-blur border border-emerald-200 rounded-2xl px-5 py-3 text-center shadow-md shadow-emerald-500/10">
                            <HiCheckBadge className="w-5 h-5 text-emerald-600 shrink-0" />
                            <div>
                              <p className="text-[12px] font-semibold text-emerald-700 tracking-wide">
                                Appointment Marked Attended
                              </p>
                              <p className="text-[11px] text-emerald-500 mt-0.5">
                                Case Closed Successfully
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }

                    const isPatient = item.sender === "patient";

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`flex items-end gap-2.5 ${isPatient ? "justify-start" : "justify-end"}`}
                      >
                        {isPatient && (
                          <div className="w-8 h-8 rounded-full bg-[#EEF7FB] border border-[#DDEAF2] flex items-center justify-center shrink-0 shadow-sm">
                            <HiOutlineUserCircle className="w-5 h-5 text-[#058FD2]" />
                          </div>
                        )}

                        <div
                          className={`max-w-[65%] ${!isPatient ? "flex flex-col items-end" : ""}`}
                        >
                          {item.type === "text" && (
                            <div
                              className={`rounded-[10px] px-4 py-3 shadow-md transition-shadow duration-200 hover:shadow-lg ${isPatient ? "bg-white border border-[#DDEAF2] rounded-bl-md shadow-black/5" : "bg-gradient-to-br from-[#058FD2] to-[#0480BC] text-white rounded-br-md shadow-[#058FD2]/25"}`}
                            >
                              <div className="whitespace-pre-wrap leading-7">
                                {item.text}
                              </div>
                              <p
                                className={`text-[11px] mt-2 text-right ${isPatient ? "text-zinc-400" : "text-white/70"}`}
                              >
                                {new Date(item.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </p>
                            </div>
                          )}

                          {item.type === "images" && (
                            <div
                              className={`rounded-[24px] p-3 shadow-md transition-shadow duration-200 hover:shadow-lg ${isPatient ? "bg-white border border-[#DDEAF2]" : "bg-gradient-to-br from-[#058FD2] to-[#0480BC]"}`}
                            >
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                                {item.images?.map((image, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedImage(image)}
                                    className="group relative overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5"
                                  >
                                    <img
                                      src={image}
                                      alt=""
                                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                      <HiPhoto className="w-5 h-5 text-white opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {item.type === "attachments" && (
                            <div
                              className={`rounded-[16px] p-3 shadow-md transition-shadow duration-200 hover:shadow-lg bg-white border border-[#DDEAF2]  ${isPatient ? "rounded-bl-md" : "rounded-br-md"}`}
                            >
                              <p
                                className={`text-[12px] font-semibold mb-3 tracking-wide text-primary-accent`}
                              >
                                {item.title}
                              </p>
                              <div
                                className={`grid grid-cols-${item.attachments.length > 2 ? "2" : item.attachments.length} md:grid-cols-${item.attachments.length > 3 ? "3" : item.attachments.length} gap-2.5`}
                              >
                                {item.attachments?.map((attachment, index) => {
                                  const url = getAttachmentUrl(attachment);

                                  return isImageUrl(url) ? (
                                    <button
                                      key={`${url}-${index}`}
                                      type="button"
                                      onClick={() => setSelectedImage(url)}
                                      className="group relative overflow-hidden rounded-xl border border-white/30 bg-white shadow-sm"
                                    >
                                      <img
                                        src={url}
                                        alt=""
                                        className="w-full h-32 cursor-pointer object-cover transition-transform duration-300 group-hover:scale-110"
                                      />
                                    </button>
                                  ) : (
                                    <a
                                      key={`${url}-${index}`}
                                      href={url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={`group h-32 p-5 rounded-xl border flex flex-col items-center justify-center gap-2 text-[12px] font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${isPatient ? "border-[#DDEAF2] text-[#058FD2] bg-[#F8FBFD]" : "border-white/30 text-white bg-white/10"}`}
                                    >
                                      <HiDocumentText className="w-6 h-6" />
                                      <span className="flex items-center gap-1">
                                        Open Document
                                        <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />
                                      </span>
                                    </a>
                                  );
                                })}
                              </div>
                              <p
                                className={`text-[11px] mt-2 text-right ${isPatient ? "text-zinc-400" : "text-white/70"}`}
                              >
                                {new Date(item.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </p>
                            </div>
                          )}

                          {item.type === "patientNote" && (
                            <div className="bg-white border border-[#DDEAF2] rounded-[16px] overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg w-full max-w-[520px] rounded-bl-md">
                              <div className="flex items-center gap-2 bg-[#EEF7FB] border-b border-[#DDEAF2] px-4 py-3">
                                <HiClipboardDocumentList className="w-4 h-4 text-[#058FD2]" />
                                <h4 className="text-[13px] font-semibold text-[#058FD2] tracking-wide">
                                  {item.title || "Patient Note"}
                                </h4>
                              </div>
                              <div className="p-4">
                                <pre className="whitespace-pre-wrap font-sans text-[16px] text-zinc-700 leading-relaxed">
                                  {item.text}
                                </pre>
                                <p className="text-[11px] mt-3 text-zinc-400 text-right">
                                  {new Date(item.createdAt).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </p>
                              </div>
                            </div>
                          )}

                          {item.type === "prescription" && (
                            <div className="bg-white border border-[#DDEAF2] rounded-[16px] overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg w-full max-w-[520px]">
                              <div className="flex items-center gap-2 bg-[#EEF7FB] border-b border-[#DDEAF2] px-4 py-3">
                                <HiClipboardDocumentCheck className="w-4 h-4 text-[#058FD2]" />
                                <h4 className="text-[13px] font-semibold text-[#058FD2] tracking-wide">
                                  {item.title || "Prescription"}
                                </h4>
                              </div>
                              <div className="p-4">
                                <pre className="whitespace-pre-wrap font-sans text-[16px] text-zinc-700 leading-relaxed">
                                  {item.text}
                                </pre>
                              </div>
                            </div>
                          )}
                          {/* ADD THIS NEW BLOCK FOR THE PDF */}
                          {item.type === "prescriptionPdf" && (
                            <div className="bg-white border border-[#DDEAF2] rounded-[16px] overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg w-full min-w-[280px] max-w-[400px]">
                              <div className="flex items-center gap-2 bg-[#EEF7FB] border-b border-[#DDEAF2] px-4 py-3">
                                <HiDocumentText className="w-4 h-4 text-[#058FD2]" />
                                <h4 className="text-[13px] font-semibold text-[#058FD2] tracking-wide">
                                  {item.title || "Prescription PDF"}
                                </h4>
                              </div>
                              <div className="p-4 flex flex-col gap-3">
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#F8FBFD] border border-[#DDEAF2] text-[#058FD2] hover:bg-[#058FD2] hover:text-white rounded-xl text-[13px] font-semibold transition-all duration-200"
                                >
                                  <HiDocumentText className="w-4 h-4" />
                                  Download Prescription
                                  <HiArrowTopRightOnSquare className="w-3.5 h-3.5 ml-1" />
                                </a>
                                <p className="text-[11px] text-zinc-400 text-right">
                                  {new Date(item.createdAt).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                          {/* END OF NEW BLOCK */}
                        </div>

                        {!isPatient && (
                          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-sm">
                            <HiUserCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <AnimatePresence>
                  {showPrescription && (
                    <motion.div
                      ref={prescriptionFormRef}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 25 }}
                      transition={{ duration: 0.25 }}
                      className="my-6"
                    >
                      <div className="bg-white rounded-2xl border border-[#DDEAF2] p-5">
                        <h3 className="font-semibold text-lg mb-5">
                          Prescription Details
                        </h3>

                        <div className="grid grid-cols-2 gap-5">
                          {/* Primary Concern */}
                          <div className="col-span-2">
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">
                              Primary Concern
                            </label>

                            <textarea
                              rows={1}
                              className="w-full rounded-xl border border-[#DDEAF2] p-3 outline-none focus:border-[#058FD2]"
                              placeholder="e.g. Hair fall since 6 months with dandruff"
                              value={prescriptionData.primaryConcern}
                              onChange={(e) =>
                                setPrescriptionData((prev) => ({
                                  ...prev,
                                  primaryConcern: e.target.value,
                                }))
                              }
                            />
                          </div>

                          {/* Clinical Findings */}
                          <div className="col-span-2">
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">
                              Clinical Findings
                            </label>

                            <textarea
                              rows={1}
                              className="w-full rounded-xl border border-[#DDEAF2] p-3 outline-none focus:border-[#058FD2]"
                              placeholder="Clinical examination findings"
                              value={prescriptionData.clinicalFindings}
                              onChange={(e) =>
                                setPrescriptionData((prev) => ({
                                  ...prev,
                                  clinicalFindings: e.target.value,
                                }))
                              }
                            />
                          </div>

                          {/* Diagnosis */}
                          <div className="col-span-2">
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">
                              Diagnosis
                            </label>

                            <textarea
                              rows={1}
                              className="w-full rounded-xl border border-[#DDEAF2] p-3 outline-none focus:border-[#058FD2]"
                              placeholder="Diagnosis"
                              value={prescriptionData.diagnosis}
                              onChange={(e) =>
                                setPrescriptionData((prev) => ({
                                  ...prev,
                                  diagnosis: e.target.value,
                                }))
                              }
                            />
                          </div>

                          {/* Treatment Plan */}
                          <div className="col-span-2">
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">
                              Treatment Plan
                            </label>

                            <textarea
                              rows={1}
                              className="w-full rounded-xl border border-[#DDEAF2] p-3 outline-none focus:border-[#058FD2]"
                              placeholder="Treatment plan"
                              value={prescriptionData.treatmentPlan}
                              onChange={(e) =>
                                setPrescriptionData((prev) => ({
                                  ...prev,
                                  treatmentPlan: e.target.value,
                                }))
                              }
                            />
                          </div>

                          {/* Medications */}
                          <div className="col-span-2">
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">
                              Medicines
                            </label>

                            <textarea
                              rows={5}
                              className="w-full rounded-xl border border-[#DDEAF2] p-3 outline-none focus:border-[#058FD2] font-mono"
                              placeholder={`Medicine Name
1-0-1 after food x 5 days
Medicine Name
0-1-0 before dinner x 10 days`}
                              value={prescriptionData.medications}
                              onChange={(e) =>
                                setPrescriptionData((prev) => ({
                                  ...prev,
                                  medications: e.target.value,
                                }))
                              }
                            />
                          </div>

                          {/* Instructions */}
                          <div className="col-span-2">
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">
                              Patient Instructions
                            </label>

                            <textarea
                              rows={1}
                              className="w-full rounded-xl border border-[#DDEAF2] p-3 outline-none focus:border-[#058FD2]"
                              placeholder="Diet, precautions, skincare, lifestyle advice..."
                              value={prescriptionData.instructions}
                              onChange={(e) =>
                                setPrescriptionData((prev) => ({
                                  ...prev,
                                  instructions: e.target.value,
                                }))
                              }
                            />
                          </div>

                          {/* Follow Up */}
                          <div>
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">
                              Follow-up After (Days)
                            </label>

                            <input
                              type="number"
                              min={0}
                              className="w-full rounded-xl border border-[#DDEAF2] p-3 outline-none focus:border-[#058FD2]"
                              placeholder="15"
                              value={prescriptionData.followUpDays ?? ""}
                              onChange={(e) =>
                                setPrescriptionData((prev) => ({
                                  ...prev,
                                  followUpDays: Number(e.target.value),
                                }))
                              }
                            />
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">
                              Additional Notes
                            </label>

                            <textarea
                              rows={1}
                              className="w-full rounded-xl border border-[#DDEAF2] p-3 outline-none focus:border-[#058FD2]"
                              placeholder="Optional notes"
                              value={prescriptionData.notes}
                              onChange={(e) =>
                                setPrescriptionData((prev) => ({
                                  ...prev,
                                  notes: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {draftFiles.length > 0 && (
            <div className="px-5 pt-4 bg-white border-t border-[#DDEAF2]">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {draftFiles.map((item) => (
                  <div key={item.id} className="relative flex-shrink-0">
                    {item.preview ? (
                      <img
                        src={item.preview}
                        alt=""
                        className="w-24 h-24 object-cover rounded-2xl border border-[#DDEAF2]"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl border border-[#DDEAF2] bg-[#F8FBFD] flex items-center justify-center text-[11px] text-[#058FD2] font-medium">
                        PDF
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (item.preview) {
                          URL.revokeObjectURL(item.preview);
                        }

                        setDraftFiles((prev) =>
                          prev.filter((file) => file.id !== item.id),
                        );
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-[#DDEAF2] text-xs shadow-sm"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!appointmentClosed ? (
            <div className="bg-white border-t border-[#DDEAF2] px-6 py-5 flex-shrink-0">
              <div className="flex items-end gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const previews = files.map((file) => ({
                      id: createDraftFileId(),
                      file,
                      preview: file.type.startsWith("image/")
                        ? URL.createObjectURL(file)
                        : "",
                    }));

                    setDraftFiles((prev) => [...prev, ...previews]);
                    e.target.value = "";
                  }}
                />

                {/* Attachment */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="
                  w-11 h-11 rounded-xl
                  border
                  flex items-center justify-center
                  bg-[#EEF7FB]
                  text-[#058FD2]
                  border-[#BFE4F5]
                  transition-all duration-200
                  shadow-inner
                  active:scale-95
                  transition-all
                  duration-300
                  cursor-pointer"
                >
                  <GrAttachment className="text-[17px]" />
                </button>

                {/* Expand */}
                {/* <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="
        w-11 h-11 rounded-xl
        border border-[#DDEAF2]
        bg-white
        text-zinc-500
        flex items-center justify-center
        hover:bg-[#EEF7FB]
        hover:text-[#058FD2]
        hover:border-[#BFE4F5]
        transition-all duration-200
        shadow-inner
        active:scale-95
        transition-all
        duration-300
        cursor-pointer
      "
                >
                  {expanded ? (
                    <BsArrowsAngleContract className="text-[16px]" />
                  ) : (
                    <BiExpandAlt className="text-[18px]" />
                  )}
                </button> */}
                {appointment?.status === "pending" && (
                  // <motion.div
                  //   initial={{ opacity: 0, y: 20 }}
                  //   animate={{ opacity: 1, y: 0 }}
                  //   className="flex justify-center my-6"
                  // >
                  <button
                    type="button"
                    onClick={() => setShowPrescription((prev) => !prev)}
                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl
                  border
                  flex items-center justify-center
                  bg-[#EEF7FB]
                  text-[#058FD2]
                  border-[#BFE4F5]
                  transition-all duration-200
                  shadow-inner
                  active:scale-95
                  transition-all
                  duration-300
                  cursor-pointer
                    ${
                      showPrescription
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                        : ""
                    }`}
                  >
                    {showPrescription ? (
                      <>
                        <X className="w-5 h-5" />
                        <span className="font-medium">Cancel Prescription</span>
                      </>
                    ) : (
                      <>
                        <HiClipboardDocumentCheck className="w-5 h-5" />
                        <span className="font-medium">Create Prescription</span>
                        <HiPlus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                      </>
                    )}
                  </button>
                  // </motion.div>
                )}
                {/* Composer */}
                <div className="flex-1">
                  <div className="rounded-2xl border border-[#DDEAF2] bg-white shadow-inner overflow-hidden transition-all">
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write prescription, consultation notes, or reply..."
                      className={`
            w-full
            px-5
            py-2
            resize-none
            outline-none
            bg-transparent
            text-[14px]
            leading-7
            placeholder:text-zinc-400
            transition-all duration-300
          `}
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-[12px] font-medium">
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v4m0 4h.01M12 3l9 16H3L12 3z"
                        />
                      </svg>
                      {error}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  onClick={submitConsultation}
                  disabled={isSubmitting}
                  className="
                    h-11
                    px-6
                    rounded-xl
                    bg-[#058FD2]
                    hover:bg-[#047BB5]
                    disabled:bg-zinc-300
                    disabled:cursor-not-allowed
                    text-white
                    font-medium
                    shadow-inner
                    cursor-pointer
                    active:scale-95
                    transition-all duration-200
                    flex items-center gap-2
                  "
                >
                  <LuSendHorizontal className="text-[17px]" />
                  {isSubmitting ? "Saving..." : "Submit"}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-amber-50 border border-red-100 px-4 py-2">
                <svg
                  className="w-4 h-4 text-amber-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M12 3l9 16H3L12 3z"
                  />
                </svg>

                <p className="text-[12px] font-medium text-amber-600">
                  This appointment will close automatically after one
                  doctor/admin response.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white border-t border-[#DDEAF2] py-5 text-center">
              {appointment?.status === "cancelled" ? (
                <>
                  <p className="text-[13px] font-medium text-red-600">
                    Appointment Cancelled
                  </p>

                  <p className="text-[12px] text-zinc-500 mt-1">
                    This appointment has been cancelled and can no longer be
                    updated.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[13px] font-medium text-emerald-600">
                    Appointment Closed
                  </p>

                  <p className="text-[12px] text-zinc-500 mt-1">
                    Doctor response has been submitted.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {showCloseConfirm && (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-[#0D1F2D]/45 p-4 backdrop-blur-md"
          onClick={() => setShowCloseConfirm(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] rounded-2xl border border-[#DDEAF2] bg-white p-5 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <HiOutlineCheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-[#131C15]">
                  Close appointment?
                </h3>
                <p className="mt-2 text-[13px] leading-6 text-zinc-500">
                  Your prescription form is still open. Closing now will discard
                  the details you have entered.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCloseConfirm(false)}
                className="rounded-xl border border-[#DDEAF2] bg-white px-4 py-2 text-[13px] font-semibold text-zinc-600 transition-colors hover:bg-[#F8FBFD] hover:text-[#058FD2]"
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-red-500 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-red-600"
              >
                Close Anyway
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/85 z-[70] flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <a
            href={selectedImage}
            download={getDownloadFileName(selectedImage)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-6 left-6 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-[#131C15] shadow-lg transition-colors hover:bg-[#EEF7FB] hover:text-[#058FD2]"
          >
            <HiArrowDownTray className="w-4 h-4" />
            Download
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-black text-lg"
          >
            x
          </button>

          <div
            className="max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt=""
              className="max-w-full max-h-[calc(100vh-3rem)] object-contain rounded-3xl"
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
