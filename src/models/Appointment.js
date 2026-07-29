// import mongoose from "mongoose";

// const AttachmentSchema = new mongoose.Schema(
//   {
//     url: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     uploadedBy: {
//       type: String,
//       enum: ["patient", "doctor"],
//       default: "patient",
//     },
//     uploadedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { _id: false }
// );
  
// const AppointmentSchema = new mongoose.Schema(
//   {
//     patient: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Patient",
//       required: true,
//     },

//     service: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     date: {
//       type: Date,
//       required: true,
//     },

//     timeSlot: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     attachments: {
//       type: [AttachmentSchema],
//       default: [],
//     },

//     patientNote: {
//       type: String,
//       trim: true,
//       default: "",
//     },
    
//     prescription: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     status: {
//       type: String,
//       enum: ["pending", "attended", "cancelled"],
//       default: "pending",
//     },
//      paymentStatus: {
//       type: String,
//       enum: ["unpaid", "paid", "failed"],
//       default: "unpaid",
//         },
//     razorpayOrderId:   { type: String, default: null },
//     razorpayPaymentId: { type: String, default: null },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Appointment =
//   mongoose.models.Appointment ||
//   mongoose.model("Appointment", AppointmentSchema);

// export default Appointment;

import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedBy: {
      type: String,
      enum: ["patient", "doctor"],
      default: "patient",
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const AppointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },

    parentAppointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    // Common ID shared by initial + follow-up appointments
    appointmentGroupId: {
      type: String,
      required: true,
      index: true,
    },

    appointmentType: {
      type: String,
      enum: ["initial", "followup"],
      default: "initial",
    },

    date: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
      trim: true,
    },

    attachments: {
      type: [AttachmentSchema],
      default: [],
    },

    patientNote: {
      type: String,
      trim: true,
      default: "",
    },

    prescription: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "attended", "cancelled"],
      default: "pending",
    },

    // Appointment fee
    fee: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
    },

    razorpayOrderId: {
      type: String,
      default: null,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

export default Appointment;