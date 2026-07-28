"use client"

import React, { useState } from "react"
import {
  Check,
  ChevronLeft,
  CalendarDays,
  Clock,
  CreditCard,
  ShieldCheck,
  PartyPopper,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react"
import { followUpServices, demoAvailableSlots, formatDateLong, currency, generatePatientId } from "../data/Temppatientdata"
import { PatientModal } from "./Patientmodal"

const STEPS = ["Service", "Date & Time", "Payment", "Confirmation"]

export const BookFollowUp = ({ setAppointments, onNavigate }) => {
  const [step, setStep] = useState(0)
  const [serviceId, setServiceId] = useState(null)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [paying, setPaying] = useState(false)
  const [confirmedAppointment, setConfirmedAppointment] = useState(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const service = followUpServices.find((s) => s.id === serviceId)
  const dates = Object.keys(demoAvailableSlots)

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const canGoNextFromService = !!serviceId
  const canGoNextFromDate = !!date && !!time

  const handlePay = () => {
    setPaying(true)
    setTimeout(() => {
      const newAppointment = {
        id: generatePatientId("apt"),
        date,
        time,
        service: service.name,
        type: "Follow-up Consultation",
        doctor: "Dr. Charu Garg",
        status: "upcoming",
        fee: service.followUpFee,
      }
      setAppointments((prev) => [...prev, newAppointment])
      setConfirmedAppointment(newAppointment)
      setPaying(false)
      goNext()
    }, 1400)
  }

  const restart = () => {
    setStep(0)
    setServiceId(null)
    setDate(null)
    setTime(null)
    setConfirmedAppointment(null)
  }

  const confirmCancelBooking = () => {
    setShowCancelConfirm(false)
    restart()
    onNavigate("overview")
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Book Follow-up Consultation</h2>
        <p className="text-sm text-gray-400 mt-1">Schedule a follow-up at the configured consultation fee.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8 max-w-xl">
        {STEPS.map((label, idx) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-150 ${
                  idx < step
                    ? "bg-gray-900 text-white"
                    : idx === step
                    ? "bg-gray-900 text-white ring-4 ring-gray-100"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {idx < step ? <Check size={14} /> : idx + 1}
              </span>
              <span className={`text-[11px] font-semibold hidden sm:block ${idx <= step ? "text-gray-700" : "text-gray-300"}`}>
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 ${idx < step ? "bg-gray-900" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 0: Service */}
      {step === 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {followUpServices.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setServiceId(s.id)}
                className={`text-left rounded-2xl border p-5 cursor-pointer active:scale-95 transition-all duration-150 ${
                  serviceId === s.id
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-100 shadow-sm hover:border-gray-200 text-gray-900"
                }`}
              >
                <p className="font-bold text-sm mb-1">{s.name}</p>
                <p className={`text-xs ${serviceId === s.id ? "text-gray-300" : "text-gray-400"}`}>
                  Follow-up consultation
                </p>
                <p className={`text-lg font-bold mt-3 ${serviceId === s.id ? "text-white" : "text-gray-900"}`}>
                  {currency(s.followUpFee)}
                </p>
              </button>
            ))}
          </div>
          <StepFooter onNext={goNext} nextDisabled={!canGoNextFromService} onCancel={() => setShowCancelConfirm(true)} />
        </div>
      )}

      {/* Step 1: Date & Time */}
      {step === 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Available Dates</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {dates.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDate(d)
                  setTime(null)
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer active:scale-95 transition-all duration-150 ${
                  date === d ? "bg-gray-900 text-white" : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <CalendarDays size={14} />
                {formatDateLong(d).split(",").slice(0, 2).join(",")}
              </button>
            ))}
          </div>

          {date && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Available Slots</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {demoAvailableSlots[date].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer active:scale-95 transition-all duration-150 ${
                      time === t ? "bg-gray-900 text-white" : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Clock size={14} />
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}

          <StepFooter onBack={goBack} onNext={goNext} nextDisabled={!canGoNextFromDate} onCancel={() => setShowCancelConfirm(true)} />
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div className="max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Booking Summary</p>
            <div className="space-y-3 mb-4">
              <SummaryRow label="Service" value={`${service?.name} (Follow-up)`} />
              <SummaryRow label="Date" value={formatDateLong(date)} />
              <SummaryRow label="Time" value={time} />
              <SummaryRow label="Doctor" value="Dr. Charu Garg" />
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">Total Payable</span>
              <span className="text-2xl font-bold text-gray-900">{currency(service?.followUpFee)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <ShieldCheck size={14} /> This is a demo payment — no real transaction will occur.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={paying}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 transition-all duration-150"
            >
              <ChevronLeft size={15} /> Back
            </button>
            <button
              type="button"
              onClick={() => setShowCancelConfirm(true)}
              disabled={paying}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 cursor-pointer disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 transition-all duration-150"
            >
              <X size={15} /> Cancel
            </button>
            <button
              type="button"
              onClick={handlePay}
              disabled={paying}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-3 rounded-xl cursor-pointer disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 transition-all duration-150"
            >
              {paying ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Processing payment…
                </>
              ) : (
                <>
                  <CreditCard size={16} /> Pay {currency(service?.followUpFee)} &amp; Confirm
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && confirmedAppointment && (
        <div className="max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center mb-6">
            <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 text-green-600 mx-auto mb-4">
              <PartyPopper size={24} />
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Follow-up Booked!</h3>
            <p className="text-sm text-gray-400 mb-5">
              Your follow-up consultation has been scheduled successfully.
            </p>
            <div className="text-left bg-gray-50 rounded-xl p-4 space-y-2.5">
              <SummaryRow label="Service" value={confirmedAppointment.service} />
              <SummaryRow label="Date" value={formatDateLong(confirmedAppointment.date)} />
              <SummaryRow label="Time" value={confirmedAppointment.time} />
              <SummaryRow label="Amount Paid" value={currency(confirmedAppointment.fee)} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={restart}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
            >
              Book Another
            </button>
            <button
              type="button"
              onClick={() => onNavigate("apt-upcoming")}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-95 transition-all duration-150"
            >
              View My Appointments
            </button>
          </div>
        </div>
      )}

      {/* Cancel confirmation */}
      {showCancelConfirm && (
        <PatientModal
          title="Cancel this booking?"
          subtitle="Your progress on this booking will be lost."
          onClose={() => setShowCancelConfirm(false)}
          maxWidth="max-w-sm"
          footer={
            <>
              <button
                type="button"
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
              >
                No, Keep Booking
              </button>
              <button
                type="button"
                onClick={confirmCancelBooking}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer active:scale-95 transition-all duration-150"
              >
                Yes, Cancel
              </button>
            </>
          }
        >
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-500 shrink-0">
              <AlertTriangle size={16} />
            </span>
            <p className="text-sm text-gray-500">
              Are you sure you want to cancel this follow-up booking? You'll need to start over if you change your mind.
            </p>
          </div>
        </PatientModal>
      )}
    </div>
  )
}

const StepFooter = ({ onBack, onNext, nextDisabled, onCancel }) => (
  <div className="flex items-center gap-3">
    {onBack && (
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
      >
        <ChevronLeft size={15} /> Back
      </button>
    )}
    <div className="flex-1" />
    {onCancel && (
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 cursor-pointer active:scale-95 transition-all duration-150"
      >
        <X size={15} /> Cancel
      </button>
    )}
    <button
      type="button"
      onClick={onNext}
      disabled={nextDisabled}
      className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white cursor-pointer disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 transition-all duration-150"
    >
      Continue
    </button>
  </div>
)

const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
)