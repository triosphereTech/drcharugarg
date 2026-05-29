"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Script from "next/script";
import {
  FaStethoscope, FaClipboardList, FaMicroscope, FaBolt,
  FaCalendarAlt, FaClock, FaImages, FaCheck,
  FaChevronLeft, FaChevronRight, FaUpload, FaTimes,
  FaInfoCircle, FaWhatsapp, FaRedo, FaCalendar,
  FaExclamationTriangle, FaCreditCard,
} from "react-icons/fa";

const SERVICES = [
  { id: "initial",  label: "Initial Consultation", icon: FaStethoscope,   duration: "30 min", desc: "First-time patient evaluation" },
  { id: "followup", label: "Follow-up Visit",       icon: FaClipboardList, duration: "20 min", desc: "Review & progress check" },
  { id: "scalp",    label: "Scalp Analysis",         icon: FaMicroscope,   duration: "25 min", desc: "Detailed scalp examination" },
  { id: "laser",    label: "Laser Consultation",     icon: FaBolt,         duration: "40 min", desc: "Laser treatment planning" },
];

const TIME_SLOTS = ["09:00 AM","10:00 AM","11:00 AM","02:00 PM","03:00 PM","04:00 PM"];
const MONTHS     = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES  = ["SU","MO","TU","WE","TH","FR","SA"];

const STEP_META = [
  { n: 1, label: "Service", icon: FaStethoscope },
  { n: 2, label: "Date",    icon: FaCalendarAlt },
  { n: 3, label: "Time",    icon: FaClock },
  { n: 4, label: "Images",  icon: FaImages },
];

const HINTS = [
  null,
  { icon: FaCalendarAlt, title: "Choose a date",    sub: "Select any available date from the calendar." },
  { icon: FaClock,       title: "Pick a time slot", sub: "Morning and afternoon slots available." },
  { icon: FaCalendar,    title: "Almost there!",    sub: "Just a few more details and you're all set." },
];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay(); }

function formatDateForApi(d) {
  return `${d.y}-${String(d.m + 1).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`;
}

// Delete a temporary appointment + its files when payment fails/dismissed
async function deleteAppointment(appointmentId) {
  try {
    await fetch(`/api/appointments/${appointmentId}`, { method: "DELETE" });
  } catch {
    // best-effort, don't surface to user
  }
}

/* ─── Left sidebar ─── */
function LeftPanel({ step, selectedService, selectedDate, selectedTime, booked }) {
  const getVal = (n) => {
    if (n === 1) return selectedService ? SERVICES.find(s => s.id === selectedService)?.label : "";
    if (n === 2) return selectedDate ? `${MONTHS[selectedDate.m].slice(0,3)} ${selectedDate.d}, ${selectedDate.y}` : "";
    if (n === 3) return selectedTime || "";
    return "";
  };
  const hint = booked ? null : HINTS[step - 1];
  return (
    <aside className="w-full md:w-[260px] lg:w-[400px] flex-shrink-0 bg-slate-50/70 border-b md:border-b-0 md:border-r border-slate-100 p-5 md:p-7 flex flex-col gap-0">
      <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-[#058FD2] uppercase bg-[#E8F6FD] px-3 py-1.5 rounded-full mb-3 w-fit">
        <FaCalendarAlt className="w-3 h-3" /> Online Booking
      </div>
      <h1 className="text-lg md:text-3xl font-bold text-slate-800 leading-snug mb-1">Book your appointment</h1>
      <p className="text-md text-slate-400 mb-4 md:mb-5">Quick, easy, and confirmed instantly.</p>
      <div className="h-px bg-slate-200 mb-4 md:mb-5 hidden md:block" />
      <div className="flex md:flex-col flex-row overflow-x-auto md:overflow-visible gap-0 md:gap-0 pb-1 md:pb-0 flex-1">
        {STEP_META.map(({ n, label, icon: Icon }, i) => {
          const done   = booked || step > n;
          const active = !booked && step === n;
          const val    = getVal(n);
          return (
            <div key={n} className="flex md:flex-row flex-col items-center md:items-start gap-0 md:gap-3 min-w-[60px] md:min-w-0">
              <div className="flex flex-col md:flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-[1.5px] transition-all duration-200
                  ${done   ? "bg-[#058FD2] border-[#058FD2] text-white"
                  : active ? "bg-[#E8F6FD] border-[#058FD2] text-[#058FD2] ring-4 ring-[#058FD2]/10"
                  :          "bg-white border-slate-200 text-slate-400"}`}
                >
                  {done ? <FaCheck className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                {i < 3 && <div className={`hidden md:block w-px flex-1 min-h-[20px] mt-1 rounded transition-colors duration-300 ${done ? "bg-[#058FD2]" : "bg-slate-200"}`} style={{ height: 20 }} />}
                {i < 3 && <div className={`md:hidden h-px w-6 mt-0 ml-1 rounded transition-colors duration-300 ${done ? "bg-[#058FD2]" : "bg-slate-200"}`} />}
              </div>
              <div className="hidden md:block pt-0.5 pb-5">
                <p className={`text-[18px] font-normal leading-none mb-1 ${done ? "text-[#058FD2]" : active ? "text-[#058FD2]" : "text-slate-400"}`}>{n}. {label}</p>
                {val && <p className="text-xs text-slate-400">{val}</p>}
              </div>
              <p className={`md:hidden text-[9px] font-medium mt-1 text-center ${active ? "text-[#058FD2]" : done ? "text-[#058FD2]/70" : "text-slate-400"}`}>{label}</p>
            </div>
          );
        })}
      </div>
      {hint && (
        <div className="hidden md:block mt-auto pt-4">
          <div className="bg-white border border-slate-100 rounded-xl p-3 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-lg bg-[#E8F6FD] flex items-center justify-center flex-shrink-0">
              <hint.icon className="w-3.5 h-3.5 text-[#058FD2]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-0.5">{hint.title}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">{hint.sub}</p>
            </div>
          </div>
        </div>
      )}
      {booked && (
        <div className="hidden md:block mt-auto pt-4">
          <div className="bg-white border border-slate-100 rounded-xl p-3 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-lg bg-[#E8F6FD] flex items-center justify-center flex-shrink-0">
              <FaCheck className="w-3.5 h-3.5 text-[#058FD2]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-0.5">All done!</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">Your appointment has been confirmed.</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

/* ─── Right panel header ─── */
function RightHeader({ step, title, subtitle }) {
  return (
    <div className="px-6 md:px-7 pt-6 md:pt-7 pb-0">
      <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
        Step {step} of 4
      </div>
      <h2 className="text-[17px] font-semibold text-slate-800 mb-1">{title}</h2>
      <p className="text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

/* ─── Footer ─── */
function Footer({ onBack, onNext, nextLabel = "Continue", nextDisabled = false, confirm = false }) {
  return (
    <div className="flex items-center justify-between px-6 md:px-7 py-4 border-t border-slate-100 bg-slate-50/60 rounded-br-2xl">
      {onBack ? (
        <button onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm font-medium hover:border-[#058FD2] hover:text-[#058FD2] hover:bg-[#E8F6FD] transition-all">
          <FaChevronLeft className="w-3 h-3" /> Back
        </button>
      ) : <div />}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all active:scale-95
          ${nextDisabled ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" : "bg-[#058FD2] text-white hover:bg-[#0A7AB8]"}`}
      >
        {confirm && <FaCreditCard className="w-3 h-3" />}
        {nextLabel}
        {!confirm && <FaChevronRight className="w-3 h-3" />}
      </button>
    </div>
  );
}

/* ─── Step 1 ─── */
function Step1({ selectedService, setSelectedService, onNext }) {
  return (
    <>
      <RightHeader step={1} title="Select a service" subtitle="Choose the type of appointment you need" />
      <div className="px-6 md:px-7 pt-5 pb-3 grid grid-cols-2 gap-3 flex-1">
        {SERVICES.map(s => {
          const Icon = s.icon, sel = selectedService === s.id;
          return (
            <button key={s.id} onClick={() => setSelectedService(s.id)}
              className={`group p-4 rounded-xl border-[1.5px] text-left transition-all duration-150
                ${sel ? "border-[#058FD2] bg-[#E8F6FD]" : "border-slate-200 bg-white hover:border-[#058FD2]/50 hover:bg-[#E8F6FD]/40"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                  ${sel ? "bg-[#058FD2] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-[#058FD2] group-hover:text-white"}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                {sel && <div className="w-5 h-5 rounded-full bg-[#058FD2] flex items-center justify-center"><FaCheck className="w-2.5 h-2.5 text-white" /></div>}
              </div>
              <p className={`text-sm font-semibold mb-0.5 ${sel ? "text-[#065F8F]" : "text-slate-700"}`}>{s.label}</p>
              <p className="text-xs text-slate-400 mb-2">{s.desc}</p>
              <span className="text-xs font-medium text-[#058FD2] bg-[#058FD2]/10 px-2 py-0.5 rounded-md">{s.duration}</span>
            </button>
          );
        })}
      </div>
      <Footer onNext={onNext} nextDisabled={!selectedService} />
    </>
  );
}

/* ─── Step 2 ─── */
function Step2({ selectedDate, setSelectedDate, onBack, onNext, onDateConfirmed, availabilityLoading, availabilityError, allFull }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };
  const days = getDaysInMonth(year, month), firstDay = getFirstDay(year, month);

  const handleDayClick = (d) => {
    const dateObj = { d, m: month, y: year };
    setSelectedDate(dateObj);
    onDateConfirmed(dateObj);
  };

  const nextBlocked = !selectedDate || availabilityLoading || !!availabilityError || allFull;

  return (
    <>
      <RightHeader step={2} title="Select a date" subtitle="Pick an available date for your appointment" />
      <div className="px-6 md:px-7 pt-5 pb-3 flex-1">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 max-w-[480px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#058FD2] hover:text-[#058FD2] hover:bg-[#E8F6FD] transition-all">
              <FaChevronLeft className="w-2.5 h-2.5" />
            </button>
            <span className="text-sm font-semibold text-slate-800">{MONTHS[month]} {year}</span>
            <button onClick={nextMonth} className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#058FD2] hover:text-[#058FD2] hover:bg-[#E8F6FD] transition-all">
              <FaChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>
          <div className="grid grid-cols-7 mb-1">
            {DAY_NAMES.map(d => <div key={d} className="text-center text-[10px] font-semibold text-slate-400 py-1 tracking-wider">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: days }).map((_, i) => {
              const d = i + 1, dt = new Date(year, month, d);
              const past = dt < today, isToday = dt.getTime() === today.getTime();
              const sel  = selectedDate?.d === d && selectedDate?.m === month && selectedDate?.y === year;
              return (
                <button key={d} disabled={past} onClick={() => handleDayClick(d)}
                  className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                    ${sel      ? "bg-[#058FD2] text-white scale-110 font-semibold"
                    : past     ? "text-slate-300 cursor-not-allowed"
                    : isToday  ? "border-[1.5px] border-[#058FD2] text-[#058FD2] font-semibold hover:bg-[#E8F6FD]"
                    :            "text-slate-600 hover:bg-[#E8F6FD] hover:text-[#058FD2]"}`}
                >{d}</button>
              );
            })}
          </div>
        </div>
        {selectedDate && (
          <div className="mt-3 text-center">
            {availabilityLoading && (
              <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-[#058FD2] border-t-transparent rounded-full animate-spin inline-block" />
                Checking available slots…
              </p>
            )}
            {!availabilityLoading && availabilityError && (
              <p className="text-sm text-red-500 flex items-center justify-center gap-1.5">
                <FaExclamationTriangle className="w-3 h-3" /> {availabilityError}
              </p>
            )}
            {!availabilityLoading && !availabilityError && allFull && (
              <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-500 text-xs font-medium px-3 py-1.5 rounded-full">
                <FaExclamationTriangle className="w-3 h-3" />
                All slots are fully booked for this date. Please choose another day.
              </div>
            )}
            {!availabilityLoading && !availabilityError && !allFull && (
              <p className="text-sm text-[#058FD2] font-medium flex items-center justify-center gap-1.5">
                <FaCheck className="w-3 h-3" /> {MONTHS[selectedDate.m]} {selectedDate.d}, {selectedDate.y}
              </p>
            )}
          </div>
        )}
      </div>
      <Footer onBack={onBack} onNext={onNext} nextDisabled={nextBlocked} />
    </>
  );
}

/* ─── Step 3 ─── */
function Step3({ selectedTime, setSelectedTime, onBack, onNext, slotAvailability }) {
  return (
    <>
      <RightHeader step={3} title="Select a time" subtitle="Available slots for your chosen date" />
      <div className="px-6 md:px-7 pt-5 pb-3 flex-1">
        <div className="grid grid-cols-3 gap-2.5 max-w-lg">
          {TIME_SLOTS.map(t => {
            const slotData = slotAvailability.find(s => s.slot === t);
            const un  = slotData ? !slotData.available : false;
            const sel = selectedTime === t;
            return (
              <button key={t} disabled={un} onClick={() => setSelectedTime(t)}
                className={`py-3 px-2 rounded-xl border-[1.5px] text-[13px] font-semibold transition-all
                  ${un  ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed line-through"
                  : sel ? "border-[#058FD2] bg-[#058FD2] text-white scale-105"
                  :       "border-slate-200 bg-white text-slate-600 hover:border-[#058FD2] hover:text-[#058FD2] hover:bg-[#E8F6FD]"}`}
              >
                {t}
                {un && <span className="block text-[10px] font-normal mt-0.5 opacity-70">Full</span>}
              </button>
            );
          })}
        </div>
        <div className="mt-4 max-w-sm bg-[#E8F6FD] rounded-xl px-4 py-3 flex gap-2 items-start">
          <FaInfoCircle className="w-3.5 h-3.5 text-[#058FD2] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#065F8F] leading-relaxed">Sessions last 20–30 minutes. Please arrive 5 minutes early.</p>
        </div>
      </div>
      <Footer onBack={onBack} onNext={onNext} nextDisabled={!selectedTime} />
    </>
  );
}

/* ─── Step 4 ─── */
function Step4({ selectedService, selectedDate, selectedTime, files, setFiles, onBack, onSubmit, isSubmitting, submitError }) {
  const [drag, setDrag] = useState(false);
  const inputRef        = useRef(null);
  const addFiles = (inc) => {
    const allowed = Array.from(inc).filter(f => f.type.startsWith("image/") || f.type === "application/pdf");
    setFiles(p => [...p, ...allowed].slice(0, 5));
  };
  const removeFile = (i) => setFiles(f => f.filter((_, idx) => idx !== i));
  const svc = SERVICES.find(s => s.id === selectedService);

  return (
    <>
      <RightHeader step={4} title="Upload attachments" subtitle="Share images or PDFs to help our doctor prepare (optional)" />
      <div className="px-6 md:px-7 pt-4 pb-3 flex-1 flex flex-col gap-3">
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className={`border-[1.5px] border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
            ${drag ? "border-[#058FD2] bg-[#E8F6FD]" : "border-slate-200 hover:border-[#058FD2]/50 hover:bg-[#E8F6FD]/20"}`}
        >
          <input ref={inputRef} type="file" multiple accept="image/*,application/pdf" className="hidden" onChange={e => addFiles(e.target.files)} />
          <div className="w-11 h-11 bg-[#E8F6FD] rounded-xl flex items-center justify-center mx-auto mb-2">
            <FaUpload className="w-4 h-4 text-[#058FD2]" />
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-0.5">Drop attachments here</p>
          <p className="text-xs text-slate-400">or <span className="text-[#058FD2] underline">browse files</span> - PNG, JPG, WebP, PDF - up to 5</p>
        </div>
        {files.length > 0 && (
          <div className="grid grid-cols-5 gap-2">
            {files.map((file, i) => (
              <div key={i} className="relative group aspect-square rounded-xl border border-slate-200 overflow-hidden">
                {file.type === "application/pdf" ? (
                  <div className="w-full h-full bg-slate-50 flex items-center justify-center px-2 text-center text-[10px] font-semibold text-slate-500">PDF</div>
                ) : (
                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <button onClick={e => { e.stopPropagation(); removeFile(i); }}
                    className="opacity-0 group-hover:opacity-100 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow text-slate-600 transition-opacity" aria-label="Remove">
                    <FaTimes className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Booking summary</p>
          {[
            { label: "Service", value: svc?.label },
            { label: "Date",    value: selectedDate ? `${MONTHS[selectedDate.m]} ${selectedDate.d}, ${selectedDate.y}` : "—" },
            { label: "Time",    value: selectedTime },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
              <span className="text-xs text-slate-400">{row.label}</span>
              <span className="text-xs font-semibold text-slate-700">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Payment notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex gap-2 items-start">
          <FaCreditCard className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700 leading-relaxed">
            A consultation fee of <span className="font-semibold">₹500</span> is required to confirm your booking. You will be redirected to a secure payment page.
          </p>
        </div>

        {submitError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <FaExclamationTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            <p className="text-xs font-medium text-red-600">{submitError}</p>
          </div>
        )}
      </div>
      <Footer
        onBack={onBack}
        onNext={onSubmit}
        nextLabel={isSubmitting ? "Preparing payment…" : "Proceed to Payment"}
        nextDisabled={isSubmitting}
        confirm
      />
    </>
  );
}

/* ─── Success ─── */
function SuccessScreen({ selectedService, selectedDate, selectedTime, onReset }) {
  const svc = SERVICES.find(s => s.id === selectedService);
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-10 px-6 text-center">
      <div className="w-16 h-16 bg-[#E8F6FD] rounded-full flex items-center justify-center mb-5">
        <FaCheck className="w-7 h-7 text-[#058FD2]" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Appointment confirmed!</h2>
      <p className="text-sm text-slate-400 mb-6">Payment received. You will receive a confirmation shortly.</p>
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left w-full max-w-xs mb-6">
        {[
          { label: "Service", value: svc?.label },
          { label: "Date",    value: selectedDate ? `${MONTHS[selectedDate.m]} ${selectedDate.d}, ${selectedDate.y}` : "" },
          { label: "Time",    value: selectedTime },
        ].map(row => (
          <div key={row.label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
            <span className="text-xs text-slate-400">{row.label}</span>
            <span className="text-xs font-semibold text-slate-700">{row.value}</span>
          </div>
        ))}
      </div>
      <button onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#058FD2] text-white text-sm font-medium hover:bg-[#0A7AB8] active:scale-95 transition-all mb-4">
        <FaRedo className="w-3.5 h-3.5" /> Book another appointment
      </button>
      <a href="https://wa.me/1234567890"
        className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold text-sm underline underline-offset-2 hover:text-emerald-600 transition-colors">
        <FaWhatsapp className="w-4 h-4" /> Chat on WhatsApp instead
      </a>
    </div>
  );
}

/* ─── Main ─── */
export default function BookingSection() {
  const [step,            setStep]            = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate,    setSelectedDate]    = useState(null);
  const [selectedTime,    setSelectedTime]    = useState(null);
  const [booked,          setBooked]          = useState(false);
  const [files,           setFiles]           = useState([]);
  const [isLoggedIn,      setIsLoggedIn]      = useState(false);
  const [isCheckingAuth,  setIsCheckingAuth]  = useState(true);
  const [isSubmitting,    setIsSubmitting]    = useState(false);
  const [submitError,     setSubmitError]     = useState("");

  // Availability
  const [slotAvailability,    setSlotAvailability]    = useState([]);
  const [allFull,             setAllFull]             = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError,   setAvailabilityError]   = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/patient/profile");
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const fetchAvailability = useCallback(async (dateObj) => {
    setAvailabilityLoading(true);
    setAvailabilityError("");
    setAllFull(false);
    setSlotAvailability([]);
    setSelectedTime(null);
    try {
      const res  = await fetch(`/api/appointments/availability?date=${formatDateForApi(dateObj)}`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Could not load availability.");
      setSlotAvailability(data.slots);
      setAllFull(data.allFull);
    } catch (err) {
      setAvailabilityError(err.message);
    } finally {
      setAvailabilityLoading(false);
    }
  }, []);

  const reset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFiles([]);
    setSubmitError("");
    setBooked(false);
    setSlotAvailability([]);
    setAllFull(false);
    setAvailabilityLoading(false);
    setAvailabilityError("");
  };

  const submitBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setSubmitError("");

    // ── Step A: Create appointment (uploads files, holds slot) ──
    const formData = new FormData();
    formData.append("service",  SERVICES.find(s => s.id === selectedService)?.label || selectedService);
    formData.append("date",     formatDateForApi(selectedDate));
    formData.append("timeSlot", selectedTime);
    files.forEach(file => formData.append("attachments", file));

    let appointmentId;
    try {
      const res  = await fetch("/api/appointments", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not create appointment.");
      appointmentId = data.appointmentId;
    } catch (err) {
      setSubmitError(err.message);
      setIsSubmitting(false);
      return;
    }

    // ── Step B: Create Razorpay order ──
    let orderData;
    try {
      const res  = await fetch("/api/appointments/create-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ appointmentId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not create payment order.");
      orderData = data;
    } catch (err) {
      // Order creation failed — delete the appointment we just created
      await deleteAppointment(appointmentId);
      setSubmitError(err.message);
      setIsSubmitting(false);
      return;
    }

    // ── Step C: Open Razorpay checkout ──
    const razorpayOptions = {
      key:         orderData.keyId,
      amount:      orderData.amount,
      currency:    orderData.currency,
      name:        "Hair & Scalp Clinic",
      description: `Consultation — ${SERVICES.find(s => s.id === selectedService)?.label}`,
      order_id:    orderData.orderId,

      handler: async (response) => {
        // Payment succeeded — verify on server
        try {
          const res  = await fetch("/api/appointments/verify-payment", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({
              appointmentId,
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Payment verification failed.");
          // All good — show success screen
          setBooked(true);
        } catch (err) {
          // Verification failed — appointment already marked failed on server
          setSubmitError(err.message || "Payment verification failed. Please contact support.");
        } finally {
          setIsSubmitting(false);
        }
      },

      modal: {
        ondismiss: async () => {
          // User closed the payment modal without paying
          await deleteAppointment(appointmentId);
          setSubmitError("Payment was cancelled. Your slot has been released. You can try again.");
          setIsSubmitting(false);
        },
      },

      prefill: {}, // you can prefill name/email/phone from patient profile if available
      theme: { color: "#058FD2" },
    };

    const rzp = new window.Razorpay(razorpayOptions);

    // Handle payment failure inside the modal (wrong card, bank decline, etc.)
    rzp.on("payment.failed", async () => {
      await deleteAppointment(appointmentId);
      setSubmitError("Payment failed. Your slot has been released. Please try again.");
      setIsSubmitting(false);
      rzp.close();
    });

    rzp.open();
    // Note: isSubmitting stays true while modal is open
    // It resets in handler / ondismiss / payment.failed above
  };

  return (
    <>
      {/* Load Razorpay SDK once */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <section  className="min-h-screen flex items-center justify-center p-4 md:py-8">
        <div className="relative w-full max-w-7xl">
          <div className={`w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[560px] transition-all ${!isCheckingAuth && !isLoggedIn ? "blur-sm pointer-events-none select-none" : ""}`}>

            <LeftPanel
              step={step}
              selectedService={selectedService}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              booked={booked}
            />

            <div className="flex flex-col flex-1 min-w-0">
              {booked ? (
                <SuccessScreen
                  selectedService={selectedService}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onReset={reset}
                />
              ) : step === 1 ? (
                <Step1
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                  onNext={() => setStep(2)}
                />
              ) : step === 2 ? (
                <Step2
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onBack={() => setStep(1)}
                  onNext={() => setStep(3)}
                  onDateConfirmed={fetchAvailability}
                  availabilityLoading={availabilityLoading}
                  availabilityError={availabilityError}
                  allFull={allFull}
                />
              ) : step === 3 ? (
                <Step3
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  onBack={() => setStep(2)}
                  onNext={() => setStep(4)}
                  slotAvailability={slotAvailability}
                />
              ) : (
                <Step4
                  selectedService={selectedService}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  files={files}
                  setFiles={setFiles}
                  onBack={() => {
                    setSubmitError();
                    setStep(3);
                  }}
                  onSubmit={submitBooking}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                />
              )}
            </div>

          </div>

          {!isCheckingAuth && !isLoggedIn && (
            <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
              <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/70 rounded-2xl p-6 text-center max-w-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Login to book</h3>
                <p className="text-sm text-slate-500 mb-5">Please login first to book your appointment with the doctor.</p>
                <a href="/login" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#058FD2] text-white text-sm font-semibold hover:bg-[#0A7AB8] transition-colors">
                  Click login to book
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}