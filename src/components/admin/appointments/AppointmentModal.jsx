"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/admin/ui/Avatar";
import { formatDate } from "@/lib/data";
import { GrAttachment } from "react-icons/gr";
import { LuSendHorizontal } from "react-icons/lu";
import { HiOutlinePhotograph } from "react-icons/hi";
import { BiExpandAlt } from "react-icons/bi";
import { BsArrowsAngleContract } from "react-icons/bs";


export function AppointmentModal({ appointment, onClose, onStatusChange }) {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [conversation, setConversation] = useState([]);

  const [draftImages, setDraftImages] = useState([]);

  const [appointmentClosed, setAppointmentClosed] = useState(
    appointment?.status === "attended",
  );

  const chatRef = useRef(null);
  const fileInputRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

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
    setConversation(appointment?.patient?.conversation || []);
  }, [appointment]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, draftImages]);

  if (!appointment) return null;

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
          {/* =======================================================
              HEADER
          ======================================================= */}

          <div className="bg-white border-b border-[#DDEAF2] px-6 py-5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <Avatar name={appointment.patient.name} size="md" />

              <div>
                <h2 className="text-[18px] font-semibold text-[#131C15]">
                  {appointment.patient.name}
                </h2>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-[13px] text-zinc-500">
                    {appointment.patient.email}
                  </span>

                  <span className="w-1 h-1 bg-zinc-300 rounded-full" />

                  <span className="text-[13px] text-zinc-500">
                    {appointment.patient.mobileNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Actions */}

            <div className="flex items-center gap-2">
              <div className="flex flex-wrap  items-center gap-2 ">
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
                  {appointmentClosed ? "attended" : appointment.status}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 cursor-pointer rounded-xl border border-[#DDEAF2] text-zinc-500 hover:bg-[#F8FBFD] transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* =======================================================
              CHAT BODY
          ======================================================= */}

          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto bg-[#F8FBFD] px-6 py-6"
          >
            <div className="max-w-[900px] mx-auto space-y-5">
              {/* Appointment Card */}

              <div className="flex justify-center">
                <div className="bg-white border border-[#DDEAF2] rounded-2xl px-5 py-3 text-center shadow-sm">
                  <p className="text-[12px] font-semibold text-zinc-700">
                    Appointment Created
                  </p>

                  <p className="text-[12px] text-zinc-500 mt-1">
                    {appointment.service}
                    {" • "}
                    {formatDate(appointment.date)}
                    {" • "}
                    {appointment.timeSlot}
                  </p>
                </div>
              </div>

              {/* Messages */}

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
                  <div
                    key={item.id}
                    className={`flex ${
                      isPatient ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[65%] ${
                        !isPatient ? "flex flex-col items-end" : ""
                      }`}
                    >
                      <div
                        className={`text-[11px] font-medium mb-2 ${
                          isPatient ? "text-[#058FD2]" : "text-emerald-600"
                        }`}
                      >
                        {isPatient ? "Patient" : "Doctor"}
                      </div>

                      {/* TEXT MESSAGE */}

                      {item.type === "text" && (
                        <div
                          className={`rounded-[24px] px-4 py-3 shadow-sm ${
                            isPatient
                              ? "bg-white border border-[#DDEAF2] rounded-bl-md"
                              : "bg-[#058FD2] text-white rounded-br-md"
                          }`}
                        >
                          <div className="whitespace-pre-wrap leading-7">
                            {item.text}
                          </div>

                          <p
                            className={`text-[11px] mt-2 ${
                              isPatient ? "text-zinc-400" : "text-white/70"
                            }`}
                          >
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      )}

                      {/* IMAGE MESSAGE */}

                      {item.type === "images" && (
                        <div
                          className={`rounded-[24px] p-3 shadow-sm ${
                            isPatient
                              ? "bg-white border border-[#DDEAF2]"
                              : "bg-[#058FD2]"
                          }`}
                        >
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {item.images?.map((image, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedImage(image)}
                                className="overflow-hidden rounded-xl"
                              >
                                <img
                                  src={image}
                                  alt=""
                                  className="w-full h-32 object-cover hover:scale-105 transition-transform"
                                />
                              </button>
                            ))}
                          </div>

                          <p
                            className={`text-[11px] mt-2 ${
                              isPatient ? "text-zinc-400" : "text-white/70"
                            }`}
                          >
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      )}
                      {/* PRESCRIPTION */}

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

                            <div className="mt-3 text-[11px] text-zinc-400">
                              {new Date(item.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =======================================================
              CHATGPT STYLE IMAGE PREVIEW
          ======================================================= */}

          {draftImages.length > 0 && (
            <div className="px-5 pt-4 bg-white border-t border-[#DDEAF2]">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {draftImages.map((img) => (
                  <div key={img.id} className="relative flex-shrink-0">
                    <img
                      src={img.preview}
                      alt=""
                      className="w-24 h-24 object-cover rounded-2xl border border-[#DDEAF2]"
                    />

                    <button
                      onClick={() =>
                        setDraftImages((prev) =>
                          prev.filter((item) => item.id !== img.id),
                        )
                      }
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-[#DDEAF2] text-xs shadow-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =======================================================
              COMPOSER
          ======================================================= */}

          {!appointmentClosed ? (
            <div className="bg-white border-t border-[#DDEAF2] p-4 flex-shrink-0">
              <div className="flex items-end gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);

                    const previews = files.map((file) => ({
                      id: crypto.randomUUID(),
                      file,
                      preview: URL.createObjectURL(file),
                    }));

                    setDraftImages((prev) => [...prev, ...previews]);
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

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write consultation notes..."
                  className={`w-full px-4 py-3 rounded-2xl border border-[#DDEAF2] outline-none resize-none transition-all duration-300 ${
                    expanded ? "h-[250px]" : "h-[48px]"
                  }`}
                />

                <button
                  onClick={() => {
                    if (!message.trim() && draftImages.length === 0) return;

                    const now = new Date().toISOString();

                    const newMessages = [];

                    if (message.trim()) {
                      newMessages.push({
                        id: crypto.randomUUID(),
                        sender: "doctor",
                        type: "text",
                        text: message,
                        createdAt: now,
                      });
                    }

                    if (draftImages.length > 0) {
                      newMessages.push({
                        id: crypto.randomUUID(),
                        sender: "doctor",
                        type: "images",
                        images: draftImages.map((img) => img.preview),
                        createdAt: now,
                      });
                    }

                    newMessages.push({
                      id: crypto.randomUUID(),
                      type: "system",
                      event: "appointment_closed",
                      createdAt: now,
                    });

                    setConversation((prev) => [...prev, ...newMessages]);

                    setAppointmentClosed(true);

                    onStatusChange?.(appointment._id, "attended");

                    setMessage("");
                    setDraftImages([]);
                  }}
                  className="h-11 px-5 rounded-xl bg-[#058FD2] text-white font-medium hover:bg-[#047bb5] transition-colors flex items-center gap-2"
                >
                  Submit
                  <LuSendHorizontal />
                </button>
              </div>
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

      {/* =======================================================
          IMAGE LIGHTBOX
      ======================================================= */}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/85 z-[70] flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-black text-lg"
          >
            ✕
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
