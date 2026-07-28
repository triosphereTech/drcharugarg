"use client"

import React, { useState,useEffect } from "react"
import { Pencil, Mail, Phone, Cake, Droplet, MapPin, VenetianMask, Check, IdCard } from "lucide-react"
import { PatientModal } from "./Patientmodal"
import { formatDateLong } from "../data/Temppatientdata"

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

export const ProfileSection = ({ patient, setPatient }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState(patient)

  const openEdit = () => {
    setDraft(patient)
    setModalOpen(true)
  }

  useEffect(() => {
  setDraft(patient);
}, [patient]);

const save = async () => {
  if (
    !draft.name.trim() ||
    !draft.email.trim() ||
    !draft.mobileNumber.trim()
  ) {
    return;
  }

  try {
    const res = await fetch("/api/patient/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    });

    const data = await res.json();
    
    if (data.success) {
      setPatient(data.patient);
      setDraft(data.patient);
      setModalOpen(false);
    } else {
      console.log(data.message);
    }

  } catch (error) {
    console.log(error);
  }
};

  const field = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }))

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
        <p className="text-sm text-gray-400 mt-1">View and manage your personal information.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl overflow-hidden">
        {/* Banner + avatar */}
        <div className="relative h-24 mb-4 bg-gray-900">
          <button
            type="button"
            onClick={openEdit}
            className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 backdrop-blur text-white text-xs font-semibold px-3.5 py-2 rounded-xl cursor-pointer active:scale-95 transition-all duration-150"
          >
            <Pencil size={13} />
            Edit Profile
          </button>
        </div>

        <div className="relative px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-6">
            <span className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-900 text-white text-2xl font-bold ring-4 ring-white shrink-0">
              {initials(patient.name)}
            </span>
            <div className="pb-1">
              <p className="text-lg font-bold text-gray-900">{patient.name}</p>
            </div>
          </div>

          {/* Personal information */}
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Personal Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <InfoRow icon={Cake} label="Date of Birth" value={formatDateLong(patient.dob)} />
            <InfoRow icon={VenetianMask} label="Gender" value={patient.gender} />
            <InfoRow icon={Droplet} label="Blood Group" value={patient.bloodGroup} />
          </div>

          {/* Contact information */}
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Contact Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow icon={Mail} label="Email" value={patient.email} />
            <InfoRow icon={Phone} label="Mobile" value={patient.mobileNumber} />
            <InfoRow icon={MapPin} label="Address" value={patient.address} span />
          </div>
        </div>
      </div>

      {modalOpen && (
        <PatientModal
          title="Edit Personal Information"
          subtitle="Keep your details up to date"
          onClose={() => setModalOpen(false)}
          footer={
            <>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-95 transition-all duration-150"
              >
                <Check size={15} /> Save Changes
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <Field label="Full Name" value={draft.name} onChange={(v) => field("name", v)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email" value={draft.email} onChange={(v) => field("email", v)} type="email" />
              <Field label="Mobile" value={draft.mobileNumber} onChange={(v) => field("mobileNumber", v)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Date of Birth" value={draft.dob} onChange={(v) => field("dob", v)} type="date" />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                  Gender
                </label>
                <select
                  value={draft.gender || ""}
                  onChange={(e) => field("gender", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <Field label="Blood Group" value={draft.bloodGroup} onChange={(v) => field("bloodGroup", v)} />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                Address
              </label>
              <textarea
                value={draft.address}
                onChange={(e) => field("address", e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>
          </div>
        </PatientModal>
      )}
    </div>
  )
}

const InfoRow = ({ icon: Icon, label, value, span }) => (
  <div className={`flex items-start gap-3 bg-gray-50 rounded-xl p-4 ${span ? "sm:col-span-2" : ""}`}>
    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-gray-100 text-gray-500 shrink-0">
      <Icon size={15} />
    </span>
    <div className="min-w-0">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">{value || "—"}</p>
    </div>
  </div>
)

const Field = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
    />
  </div>
)