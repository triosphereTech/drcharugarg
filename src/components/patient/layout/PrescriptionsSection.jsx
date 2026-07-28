"use client"

import React, { useState } from "react"
import { FileText, Printer, Pill, CalendarDays, Stethoscope, ChevronRight } from "lucide-react"
import { formatDateLong, formatDateShort } from "../data/Temppatientdata"

export const PrescriptionDetailModal = ({ prescription, patient, onClose }) => {
  const handlePrint = () => window.print()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:p-0 print:static">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] print:hidden" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 max-h-[90vh] flex flex-col print:max-h-none print:shadow-none print:border-0 print:rounded-none">
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 print:hidden">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Prescription</h3>
            <p className="text-sm text-gray-400 mt-0.5">Issued on {formatDateLong(prescription.date)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-gray-400 hover:text-gray-600 cursor-pointer active:scale-95 transition-all duration-150"
          >
            Close
          </button>
        </div>

        {/* Printable area */}
        <div id="printable-prescription" className="px-6 py-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <p className="text-lg font-bold text-gray-900">Dr. Charu Garg</p>
              <p className="text-xs text-gray-400">Dermatologist · Skin, Hair &amp; Nail Specialist</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Date</p>
              <p className="text-sm font-semibold text-gray-800">{formatDateShort(prescription.date)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Patient</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">{patient.name}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Diagnosis</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">{prescription.diagnosis}</p>
            </div>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">Medicines (Rx)</p>
          <div className="space-y-2 mb-6">
            {prescription.medicines.map((m, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 print:bg-white print:border print:border-gray-200">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 shrink-0 print:border print:border-gray-200">
                  <Pill size={14} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{m.dosage} · {m.duration}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">Doctor's Advice</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">{prescription.advice}</p>

          {prescription.followUpRecommended && (
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl px-4 py-3 print:bg-white print:border print:border-gray-200">
              <CalendarDays size={14} className="text-gray-400 shrink-0" />
              Follow-up recommended within {prescription.followUpAfterDays} days.
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-95 transition-all duration-150"
          >
            <Printer size={15} /> Download / Print
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-prescription, #printable-prescription * { visibility: visible; }
          #printable-prescription { position: absolute; inset: 0; margin: 0; padding: 24px; }
        }
      `}</style>
    </div>
  )
}

export const PrescriptionsSection = ({ prescriptions, patient }) => {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Prescriptions</h2>
        <p className="text-sm text-gray-400 mt-1">View or download prescriptions issued by your doctor.</p>
      </div>

      {prescriptions.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-2xl py-16 text-center text-gray-400 text-sm bg-white">
          No prescriptions yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {prescriptions.map((rx) => (
            <button
              key={rx.id}
              type="button"
              onClick={() => setSelected(rx)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left cursor-pointer active:scale-95 transition-all duration-150 hover:border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-700">
                  <FileText size={17} />
                </span>
                <ChevronRight size={16} className="text-gray-300 mt-2" />
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">{rx.diagnosis}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <CalendarDays size={12} /> {formatDateShort(rx.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Stethoscope size={12} /> {rx.doctor}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <PrescriptionDetailModal prescription={selected} patient={patient} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}