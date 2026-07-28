// ─────────────────────────────────────────────────────────────
// Temporary local data for the Settings page.
// No API is wired up yet — everything here is just in-memory /
// placeholder data so the UI can be built and demoed.
// Replace with real API calls whenever the backend is ready.
// ─────────────────────────────────────────────────────────────

let idCounter = 1000
export const generateId = (prefix = "id") => `${prefix}-${idCounter++}-${Date.now().toString(36)}`

// Convert "09:30" -> "9:30 AM"
export const formatTime = (time24) => {
  if (!time24) return ""
  const [hStr, mStr] = time24.split(":")
  let h = parseInt(hStr, 10)
  const suffix = h >= 12 ? "PM" : "AM"
  h = h % 12
  if (h === 0) h = 12
  return `${h}:${mStr} ${suffix}`
}

export const formatDateKey = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export const formatDateLong = (dateKey) => {
  if (!dateKey) return ""
  const d = new Date(`${dateKey}T00:00:00`)
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
}

// ── Time Slot Templates ─────────────────────────────────────
export const initialTimeSlotTemplates = [
  {
    id: "tpl-morning",
    name: "Morning Slots",
    color: "blue",
    slots: [
      { id: "s1", start: "09:00", end: "09:30" },
      { id: "s2", start: "09:30", end: "10:00" },
      { id: "s3", start: "10:00", end: "10:30" },
      { id: "s4", start: "10:30", end: "11:00" },
      { id: "s5", start: "11:00", end: "11:30" },
      { id: "s6", start: "11:30", end: "12:00" },
    ],
  },
  {
    id: "tpl-evening",
    name: "Evening Slots",
    color: "teal",
    slots: [
      { id: "s7", start: "17:00", end: "17:30" },
      { id: "s8", start: "17:30", end: "18:00" },
      { id: "s9", start: "18:00", end: "18:30" },
      { id: "s10", start: "18:30", end: "19:00" },
      { id: "s11", start: "19:00", end: "19:30" },
    ],
  },
  {
    id: "tpl-fullday",
    name: "Full Day",
    color: "amber",
    slots: [
      { id: "s12", start: "10:00", end: "10:30" },
      { id: "s13", start: "10:30", end: "11:00" },
      { id: "s14", start: "11:00", end: "11:30" },
      { id: "s15", start: "16:00", end: "16:30" },
      { id: "s16", start: "16:30", end: "17:00" },
      { id: "s17", start: "17:00", end: "17:30" },
    ],
  },
]

// ── Booking Availability ────────────────────────────────────
// key = "YYYY-MM-DD" -> { templateId: string | null, isOff: boolean }
export const initialAvailability = {
  "2026-07-22": { templateId: "tpl-morning", isOff: false },
  "2026-07-23": { templateId: "tpl-morning", isOff: false },
  "2026-07-24": { templateId: "tpl-fullday", isOff: false },
  "2026-07-26": { templateId: null, isOff: true },
  "2026-07-29": { templateId: "tpl-evening", isOff: false },
}

// ── Services / per-consultation fees ────────────────────────
export const SERVICE_CATEGORIES = ["Skin", "Hair", "Nails", "General"]

export const initialServices = [
  {
    id: "skin-care",
    name: "Skin Care",
    category: "Skin",
    initialFee: 800,
    followUpFee: 500,
    description: "General skin health check-up, routine care and product guidance.",
  },
  {
    id: "hair-scalp",
    name: "Hair & Scalp",
    category: "Hair",
    initialFee: 900,
    followUpFee: 600,
    description: "Hair fall, dandruff and scalp related consultations.",
  },
  {
    id: "nails",
    name: "Nails",
    category: "Nails",
    initialFee: 700,
    followUpFee: 450,
    description: "Nail health, infections and cosmetic nail concerns.",
  },
  {
    id: "pigmentation",
    name: "Pigmentation",
    category: "Skin",
    initialFee: 1000,
    followUpFee: 650,
    description: "Dark spots, melasma and uneven skin tone treatment.",
  },
  {
    id: "acne-treatment",
    name: "Acne Treatment",
    category: "Skin",
    initialFee: 850,
    followUpFee: 550,
    description: "Acne, scarring and breakout management plans.",
  },
  {
    id: "anti-aging",
    name: "Anti-Aging",
    category: "Skin",
    initialFee: 1200,
    followUpFee: 800,
    description: "Fine lines, wrinkles and skin rejuvenation treatments.",
  },
]

// ── General fee settings ────────────────────────────────────
export const initialGeneralFees = {
  // Default fee charged for a first-time / initial consultation booking
  initialConsultationFee: 800,
  // Fee charged when a patient re-books within the validity window
  reappointmentFee: 300,
  reappointmentValidityDays: 15,
}

export const SETTINGS_SECTIONS = [
  {
    key: "scheduling",
    label: "Scheduling",
    icon: "Calendar",
    children: [
      { key: "timeSlots", label: "Time Slot Templates" },
      { key: "availability", label: "Booking Availability" },
    ],
  },
  {
    key: "fees",
    label: "Fees",
    icon: "IndianRupee",
    children: [
      { key: "initialFee", label: "Initial Consultation Fee" },
      { key: "serviceFees", label: "Consultation Services & Fees" },
      { key: "reappointmentFee", label: "Re-appointment Charge" },
    ],
  },
]