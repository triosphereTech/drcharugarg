"use client";

import React, { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import { formatDateLong, currency } from "../data/Temppatientdata";
import { PatientModal } from "./Patientmodal";
import { deleteAppointment } from "@/lib/appointmentUtils";
import Script from "next/script";

const STEPS = ["Date & Time", "Payment", "Confirmation"];

export const BookFollowUp = ({
  parentAppointmentId,
  setAppointments,
  onNavigate,
  refreshAppointments,
}) => {
  const [step, setStep] = useState(0);
  const [parentAppointment, setParentAppointment] = useState(null);
  const [loadingParent, setLoadingParent] = useState(false);
  const [parentError, setParentError] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [paying, setPaying] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const followUpFee = useMemo(
    () => parentAppointment?.followUpFee || 0,
    [parentAppointment],
  );
  useEffect(() => {
    console.log("STEP CHANGED", step);
  }, [step]);

  useEffect(() => {
    console.log("CONFIRMED APPOINTMENT", confirmedAppointment);
  }, [confirmedAppointment]);
  useEffect(() => {
    if (!parentAppointmentId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParentAppointment(null);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParentError(
        "No consultation was selected. Please return to your appointments.",
      );
      return;
    }

    let isActive = true;

    const loadParent = async () => {
      setLoadingParent(true);
      setParentError("");

      try {
        const res = await fetch(`/api/appointments/${parentAppointmentId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(
            data.message || "Could not load the selected consultation.",
          );
        }

        if (isActive) {
          setParentAppointment(data.appointment || null);
        }
      } catch (err) {
        if (isActive) {
          setParentError(
            err.message || "Could not load the selected consultation.",
          );
        }
      } finally {
        if (isActive) {
          setLoadingParent(false);
        }
      }
    };

    loadParent();

    return () => {
      isActive = false;
    };
  }, [parentAppointmentId]);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const canGoNextFromDate = !!date && !!time;

  const handlePay = async () => {
    if (!parentAppointmentId || !date || !time) {
      setSubmitError("Please select a date and time for your follow-up.");
      return;
    }

    setPaying(true);
    setSubmitError("");

    let appointmentId;

    try {
      // Create Follow-up Appointment
      const formData = new FormData();

      formData.append("parentAppointmentId", parentAppointmentId);
      formData.append("appointmentType", "followup");
      formData.append("date", date);
      formData.append("timeSlot", time);

      const res = await fetch("/api/appointments", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Could not create follow-up appointment.",
        );
      }

      appointmentId = data.appointmentId;

      // Create Razorpay Order
      const orderRes = await fetch("/api/appointments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
        }),
      });

      const orderData = await orderRes.json();
      console.log("ORDER RESPONSE", orderData);
      console.log("ORDER STATUS", orderRes.status);
      if (!orderRes.ok) {
        await deleteAppointment(appointmentId);

        throw new Error(orderData.message || "Could not create payment order.");
      }

      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Hair & Scalp Clinic",
        description: `Follow-up Consultation — ${
          parentAppointment?.service || "Consultation"
        }`,
        order_id: orderData.orderId,

        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/appointments/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                appointmentId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(
                verifyData.message || "Payment verification failed.",
              );
            }

            console.log("Before refresh");

            await refreshAppointments();
            console.log("After refresh");

            const appointment = {
              _id: appointmentId,
              service: parentAppointment?.service,
              date: new Date(date),
              timeSlot: time,
              status: "pending",
              fee: followUpFee,
              appointmentType: "followup",
            };

            setConfirmedAppointment(appointment);
            console.log("Setting appointment");
            goNext();
            console.log("Current step should become 2");
          } catch (err) {
            setSubmitError(err.message || "Payment verification failed.");
          } finally {
            setPaying(false);
          }
        },

        modal: {
          ondismiss: async () => {
            await deleteAppointment(appointmentId);

            setSubmitError(
              "Payment was cancelled. Your slot has been released.",
            );

            setPaying(false);
          },
        },

        theme: {
          color: "#058FD2",
        },
      });

      rzp.on("payment.failed", async () => {
        await deleteAppointment(appointmentId);

        setSubmitError("Payment failed. Your slot has been released.");

        setPaying(false);

        rzp.close();
      });

      rzp.open();
    } catch (err) {
      console.log("followup error", err);
      console.log("FOLLOWUP PAYMENT ERROR", err);
      console.log("appointmentId", appointmentId);

      setSubmitError(err.message || "Could not create follow-up appointment.");

      setPaying(false);
    }
  };

  const restart = () => {
    setStep(0);
    setDate(null);
    setTime(null);
    setConfirmedAppointment(null);
    setSubmitError("");
  };

  const confirmCancelBooking = () => {
    setShowCancelConfirm(false);
    restart();
    onNavigate("overview");
  };

  return (
    <>
      {/* Load Razorpay SDK once */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Book Follow-up Consultation
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Continue from your completed consultation.
          </p>
        </div>

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
                <span
                  className={`text-[11px] font-semibold hidden sm:block ${idx <= step ? "text-gray-700" : "text-gray-300"}`}
                >
                  {label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 ${idx < step ? "bg-gray-900" : "bg-gray-200"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {step === 0 && (
          <div>
            {loadingParent ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 text-sm text-gray-500">
                Loading your completed consultation…
              </div>
            ) : parentError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                {parentError}
              </div>
            ) : parentAppointment ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 mb-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">
                  Follow-up context
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <InfoCard label="Service" value={parentAppointment.service} />
                  <InfoCard
                    label="Fee"
                    value={currency(parentAppointment.followUpFee || 0)}
                  />
                  <InfoCard label="Type" value="Follow-up" />
                </div>
              </div>
            ) : null}

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
              Choose a date
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {[0, 1, 2, 3].map((offset) => {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + offset);
                const value = futureDate.toISOString().slice(0, 10);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setDate(value);
                      setTime(null);
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer active:scale-95 transition-all duration-150 ${
                      date === value
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <CalendarDays size={14} />
                    {formatDateLong(value).split(",").slice(0, 2).join(",")}
                  </button>
                );
              })}
            </div>

            {date && (
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                  Available slots
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "09:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "02:00 PM",
                    "03:00 PM",
                    "04:00 PM",
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer active:scale-95 transition-all duration-150 ${
                        time === slot
                          ? "bg-gray-900 text-white"
                          : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Clock size={14} />
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            )}

            <StepFooter
              onNext={goNext}
              nextDisabled={!canGoNextFromDate || !parentAppointment}
              onCancel={() => setShowCancelConfirm(true)}
            />
          </div>
        )}

        {step === 1 && (
          <div className="max-w-md">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">
                Booking summary
              </p>
              <div className="space-y-3 mb-4">
                <SummaryRow
                  label="Service"
                  value={`${parentAppointment?.service || "Follow-up consultation"}`}
                />
                <SummaryRow label="Date" value={formatDateLong(date)} />
                <SummaryRow label="Time" value={time} />
                <SummaryRow label="Doctor" value="Dr. Charu Garg" />
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500">
                  Total payable
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {currency(followUpFee)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
              <ShieldCheck size={14} /> Your consultation will be reserved and
              paid securely through Razorpay.
            </div>

            {submitError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {submitError}
              </div>
            )}

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
                    <Loader2 size={16} className="animate-spin" /> Creating
                    booking…
                  </>
                ) : (
                  <>
                    <CreditCard size={16} /> Pay {currency(followUpFee)} &amp;
                    Confirm
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 2 && confirmedAppointment && (
          <div className="max-w-md">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center mb-6">
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 text-green-600 mx-auto mb-4">
                <PartyPopper size={24} />
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Follow-up booked!
              </h3>
              <p className="text-sm text-gray-400 mb-5">
                Your follow-up consultation has been scheduled successfully.
              </p>
              <div className="text-left bg-gray-50 rounded-xl p-4 space-y-2.5">
                <SummaryRow
                  label="Service"
                  value={confirmedAppointment.service}
                />
                <SummaryRow
                  label="Date"
                  value={formatDateLong(confirmedAppointment.date)}
                />
                <SummaryRow
                  label="Time"
                  value={
                    confirmedAppointment.timeSlot || confirmedAppointment.time
                  }
                />
                <SummaryRow
                  label="Amount paid"
                  value={currency(confirmedAppointment.fee || 0)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={restart}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
              >
                Book another
              </button>
              <button
                type="button"
                onClick={() => onNavigate("apt-upcoming")}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white cursor-pointer active:scale-95 transition-all duration-150"
              >
                View my appointments
              </button>
            </div>
          </div>
        )}

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
                  No, keep booking
                </button>
                <button
                  type="button"
                  onClick={confirmCancelBooking}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer active:scale-95 transition-all duration-150"
                >
                  Yes, cancel
                </button>
              </>
            }
          >
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-500 shrink-0">
                <AlertTriangle size={16} />
              </span>
              <p className="text-sm text-gray-500">
                Are you sure you want to cancel this follow-up booking? You will
                need to start over if you change your mind.
              </p>
            </div>
          </PatientModal>
        )}
      </div>
    </>
  );
};

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
);

const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

const InfoCard = ({ label, value }) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
      {label}
    </p>
    <p className="mt-1 text-sm font-semibold text-gray-800">{value}</p>
  </div>
);
