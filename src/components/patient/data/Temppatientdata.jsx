// ─────────────────────────────────────────────────────────────
// Temporary local data for the Patient Dashboard.
// No API is wired up yet — everything here is just in-memory /
// placeholder data so the UI can be built and demoed.
// Replace with real API calls whenever the backend is ready.
// ─────────────────────────────────────────────────────────────

let idCounter = 5000
export const generatePatientId = (prefix = "id") => `${prefix}-${idCounter++}-${Date.now().toString(36)}`

export const currency = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`

// export const formatDateLong = (date) => {
//   if (!date) return "";

//   const d = date.includes("T")
//     ? new Date(date)
//     : new Date(`${date}T00:00:00`);

//   return d.toLocaleDateString("en-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// };

export const formatDateLong = (date) => {

  if (!date) return "";

  let d;

  if (date instanceof Date) {
    d = date;
  } else if (typeof date === "string") {
    d = date.includes("T")
      ? new Date(date)
      : new Date(`${date}T00:00:00`);
  } else {
    d = new Date(date);
  }

  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatDateShort = (dateKey) => {
  if (!dateKey) return ""
  const d = new Date(`${dateKey}T00:00:00`)
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export const formatDateForInput = (date) => {
  if (!date) return "";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) return "";

  return d.toISOString().split("T")[0];
};

// ── Logged-in patient profile ───────────────────────────────
export const initialPatient = {
  id: "pat-001",
  name: "Shivang Shah",
  email: "shivangshah19.ss@gmail.com",
  phone: "6353157921",
  dob: "1998-04-12",
  gender: "Male",
  bloodGroup: "O+",
  address: "Satellite, Ahmedabad, Gujarat",
}

// ── Appointment history (upcoming / completed / cancelled) ──
export const initialAppointments = [
  {
    id: "apt-1",
    date: "2026-07-18",
    time: "10:00 AM",
    service: "Skin Care",
    type: "Initial Consultation",
    doctor: "Dr. Charu Garg",
    status: "completed",
    fee: 800,
    prescriptionId: "rx-1",
  },
  {
    id: "apt-2",
    date: "2026-07-28",
    time: "11:00 AM",
    service: "Skin Care",
    type: "Follow-up Consultation",
    doctor: "Dr. Charu Garg",
    status: "upcoming",
    fee: 500,
  },
  {
    id: "apt-3",
    date: "2026-06-10",
    time: "5:30 PM",
    service: "Hair & Scalp",
    type: "Initial Consultation",
    doctor: "Dr. Charu Garg",
    status: "completed",
    fee: 900,
    prescriptionId: "rx-2",
  },
  {
    id: "apt-4",
    date: "2026-06-20",
    time: "9:30 AM",
    service: "Hair & Scalp",
    type: "Follow-up Consultation",
    doctor: "Dr. Charu Garg",
    status: "cancelled",
    fee: 600,
  },
]

// ── Prescriptions issued by the doctor ──────────────────────
export const initialPrescriptions = [
  {
    id: "rx-1",
    appointmentId: "apt-1",
    date: "2026-07-18",
    doctor: "Dr. Charu Garg",
    diagnosis: "Mild Acne (Grade II)",
    medicines: [
      { name: "Tretinoin Cream 0.025%", dosage: "Apply a thin layer at night", duration: "4 weeks" },
      { name: "Cetaphil Gentle Skin Cleanser", dosage: "Twice daily", duration: "Ongoing" },
      { name: "Sunscreen SPF 50 PA+++", dosage: "Every morning", duration: "Ongoing" },
    ],
    advice: "Avoid direct sun exposure between 11 AM – 4 PM. Do not skip sunscreen. Avoid oily / heavy skincare products.",
    followUpRecommended: true,
    followUpAfterDays: 15,
  },
  {
    id: "rx-2",
    appointmentId: "apt-3",
    date: "2026-06-10",
    doctor: "Dr. Charu Garg",
    diagnosis: "Telogen Effluvium (Stress-related hair fall)",
    medicines: [
      { name: "Biotin 10mg Tablets", dosage: "1 tablet daily after breakfast", duration: "3 months" },
      { name: "Ketoconazole Shampoo 2%", dosage: "Twice a week", duration: "6 weeks" },
    ],
    advice: "Maintain a balanced diet rich in protein and iron. Reduce stress where possible. Avoid tight hairstyles.",
    followUpRecommended: true,
    followUpAfterDays: 30,
  },
]

// ── Services available for follow-up booking (with fee) ─────
export const followUpServices = [
  { id: "skin-care", name: "Skin Care", followUpFee: 500 },
  { id: "hair-scalp", name: "Hair & Scalp", followUpFee: 600 },
  { id: "nails", name: "Nails", followUpFee: 450 },
  { id: "pigmentation", name: "Pigmentation", followUpFee: 650 },
]

// ── Demo doctor availability the patient can pick from ──────
// key = "YYYY-MM-DD" -> array of available time slot strings
export const demoAvailableSlots = {
  "2026-07-24": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
  "2026-07-25": ["5:00 PM", "5:30 PM", "6:00 PM"],
  "2026-07-27": ["9:30 AM", "10:00 AM", "10:30 AM"],
  "2026-07-29": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
  "2026-07-30": ["10:00 AM", "10:30 AM"],
}