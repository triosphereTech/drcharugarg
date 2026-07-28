// import mongoose from "mongoose";

// const PatientSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     mobileNumber: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 10,
//     },
//     otp: {
//       type: String,
//       trim: true,
//       maxlength: 6,
//     },
//     otpExpiresAt: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Patient =
//   mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

// export default Patient;

import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
    },

    // Add these fields
    dob: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    bloodGroup: {
      type: String,
    },

    address: {
      type: String,
      trim: true,
    },

    otp: {
      type: String,
      trim: true,
      maxlength: 6,
    },

    otpExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

export default Patient;