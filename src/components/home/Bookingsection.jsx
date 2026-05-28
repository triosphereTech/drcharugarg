"use client";

import { useState, useRef } from "react";
import {
  FaStethoscope,
  FaClipboardList,
  FaMicroscope,
  FaBolt,
  FaCalendarAlt,
  FaClock,
  FaImages,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaUpload,
  FaTimes,
  FaInfoCircle,
  FaWhatsapp,
  FaRedo,
} from "react-icons/fa";

const SERVICES = [
  { id: "initial",  label: "Initial Consultation", icon: FaStethoscope, duration: "30 min", desc: "First-time patient evaluation" },
  { id: "followup", label: "Follow-up Visit",       icon: FaClipboardList, duration: "20 min", desc: "Review & progress check" },
  { id: "scalp",    label: "Scalp Analysis",         icon: FaMicroscope, duration: "25 min", desc: "Detailed scalp examination" },
  { id: "laser",    label: "Laser Consultation",     icon: FaBolt, duration: "40 min", desc: "Laser treatment planning" },
];

const TIME_SLOTS    = ["09:00 AM","10:00 AM","11:00 AM","02:00 PM","03:00 PM","04:00 PM"];
const UNAVAIL_SLOTS = ["11:00 AM","03:00 PM"];
const MONTHS        = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES     = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay(); }

/* ─── Step progress indicator ─── */
function StepBar({ step }) {
  const stepMeta = [
    { label: "Service", icon: FaStethoscope },
    { label: "Date",    icon: FaCalendarAlt },
    { label: "Time",    icon: FaClock },
    { label: "Images",  icon: FaImages },
  ];
  return (
    <div className="flex items-center justify-center mb-8">
      {stepMeta.map(({ label, icon: Icon }, i) => {
        const n      = i + 1;
        const done   = step > n;
        const active = step === n;
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border-[1.5px] transition-all duration-300
                ${active ? "bg-blue-700 border-blue-700 text-white ring-4 ring-blue-100"
                  : done  ? "bg-blue-700 border-blue-700 text-white"
                  : "bg-white border-slate-200 text-slate-400"}`}>
                {done ? <FaCheck className="w-3 h-3" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <span className={`mt-1.5 text-[11px] font-medium ${active ? "text-blue-700" : done ? "text-blue-400" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
            {i < 3 && (
              <div className={`w-14 sm:w-20 h-[1.5px] mx-1 mb-4 rounded transition-colors duration-300 ${done ? "bg-blue-300" : "bg-slate-200"}`}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Reusable footer nav buttons ─── */
function Footer({ onBack, onNext, nextLabel = "Continue", nextDisabled = false, nextConfirm = false }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl">
      {onBack ? (
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm font-medium hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all">
          <FaChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>
      ) : <div/>}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all
          ${nextDisabled
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-blue-700 text-white hover:bg-blue-800 active:scale-95"}`}
      >
        {nextConfirm && <FaCheck className="w-3.5 h-3.5" />}
        {nextLabel}
        {!nextConfirm && <FaChevronRight className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

/* ─── Card header with step badge ─── */
function CardHeader({ step, Icon, title, subtitle }) {
  return (
    <div className="px-6 pt-6 pb-0">
      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mb-3">
        <Icon className="w-3.5 h-3.5" />
        <span>Step {step} of 4</span>
      </div>
      <h2 className="text-lg font-semibold text-slate-800 mb-1">{title}</h2>
      <p className="text-sm text-slate-400 mb-0">{subtitle}</p>
    </div>
  );
}

/* ─── Step 1: Service ─── */
function Step1({ selectedService, setSelectedService, onNext }) {
  return (
    <>
      <CardHeader step={1} Icon={FaStethoscope} title="Select a service" subtitle="Choose the type of appointment you need"/>
      <div className="px-6 pt-5 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICES.map(s => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedService(s.id)}
              className={`group p-4 rounded-xl border-[1.5px] text-left transition-all duration-150
                ${selectedService === s.id
                  ? "border-blue-700 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors
                  ${selectedService === s.id ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {selectedService === s.id && (
                  <div className="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>
              <p className={`text-sm font-semibold mb-0.5 ${selectedService === s.id ? "text-blue-800" : "text-slate-700"}`}>{s.label}</p>
              <p className="text-xs text-slate-400 mb-2">{s.desc}</p>
              <span className="inline-block text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-lg">{s.duration}</span>
            </button>
          );
        })}
      </div>
      <Footer onNext={onNext} nextDisabled={!selectedService}/>
    </>
  );
}

/* ─── Step 2: Calendar ─── */
function Step2({ selectedDate, setSelectedDate, onBack, onNext }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const days = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);

  return (
    <>
      <CardHeader step={2} Icon={FaCalendarAlt} title="Select a date" subtitle="Pick an available date for your appointment"/>
      <div className="px-6 pt-5 pb-2">
        <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 max-w-sm mx-auto">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 text-slate-500 hover:text-blue-600 transition-all">
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-sm font-semibold text-slate-800">{MONTHS[month]} {year}</span>
            <button onClick={nextMonth} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 text-slate-500 hover:text-blue-600 transition-all">
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>
          {/* Day names */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_NAMES.map(d => <div key={d} className="text-center text-[10px] font-semibold text-slate-400 py-1">{d}</div>)}
          </div>
          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`}/>)}
            {Array.from({ length: days }).map((_, i) => {
              const d = i + 1;
              const dt = new Date(year, month, d);
              const past = dt < today;
              const isToday = dt.getTime() === today.getTime();
              const sel = selectedDate?.d === d && selectedDate?.m === month && selectedDate?.y === year;
              return (
                <button
                  key={d}
                  disabled={past}
                  onClick={() => setSelectedDate({ d, m: month, y: year })}
                  className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-150
                    ${sel      ? "bg-blue-700 text-white font-semibold scale-110"
                    : past     ? "text-slate-300 cursor-not-allowed"
                    : isToday  ? "border-[1.5px] border-blue-400 text-blue-700 font-semibold hover:bg-blue-50"
                    :            "text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium"}`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
        {selectedDate && (
          <p className="text-center text-sm text-blue-600 font-medium mt-3 flex items-center justify-center gap-1.5">
            <FaCheck className="w-3 h-3" />
            {MONTHS[selectedDate.m]} {selectedDate.d}, {selectedDate.y}
          </p>
        )}
      </div>
      <Footer onBack={onBack} onNext={onNext} nextDisabled={!selectedDate}/>
    </>
  );
}

/* ─── Step 3: Time ─── */
function Step3({ selectedTime, setSelectedTime, onBack, onNext }) {
  return (
    <>
      <CardHeader step={3} Icon={FaClock} title="Select a time" subtitle="Available slots for your chosen date"/>
      <div className="px-6 pt-5 pb-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
          {TIME_SLOTS.map(t => {
            const unavail = UNAVAIL_SLOTS.includes(t);
            const sel     = selectedTime === t;
            return (
              <button
                key={t}
                disabled={unavail}
                onClick={() => setSelectedTime(t)}
                className={`py-3.5 px-4 rounded-xl border-[1.5px] text-sm font-semibold transition-all duration-150
                  ${unavail ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed line-through"
                    : sel   ? "border-blue-700 bg-blue-700 text-white scale-105"
                    :         "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"}`}
              >
                {t}
                {unavail && <span className="block text-[10px] font-normal mt-0.5 opacity-70">Unavailable</span>}
              </button>
            );
          })}
        </div>
        <div className="mt-4 max-w-md mx-auto bg-blue-50 rounded-xl px-4 py-3 flex gap-2.5 items-start">
          <FaInfoCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-600 leading-relaxed">Sessions last 20–30 minutes. Please arrive 5 minutes before your slot.</p>
        </div>
      </div>
      <Footer onBack={onBack} onNext={onNext} nextDisabled={!selectedTime}/>
    </>
  );
}

/* ─── Step 4: Image upload ─── */
function Step4({ selectedService, selectedDate, selectedTime, onBack, onSubmit }) {
  const [files, setFiles] = useState([]);
  const [drag, setDrag]   = useState(false);
  const inputRef          = useRef(null);

  const addFiles = (incoming) => {
    const imgs = Array.from(incoming).filter(f => f.type.startsWith("image/"));
    setFiles(prev => [...prev, ...imgs].slice(0, 5));
  };
  const removeFile = (i) => setFiles(f => f.filter((_, idx) => idx !== i));

  const svc = SERVICES.find(s => s.id === selectedService);

  return (
    <>
      <CardHeader step={4} Icon={FaImages} title="Upload images" subtitle="Share photos of your condition to help our doctor prepare"/>
      <div className="px-6 pt-5 pb-2 space-y-4">
        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className={`border-[1.5px] border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
            ${drag ? "border-blue-400 bg-blue-50 scale-[1.01]" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/40"}`}
        >
          <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => addFiles(e.target.files)}/>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaUpload className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">Drop images here</p>
          <p className="text-xs text-slate-400">or <span className="text-blue-500 underline">browse files</span> · PNG, JPG, WEBP · up to 5</p>
        </div>

        {/* Previews */}
        {files.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {files.map((file, i) => (
              <div key={i} className="relative group aspect-square rounded-xl border border-slate-200 overflow-hidden">
                <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                  <button
                    onClick={e => { e.stopPropagation(); removeFile(i); }}
                    className="opacity-0 group-hover:opacity-100 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow text-slate-700 transition-opacity"
                    aria-label="Remove image"
                  >
                    <FaTimes className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Booking Summary</p>
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
      </div>
      <Footer onBack={onBack} onNext={onSubmit} nextLabel="Confirm Booking" nextConfirm/>
    </>
  );
}

/* ─── Success screen ─── */
function SuccessScreen({ selectedService, selectedDate, selectedTime, onReset }) {
  const svc = SERVICES.find(s => s.id === selectedService);
  return (
    <div className="text-center py-10 px-6">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
        <FaCheck className="w-7 h-7 text-blue-700" />
      </div>
      <h2 className="text-xl font-semibold text-slate-800 mb-2">Appointment confirmed!</h2>
      <p className="text-sm text-slate-400 mb-6">You'll receive a confirmation email shortly.</p>
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left max-w-xs mx-auto mb-6">
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
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 active:scale-95 transition-all"
      >
        Book another appointment
        <FaRedo className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ─── Main export ─── */
export default function BookingSection() {
  const [step,            setStep]            = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate,    setSelectedDate]    = useState(null);
  const [selectedTime,    setSelectedTime]    = useState(null);
  const [booked,          setBooked]          = useState(false);

  const reset = () => {
    setStep(1); setSelectedService(null); setSelectedDate(null);
    setSelectedTime(null); setBooked(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">

        {/* Page heading */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3 bg-blue-50 px-4 py-1.5 rounded-full">
            Online Booking
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Book your appointment</h1>
          <p className="text-slate-400 text-sm mt-2">Quick, easy, and confirmed instantly.</p>
        </div>

        {/* Progress */}
        {!booked && <StepBar step={step}/>}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/40 border border-slate-100 overflow-hidden">
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
            />
          ) : step === 3 ? (
            <Step3
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          ) : (
            <Step4
              selectedService={selectedService}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBack={() => setStep(3)}
              onSubmit={() => setBooked(true)}
            />
          )}
        </div>

        {/* WhatsApp */}
        <p className="text-center mt-5 text-sm text-slate-400 flex items-center justify-center gap-1.5">
          Prefer to talk?{" "}
          <a href="https://wa.me/1234567890" className="inline-flex items-center gap-1 text-emerald-500 font-semibold underline underline-offset-2 hover:text-emerald-600 transition-colors">
            <FaWhatsapp className="w-4 h-4" />
            Chat on WhatsApp instead
          </a>
        </p>
      </div>
    </section>
  );
}