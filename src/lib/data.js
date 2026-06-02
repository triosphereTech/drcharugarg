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
  {
  _id: "p2",
  name: "Rohan Mehta",
  email: "rohan@gmail.com",
  mobileNumber: "9876543211",

  conversation: [
    {
      id: "m1",
      sender: "patient",
      type: "text",
      text: "Doctor, I am experiencing severe hair fall for the last 4 months.",
      createdAt: "2025-05-12T09:00:00Z",
    },
    {
      id: "m2",
      sender: "patient",
      type: "images",
      images: [
        "https://images.ctfassets.net/iyiurthvosft/featured-img-of-post-218837/c4a7905c5c4d9e3bcd53a55d8904d11e/featured-img-of-post-218837.jpg",
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/321/321590/man-with-hair-loss.jpg",
      ],
      createdAt: "2025-05-12T09:02:00Z",
    },
    {
      id: "m3",
      sender: "doctor",
      type: "text",
      text: "Please share your recent blood reports and tell me if there is any family history of hair loss.",
      createdAt: "2025-05-12T09:15:00Z",
    },
    {
      id: "m4",
      sender: "doctor",
      type: "images",
      images: [
        "https://m.media-amazon.com/images/I/61s2zQ5n4TL.jpg",
      ],
      createdAt: "2025-05-12T09:17:00Z",
    },
  ],

  createdAt: "2025-01-15T08:00:00Z",
  updatedAt: "2025-05-12T08:00:00Z",
},

{
  _id: "p3",
  name: "Sneha Patel",
  email: "sneha@gmail.com",
  mobileNumber: "9876543212",

  conversation: [
    {
      id: "m1",
      sender: "patient",
      type: "text",
      text: "I have pigmentation around my mouth and cheeks.",
      createdAt: "2025-05-15T10:00:00Z",
    },
    {
      id: "m2",
      sender: "patient",
      type: "images",
      images: [
        "https://cdn.shopify.com/s/files/1/0271/6791/4440/files/melasma.jpg",
        "https://www.aad.org/public/diseases/a-z/melasma-overview",
      ],
      createdAt: "2025-05-15T10:02:00Z",
    },
    {
      id: "m3",
      sender: "doctor",
      type: "text",
      text: "This looks like melasma. Please start sunscreen regularly.",
      createdAt: "2025-05-15T10:20:00Z",
    },
    {
      id: "m4",
      sender: "doctor",
      type: "images",
      images: [
        "https://m.media-amazon.com/images/I/61sM5P9+3PL.jpg",
        "https://m.media-amazon.com/images/I/61cKQ8zL8AL.jpg",
      ],
      createdAt: "2025-05-15T10:22:00Z",
    },
  ],

  createdAt: "2025-02-01T08:00:00Z",
  updatedAt: "2025-05-15T08:00:00Z",
},

{
  _id: "p4",
  name: "Arjun Verma",
  email: "arjun@gmail.com",
  mobileNumber: "9876543213",

  conversation: [
    {
      id: "m1",
      sender: "patient",
      type: "text",
      text: "I developed an itchy skin rash after travelling.",
      createdAt: "2025-05-20T08:30:00Z",
    },
    {
      id: "m2",
      sender: "patient",
      type: "images",
      images: [
        "https://skinsight.com/wp-content/uploads/2021/03/contact-dermatitis.jpg",
        "https://www.healthdirect.gov.au/sites/default/files/rash.jpg",
        "https://my.clevelandclinic.org/-/scassets/images/org/health/articles/17413-rashes",
      ],
      createdAt: "2025-05-20T08:35:00Z",
    },
    {
      id: "m3",
      sender: "doctor",
      type: "prescription",
      title: "Rash Treatment",
      text: `
• Antihistamine tablet once daily
• Calamine lotion twice daily
• Avoid scratching
      `,
      createdAt: "2025-05-20T09:00:00Z",
    },
  ],

  createdAt: "2025-02-10T08:00:00Z",
  updatedAt: "2025-05-20T08:00:00Z",
},

{
  _id: "p5",
  name: "Neha Joshi",
  email: "neha@gmail.com",
  mobileNumber: "9876543214",

  conversation: [
    {
      id: "m1",
      sender: "patient",
      type: "text",
      text: "I want consultation for dark circles and dull skin.",
      createdAt: "2025-05-22T11:00:00Z",
    },
    {
      id: "m2",
      sender: "patient",
      type: "images",
      images: [
        "https://www.belmarrahealth.com/wp-content/uploads/2016/03/dark-circles-under-eyes.jpg",
      ],
      createdAt: "2025-05-22T11:05:00Z",
    },
    {
      id: "m3",
      sender: "doctor",
      type: "text",
      text: "You may benefit from chemical peels and a good skincare routine.",
      createdAt: "2025-05-22T11:20:00Z",
    },
    {
      id: "m4",
      sender: "doctor",
      type: "images",
      images: [
        "https://m.media-amazon.com/images/I/61sM5P9+3PL.jpg",
        "https://m.media-amazon.com/images/I/71Qx7+9fDML.jpg",
        "https://m.media-amazon.com/images/I/61cKQ8zL8AL.jpg",
      ],
      createdAt: "2025-05-22T11:22:00Z",
    },
    {
      id: "m5",
      sender: "doctor",
      type: "prescription",
      title: "Skincare Routine",
      text: `
Morning:
• Vitamin C Serum
• Sunscreen SPF 50

Night:
• Under Eye Cream
• Moisturizer
      `,
      createdAt: "2025-05-22T11:25:00Z",
    },
  ],

  createdAt: "2025-02-20T08:00:00Z",
  updatedAt: "2025-05-22T08:00:00Z",
},
  {
    _id: "p5",
    name: "Neha Joshi",
    email: "neha@gmail.com",
    mobileNumber: "9876543214",
    createdAt: "2025-02-20T08:00:00Z",
    updatedAt: "2025-05-22T08:00:00Z",
  },
  {
    _id: "p6",
    name: "Kiran Gupta",
    email: "kiran@gmail.com",
    mobileNumber: "9876543215",
    createdAt: "2025-03-01T08:00:00Z",
    updatedAt: "2025-05-24T08:00:00Z",
  },
  {
    _id: "p7",
    name: "Aisha Khan",
    email: "aisha@gmail.com",
    mobileNumber: "9876543216",
    createdAt: "2025-03-10T08:00:00Z",
    updatedAt: "2025-05-25T08:00:00Z",
  },
  {
    _id: "p8",
    name: "Vikram Singh",
    email: "vikram@gmail.com",
    mobileNumber: "9876543217",
    createdAt: "2025-03-15T08:00:00Z",
    updatedAt: "2025-05-26T08:00:00Z",
  },
  {
    _id: "p9",
    name: "Pooja Nair",
    email: "pooja@gmail.com",
    mobileNumber: "9876543218",
    createdAt: "2025-03-20T08:00:00Z",
    updatedAt: "2025-05-27T08:00:00Z",
  },
  {
    _id: "p10",
    name: "Rahul Bose",
    email: "rahul@gmail.com",
    mobileNumber: "9876543219",
    createdAt: "2025-04-01T08:00:00Z",
    updatedAt: "2025-05-28T08:00:00Z",
  },
  {
    _id: "p11",
    name: "Divya Iyer",
    email: "divya@gmail.com",
    mobileNumber: "9876543220",
    createdAt: "2025-04-05T08:00:00Z",
    updatedAt: "2025-05-28T08:00:00Z",
  },
  {
    _id: "p12",
    name: "Amit Chaudhary",
    email: "amit@gmail.com",
    mobileNumber: "9876543221",
    createdAt: "2025-04-10T08:00:00Z",
    updatedAt: "2025-05-29T08:00:00Z",
  },
];

export const SERVICES = [
  "Acne Treatment",
  "Skin Consultation",
  "Laser Therapy",
  "Pigmentation",
  "Hair Loss",
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