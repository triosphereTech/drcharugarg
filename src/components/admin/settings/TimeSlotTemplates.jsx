"use client"

import React, { useState } from "react"
import { Clock, Plus, Pencil, Trash2, X } from "lucide-react"
import { formatTime, generateId } from "./data/Tempsettingsdata"
import { SettingsModal } from "./SettingsModal"

const COLOR_MAP = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  teal: "bg-teal-50 text-teal-700 border-teal-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
}

const COLOR_BAR_MAP = {
  blue: "bg-blue-400",
  teal: "bg-teal-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
}

const COLOR_OPTIONS = Object.keys(COLOR_MAP)

const emptyDraft = () => ({
  id: null,
  name: "",
  color: "blue",
  slots: [{ id: generateId("slot"), start: "09:00", end: "09:30" }],
})

export const TimeSlotTemplates = ({ templates, onChanged, onError }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState(emptyDraft())
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const openCreate = () => {
    setDraft(emptyDraft())
    setModalOpen(true)
  }

  const openEdit = (template) => {
    setDraft({ id: template._id, name: template.name, color: template.color, slots: template.slots.map((s, index) => ({ id: `${template._id}-${index}`, start: s.startTime, end: s.endTime })) })
    setModalOpen(true)
  }

  const updateSlot = (slotId, field, value) => {
    setDraft((prev) => ({
      ...prev,
      slots: prev.slots.map((s) => (s.id === slotId ? { ...s, [field]: value } : s)),
    }))
  }

  const addSlot = () => {
  setDraft((prev) => {
    const lastSlot = prev.slots[prev.slots.length - 1];

    const [hours, minutes] = lastSlot.end.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const format = (date) =>
      `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;

    return {
      ...prev,
      slots: [
        ...prev.slots,
        {
          id: generateId("slot"),
          start: format(startDate),
          end: format(endDate),
        },
      ],
    };
  });
};

  const removeSlot = (slotId) => {
    setDraft((prev) => ({ ...prev, slots: prev.slots.filter((s) => s.id !== slotId) }))
  }

  const saveDraft = async () => {
    if (!draft.name.trim() || draft.slots.length === 0) return
    try {
      const response = await fetch(draft.id ? `/api/admin/availability/templates/${draft.id}` : "/api/admin/availability/templates", { method: draft.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: draft.name, color: draft.color, slots: draft.slots.map((slot) => ({ startTime: slot.start, endTime: slot.end })) }) })
      const data = await response.json()
            console.log("UPDATE RESPONSE", data);

      if (!response.ok || !data.success) throw new Error(data.message || "Unable to save template.")
      await onChanged()
      setModalOpen(false)
    } catch (error) { onError(error.message || "Unable to save template.") }
  }

  const deleteTemplate = async (id) => {
    try {
      const response = await fetch(`/api/admin/availability/templates/${id}`, { method: "DELETE" })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to delete template.")
      await onChanged()
      setConfirmDeleteId(null)
    } catch (error) { onError(error.message || "Unable to delete template.") }
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Time Slot Templates</h2>
          <p className="text-sm text-gray-400 mt-1">
            Build reusable sets of appointment slots — assign them to any date from Booking Availability.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm cursor-pointer active:scale-95 transition-all duration-150 shrink-0"
        >
          <Plus size={16} />
          New Template
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-2xl py-16 text-center text-gray-400 text-sm bg-white">
          No templates yet. Create your first one to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {templates.map((tpl) => (
            <div
              key={tpl._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 ${COLOR_BAR_MAP[tpl.color] || "bg-blue-400"}`} />

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className={`flex items-center justify-center w-9 h-9 rounded-xl border ${COLOR_MAP[tpl.color] || COLOR_MAP.blue}`}>
                    <Clock size={16} />
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{tpl.name}</h3>
                    <p className="text-xs text-gray-400">{tpl.slots.length} slots</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(tpl)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-blue-600 cursor-pointer active:scale-95 transition-all duration-150"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(tpl._id)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 cursor-pointer active:scale-95 transition-all duration-150"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {tpl.slots.map((s, index) => (
                  <span
                    key={`${tpl._id}-${index}`}
                    className="text-xs font-medium bg-gray-100 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg"
                  >
                    {formatTime(s.startTime)} – {formatTime(s.endTime)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit modal */}
      {modalOpen && (
        <SettingsModal
          title={draft.id ? "Edit Template" : "New Time Slot Template"}
          subtitle="Define a name and add as many slots as you need"
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
                disabled={!draft.name.trim() || draft.slots.length === 0}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white cursor-pointer disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 transition-all duration-150"
              >
                {draft.id ? "Save Changes" : "Create Template"}
              </button>
            </>
          }
        >
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                Template Name
              </label>
              <input
                type="text"
                value={draft.name}
                onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Morning Slots"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                Colour Tag
              </label>
              <div className="flex gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setDraft((prev) => ({ ...prev, color: c }))}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer active:scale-90 transition-transform duration-150 ${COLOR_BAR_MAP[c]} ${
                      draft.color === c ? "border-gray-700 scale-110" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Slots
                </label>
                <button
                  type="button"
                  onClick={addSlot}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-gray-900 cursor-pointer active:scale-95 transition-all duration-150"
                >
                  <Plus size={14} /> Add Slot
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {draft.slots.map((slot) => (
                  <div key={slot.id} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                    <input
                      type="time"
                      value={slot.start}
                      onChange={(e) => updateSlot(slot.id, "start", e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <span className="text-gray-300 text-sm">to</span>
                    <input
                      type="time"
                      value={slot.end}
                      onChange={(e) => updateSlot(slot.id, "end", e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeSlot(slot.id)}
                      disabled={draft.slots.length === 1}
                      className="p-2 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed active:scale-90 disabled:active:scale-100 transition-all duration-150"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SettingsModal>
      )}

      {/* Delete confirmation */}
      {confirmDeleteId && (
        <SettingsModal
          title="Delete Template?"
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
                onClick={() => deleteTemplate(confirmDeleteId)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer active:scale-95 transition-all duration-150"
              >
                Delete
              </button>
            </>
          }
        >
          <p className="text-sm text-gray-500">
            Any dates currently using this template will lose their slot assignment.
          </p>
        </SettingsModal>
      )}
    </div>
  )
}
