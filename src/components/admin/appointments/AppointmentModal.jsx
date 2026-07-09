"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "@/components/admin/ui/Avatar";
import { formatDate } from "@/lib/data";
import { GrAttachment } from "react-icons/gr";
import { LuSendHorizontal } from "react-icons/lu";
import { BiExpandAlt } from "react-icons/bi";
import { BsArrowsAngleContract } from "react-icons/bs";

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

export function AppointmentModal({ appointment, onClose, onStatusChange }) {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [draftFiles, setDraftFiles] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  const appointmentClosed = appointment?.status === "attended";

  const conversation = useMemo(() => {
    const items = appointment?.patient?.conversation || [];
    const attachments = appointment?.attachments || [];
    const patientAttachments = attachments.filter(
      (attachment) => getAttachmentOwner(attachment) === "patient"
    );
    const doctorAttachments = attachments.filter(
      (attachment) => getAttachmentOwner(attachment) === "doctor"
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
        title: "Prescription",
        text: appointment.prescription,
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
        createdAt: doctorAttachments[0]?.uploadedAt || appointment.updatedAt || appointment.createdAt,
      });
    }

    return messages;
  }, [appointment]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

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
  }, [appointment?._id]);

  if (!appointment) return null;

  async function submitConsultation() {
    setError("");

    if (!message.trim() && draftFiles.length === 0) {
      setError("Add prescription notes or an attachment before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("status", "attended");
      formData.append("prescription", message.trim());

      draftFiles.forEach((item) => {
        formData.append("attachments", item.file);
      });

      const response = await fetch(
        `/api/admin/appointments/${appointment._id}/status`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update appointment.");
      }

      onStatusChange?.(appointment._id, "attended", message.trim(), data.data);
      draftFiles.forEach((item) => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
      setMessage("");
      setDraftFiles([]);
    } catch (err) {
      setError(err.message);
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
            onClose();
          }
        }}
      >
        <div className="bg-white w-full max-w-[1150px] h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-white border-b border-[#DDEAF2] px-6 py-5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <Avatar name={patient.name || "Patient"} size="md" />

              <div>
                <h2 className="text-[18px] font-semibold text-[#131C15]">
                  {patient.name || "Patient"}
                </h2>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-[13px] text-zinc-500">
                    {patient.email || "No email"}
                  </span>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                  <span className="text-[13px] text-zinc-500">
                    {patient.mobileNumber || "No mobile"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#EEF7FB] text-[#058FD2] text-[11px] font-medium">
                  {appointment.service}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-medium">
                  {formatDate(appointment.date)}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-medium">
                  {appointment.timeSlot}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-medium capitalize">
                  {appointment.status}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 cursor-pointer rounded-xl border border-[#DDEAF2] text-zinc-500 hover:bg-[#F8FBFD] transition-colors"
              >
                x
              </button>
            </div>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto bg-[#F8FBFD] px-6 py-6">
            <div className="max-w-[900px] mx-auto space-y-5">
              <div className="flex justify-center">
                <div className="bg-white border border-[#DDEAF2] rounded-2xl px-5 py-3 text-center shadow-sm">
                  <p className="text-[12px] font-semibold text-zinc-700">
                    Appointment Created
                  </p>
                  <p className="text-[12px] text-zinc-500 mt-1">
                    {appointment.service} | {formatDate(appointment.date)} | {appointment.timeSlot}
                  </p>
                </div>
              </div>

              {conversation.map((item) => {
                if (item.type === "system") {
                  return (
                    <div key={item.id} className="flex justify-center">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 text-center shadow-sm">
                        <p className="text-[12px] font-semibold text-emerald-700">
                          Appointment Marked Attended
                        </p>
                        <p className="text-[11px] text-emerald-500 mt-1">
                          Case Closed Successfully
                        </p>
                      </div>
                    </div>
                  );
                }

                const isPatient = item.sender === "patient";

                return (
                  <div key={item.id} className={`flex ${isPatient ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[65%] ${!isPatient ? "flex flex-col items-end" : ""}`}>
                      <div className={`text-[11px] font-medium mb-2 ${isPatient ? "text-[#058FD2]" : "text-emerald-600"}`}>
                        {isPatient ? "Patient" : "Doctor"}
                      </div>

                      {item.type === "text" && (
                        <div className={`rounded-[24px] px-4 py-3 shadow-sm ${isPatient ? "bg-white border border-[#DDEAF2] rounded-bl-md" : "bg-[#058FD2] text-white rounded-br-md"}`}>
                          <div className="whitespace-pre-wrap leading-7">{item.text}</div>
                          <p className={`text-[11px] mt-2 ${isPatient ? "text-zinc-400" : "text-white/70"}`}>
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      )}

                      {item.type === "images" && (
                        <div className={`rounded-[24px] p-3 shadow-sm ${isPatient ? "bg-white border border-[#DDEAF2]" : "bg-[#058FD2]"}`}>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {item.images?.map((image, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedImage(image)}
                                className="overflow-hidden rounded-xl"
                              >
                                <img src={image} alt="" className="w-full h-32 object-cover hover:scale-105 transition-transform" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.type === "attachments" && (
                        <div className={`rounded-[24px] p-3 shadow-sm ${isPatient ? "bg-white border border-[#DDEAF2] rounded-bl-md" : "bg-[#058FD2] rounded-br-md"}`}>
                          <p className={`text-[12px] font-semibold mb-3 ${isPatient ? "text-[#131C15]" : "text-white"}`}>
                            {item.title}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {item.attachments?.map((attachment, index) => {
                              const url = getAttachmentUrl(attachment);

                              return isImageUrl(url) ? (
                                <button
                                  key={`${url}-${index}`}
                                  type="button"
                                  onClick={() => setSelectedImage(url)}
                                  className="overflow-hidden rounded-xl border border-white/30 bg-white"
                                >
                                  <img src={url} alt="" className="w-full h-32 object-cover hover:scale-105 transition-transform" />
                                </button>
                              ) : (
                                <a
                                  key={`${url}-${index}`}
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={`h-32 rounded-xl border flex items-center justify-center text-[12px] font-medium ${isPatient ? "border-[#DDEAF2] text-[#058FD2] bg-[#F8FBFD]" : "border-white/30 text-white bg-white/10"}`}
                                >
                                  View PDF
                                </a>
                              );
                            })}
                          </div>
                          <p className={`text-[11px] mt-2 ${isPatient ? "text-zinc-400" : "text-white/70"}`}>
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      )}

                      {item.type === "patientNote" && (
                        <div className="bg-white border border-[#DDEAF2] rounded-3xl overflow-hidden shadow-sm w-full max-w-[520px] rounded-bl-md">
                          <div className="bg-[#EEF7FB] border-b border-[#DDEAF2] px-4 py-3">
                            <h4 className="text-[13px] font-semibold text-[#058FD2]">
                              {item.title || "Patient Note"}
                            </h4>
                          </div>
                          <div className="p-4">
                            <pre className="whitespace-pre-wrap font-sans text-[13px] text-zinc-700 leading-relaxed">
                              {item.text}
                            </pre>
                            <p className="text-[11px] mt-3 text-zinc-400">
                              {new Date(item.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      )}

                      {item.type === "prescription" && (
                        <div className="bg-white border border-[#DDEAF2] rounded-3xl overflow-hidden shadow-sm w-full max-w-[520px]">
                          <div className="bg-[#EEF7FB] border-b border-[#DDEAF2] px-4 py-3">
                            <h4 className="text-[13px] font-semibold text-[#058FD2]">
                              {item.title || "Prescription"}
                            </h4>
                          </div>
                          <div className="p-4">
                            <pre className="whitespace-pre-wrap font-sans text-[13px] text-zinc-700 leading-relaxed">
                              {item.text}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {draftFiles.length > 0 && (
            <div className="px-5 pt-4 bg-white border-t border-[#DDEAF2]">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {draftFiles.map((item) => (
                  <div key={item.id} className="relative flex-shrink-0">
                    {item.preview ? (
                      <img src={item.preview} alt="" className="w-24 h-24 object-cover rounded-2xl border border-[#DDEAF2]" />
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

                        setDraftFiles((prev) => prev.filter((file) => file.id !== item.id));
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
            <div className="bg-white border-t border-[#DDEAF2] p-4 flex-shrink-0">
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
                      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
                    }));

                    setDraftFiles((prev) => [...prev, ...previews]);
                    e.target.value = "";
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-11 h-11 rounded-xl border border-[#DDEAF2] shadow-inner cursor-pointer flex items-center justify-center hover:bg-[#F8FBFD] transition-colors"
                >
                  <GrAttachment />
                </button>

                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="w-11 h-11 cursor-pointer text-center shadow-inner text-md rounded-xl border border-[#DDEAF2] flex items-center justify-center hover:bg-[#F8FBFD] transition-colors"
                >
                  {expanded ? <BsArrowsAngleContract /> : <BiExpandAlt />}
                </button>

                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write prescription..."
                    className={`w-full px-4 py-3 rounded-2xl border border-[#DDEAF2] outline-none resize-none transition-all duration-300 ${expanded ? "h-[250px]" : "h-[48px]"}`}
                  />
                  {error && (
                    <p className="mt-2 text-[12px] font-medium text-red-500">{error}</p>
                  )}
                </div>

                <button
                  onClick={submitConsultation}
                  disabled={isSubmitting}
                  className="h-11 px-5 rounded-xl bg-[#058FD2] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium hover:bg-[#047bb5] transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? "Saving..." : "Submit"}
                  <LuSendHorizontal />
                </button>
              </div>
              <p className="mt-3 text-center text-[12px] text-red-500">
                This appointment closes after one doctor/admin response.
              </p>
            </div>
          ) : (
            <div className="bg-white border-t border-[#DDEAF2] py-5 text-center">
              <p className="text-[13px] font-medium text-emerald-600">
                Appointment Closed
              </p>
              <p className="text-[12px] text-zinc-500 mt-1">
                Doctor response has been submitted.
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/85 z-[70] flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-black text-lg"
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
    </>
  );
}
