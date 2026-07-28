"use client"

import React, { useMemo, useState } from "react"
import {
  IndianRupee,
  Wallet,
  RefreshCcw,
  Pencil,
  Check,
  X,
  Info,
  Plus,
  Trash2,
  Layers,
  TrendingUp,
} from "lucide-react"
import { generateId, SERVICE_CATEGORIES } from "./data/Tempsettingsdata"
import { SettingsModal } from "./SettingsModal"

const currency = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`

// ── Initial Consultation Fee ──────────────────────────────────────
export const InitialFeeSection = ({ generalFees, setGeneralFees }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(generalFees.initialConsultationFee)

  const save = () => {
    const num = Number(value)
    if (Number.isNaN(num) || num < 0) return
    setGeneralFees((prev) => ({ ...prev, initialConsultationFee: num }))
    setEditing(false)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Initial Consultation Fee</h2>
        <p className="text-sm text-gray-400 mt-1">
          The default fee charged when a new patient books their first-ever consultation.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900" />
        <div className="flex items-center gap-3 mb-5">
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 text-gray-700">
            <Wallet size={20} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Default Fee</p>
            <p className="text-sm text-gray-500">Applies to all new patients</p>
          </div>
        </div>

        {editing ? (
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <IndianRupee size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                min={0}
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>
            <button
              type="button"
              onClick={save}
              className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-90 transition-all duration-150"
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                setValue(generalFees.initialConsultationFee)
                setEditing(false)
              }}
              className="p-2.5 rounded-xl text-gray-400 hover:bg-gray-100 cursor-pointer active:scale-90 transition-all duration-150"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900">{currency(generalFees.initialConsultationFee)}</p>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
            >
              <Pencil size={14} /> Edit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Consultation services — full CRUD ──────────────────────────────
const emptyServiceDraft = () => ({
  id: null,
  name: "",
  category: SERVICE_CATEGORIES[0],
  initialFee: "",
  followUpFee: "",
  description: "",
})

export const ServicesSection = ({ services, setServices }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState(emptyServiceDraft())
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const stats = useMemo(() => {
    const count = services.length
    const avgInitial = count ? services.reduce((sum, s) => sum + Number(s.initialFee || 0), 0) / count : 0
    const avgFollowUp = count ? services.reduce((sum, s) => sum + Number(s.followUpFee || 0), 0) / count : 0
    return { count, avgInitial, avgFollowUp }
  }, [services])

  const openCreate = () => {
    setDraft(emptyServiceDraft())
    setModalOpen(true)
  }

  const openEdit = (service) => {
    setDraft({ ...service })
    setModalOpen(true)
  }

  const isValid =
    draft.name.trim().length > 0 &&
    draft.initialFee !== "" &&
    draft.followUpFee !== "" &&
    !Number.isNaN(Number(draft.initialFee)) &&
    !Number.isNaN(Number(draft.followUpFee))

  const saveDraft = () => {
    if (!isValid) return
    const payload = {
      ...draft,
      initialFee: Number(draft.initialFee),
      followUpFee: Number(draft.followUpFee),
    }

    if (draft.id) {
      setServices((prev) => prev.map((s) => (s.id === draft.id ? payload : s)))
    } else {
      setServices((prev) => [...prev, { ...payload, id: generateId("svc") }])
    }
    setModalOpen(false)
  }

  const deleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
    setConfirmDeleteId(null)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Consultation Services &amp; Fees</h2>
          <p className="text-sm text-gray-400 mt-1">
            Add, edit or remove services — each with its own initial &amp; follow-up consultation fee.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm cursor-pointer active:scale-95 transition-all duration-150 shrink-0"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {/* Quick stats */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900" />
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Total Services</p>
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600">
              <Layers size={15} />
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.count}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900" />
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Avg. Initial Fee</p>
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600">
              <Wallet size={15} />
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{currency(Math.round(stats.avgInitial))}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900" />
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Avg. Follow-up Fee</p>
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600">
              <TrendingUp size={15} />
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{currency(Math.round(stats.avgFollowUp))}</p>
        </div>
      </div> */}

      {services.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-2xl py-16 text-center text-gray-400 text-sm bg-white">
          No services yet. Add your first consultation service to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-300 p-5 flex flex-col"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{service.name}</h3>
                  <span className="inline-block mt-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                    {service.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEdit(service)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-blue-600 cursor-pointer active:scale-95 transition-all duration-150"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(service.id)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 cursor-pointer active:scale-95 transition-all duration-150"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {service.description && (
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{service.description}</p>
              )}

              <div className="mt-auto grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div className="bg-gray-50 rounded-xl px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">
                    Initial Fee
                  </p>
                  <p className="text-sm font-bold text-gray-900">{currency(service.initialFee)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">
                    Follow-up Fee
                  </p>
                  <p className="text-sm font-bold text-gray-900">{currency(service.followUpFee)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      {modalOpen && (
        <SettingsModal
          title={draft.id ? "Edit Service" : "Add Consultation Service"}
          subtitle="Set the name, category, fees and a short description"
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
                onClick={saveDraft}
                disabled={!isValid}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white cursor-pointer disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 transition-all duration-150"
              >
                {draft.id ? "Save Changes" : "Add Service"}
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                Service Name
              </label>
              <input
                type="text"
                value={draft.name}
                onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Laser Hair Removal"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                Category
              </label>
              <select
                value={draft.category}
                onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              >
                {SERVICE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                  Initial Fee
                </label>
                <div className="relative">
                  <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min={0}
                    value={draft.initialFee}
                    onChange={(e) => setDraft((prev) => ({ ...prev, initialFee: e.target.value }))}
                    placeholder="0"
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                  Follow-up Fee
                </label>
                <div className="relative">
                  <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min={0}
                    value={draft.followUpFee}
                    onChange={(e) => setDraft((prev) => ({ ...prev, followUpFee: e.target.value }))}
                    placeholder="0"
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                Description <span className="normal-case text-gray-300">(optional)</span>
              </label>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Briefly describe what this consultation covers..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>
          </div>
        </SettingsModal>
      )}

      {/* Delete confirmation */}
      {confirmDeleteId && (
        <SettingsModal
          title="Delete Service?"
          subtitle="This action cannot be undone."
          onClose={() => setConfirmDeleteId(null)}
          maxWidth="max-w-sm"
          footer={
            <>
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteService(confirmDeleteId)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer active:scale-95 transition-all duration-150"
              >
                Delete
              </button>
            </>
          }
        >
          <p className="text-sm text-gray-500">
            Patients will no longer be able to book this consultation service.
          </p>
        </SettingsModal>
      )}
    </div>
  )
}

// ── Re-appointment charge ─────────────────────────────────────────
export const ReappointmentFeeSection = ({ generalFees, setGeneralFees }) => {
  const [editing, setEditing] = useState(false)
  const [fee, setFee] = useState(generalFees.reappointmentFee)
  const [days, setDays] = useState(generalFees.reappointmentValidityDays)

  const save = () => {
    const feeNum = Number(fee)
    const daysNum = Number(days)
    if (Number.isNaN(feeNum) || Number.isNaN(daysNum) || feeNum < 0 || daysNum < 0) return
    setGeneralFees((prev) => ({ ...prev, reappointmentFee: feeNum, reappointmentValidityDays: daysNum }))
    setEditing(false)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Re-appointment Charge</h2>
        <p className="text-sm text-gray-400 mt-1">
          Fee applied when an existing patient books a follow-up within the validity window.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900" />
        <div className="flex items-center gap-3 mb-5">
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 text-gray-700">
            <RefreshCcw size={20} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Re-appointment</p>
            <p className="text-sm text-gray-500">For returning patients</p>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                Fee Amount
              </label>
              <div className="relative">
                <IndianRupee size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  min={0}
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                Validity (days after previous visit)
              </label>
              <input
                type="number"
                min={0}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={save}
                className="flex-1 flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all duration-150"
              >
                <Check size={15} /> Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setFee(generalFees.reappointmentFee)
                  setDays(generalFees.reappointmentValidityDays)
                  setEditing(false)
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-3xl font-bold text-gray-900">{currency(generalFees.reappointmentFee)}</p>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
              >
                <Pencil size={14} /> Edit
              </button>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl px-3.5 py-2.5">
              <Info size={14} className="text-gray-400 mt-0.5 shrink-0" />
              Valid for {generalFees.reappointmentValidityDays} days from the patient's last visit. After that,
              the standard consultation fee applies.
            </div>
          </>
        )}
      </div>
    </div>
  )
}