// ─── Mock Patients ───────────────────────────────────────────────────────────

export const MOCK_PATIENTS = [
    {
    _id: "p1",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    mobileNumber: "9876543210",

    conversation: [
  {
    id: "m1",
    sender: "patient",
    type: "text",
    text: "Doctor, I have severe acne on my cheeks.",
    createdAt: "2025-05-10T09:30:00Z",
  },

  {
    id: "m2",
    sender: "patient",
    type: "images",
    images: [
      "https://aventusclinic.com/wp-content/uploads/2025/11/acne-before-scaled-e1764168292784.png",
      "https://assets.nhs.uk/nhsuk-cms/images/S_0917_acne_M1080444.original.max-600x600.jpg",
      "https://media.healthdirect.org.au/images/inline/original/acne-9bdd62.jpg",
      "https://ysm-res.cloudinary.com/image/upload/ar_1:1,c_fill,dpr_3.0,f_auto,g_faces:auto,q_auto:eco,w_500/v1/yms/prod/0e6bde64-1a3a-416c-a55e-c532eb9fc01d",
    ],
    createdAt: "2025-05-10T09:31:00Z",
  },

  


],

    createdAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-05-10T08:00:00Z"
  },
];

export const SERVICES = [
  "Initial Consultation",
  "Follow-up Visit",
  "Scalp Analysis",
  "Laser Consultation"
];

export const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
];

const STATUSES = [
  "pending",
  "pending",
  "attended",
  "pending",
  "attended",
  "cancelled",
  "pending",
  "pending",
  "attended",
  "pending",
  "pending",
  "attended",
];

function makeDateStr(daysAgo) {
  const d = new Date("2025-05-30");
  d.setDate(d.getDate() - daysAgo);

  return d.toISOString().split("T")[0];
}

function buildAppointments() {
  const appts = [];

  let idCounter = 1;

  const dayGroups = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3,
  ];

  dayGroups.forEach((daysAgo, i) => {
    const pat = MOCK_PATIENTS[i % MOCK_PATIENTS.length];

    appts.push({
      _id: `a${idCounter++}`,
      patient: pat,
      service: SERVICES[i % SERVICES.length],
      date: makeDateStr(daysAgo),
      timeSlot: TIME_SLOTS[i % TIME_SLOTS.length],
      attachments: [],
      status: STATUSES[i % STATUSES.length],
      prescription:
        STATUSES[i % STATUSES.length] === "attended"
          ? "Tretinoin 0.025% cream, apply nightly. Avoid sun exposure. Follow up in 4 weeks."
          : undefined,
      createdAt: new Date(
        `2025-05-${30 - daysAgo}`
      ).toISOString(),
      updatedAt: new Date(
        `2025-05-${30 - daysAgo}`
      ).toISOString(),
    });
  });

  return appts;
}

export const MOCK_APPOINTMENTS = buildAppointments();

// ─── Simulated API Functions ──────────────────────────────────────────────────

export async function fetchAppointments(filters = {}) {
  await new Promise((r) => setTimeout(r, 300));

  const {
    status,
    dateFrom,
    dateTo,
    timeSlots,
    services,
    patientId,
    page = 1,
    limit = 10,
  } = filters;

  let data = [...MOCK_APPOINTMENTS];

  if (status) {
    data = data.filter((a) => a.status === status);
  }

  if (dateFrom) {
    data = data.filter((a) => a.date >= dateFrom);
  }

  if (dateTo) {
    data = data.filter((a) => a.date <= dateTo);
  }

  if (timeSlots?.length) {
    data = data.filter((a) =>
      timeSlots.includes(a.timeSlot)
    );
  }

  if (services?.length) {
    data = data.filter((a) =>
      services.includes(a.service)
    );
  }

  if (patientId) {
    data = data.filter(
      (a) => a.patient._id === patientId
    );
  }

  const total = data.length;

  const paginated = data.slice(
    (page - 1) * limit,
    page * limit
  );

  return {
    data: paginated,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function fetchPatients(filters = {}) {
  await new Promise((r) => setTimeout(r, 250));

  const {
    search,
    page = 1,
    limit = 10,
  } = filters;

  let data = [...MOCK_PATIENTS];

  if (search) {
    data = data.filter((p) =>
      p.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  const total = data.length;

  const paginated = data.slice(
    (page - 1) * limit,
    page * limit
  );

  return {
    data: paginated,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function fetchPatientById(id) {
  await new Promise((r) => setTimeout(r, 150));

  return (
    MOCK_PATIENTS.find((p) => p._id === id) ?? null
  );
}

export async function fetchDashboardStats(date) {
  await new Promise((r) => setTimeout(r, 200));

  const today = date ?? "2025-05-30";

  const appts = MOCK_APPOINTMENTS.filter(
    (a) => a.date === today
  );

  return {
    total: appts.length,
    pending: appts.filter(
      (a) => a.status === "pending"
    ).length,
    attended: appts.filter(
      (a) => a.status === "attended"
    ).length,
    cancelled: appts.filter(
      (a) => a.status === "cancelled"
    ).length,
  };
}

export async function updateAppointmentStatus(
  id,
  status,
  prescription
) {
  await new Promise((r) => setTimeout(r, 400));

  const appt = MOCK_APPOINTMENTS.find(
    (a) => a._id === id
  );

  if (!appt) {
    throw new Error("Appointment not found");
  }

  appt.status = status;

  if (prescription) {
    appt.prescription = prescription;
  }

  appt.updatedAt = new Date().toISOString();

  return { ...appt };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export function getAppointmentCountForPatient(
  patientId
) {
  return MOCK_APPOINTMENTS.filter(
    (a) => a.patient._id === patientId
  ).length;
}

export function getLastVisitForPatient(patientId) {
  const attended = MOCK_APPOINTMENTS.filter(
    (a) =>
      a.patient._id === patientId &&
      a.status === "attended"
  );

  if (!attended.length) {
    return null;
  }

  return attended[attended.length - 1].date;
}

export function getServiceBreakdown(date) {
  const appts = MOCK_APPOINTMENTS.filter(
    (a) => a.date === date
  );

  return appts.reduce((acc, a) => {
    acc[a.service] = (acc[a.service] ?? 0) + 1;
    return acc;
  }, {});
}